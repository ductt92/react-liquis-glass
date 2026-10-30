import * as React from 'react';
import { cx, useEscape, usePresence, useScrollLock } from '../utils';
import { Portal } from './ConfigProvider';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ImageIcon,
  RefreshIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '../icons';

/* ───────── Carousel ───────── */
export interface CarouselProps {
  children: React.ReactNode;
  autoplay?: boolean;
  /** Milliseconds between slides. */
  interval?: number;
  effect?: 'slide' | 'fade';
  dots?: boolean;
  arrows?: boolean;
  loop?: boolean;
  current?: number;
  defaultCurrent?: number;
  onChange?: (index: number) => void;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay,
  interval = 4000,
  effect = 'slide',
  dots = true,
  arrows = true,
  loop = true,
  current: currentProp,
  defaultCurrent = 0,
  onChange,
  height,
  className,
  style,
}) => {
  const slides = React.Children.toArray(children);
  const count = slides.length;
  const [inner, setInner] = React.useState(defaultCurrent);
  const current = currentProp ?? inner;
  const [hover, setHover] = React.useState(false);
  const [drag, setDrag] = React.useState<{ startX: number; dx: number; width: number } | null>(null);

  const go = React.useCallback(
    (i: number) => {
      let next = i;
      if (loop) next = (i + count) % count;
      else next = Math.max(0, Math.min(count - 1, i));
      if (currentProp === undefined) setInner(next);
      onChange?.(next);
    },
    [count, loop, currentProp, onChange],
  );

  React.useEffect(() => {
    if (!autoplay || hover || drag || count < 2) return;
    const t = setTimeout(() => go(current + 1), interval);
    return () => clearTimeout(t);
  }, [autoplay, hover, drag, current, interval, go, count]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDrag({ startX: e.clientX, dx: 0, width: e.currentTarget.offsetWidth });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (drag) setDrag({ ...drag, dx: e.clientX - drag.startX });
  };
  const onPointerUp = () => {
    if (!drag) return;
    const threshold = Math.min(80, drag.width * 0.15);
    if (drag.dx < -threshold) go(current + 1);
    else if (drag.dx > threshold) go(current - 1);
    setDrag(null);
  };

  const offset = drag && effect === 'slide' ? (drag.dx / drag.width) * 100 : 0;

  return (
    <div
      className={cx('lg-carousel', `lg-carousel-effect-${effect}`, drag && 'lg-carousel-dragging', className)}
      style={{ height, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(current - 1);
        if (e.key === 'ArrowRight') go(current + 1);
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
    >
      <div className="lg-carousel-viewport" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        {effect === 'slide' ? (
          <div className="lg-carousel-track" style={{ transform: `translateX(${-current * 100 + offset}%)` }}>
            {slides.map((s, i) => (
              <div key={i} className="lg-carousel-slide" role="group" aria-roledescription="slide" aria-hidden={i !== current}>
                {s}
              </div>
            ))}
          </div>
        ) : (
          slides.map((s, i) => (
            <div key={i} className={cx('lg-carousel-slide lg-carousel-fade-slide', i === current && 'lg-active')} aria-hidden={i !== current}>
              {s}
            </div>
          ))
        )}
      </div>
      {arrows && count > 1 && (
        <>
          <button type="button" className="lg-carousel-arrow lg-carousel-prev lg-glass" aria-label="Previous slide" disabled={!loop && current === 0} onClick={() => go(current - 1)}>
            <ChevronLeftIcon />
          </button>
          <button type="button" className="lg-carousel-arrow lg-carousel-next lg-glass" aria-label="Next slide" disabled={!loop && current === count - 1} onClick={() => go(current + 1)}>
            <ChevronRightIcon />
          </button>
        </>
      )}
      {dots && count > 1 && (
        <div className="lg-carousel-dots lg-glass" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={cx('lg-carousel-dot', i === current && 'lg-active')}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────── Image + preview ───────── */
interface PreviewGroupContextValue {
  register: (src: string) => () => void;
  open: (src: string) => void;
}
const PreviewGroupContext = React.createContext<PreviewGroupContextValue | null>(null);

interface LightboxProps {
  open: boolean;
  images: string[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ open, images, index, onIndexChange, onClose }) => {
  const { mounted, visible } = usePresence(open, 260);
  const [scale, setScale] = React.useState(1);
  const [rotate, setRotate] = React.useState(0);
  useScrollLock(open);
  useEscape(onClose, open);
  React.useEffect(() => {
    setScale(1);
    setRotate(0);
  }, [index, open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && images.length > 1) onIndexChange((index - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight' && images.length > 1) onIndexChange((index + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, images.length, onIndexChange]);
  if (!mounted) return null;
  const zoom = (d: number) => setScale((s) => Math.min(4, Math.max(0.25, +(s + d).toFixed(2))));
  return (
    <Portal>
      <div className={cx('lg-lightbox', visible && 'lg-open')} role="dialog" aria-modal="true" aria-label="Image preview">
        <div className="lg-mask lg-lightbox-mask" onClick={onClose} />
        <div
          className="lg-lightbox-stage"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onWheel={(e) => zoom(e.deltaY < 0 ? 0.15 : -0.15)}
        >
          <img
            className="lg-lightbox-img"
            src={images[index]}
            alt=""
            draggable={false}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          />
        </div>
        {images.length > 1 && (
          <>
            <button type="button" className="lg-lightbox-nav lg-lightbox-prev lg-glass" aria-label="Previous image" onClick={() => onIndexChange((index - 1 + images.length) % images.length)}>
              <ChevronLeftIcon />
            </button>
            <button type="button" className="lg-lightbox-nav lg-lightbox-next lg-glass" aria-label="Next image" onClick={() => onIndexChange((index + 1) % images.length)}>
              <ChevronRightIcon />
            </button>
          </>
        )}
        <button type="button" className="lg-lightbox-close lg-glass" aria-label="Close preview" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="lg-lightbox-toolbar lg-glass lg-glass-strong">
          {images.length > 1 && <span className="lg-lightbox-count">{index + 1} / {images.length}</span>}
          <button type="button" aria-label="Zoom out" onClick={() => zoom(-0.25)}><ZoomOutIcon /></button>
          <span className="lg-lightbox-scale">{Math.round(scale * 100)}%</span>
          <button type="button" aria-label="Zoom in" onClick={() => zoom(0.25)}><ZoomInIcon /></button>
          <button type="button" aria-label="Rotate" onClick={() => setRotate((r) => r + 90)}><RefreshIcon /></button>
        </div>
      </div>
    </Portal>
  );
};

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** Open a fullscreen glass lightbox on click. Default true. */
  preview?: boolean | { src?: string };
  /** Custom placeholder while loading. Defaults to a shimmer skeleton. */
  placeholder?: React.ReactNode;
  /** Shown when the image fails to load. */
  fallback?: React.ReactNode;
  radius?: number | string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, width, height, preview = true, placeholder, fallback, radius, className, style, onLoad, onError, ...rest }) => {
  const group = React.useContext(PreviewGroupContext);
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const previewSrc = (typeof preview === 'object' && preview.src) || src || '';
  React.useEffect(() => {
    setStatus('loading');
  }, [src]);
  React.useEffect(() => {
    if (group && preview && previewSrc) return group.register(previewSrc);
  }, [group, preview, previewSrc]);
  const canPreview = !!preview && status === 'loaded';
  return (
    <span
      className={cx('lg-image', canPreview && 'lg-image-previewable', status === 'loading' && 'lg-image-loading', className)}
      style={{ width, height, borderRadius: radius, ...style }}
      onClick={() => {
        if (!canPreview) return;
        if (group) group.open(previewSrc);
        else {
          setIdx(0);
          setOpen(true);
        }
      }}
    >
      {status === 'loading' && (placeholder ?? <span className="lg-image-placeholder lg-skeleton-item lg-skeleton-active" />)}
      {status === 'error' ? (
        fallback ?? (
          <span className="lg-image-fallback">
            <ImageIcon />
          </span>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={(e) => {
            setStatus('loaded');
            onLoad?.(e);
          }}
          onError={(e) => {
            setStatus('error');
            onError?.(e);
          }}
          {...rest}
        />
      )}
      {canPreview && (
        <span className="lg-image-mask">
          <ZoomInIcon />
        </span>
      )}
      {!group && <Lightbox open={open} images={[previewSrc]} index={idx} onIndexChange={setIdx} onClose={() => setOpen(false)} />}
    </span>
  );
};

/** Groups `Image`s so the lightbox can navigate between them. */
export const ImagePreviewGroup: React.FC<{ children: React.ReactNode; items?: string[] }> = ({ children, items }) => {
  const [registered, setRegistered] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const images = items ?? registered;
  const imagesRef = React.useRef(images);
  imagesRef.current = images;
  const value = React.useMemo<PreviewGroupContextValue>(
    () => ({
      register: (src) => {
        setRegistered((r) => (r.includes(src) ? r : [...r, src]));
        return () => setRegistered((r) => r.filter((x) => x !== src));
      },
      open: (src) => {
        setIndex(Math.max(0, imagesRef.current.indexOf(src)));
        setOpen(true);
      },
    }),
    [],
  );
  return (
    <PreviewGroupContext.Provider value={value}>
      {children}
      <Lightbox open={open} images={images} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} />
    </PreviewGroupContext.Provider>
  );
};

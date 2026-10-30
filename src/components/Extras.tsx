import * as React from 'react';
import { cx } from '../utils';
import { Portal } from './ConfigProvider';
import { Tooltip } from './Overlay';
import { Badge } from './Display';
import { ArrowUpIcon, CloseIcon, PlusIcon } from '../icons';

/* ───────── FloatButton ───────── */
export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  type?: 'default' | 'primary';
  shape?: 'circle' | 'square';
  badge?: { count?: number; dot?: boolean };
  href?: string;
  target?: string;
  /** Pixel offsets from the viewport corner. Ignored inside a FloatButtonGroup. */
  right?: number;
  bottom?: number;
}

const FloatGroupContext = React.createContext(false);

export const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(function FloatButton(
  { icon, description, tooltip, type = 'default', shape = 'circle', badge, href, target, right = 24, bottom = 24, className, style, ...rest },
  ref,
) {
  const inGroup = React.useContext(FloatGroupContext);
  const classes = cx(
    'lg-float-btn lg-glass',
    `lg-float-btn-${type}`,
    `lg-float-btn-${shape}`,
    description && 'lg-float-btn-with-desc',
    !inGroup && 'lg-float-btn-fixed',
    className,
  );
  const pos = inGroup ? style : { right, bottom, ...style };
  const body = (
    <>
      <span className="lg-float-btn-icon">{icon ?? <PlusIcon />}</span>
      {description && <span className="lg-float-btn-desc">{description}</span>}
      {badge && <Badge count={badge.count} dot={badge.dot} className="lg-float-btn-badge" />}
    </>
  );
  const el: React.ReactElement = href ? (
    <a className={classes} href={href} target={target} style={pos} aria-label={typeof tooltip === 'string' ? tooltip : undefined}>
      {body}
    </a>
  ) : (
    <button ref={ref} type="button" className={classes} style={pos} aria-label={typeof tooltip === 'string' ? tooltip : undefined} {...rest}>
      {body}
    </button>
  );
  return tooltip ? <Tooltip title={tooltip} placement="left">{el}</Tooltip> : el;
});

export interface FloatButtonGroupProps {
  children: React.ReactNode;
  /** Speed-dial mode. Without a trigger the buttons are always stacked. */
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: React.ReactNode;
  type?: 'default' | 'primary';
  shape?: 'circle' | 'square';
  right?: number;
  bottom?: number;
  className?: string;
}

export const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({ children, trigger, open: openProp, onOpenChange, icon, type = 'primary', shape = 'circle', right = 24, bottom = 24, className }) => {
  const [inner, setInner] = React.useState(false);
  const open = trigger ? openProp ?? inner : true;
  const set = (v: boolean) => {
    if (openProp === undefined) setInner(v);
    onOpenChange?.(v);
  };
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (trigger !== 'click' || !open) return;
    const fn = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && set(false);
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, open]);
  const items = React.Children.toArray(children);
  return (
    <FloatGroupContext.Provider value>
      <div
        ref={ref}
        className={cx('lg-float-group', trigger && 'lg-float-group-dial', open && 'lg-open', !trigger && shape === 'square' && 'lg-float-group-square lg-glass', className)}
        style={{ right, bottom }}
        onMouseEnter={trigger === 'hover' ? () => set(true) : undefined}
        onMouseLeave={trigger === 'hover' ? () => set(false) : undefined}
      >
        <div className="lg-float-group-items" aria-hidden={!open}>
          {items.map((c, i) => (
            <div key={i} className="lg-float-group-item" style={{ transitionDelay: open ? `${(items.length - 1 - i) * 35}ms` : `${i * 25}ms` }}>
              {c}
            </div>
          ))}
        </div>
        {trigger && (
          <FloatButton
            type={type}
            shape={shape}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            icon={<span className={cx('lg-float-group-toggle', open && 'lg-open')}>{open ? <CloseIcon /> : icon ?? <PlusIcon />}</span>}
            onClick={trigger === 'click' ? () => set(!open) : undefined}
          />
        )}
      </div>
    </FloatGroupContext.Provider>
  );
};

/* ───────── BackTop ───────── */
export interface BackTopProps extends Omit<FloatButtonProps, 'onClick' | 'target' | 'href'> {
  /** Show after scrolling this many pixels. */
  visibilityHeight?: number;
  /** Scroll container. Defaults to window. */
  target?: () => HTMLElement | Window | null;
  onClick?: () => void;
}

export const BackTop: React.FC<BackTopProps> = ({ visibilityHeight = 400, target, onClick, icon, tooltip = 'Back to top', ...rest }) => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const t = target?.() ?? window;
    const read = () => (t === window ? window.scrollY : (t as HTMLElement).scrollTop);
    const fn = () => setVisible(read() >= visibilityHeight);
    fn();
    t.addEventListener('scroll', fn, { passive: true });
    return () => t.removeEventListener('scroll', fn);
  }, [target, visibilityHeight]);
  return (
    <Portal>
      <div className={cx('lg-backtop', visible && 'lg-open')}>
        <FloatButton
          icon={icon ?? <ArrowUpIcon />}
          tooltip={tooltip}
          onClick={() => {
            const t = target?.() ?? window;
            t.scrollTo({ top: 0, behavior: 'smooth' });
            onClick?.();
          }}
          {...rest}
        />
      </div>
    </Portal>
  );
};

/* ───────── Watermark ───────── */
export interface WatermarkProps {
  content?: string | string[];
  /** Image URL used instead of text. */
  image?: string;
  rotate?: number;
  gap?: [number, number];
  width?: number;
  height?: number;
  font?: { color?: string; fontSize?: number; fontWeight?: number | string; fontFamily?: string };
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Watermark: React.FC<WatermarkProps> = ({
  content,
  image,
  rotate = -22,
  gap = [100, 100],
  width = 140,
  height = 64,
  font = {},
  zIndex = 9,
  className,
  style,
  children,
}) => {
  const [url, setUrl] = React.useState('');
  const lines = Array.isArray(content) ? content : content ? [content] : [];
  const { color = 'rgba(120, 130, 160, 0.18)', fontSize = 15, fontWeight = 500, fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif' } = font;
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const ratio = window.devicePixelRatio || 1;
    const cw = (gap[0] + width) * ratio;
    const ch = (gap[1] + height) * ratio;
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.translate(cw / 2, ch / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    const draw = () => setUrl(canvas.toDataURL());
    if (image) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        ctx.drawImage(img, (-width * ratio) / 2, (-height * ratio) / 2, width * ratio, height * ratio);
        draw();
      };
      img.src = image;
      return;
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontWeight} ${fontSize * ratio}px ${fontFamily}`;
    const lh = fontSize * 1.4 * ratio;
    lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * lh));
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join('\n'), image, rotate, gap[0], gap[1], width, height, color, fontSize, fontWeight, fontFamily]);
  return (
    <div className={cx('lg-watermark', className)} style={style}>
      {children}
      {url && (
        <div
          aria-hidden
          className="lg-watermark-layer"
          style={{ zIndex, backgroundImage: `url(${url})`, backgroundSize: `${gap[0] + width}px ${gap[1] + height}px` }}
        />
      )}
    </div>
  );
};

/* ───────── Kbd ───────── */
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md';
}
/** Keyboard key chip, e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>. */
export const Kbd: React.FC<KbdProps> = ({ size = 'md', className, ...rest }) => (
  <kbd className={cx('lg-kbd lg-glass', `lg-kbd-${size}`, className)} {...rest} />
);

/* ───────── Countdown ───────── */
export interface CountdownProps {
  title?: React.ReactNode;
  /** Target time (ms timestamp or Date). */
  value: number | Date;
  /** Tokens: D, HH, mm, ss, SSS. Text inside [brackets] is literal. */
  format?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onFinish?: () => void;
  onChange?: (remainingMs: number) => void;
  valueStyle?: React.CSSProperties;
  className?: string;
}

const pad2 = (n: number, len = 2) => String(Math.floor(n)).padStart(len, '0');

export function formatCountdown(ms: number, format: string): string {
  let left = Math.max(0, ms);
  const hasDays = /D/.test(format.replace(/\[[^\]]*\]/g, ''));
  const days = hasDays ? Math.floor(left / 86400000) : 0;
  left -= days * 86400000;
  const hours = Math.floor(left / 3600000);
  left -= hours * 3600000;
  const minutes = Math.floor(left / 60000);
  left -= minutes * 60000;
  const seconds = Math.floor(left / 1000);
  const millis = left - seconds * 1000;
  const literals: string[] = [];
  const masked = format.replace(/\[([^\]]*)\]/g, (_, t: string) => {
    literals.push(t);
    return `\u0000${literals.length - 1}\u0000`;
  });
  const out = masked
    .replace(/D+/g, String(days))
    .replace(/HH/g, pad2(hours))
    .replace(/mm/g, pad2(minutes))
    .replace(/ss/g, pad2(seconds))
    .replace(/SSS/g, pad2(millis, 3));
  return out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => literals[Number(i)]);
}

export const Countdown: React.FC<CountdownProps> = ({ title, value, format = 'HH:mm:ss', prefix, suffix, onFinish, onChange, valueStyle, className }) => {
  const target = typeof value === 'number' ? value : value.getTime();
  const [now, setNow] = React.useState(() => Date.now());
  const finished = React.useRef(false);
  const cbs = React.useRef({ onFinish, onChange });
  cbs.current = { onFinish, onChange };
  React.useEffect(() => {
    finished.current = false;
    const tick = /SSS/.test(format) ? 33 : 250;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      cbs.current.onChange?.(Math.max(0, target - n));
      if (n >= target && !finished.current) {
        finished.current = true;
        clearInterval(t);
        cbs.current.onFinish?.();
      }
    }, tick);
    return () => clearInterval(t);
  }, [target, format]);
  return (
    <div className={cx('lg-statistic lg-countdown', className)}>
      {title && <div className="lg-statistic-title">{title}</div>}
      <div className="lg-statistic-value" style={valueStyle} role="timer" aria-live="off">
        {prefix && <span className="lg-statistic-prefix">{prefix}</span>}
        <span>{formatCountdown(target - now, format)}</span>
        {suffix && <span className="lg-statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

/* ───────── Anchor ───────── */
export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
  children?: AnchorItem[];
}

export interface AnchorProps {
  items: AnchorItem[];
  /** Distance from the top of the container at which a section becomes active. */
  offsetTop?: number;
  /** Scroll container. Defaults to window. */
  getContainer?: () => HTMLElement | Window;
  onChange?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const flatten = (items: AnchorItem[]): AnchorItem[] => items.flatMap((i) => [i, ...flatten(i.children ?? [])]);

export const Anchor: React.FC<AnchorProps> = ({ items, offsetTop = 0, getContainer, onChange, className, style }) => {
  const [active, setActive] = React.useState<string>('');
  const listRef = React.useRef<HTMLUListElement>(null);
  const [ind, setInd] = React.useState<{ top: number; height: number } | null>(null);
  const all = React.useMemo(() => flatten(items), [items]);
  const lock = React.useRef(false);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    const container = getContainer?.() ?? window;
    const compute = () => {
      if (lock.current) return;
      const cTop = container === window ? 0 : (container as HTMLElement).getBoundingClientRect().top;
      let current = '';
      for (const it of all) {
        const el = document.querySelector(it.href) as HTMLElement | null;
        if (!el) continue;
        if (el.getBoundingClientRect().top - cTop <= offsetTop + 8) current = it.href;
      }
      setActive((prev) => {
        if (prev !== current) onChangeRef.current?.(current);
        return current;
      });
    };
    compute();
    container.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      container.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [all, offsetTop, getContainer]);

  React.useLayoutEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-href="${CSS.escape(active)}"]`);
    setInd(el ? { top: el.offsetTop, height: el.offsetHeight } : null);
  }, [active]);

  const go = (e: React.MouseEvent, href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    e.preventDefault();
    const container = getContainer?.() ?? window;
    const cTop = container === window ? 0 : (container as HTMLElement).getBoundingClientRect().top;
    const current = container === window ? window.scrollY : (container as HTMLElement).scrollTop;
    lock.current = true;
    setActive(href);
    onChangeRef.current?.(href);
    container.scrollTo({ top: current + el.getBoundingClientRect().top - cTop - offsetTop, behavior: 'smooth' });
    setTimeout(() => (lock.current = false), 700);
  };

  const render = (list: AnchorItem[], depth: number): React.ReactNode =>
    list.map((it) => (
      <li key={it.key}>
        <a
          href={it.href}
          data-href={it.href}
          className={cx('lg-anchor-link', active === it.href && 'lg-active')}
          style={{ paddingLeft: 14 + depth * 14 }}
          onClick={(e) => go(e, it.href)}
        >
          {it.title}
        </a>
        {it.children && <ul>{render(it.children, depth + 1)}</ul>}
      </li>
    ));

  return (
    <nav className={cx('lg-anchor', className)} style={style} aria-label="On this page">
      <span className="lg-anchor-rail" />
      {ind && <span className="lg-anchor-indicator" style={{ transform: `translateY(${ind.top}px)`, height: ind.height }} />}
      <ul ref={listRef}>{render(items, 0)}</ul>
    </nav>
  );
};

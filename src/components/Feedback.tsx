import * as React from 'react';
import { cx, useEscape, usePresence, useScrollLock, useId } from '../utils';
import { Portal } from './ConfigProvider';
import { Button } from './Button';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, CloseIcon, InfoFilledIcon, WarningFilledIcon } from '../icons';

type Kind = 'success' | 'info' | 'warning' | 'error';
export const statusIcon: Record<Kind, React.ReactNode> = {
  success: <CheckCircleFilledIcon />,
  info: <InfoFilledIcon />,
  warning: <WarningFilledIcon />,
  error: <CloseCircleFilledIcon />,
};

/* ───────── Alert ───────── */
export interface AlertProps {
  type?: Kind;
  title?: React.ReactNode;
  description?: React.ReactNode;
  showIcon?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  banner?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export const Alert: React.FC<AlertProps> = ({ type = 'info', title, description, showIcon = true, icon, closable, onClose, action, banner, className, style }) => {
  const [closed, setClosed] = React.useState(false);
  if (closed) return null;
  return (
    <div role="alert" className={cx('lg-alert lg-glass', `lg-alert-${type}`, description && 'lg-alert-with-desc', banner && 'lg-alert-banner', className)} style={style}>
      {showIcon && <span className="lg-alert-icon">{icon ?? statusIcon[type]}</span>}
      <div className="lg-alert-content">
        {title && <div className="lg-alert-title">{title}</div>}
        {description && <div className="lg-alert-desc">{description}</div>}
      </div>
      {action && <div className="lg-alert-action">{action}</div>}
      {closable && (
        <button
          type="button"
          aria-label="Close"
          className="lg-close-btn"
          onClick={() => {
            setClosed(true);
            onClose?.();
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

/* ───────── focus trap helper ───────── */
function useFocusTrap(ref: React.RefObject<HTMLElement>, active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const sel = 'button:not([disabled]),[href],input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
    setTimeout(() => (el?.querySelector<HTMLElement>('[data-autofocus]') ?? el)?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !el) return;
      const f = Array.from(el.querySelectorAll<HTMLElement>(sel));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [active, ref]);
}

/* ───────── Modal ───────── */
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** `null` hides the footer. Defaults to Cancel / OK buttons. */
  footer?: React.ReactNode | null;
  onOk?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okLoading?: boolean;
  okDanger?: boolean;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  onOk,
  okText = 'OK',
  cancelText = 'Cancel',
  okLoading,
  okDanger,
  width = 480,
  centered = true,
  closable = true,
  maskClosable = true,
  className,
}) => {
  const { mounted, visible } = usePresence(open, 260);
  const ref = React.useRef<HTMLDivElement>(null);
  const titleId = useId('lg-modal');
  useEscape(() => onClose?.(), open);
  useScrollLock(open);
  useFocusTrap(ref, open);
  if (!mounted) return null;
  const defaultFooter = (
    <>
      <Button variant="glass" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant="filled" color={okDanger ? 'danger' : 'primary'} loading={okLoading} onClick={onOk} data-autofocus>
        {okText}
      </Button>
    </>
  );
  return (
    <Portal>
      <div className={cx('lg-modal-root', visible && 'lg-open', centered && 'lg-modal-centered')}>
        <div className="lg-mask" onClick={maskClosable ? onClose : undefined} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cx('lg-modal lg-glass lg-glass-strong', className)}
          style={{ width }}
        >
          {(title || closable) && (
            <div className="lg-modal-header">
              <div id={titleId} className="lg-modal-title">{title}</div>
              {closable && (
                <button type="button" aria-label="Close" className="lg-close-btn" onClick={onClose}>
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="lg-modal-body">{children}</div>
          {footer !== null && <div className="lg-modal-footer">{footer ?? defaultFooter}</div>}
        </div>
      </div>
    </Portal>
  );
};

/* ───────── Drawer / Sheet ───────── */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: number | string;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  closable?: boolean;
  maskClosable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, title, placement = 'right', size, footer, extra, closable = true, maskClosable = true, children, className }) => {
  const { mounted, visible } = usePresence(open, 340);
  const ref = React.useRef<HTMLDivElement>(null);
  useEscape(() => onClose?.(), open);
  useScrollLock(open);
  useFocusTrap(ref, open);
  if (!mounted) return null;
  const horizontal = placement === 'left' || placement === 'right';
  const dim = size ?? (horizontal ? 380 : 320);
  return (
    <Portal>
      <div className={cx('lg-drawer-root', visible && 'lg-open')}>
        <div className="lg-mask" onClick={maskClosable ? onClose : undefined} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cx('lg-drawer lg-glass lg-glass-strong', `lg-drawer-${placement}`, className)}
          style={horizontal ? { width: dim } : { height: dim }}
        >
          {placement === 'bottom' && <span className="lg-drawer-grabber" />}
          {(title || closable || extra) && (
            <div className="lg-drawer-header">
              <div className="lg-drawer-title">{title}</div>
              {extra}
              {closable && (
                <button type="button" aria-label="Close" className="lg-close-btn" onClick={onClose}>
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="lg-drawer-body">{children}</div>
          {footer && <div className="lg-drawer-footer">{footer}</div>}
        </div>
      </div>
    </Portal>
  );
};

/* ───────── Result ───────── */
export interface ResultProps {
  status?: Kind | '404' | '403' | '500';
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
export const Result: React.FC<ResultProps> = ({ status = 'info', title, subTitle, icon, extra, className, children }) => {
  const kind: Kind = status === '404' || status === '403' ? 'warning' : status === '500' ? 'error' : status;
  return (
    <div className={cx('lg-result', `lg-result-${kind}`, className)}>
      <div className="lg-result-icon lg-glass">{icon ?? (/^\d+$/.test(status) ? <span className="lg-result-code">{status}</span> : statusIcon[kind])}</div>
      <div className="lg-result-title">{title}</div>
      {subTitle && <div className="lg-result-subtitle">{subTitle}</div>}
      {children && <div className="lg-result-content">{children}</div>}
      {extra && <div className="lg-result-extra">{extra}</div>}
    </div>
  );
};

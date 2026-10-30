import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { cx } from '../utils';
import { ConfigBridge, globalConfig, useLocale } from './ConfigProvider';
import { statusIcon } from './Feedback';
import { CloseIcon, LoadingIcon } from '../icons';

type Kind = 'success' | 'info' | 'warning' | 'error' | 'loading';
type Placement = 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomRight' | 'bottomLeft';

interface ToastEntry {
  id: number;
  channel: 'message' | 'notification';
  kind: Kind;
  title?: React.ReactNode;
  content: React.ReactNode;
  duration: number;
  closable?: boolean;
  placement: Placement;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  leaving?: boolean;
  onClose?: () => void;
}

let entries: ToastEntry[] = [];
let seed = 0;
let root: Root | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function ensureRoot() {
  if (root || typeof document === 'undefined') return;
  const el = document.createElement('div');
  el.setAttribute('data-lg-toasts', '');
  document.body.appendChild(el);
  root = createRoot(el);
  root.render(<ToastHost />);
}

function remove(id: number) {
  const e = entries.find((x) => x.id === id);
  if (!e || e.leaving) return;
  entries = entries.map((x) => (x.id === id ? { ...x, leaving: true } : x));
  emit();
  e.onClose?.();
  setTimeout(() => {
    entries = entries.filter((x) => x.id !== id);
    emit();
  }, 280);
}

function push(e: Omit<ToastEntry, 'id'>) {
  ensureRoot();
  const id = ++seed;
  entries = [...entries, { ...e, id }];
  emit();
  if (e.duration > 0) setTimeout(() => remove(id), e.duration * 1000);
  return () => remove(id);
}

const ToastItem: React.FC<{ e: ToastEntry }> = ({ e }) => {
  const t = useLocale();
  const icon = e.icon ?? (e.kind === 'loading' ? <LoadingIcon spin /> : statusIcon[e.kind]);
  if (e.channel === 'message')
    return (
      <div className={cx('lg-message lg-glass lg-glass-strong', `lg-toast-${e.kind}`, e.leaving && 'lg-out')} role="status">
        <span className="lg-toast-icon">{icon}</span>
        <span>{e.content}</span>
      </div>
    );
  return (
    <div className={cx('lg-notification lg-glass lg-glass-strong', `lg-toast-${e.kind}`, e.leaving && 'lg-out')} role="alert">
      <span className="lg-toast-icon">{icon}</span>
      <div className="lg-notification-main">
        {e.title && <div className="lg-notification-title">{e.title}</div>}
        {e.content && <div className="lg-notification-desc">{e.content}</div>}
        {e.btn && <div className="lg-notification-btn">{e.btn}</div>}
      </div>
      {e.closable !== false && (
        <button type="button" aria-label={t.close} className="lg-close-btn" onClick={() => remove(e.id)}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

const PLACEMENTS: Placement[] = ['top', 'topRight', 'topLeft', 'bottom', 'bottomRight', 'bottomLeft'];

const ToastHost: React.FC = () => {
  const [, force] = React.useReducer((x: number) => x + 1, 0);
  React.useEffect(() => {
    listeners.add(force);
    return () => {
      listeners.delete(force);
    };
  }, []);
  const { theme, vars } = globalConfig.current;
  return (
    <ConfigBridge>
    <div className="lg-root lg-portal" data-lg-theme={theme} style={vars}>
      {PLACEMENTS.map((p) => {
        const list = entries.filter((e) => e.placement === p);
        if (!list.length) return null;
        return (
          <div key={p} className={cx('lg-toast-stack', `lg-toast-${p}`)}>
            {(p.startsWith('bottom') ? [...list].reverse() : list).map((e) => (
              <ToastItem key={e.id} e={e} />
            ))}
          </div>
        );
      })}
    </div>
    </ConfigBridge>
  );
};

/* ───────── message API ───────── */
export interface MessageOptions {
  content: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
}
type MessageFn = (content: React.ReactNode | MessageOptions, duration?: number) => () => void;
const mk =
  (kind: Kind): MessageFn =>
  (c, duration) => {
    const o: MessageOptions = c && typeof c === 'object' && 'content' in (c as object) ? (c as MessageOptions) : { content: c as React.ReactNode };
    return push({ channel: 'message', kind, content: o.content, icon: o.icon, onClose: o.onClose, duration: o.duration ?? duration ?? (kind === 'loading' ? 0 : 3), placement: 'top' });
  };

/** Global lightweight toast: `message.success('Saved')`. Returns a function that closes it. */
export const message = {
  info: mk('info'),
  success: mk('success'),
  warning: mk('warning'),
  error: mk('error'),
  loading: mk('loading'),
  destroy: () => entries.filter((e) => e.channel === 'message').forEach((e) => remove(e.id)),
};

/* ───────── notification API ───────── */
export interface NotificationOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  placement?: Placement;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}
const nk = (kind: Kind) => (o: NotificationOptions) =>
  push({
    channel: 'notification',
    kind,
    title: o.title,
    content: o.description,
    icon: o.icon,
    btn: o.btn,
    closable: o.closable,
    onClose: o.onClose,
    duration: o.duration ?? 4.5,
    placement: o.placement ?? 'topRight',
  });

/** Rich toast with title/description: `notification.success({ title, description })`. */
export const notification = {
  open: nk('info'),
  info: nk('info'),
  success: nk('success'),
  warning: nk('warning'),
  error: nk('error'),
  destroy: () => entries.filter((e) => e.channel === 'notification').forEach((e) => remove(e.id)),
};

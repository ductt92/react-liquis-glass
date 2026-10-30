import * as React from 'react';
import { cx } from '../utils';
import { useLocale } from './ConfigProvider';
import { Popup, type Placement, type Trigger } from './Popup';
import { Button } from './Button';
import { WarningFilledIcon } from '../icons';
import type { MenuItem } from './Navigation';

/* ───────── Tooltip ───────── */
export interface TooltipProps {
  title: React.ReactNode;
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}
export const Tooltip: React.FC<TooltipProps> = ({ title, placement = 'top', trigger = ['hover', 'focus'], children, className, ...rest }) => (
  <Popup
    content={title ? <div className={cx('lg-tooltip lg-glass lg-glass-strong', className)}>{title}</div> : null}
    placement={placement}
    trigger={trigger}
    role="tooltip"
    offset={8}
    {...rest}
  >
    {children}
  </Popup>
);

/* ───────── Popover ───────── */
export interface PopoverProps {
  title?: React.ReactNode;
  content: React.ReactNode | ((close: () => void) => React.ReactNode);
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactElement;
  className?: string;
  width?: number | string;
}
export const Popover: React.FC<PopoverProps> = ({ title, content, placement = 'bottom', trigger = 'click', children, className, width, open, onOpenChange }) => {
  const [inner, setInner] = React.useState(false);
  const isOpen = open ?? inner;
  const set = (v: boolean) => {
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  };
  return (
    <Popup
      open={isOpen}
      onOpenChange={set}
      placement={placement}
      trigger={trigger}
      role="dialog"
      content={
        <div className={cx('lg-popover lg-glass lg-glass-strong', className)} style={{ width }}>
          {title && <div className="lg-popover-title">{title}</div>}
          <div className="lg-popover-content">{typeof content === 'function' ? content(() => set(false)) : content}</div>
        </div>
      }
    >
      {children}
    </Popup>
  );
};

/* ───────── Popconfirm ───────── */
export interface PopconfirmProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void | Promise<unknown>;
  onCancel?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okDanger?: boolean;
  icon?: React.ReactNode;
  placement?: Placement;
  children: React.ReactElement;
}
export const Popconfirm: React.FC<PopconfirmProps> = ({ title, description, onConfirm, onCancel, okText, cancelText, okDanger, icon, placement = 'top', children }) => {
  const t = useLocale();
  const [loading, setLoading] = React.useState(false);
  return (
    <Popover
      placement={placement}
      content={(close) => (
        <div className="lg-popconfirm">
          <div className="lg-popconfirm-body">
            <span className="lg-popconfirm-icon">{icon ?? <WarningFilledIcon />}</span>
            <div>
              <div className="lg-popconfirm-title">{title}</div>
              {description && <div className="lg-popconfirm-desc">{description}</div>}
            </div>
          </div>
          <div className="lg-popconfirm-actions">
            <Button
              size="sm"
              variant="text"
              onClick={() => {
                onCancel?.();
                close();
              }}
            >
              {cancelText ?? t.cancel}
            </Button>
            <Button
              size="sm"
              variant="filled"
              color={okDanger ? 'danger' : 'primary'}
              loading={loading}
              onClick={async () => {
                const r = onConfirm?.();
                if (r && typeof (r as Promise<unknown>).then === 'function') {
                  setLoading(true);
                  try {
                    await r;
                  } finally {
                    setLoading(false);
                  }
                }
                close();
              }}
            >
              {okText ?? t.ok}
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </Popover>
  );
};

/* ───────── Dropdown ───────── */
export interface DropdownProps {
  items: MenuItem[];
  onSelect?: (key: string, item: MenuItem) => void;
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  children: React.ReactElement;
  disabled?: boolean;
  className?: string;
}
export const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, placement = 'bottomLeft', trigger = 'click', children, disabled, className }) => {
  const [open, setOpen] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    if (open) setTimeout(() => listRef.current?.querySelector<HTMLElement>('[role=menuitem]:not(:disabled)')?.focus(), 40);
  }, [open]);
  const onKey = (e: React.KeyboardEvent) => {
    const els = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role=menuitem]:not(:disabled)') ?? []);
    const i = els.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown') (e.preventDefault(), els[(i + 1) % els.length]?.focus());
    if (e.key === 'ArrowUp') (e.preventDefault(), els[(i - 1 + els.length) % els.length]?.focus());
  };
  const renderItems = (list: MenuItem[]): React.ReactNode =>
    list.map((it, i) =>
      it.type === 'divider' ? (
        <li key={`d${i}`} role="separator" className="lg-menu-divider" />
      ) : it.type === 'group' ? (
        <li key={it.key} role="presentation">
          <div className="lg-menu-group-title">{it.label}</div>
          <ul role="group">{renderItems(it.children ?? [])}</ul>
        </li>
      ) : (
        <li key={it.key} role="none">
          <button
            type="button"
            role="menuitem"
            disabled={it.disabled}
            className={cx('lg-menu-item', it.danger && 'lg-danger')}
            onClick={() => {
              onSelect?.(it.key, it);
              setOpen(false);
            }}
          >
            {it.icon && <span className="lg-menu-icon">{it.icon}</span>}
            <span className="lg-menu-label">{it.label}</span>
            {it.extra && <span className="lg-menu-extra">{it.extra}</span>}
          </button>
        </li>
      ),
    );
  return (
    <Popup
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
      placement={placement}
      trigger={trigger}
      role="menu"
      content={
        <ul ref={listRef} className={cx('lg-dropdown lg-menu lg-menu-vertical lg-glass lg-glass-strong', className)} onKeyDown={onKey}>
          {renderItems(items)}
        </ul>
      }
    >
      {children}
    </Popup>
  );
};

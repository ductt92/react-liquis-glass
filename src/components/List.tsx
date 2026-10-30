import * as React from 'react';
import { cx } from '../utils';
import { ChevronDownIcon, ChevronRightIcon } from '../icons';
import { Empty } from './Display';

/* ───────── List ───────── */
export interface ListProps<T> {
  dataSource?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  /** iOS "inset grouped" style glass list. */
  inset?: boolean;
  size?: 'sm' | 'md';
  emptyText?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function List<T>({ dataSource, renderItem, header, footer, bordered, inset = true, size = 'md', emptyText, className, children }: ListProps<T>) {
  const items = dataSource && renderItem ? dataSource.map((d, i) => <React.Fragment key={i}>{renderItem(d, i)}</React.Fragment>) : children;
  const empty = dataSource && dataSource.length === 0;
  return (
    <div className={cx('lg-list', `lg-list-${size}`, inset && 'lg-glass lg-list-inset', bordered && 'lg-list-bordered', className)}>
      {header && <div className="lg-list-header">{header}</div>}
      {empty ? <div className="lg-list-empty">{emptyText ?? <Empty />}</div> : <ul className="lg-list-items">{items}</ul>}
      {footer && <div className="lg-list-footer">{footer}</div>}
    </div>
  );
}

export interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title' | 'prefix'> {
  prefix?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  /** Show a chevron and hover state. */
  clickable?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ prefix, title, description, extra, actions, clickable, className, children, onClick, ...rest }) => (
  <li
    className={cx('lg-list-item', (clickable || onClick) && 'lg-list-item-clickable', className)}
    onClick={onClick}
    tabIndex={clickable || onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e as unknown as React.MouseEvent<HTMLLIElement>) : undefined}
    {...rest}
  >
    {prefix && <span className="lg-list-item-prefix">{prefix}</span>}
    <div className="lg-list-item-main">
      {title && <div className="lg-list-item-title">{title}</div>}
      {description && <div className="lg-list-item-desc">{description}</div>}
      {children}
    </div>
    {extra && <span className="lg-list-item-extra">{extra}</span>}
    {actions && <span className="lg-list-item-actions">{actions}</span>}
    {clickable && <ChevronRightIcon className="lg-list-item-chevron" />}
  </li>
);

/* ───────── Collapse / Accordion ───────── */
export interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
  disabled?: boolean;
}

export interface CollapseProps {
  items: CollapseItem[];
  activeKey?: string[];
  defaultActiveKey?: string[];
  onChange?: (keys: string[]) => void;
  /** Only one panel open at a time. */
  accordion?: boolean;
  /** Separate glass cards instead of one grouped card. */
  separated?: boolean;
  className?: string;
}

export const Collapse: React.FC<CollapseProps> = ({ items, activeKey, defaultActiveKey = [], onChange, accordion, separated, className }) => {
  const [inner, setInner] = React.useState(defaultActiveKey);
  const active = activeKey ?? inner;
  const toggle = (k: string) => {
    const next = active.includes(k) ? active.filter((x) => x !== k) : accordion ? [k] : [...active, k];
    if (!activeKey) setInner(next);
    onChange?.(next);
  };
  return (
    <div className={cx('lg-collapse', separated ? 'lg-collapse-separated' : 'lg-glass', className)}>
      {items.map((it) => {
        const open = active.includes(it.key);
        return (
          <div key={it.key} className={cx('lg-collapse-item', open && 'lg-open', separated && 'lg-glass', it.disabled && 'lg-disabled')}>
            <button
              type="button"
              className="lg-collapse-header"
              aria-expanded={open}
              disabled={it.disabled}
              onClick={() => toggle(it.key)}
            >
              <ChevronDownIcon className="lg-collapse-arrow" />
              <span className="lg-collapse-label">{it.label}</span>
              {it.extra && <span className="lg-collapse-extra" onClick={(e) => e.stopPropagation()}>{it.extra}</span>}
            </button>
            <div className="lg-collapse-panel" role="region" aria-hidden={!open}>
              <div className="lg-collapse-panel-inner">
                <div className="lg-collapse-body">{it.children}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

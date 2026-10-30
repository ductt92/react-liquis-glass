import * as React from 'react';
import { cx, useControlled, type Size } from '../utils';
import { useLocale } from './ConfigProvider';
import { CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, CloseIcon, MoreHorizontalIcon } from '../icons';

/* ───────── Tabs ───────── */
export interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  onClose?: (key: string) => void;
  /** `line` = underline indicator, `pill` = glass capsule indicator, `card` = card tabs. */
  variant?: 'line' | 'pill' | 'card';
  size?: Size;
  centered?: boolean;
  tabBarExtra?: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeKey, defaultActiveKey, onChange, onClose, variant = 'line', size = 'md', centered, tabBarExtra, className }) => {
  const t = useLocale();
  const [active, setActive] = useControlled(activeKey, defaultActiveKey ?? items[0]?.key, onChange);
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = React.useState<{ left: number; width: number } | null>(null);
  React.useLayoutEffect(() => {
    const el = refs.current[active];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, items, variant, size]);
  const onKey = (e: React.KeyboardEvent) => {
    const enabled = items.filter((i) => !i.disabled);
    const idx = enabled.findIndex((i) => i.key === active);
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = enabled[(idx + d + enabled.length) % enabled.length];
    setActive(next.key);
    refs.current[next.key]?.focus();
  };
  const current = items.find((i) => i.key === active);
  return (
    <div className={cx('lg-tabs', `lg-tabs-${variant}`, `lg-tabs-${size}`, className)}>
      <div className={cx('lg-tabs-bar', variant !== 'line' && 'lg-glass', centered && 'lg-tabs-centered')}>
        <div role="tablist" className="lg-tabs-list" onKeyDown={onKey}>
          {ind && variant !== 'card' && <span className="lg-tabs-indicator" style={{ transform: `translateX(${ind.left}px)`, width: ind.width }} />}
          {items.map((it) => (
            <button
              key={it.key}
              ref={(n) => {
                refs.current[it.key] = n;
              }}
              role="tab"
              type="button"
              aria-selected={it.key === active}
              tabIndex={it.key === active ? 0 : -1}
              disabled={it.disabled}
              className={cx('lg-tab', it.key === active && 'lg-active')}
              onClick={() => setActive(it.key)}
            >
              {it.icon}
              {it.label}
              {it.closable && (
                <span
                  role="button"
                  aria-label={t.closeTab}
                  className="lg-tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.(it.key);
                  }}
                >
                  <CloseIcon />
                </span>
              )}
            </button>
          ))}
        </div>
        {tabBarExtra && <div className="lg-tabs-extra">{tabBarExtra}</div>}
      </div>
      {current?.children != null && (
        <div role="tabpanel" className="lg-tabs-panel" key={active}>
          {current.children}
        </div>
      )}
    </div>
  );
};

/* ───────── Breadcrumb ───────── */
export interface BreadcrumbItem {
  title: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}
export const Breadcrumb: React.FC<{ items: BreadcrumbItem[]; separator?: React.ReactNode; className?: string }> = ({ items, separator = <ChevronRightIcon />, className }) => {
  const t = useLocale();
  return (
  <nav aria-label={t.breadcrumb} className={cx('lg-breadcrumb', className)}>
    <ol>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const content = (
          <>
            {it.icon}
            {it.title}
          </>
        );
        return (
          <li key={i}>
            {last ? (
              <span aria-current="page" className="lg-breadcrumb-current">{content}</span>
            ) : it.href || it.onClick ? (
              <a href={it.href} onClick={it.onClick} className="lg-breadcrumb-link">{content}</a>
            ) : (
              <span>{content}</span>
            )}
            {!last && <span className="lg-breadcrumb-sep" aria-hidden>{separator}</span>}
          </li>
        );
      })}
    </ol>
  </nav>
  );
};

/* ───────── Pagination ───────── */
export interface PaginationProps {
  total: number;
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  siblingCount?: number;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  simple?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

function pageRange(current: number, totalPages: number, sib: number): (number | 'prev' | 'next')[] {
  const totalNumbers = sib * 2 + 5;
  if (totalPages <= totalNumbers) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const left = Math.max(current - sib, 2);
  const right = Math.min(current + sib, totalPages - 1);
  const out: (number | 'prev' | 'next')[] = [1];
  if (left > 2) out.push('prev');
  else for (let i = 2; i < left; i++) out.push(i);
  for (let i = left; i <= right; i++) out.push(i);
  if (right < totalPages - 1) out.push('next');
  else for (let i = right + 1; i < totalPages; i++) out.push(i);
  out.push(totalPages);
  return out;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current, defaultCurrent = 1, pageSize = 10, onChange, siblingCount = 1, showTotal, simple, disabled, size = 'md', className }) => {
  const t = useLocale();
  const [page, setPage] = useControlled(current, defaultCurrent);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (p: number) => {
    const n = Math.min(pages, Math.max(1, p));
    if (n === page || disabled) return;
    setPage(n);
    onChange?.(n, pageSize);
  };
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  return (
    <nav aria-label={t.pagination} className={cx('lg-pagination', `lg-pagination-${size}`, disabled && 'lg-disabled', className)}>
      {showTotal && <span className="lg-pagination-total">{showTotal(total, [start, Math.min(total, page * pageSize)])}</span>}
      <button type="button" className="lg-page-btn" aria-label={t.prevPage} disabled={page <= 1 || disabled} onClick={() => go(page - 1)}>
        <ChevronLeftIcon />
      </button>
      {simple ? (
        <span className="lg-pagination-simple">
          {page} / {pages}
        </span>
      ) : (
        pageRange(page, pages, siblingCount).map((p, i) =>
          typeof p === 'number' ? (
            <button
              key={p}
              type="button"
              aria-current={p === page ? 'page' : undefined}
              className={cx('lg-page-btn', p === page && 'lg-active lg-glass')}
              disabled={disabled}
              onClick={() => go(p)}
            >
              {p}
            </button>
          ) : (
            <button
              key={`${p}-${i}`}
              type="button"
              className="lg-page-btn lg-page-jump"
              aria-label={p === 'prev' ? t.prevPages : t.nextPages}
              disabled={disabled}
              onClick={() => go(p === 'prev' ? page - 5 : page + 5)}
            >
              <MoreHorizontalIcon className="lg-page-dots" />
              {p === 'prev' ? <ChevronsLeftIcon className="lg-page-jump-icon" /> : <ChevronsRightIcon className="lg-page-jump-icon" />}
            </button>
          ),
        )
      )}
      <button type="button" className="lg-page-btn" aria-label={t.nextPage} disabled={page >= pages || disabled} onClick={() => go(page + 1)}>
        <ChevronRightIcon />
      </button>
    </nav>
  );
};

/* ───────── Steps ───────── */
export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
}
export interface StepsProps {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md';
  onChange?: (index: number) => void;
  className?: string;
}
export const Steps: React.FC<StepsProps> = ({ items, current = 0, direction = 'horizontal', size = 'md', onChange, className }) => (
  <ol className={cx('lg-steps', `lg-steps-${direction}`, `lg-steps-${size}`, onChange && 'lg-steps-clickable', className)}>
    {items.map((it, i) => {
      const status = it.status ?? (i < current ? 'finish' : i === current ? 'process' : 'wait');
      return (
        <li
          key={i}
          className={cx('lg-step', `lg-step-${status}`)}
          aria-current={i === current ? 'step' : undefined}
          onClick={onChange ? () => onChange(i) : undefined}
        >
          <span className={cx('lg-step-icon', (status === 'process' || status === 'finish') && 'lg-glass')}>
            {it.icon ?? (status === 'finish' ? <CheckIcon /> : status === 'error' ? <CloseIcon /> : i + 1)}
          </span>
          <div className="lg-step-content">
            <div className="lg-step-title">{it.title}</div>
            {it.description && <div className="lg-step-desc">{it.description}</div>}
          </div>
          {i < items.length - 1 && <span className="lg-step-tail" />}
        </li>
      );
    })}
  </ol>
);

/* ───────── Menu ───────── */
export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  extra?: React.ReactNode;
  children?: MenuItem[];
  /** Renders as a group title instead of a clickable item. */
  type?: 'group' | 'divider';
}

export interface MenuProps {
  items: MenuItem[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelect?: (key: string, item: MenuItem) => void;
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenChange?: (keys: string[]) => void;
  mode?: 'vertical' | 'horizontal';
  /** Icon-only rail. */
  collapsed?: boolean;
  className?: string;
  glass?: boolean;
}

export const Menu: React.FC<MenuProps> = ({ items, selectedKey, defaultSelectedKey, onSelect, openKeys, defaultOpenKeys = [], onOpenChange, mode = 'vertical', collapsed, className, glass = true }) => {
  const [sel, setSel] = useControlled<string | undefined>(selectedKey, defaultSelectedKey);
  const [open, setOpen] = useControlled(openKeys, defaultOpenKeys, onOpenChange);
  const render = (list: MenuItem[], depth: number): React.ReactNode =>
    list.map((it, i) => {
      if (it.type === 'divider') return <li key={`d${i}`} role="separator" className="lg-menu-divider" />;
      if (it.type === 'group')
        return (
          <li key={it.key} className="lg-menu-group" role="presentation">
            {!collapsed && <div className="lg-menu-group-title">{it.label}</div>}
            <ul role="group">{render(it.children ?? [], depth)}</ul>
          </li>
        );
      const hasChildren = !!it.children?.length;
      const isOpen = open.includes(it.key);
      const childSelected = hasChildren && JSON.stringify(it.children).includes(`"key":"${sel}"`);
      return (
        <li key={it.key} role="none" className={cx('lg-menu-li', hasChildren && 'lg-menu-submenu', isOpen && 'lg-open')}>
          <button
            type="button"
            role="menuitem"
            title={collapsed && typeof it.label === 'string' ? it.label : undefined}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-current={sel === it.key ? 'page' : undefined}
            disabled={it.disabled}
            className={cx('lg-menu-item', (sel === it.key || childSelected) && 'lg-selected', it.danger && 'lg-danger')}
            style={mode === 'vertical' && !collapsed ? { paddingLeft: 12 + depth * 18 } : undefined}
            onClick={() => {
              if (hasChildren) setOpen(isOpen ? open.filter((k) => k !== it.key) : [...open, it.key]);
              else {
                setSel(it.key);
                onSelect?.(it.key, it);
              }
            }}
          >
            {it.icon && <span className="lg-menu-icon">{it.icon}</span>}
            {!collapsed && <span className="lg-menu-label">{it.label}</span>}
            {!collapsed && it.extra && <span className="lg-menu-extra">{it.extra}</span>}
            {!collapsed && hasChildren && <ChevronDownIcon className="lg-menu-arrow" />}
          </button>
          {hasChildren && !collapsed && (
            <div className="lg-menu-sub">
              <ul role="menu" className="lg-menu-sub-inner">
                {render(it.children!, depth + 1)}
              </ul>
            </div>
          )}
        </li>
      );
    });
  return (
    <ul role="menu" className={cx('lg-menu', `lg-menu-${mode}`, collapsed && 'lg-menu-collapsed', glass && 'lg-glass', className)}>
      {render(items, 0)}
    </ul>
  );
};

/* ───────── NavBar (app header) ───────── */
export interface NavBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  logo?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  sticky?: boolean;
  /** Floating capsule style (Apple Liquid Glass toolbar look). */
  floating?: boolean;
}
export const NavBar: React.FC<NavBarProps> = ({ title, logo, left, right, sticky, floating, className, children, ...rest }) => (
  <header className={cx('lg-navbar lg-glass', sticky && 'lg-navbar-sticky', floating && 'lg-navbar-floating', className)} {...rest}>
    <div className="lg-navbar-left">
      {left}
      {logo}
      {title && <div className="lg-navbar-title">{title}</div>}
    </div>
    <div className="lg-navbar-center">{children}</div>
    <div className="lg-navbar-right">{right}</div>
  </header>
);

/* ───────── TabBar (iOS bottom bar) ───────── */
export interface TabBarItem {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}
export interface TabBarProps {
  items: TabBarItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  fixed?: boolean;
  className?: string;
}
export const TabBar: React.FC<TabBarProps> = ({ items, activeKey, defaultActiveKey, onChange, fixed, className }) => {
  const [active, setActive] = useControlled(activeKey, defaultActiveKey ?? items[0]?.key, onChange);
  const idx = Math.max(0, items.findIndex((i) => i.key === active));
  return (
    <nav className={cx('lg-tabbar lg-glass', fixed && 'lg-tabbar-fixed', className)} style={{ ['--lg-tabbar-n' as string]: items.length, ['--lg-tabbar-i' as string]: idx }}>
      <span className="lg-tabbar-thumb" />
      {items.map((it) => (
        <button key={it.key} type="button" className={cx('lg-tabbar-item', it.key === active && 'lg-active')} aria-current={it.key === active ? 'page' : undefined} onClick={() => setActive(it.key)}>
          <span className="lg-tabbar-icon">
            {it.icon}
            {it.badge != null && <span className="lg-tabbar-badge">{it.badge}</span>}
          </span>
          <span className="lg-tabbar-label">{it.label}</span>
        </button>
      ))}
    </nav>
  );
};

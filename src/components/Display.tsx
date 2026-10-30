import * as React from 'react';
import { cx, type ColorName, type Size } from '../utils';
import { CloseIcon, InboxIcon, LoadingIcon, UserIcon } from '../icons';

/* ───────── Avatar ───────── */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: Size | number;
  shape?: 'circle' | 'square';
  icon?: React.ReactNode;
  /** Status dot. */
  status?: 'online' | 'busy' | 'away' | 'offline';
  color?: string;
}

const avatarPx = (s: AvatarProps['size']) => (typeof s === 'number' ? s : s === 'sm' ? 28 : s === 'lg' ? 52 : 40);
const PALETTE = ['#0a84ff', '#5e5ce6', '#bf5af2', '#ff375f', '#ff9f0a', '#30d158', '#64d2ff', '#ac8e68'];

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', shape = 'circle', icon, status, color, className, style, children, ...rest }) => {
  const [failed, setFailed] = React.useState(false);
  const px = avatarPx(size);
  const text = typeof children === 'string' ? children : '';
  const bg = color ?? (text ? PALETTE[[...text].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length] : undefined);
  return (
    <span
      className={cx('lg-avatar', `lg-avatar-${shape}`, className)}
      style={{ width: px, height: px, fontSize: px * 0.4, ...(bg && !(src && !failed) ? { ['--lg-avatar-bg' as string]: bg } : {}), ...style }}
      {...rest}
    >
      {src && !failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <span className="lg-avatar-content">{children ?? icon ?? <UserIcon />}</span>
      )}
      {status && <span className={cx('lg-avatar-status', `lg-avatar-status-${status}`)} />}
    </span>
  );
};

export const AvatarGroup: React.FC<{ max?: number; size?: AvatarProps['size']; children?: React.ReactNode; className?: string }> = ({ max, size, children, className }) => {
  const items = React.Children.toArray(children);
  const shown = max != null ? items.slice(0, max) : items;
  return (
    <span className={cx('lg-avatar-group', className)}>
      {shown.map((c) => (React.isValidElement(c) && size ? React.cloneElement(c as React.ReactElement<AvatarProps>, { size }) : c))}
      {max != null && items.length > max && <Avatar size={size} color="rgba(120,130,160,.55)">{`+${items.length - max}`}</Avatar>}
    </span>
  );
};

/* ───────── Badge ───────── */
export interface BadgeProps {
  count?: React.ReactNode;
  dot?: boolean;
  max?: number;
  showZero?: boolean;
  color?: ColorName | string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: React.ReactNode;
  offset?: [number, number];
  className?: string;
  children?: React.ReactNode;
}

const NAMED = ['primary', 'success', 'warning', 'danger', 'info', 'default'];
const colorVar = (c?: string) => (!c ? undefined : NAMED.includes(c) ? `var(--lg-${c === 'primary' ? 'accent' : c === 'default' ? 'text-3' : c})` : c);

export const Badge: React.FC<BadgeProps> = ({ count, dot, max = 99, showZero, color = 'danger', status, text, offset, className, children }) => {
  if (status)
    return (
      <span className={cx('lg-badge-status', className)}>
        <span className={cx('lg-badge-status-dot', `lg-badge-status-${status}`)} />
        {text && <span className="lg-badge-status-text">{text}</span>}
      </span>
    );
  const hidden = !dot && (count == null || (count === 0 && !showZero));
  const display = typeof count === 'number' && count > max ? `${max}+` : count;
  const sup = !hidden && (
    <sup
      className={cx('lg-badge-count', dot && 'lg-badge-dot', !children && 'lg-badge-standalone')}
      style={{ background: colorVar(color), ...(offset ? { transform: `translate(calc(50% + ${offset[0]}px), calc(-50% + ${offset[1]}px))` } : {}) }}
    >
      {!dot && display}
    </sup>
  );
  if (!children) return <span className={cx('lg-badge', className)}>{sup}</span>;
  return (
    <span className={cx('lg-badge', className)}>
      {children}
      {sup}
    </span>
  );
};

/* ───────── Tag / Chip ───────── */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: ColorName | string;
  variant?: 'tinted' | 'filled' | 'outline' | 'glass';
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
  /** Checkable chip. */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Tag: React.FC<TagProps> = ({ color = 'default', variant = 'tinted', icon, closable, onClose, size = 'md', checked, onCheckedChange, className, style, children, onClick, ...rest }) => {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  const checkable = checked !== undefined;
  return (
    <span
      className={cx(
        'lg-tag',
        `lg-tag-${variant}`,
        `lg-tag-${size}`,
        variant === 'glass' && 'lg-glass',
        checkable && 'lg-tag-checkable',
        checked && 'lg-tag-checked',
        className,
      )}
      style={{ ['--lg-c' as string]: colorVar(color), ...style }}
      role={checkable ? 'checkbox' : undefined}
      aria-checked={checkable ? checked : undefined}
      tabIndex={checkable ? 0 : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (checkable) onCheckedChange?.(!checked);
      }}
      {...rest}
    >
      {icon}
      {children}
      {closable && (
        <button
          type="button"
          aria-label="Remove"
          className="lg-tag-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
            if (!e.defaultPrevented) setVisible(false);
          }}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
};

/* ───────── Spin ───────── */
export interface SpinProps {
  spinning?: boolean;
  size?: Size;
  tip?: React.ReactNode;
  indicator?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const Spin: React.FC<SpinProps> = ({ spinning = true, size = 'md', tip, indicator, className, children }) => {
  const spinner = (
    <span className={cx('lg-spin', `lg-spin-${size}`, className)} role="status" aria-live="polite">
      {indicator ?? <span className="lg-spin-ring" />}
      {tip && <span className="lg-spin-tip">{tip}</span>}
    </span>
  );
  if (!children) return spinning ? spinner : null;
  return (
    <div className={cx('lg-spin-container', spinning && 'lg-spin-blur')}>
      {spinning && <div className="lg-spin-overlay">{spinner}</div>}
      <div className="lg-spin-content" aria-busy={spinning}>
        {children}
      </div>
    </div>
  );
};
export { LoadingIcon };

/* ───────── Empty ───────── */
export interface EmptyProps {
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export const Empty: React.FC<EmptyProps> = ({ image, description = 'No data', children, className }) => (
  <div className={cx('lg-empty', className)}>
    <div className="lg-empty-image lg-glass">{image ?? <InboxIcon />}</div>
    {description && <div className="lg-empty-description">{description}</div>}
    {children && <div className="lg-empty-footer">{children}</div>}
  </div>
);

/* ───────── Statistic ───────── */
export interface StatisticProps {
  title?: React.ReactNode;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Positive/negative trend indicator, e.g. "+12.5%". */
  trend?: { value: React.ReactNode; direction: 'up' | 'down' };
  groupSeparator?: string;
  valueStyle?: React.CSSProperties;
  className?: string;
}
export const Statistic: React.FC<StatisticProps> = ({ title, value, precision, prefix, suffix, trend, groupSeparator = ',', valueStyle, className }) => {
  let text = String(value);
  if (typeof value === 'number') {
    const fixed = precision != null ? value.toFixed(precision) : String(value);
    const [int, dec] = fixed.split('.');
    text = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator) + (dec ? `.${dec}` : '');
  }
  return (
    <div className={cx('lg-statistic', className)}>
      {title && <div className="lg-statistic-title">{title}</div>}
      <div className="lg-statistic-value" style={valueStyle}>
        {prefix && <span className="lg-statistic-prefix">{prefix}</span>}
        <span>{text}</span>
        {suffix && <span className="lg-statistic-suffix">{suffix}</span>}
      </div>
      {trend && <div className={cx('lg-statistic-trend', `lg-trend-${trend.direction}`)}>{trend.direction === 'up' ? '▲' : '▼'} {trend.value}</div>}
    </div>
  );
};

/* ───────── Timeline ───────── */
export interface TimelineItem {
  key?: React.Key;
  children: React.ReactNode;
  label?: React.ReactNode;
  color?: ColorName | string;
  dot?: React.ReactNode;
}
export const Timeline: React.FC<{ items: TimelineItem[]; pending?: React.ReactNode; className?: string }> = ({ items, pending, className }) => (
  <ul className={cx('lg-timeline', className)}>
    {items.map((it, i) => (
      <li key={it.key ?? i} className="lg-timeline-item" style={{ ['--lg-c' as string]: colorVar(it.color ?? 'primary') }}>
        <span className="lg-timeline-tail" />
        <span className={cx('lg-timeline-dot', it.dot && 'lg-timeline-dot-custom')}>{it.dot}</span>
        <div className="lg-timeline-content">
          {it.label && <div className="lg-timeline-label">{it.label}</div>}
          {it.children}
        </div>
      </li>
    ))}
    {pending && (
      <li className="lg-timeline-item lg-timeline-pending">
        <span className="lg-timeline-dot lg-timeline-dot-custom">
          <LoadingIcon spin />
        </span>
        <div className="lg-timeline-content">{pending}</div>
      </li>
    )}
  </ul>
);

/* ───────── Descriptions (key/value list) ───────── */
export interface DescriptionsProps {
  title?: React.ReactNode;
  items: { label: React.ReactNode; children: React.ReactNode; span?: number }[];
  column?: number;
  bordered?: boolean;
  className?: string;
}
export const Descriptions: React.FC<DescriptionsProps> = ({ title, items, column = 3, bordered, className }) => (
  <div className={cx('lg-descriptions', bordered && 'lg-descriptions-bordered lg-glass', className)}>
    {title && <div className="lg-descriptions-title">{title}</div>}
    <dl className="lg-descriptions-grid" style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}>
      {items.map((it, i) => (
        <div key={i} className="lg-descriptions-item" style={{ gridColumn: it.span ? `span ${Math.min(it.span, column)}` : undefined }}>
          <dt>{it.label}</dt>
          <dd>{it.children}</dd>
        </div>
      ))}
    </dl>
  </div>
);

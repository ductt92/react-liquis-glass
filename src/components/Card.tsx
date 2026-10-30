import * as React from 'react';
import { cx } from '../utils';
import { Skeleton } from './Skeleton';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  hoverable?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md';
  /** `glass` (default), `strong` (more opaque), `plain` (no glass). */
  variant?: 'glass' | 'strong' | 'plain';
  bodyStyle?: React.CSSProperties;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, subtitle, extra, cover, actions, hoverable, loading, size = 'md', variant = 'glass', bodyStyle, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'lg-card',
        `lg-card-${size}`,
        variant !== 'plain' && 'lg-glass',
        variant === 'strong' && 'lg-glass-strong',
        variant === 'plain' && 'lg-card-plain',
        hoverable && 'lg-card-hoverable',
        className,
      )}
      {...rest}
    >
      {cover && <div className="lg-card-cover">{cover}</div>}
      {(title || extra) && (
        <div className="lg-card-head">
          <div className="lg-card-head-main">
            {title && <div className="lg-card-title">{title}</div>}
            {subtitle && <div className="lg-card-subtitle">{subtitle}</div>}
          </div>
          {extra && <div className="lg-card-extra">{extra}</div>}
        </div>
      )}
      <div className="lg-card-body" style={bodyStyle}>
        {loading ? <Skeleton active paragraph={{ rows: 3 }} /> : children}
      </div>
      {actions && actions.length > 0 && (
        <ul className="lg-card-actions">
          {actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  );
});

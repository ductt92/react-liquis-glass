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
  /** Root element, e.g. `section`, `article`, `form` or `li`. Default `div`. */
  as?: React.ElementType;
  /**
   * Render children straight inside the card, with no `.lg-card-body` wrapper or its padding,
   * so layout classes and styles on the card (flex, grid, gap) apply to them. Title, cover and
   * actions are ignored.
   */
  bare?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, subtitle, extra, cover, actions, hoverable, loading, size = 'md', variant = 'glass', bodyStyle, as: Root = 'div', bare, className, children, ...rest },
  ref,
) {
  const classes = cx(
    'lg-card',
    `lg-card-${size}`,
    variant !== 'plain' && 'lg-glass',
    variant === 'strong' && 'lg-glass-strong',
    variant === 'plain' && 'lg-card-plain',
    hoverable && 'lg-card-hoverable',
    bare && 'lg-card-bare',
    className,
  );
  if (bare)
    return (
      <Root ref={ref} className={classes} {...rest}>
        {loading ? <Skeleton active paragraph={{ rows: 3 }} /> : children}
      </Root>
    );
  return (
    <Root ref={ref} className={classes} {...rest}>
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
    </Root>
  );
});

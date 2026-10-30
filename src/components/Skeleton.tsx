import * as React from 'react';
import { cx } from '../utils';

export interface SkeletonProps {
  active?: boolean;
  avatar?: boolean | { size?: number; shape?: 'circle' | 'square' };
  title?: boolean;
  paragraph?: boolean | { rows?: number; width?: (number | string)[] };
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> & {
  Block: React.FC<{ width?: number | string; height?: number | string; radius?: number | string; active?: boolean; className?: string }>;
} = ({ active = true, avatar, title = true, paragraph = true, loading = true, className, children }) => {
  if (!loading) return <>{children}</>;
  const rows = typeof paragraph === 'object' ? paragraph.rows ?? 3 : 3;
  const widths = typeof paragraph === 'object' ? paragraph.width : undefined;
  const av = typeof avatar === 'object' ? avatar : {};
  return (
    <div className={cx('lg-skeleton', active && 'lg-skeleton-active', className)} aria-busy="true">
      {avatar && (
        <span
          className="lg-skeleton-item"
          style={{ width: av.size ?? 40, height: av.size ?? 40, borderRadius: av.shape === 'square' ? 10 : '50%', flexShrink: 0 }}
        />
      )}
      <div className="lg-skeleton-content">
        {title && <span className="lg-skeleton-item lg-skeleton-title" />}
        {paragraph &&
          Array.from({ length: rows }, (_, i) => (
            <span key={i} className="lg-skeleton-item lg-skeleton-line" style={{ width: widths?.[i] ?? (i === rows - 1 && rows > 1 ? '60%' : '100%') }} />
          ))}
      </div>
    </div>
  );
};

Skeleton.Block = ({ width = '100%', height = 16, radius = 8, active = true, className }) => (
  <span className={cx('lg-skeleton-item', active && 'lg-skeleton-active', className)} style={{ display: 'block', width, height, borderRadius: radius }} />
);

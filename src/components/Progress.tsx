import * as React from 'react';
import { cx, useId } from '../utils';
import { CheckIcon, CloseIcon } from '../icons';

export interface ProgressProps {
  percent: number;
  type?: 'line' | 'circle' | 'dashboard';
  status?: 'normal' | 'active' | 'success' | 'exception';
  size?: 'sm' | 'md' | 'lg' | number;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  /** Color or [from, to] gradient. */
  strokeColor?: string | [string, string];
  steps?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible name, e.g. "Upload progress". */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const statusColor = (s?: ProgressProps['status']) =>
  s === 'success' ? 'var(--lg-success)' : s === 'exception' ? 'var(--lg-danger)' : 'var(--lg-accent)';

export const Progress: React.FC<ProgressProps> = ({ percent, type = 'line', status: statusProp, size = 'md', showInfo = true, format, strokeColor, steps, className, style, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby }) => {
  const gradId = useId('lg-grad');
  const p = Math.max(0, Math.min(100, percent));
  const a11y = { role: 'progressbar', 'aria-valuenow': p, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby } as const;
  const status = statusProp ?? (p >= 100 ? 'success' : 'normal');
  const color = Array.isArray(strokeColor)
    ? `linear-gradient(90deg, ${strokeColor[0]}, ${strokeColor[1]})`
    : strokeColor ?? statusColor(status);
  const info =
    format?.(p) ??
    (status === 'success' && type === 'line' ? <CheckIcon /> : status === 'exception' ? <CloseIcon /> : `${Math.round(p)}%`);

  if (type === 'line') {
    const h = typeof size === 'number' ? size : size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
    return (
      <div className={cx('lg-progress lg-progress-line', `lg-progress-${status}`, className)} style={style} {...a11y}>
        {steps ? (
          <div className="lg-progress-steps">
            {Array.from({ length: steps }, (_, i) => (
              <span key={i} className="lg-progress-step" style={{ height: h, background: i < Math.round((p / 100) * steps) ? color : undefined }} />
            ))}
          </div>
        ) : (
          <div className="lg-progress-rail lg-glass" style={{ height: h }}>
            <div className="lg-progress-bar" style={{ width: `${p}%`, background: color }} />
          </div>
        )}
        {showInfo && <span className="lg-progress-text" style={{ color: status !== 'normal' && status !== 'active' ? statusColor(status) : undefined }}>{info}</span>}
      </div>
    );
  }

  const px = typeof size === 'number' ? size : size === 'sm' ? 64 : size === 'lg' ? 140 : 100;
  const stroke = Math.max(4, px * 0.08);
  const r = (px - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gap = type === 'dashboard' ? c * 0.25 : 0;
  const arc = c - gap;
  const solid = Array.isArray(strokeColor) ? `url(#${gradId})` : strokeColor ?? statusColor(status);
  const rotate = type === 'dashboard' ? 135 : -90;
  return (
    <div className={cx('lg-progress lg-progress-circle', `lg-progress-${status}`, className)} style={{ width: px, height: px, ...style }} {...a11y}>
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} style={{ transform: `rotate(${rotate}deg)` }}>
        {Array.isArray(strokeColor) && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={strokeColor[0]} />
              <stop offset="100%" stopColor={strokeColor[1]} />
            </linearGradient>
          </defs>
        )}
        <circle cx={px / 2} cy={px / 2} r={r} fill="none" stroke="var(--lg-fill-2)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${arc} ${c}`} />
        <circle
          className="lg-progress-circle-bar"
          cx={px / 2}
          cy={px / 2}
          r={r}
          fill="none"
          stroke={solid}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(arc * p) / 100} ${c}`}
        />
      </svg>
      {showInfo && <span className="lg-progress-circle-text" style={{ fontSize: px * 0.2 }}>{info}</span>}
    </div>
  );
};

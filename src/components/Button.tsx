import * as React from 'react';
import { cx, type ColorName, type Size } from '../utils';
import { LoadingIcon } from '../icons';

export type ButtonVariant = 'glass' | 'filled' | 'tinted' | 'outline' | 'text' | 'link';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  color?: ColorName;
  size?: Size;
  shape?: 'default' | 'round' | 'circle';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  block?: boolean;
  /** Render as an anchor. */
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'glass',
    color = 'default',
    size = 'md',
    shape = 'default',
    icon,
    iconPosition = 'start',
    loading,
    block,
    disabled,
    className,
    children,
    href,
    target,
    type = 'button',
    ...rest
  },
  ref,
) {
  const iconOnly = !children && (icon || loading);
  const iconNode = loading ? <LoadingIcon spin /> : icon;
  const classes = cx(
    'lg-btn',
    `lg-btn-${variant}`,
    `lg-btn-${color}`,
    `lg-btn-${size}`,
    shape !== 'default' && `lg-btn-${shape}`,
    iconOnly && 'lg-btn-icon-only',
    block && 'lg-btn-block',
    loading && 'lg-btn-loading',
    (variant === 'glass' || variant === 'filled' || variant === 'tinted') && 'lg-glass',
    className,
  );
  const content = (
    <>
      {iconNode && iconPosition === 'start' && <span className="lg-btn-icon">{iconNode}</span>}
      {children != null && <span className="lg-btn-label">{children}</span>}
      {iconNode && iconPosition === 'end' && <span className="lg-btn-icon">{iconNode}</span>}
    </>
  );
  if (href)
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        target={target}
        aria-disabled={disabled}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  return (
    <button ref={ref} type={type} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
});

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

/** Circle button with a single icon. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  return <Button ref={ref} shape="circle" {...props} />;
});

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, ...rest }) => (
  <div role="group" className={cx('lg-btn-group', className)} {...rest} />
);

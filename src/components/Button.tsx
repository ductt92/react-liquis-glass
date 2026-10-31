import * as React from 'react';
import { cx, type ColorName, type Size } from '../utils';
import { LoadingIcon } from '../icons';

export type ButtonVariant = 'glass' | 'filled' | 'tinted' | 'outline' | 'text' | 'link';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  color?: ColorName;
  size?: Size;
  shape?: 'default' | 'round' | 'circle';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  block?: boolean;
  disabled?: boolean;
  /** Render as an anchor. */
  href?: string;
  target?: string;
  /**
   * Render as another element or component, e.g. a router link:
   * `<Button as={Link} to="/settings">`. Extra props go to that component.
   */
  as?: React.ElementType;
}

export type ButtonProps<C extends React.ElementType = 'button'> = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | 'color'>;

type ButtonComponent = (<C extends React.ElementType = 'button'>(
  props: ButtonProps<C> & { as?: C; ref?: React.Ref<any> },
) => React.ReactElement | null) & { displayName?: string };

export const Button = React.forwardRef(function Button(
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
    as,
    type = 'button',
    ...rest
  }: ButtonProps<React.ElementType>,
  ref: React.Ref<any>,
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
  if ((as && as !== 'button') || href) {
    const Comp = as ?? 'a';
    // links can't be disabled natively: drop href, block the click and take it out of the tab order
    const off = disabled || loading;
    const onClick = (e: React.MouseEvent) => {
      if (off) e.preventDefault();
      else rest.onClick?.(e);
    };
    return (
      <Comp
        ref={ref}
        className={classes}
        {...(href !== undefined && !off && { href })}
        {...(target !== undefined && { target })}
        {...rest}
        aria-disabled={off || undefined}
        tabIndex={off ? -1 : rest.tabIndex}
        onClick={onClick}
      >
        {content}
      </Comp>
    );
  }
  return (
    <button ref={ref} type={type} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
}) as ButtonComponent;
Button.displayName = 'Button';

export type IconButtonProps<C extends React.ElementType = 'button'> = Omit<ButtonProps<C>, 'children' | 'icon'> & {
  icon: React.ReactNode;
  'aria-label': string;
};

/** Circle button with a single icon. */
export const IconButton = React.forwardRef<any, any>(function IconButton(props, ref) {
  return <Button ref={ref} shape="circle" {...props} />;
}) as (<C extends React.ElementType = 'button'>(props: IconButtonProps<C> & { as?: C; ref?: React.Ref<any> }) => React.ReactElement | null) & {
  displayName?: string;
};
IconButton.displayName = 'IconButton';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, ...rest }) => (
  <div role="group" className={cx('lg-btn-group', className)} {...rest} />
);

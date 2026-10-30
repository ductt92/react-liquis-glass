import * as React from 'react';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /** Width & height. Defaults to `1em` so icons follow the font size. */
  size?: number | string;
  /** Stroke color. Defaults to `currentColor`. */
  color?: string;
  strokeWidth?: number | string;
  /** Rotate continuously (useful for loading icons). */
  spin?: boolean;
  /** Accessible label. When omitted the icon is aria-hidden. */
  title?: string;
}

export type IconComponent = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> & {
  iconName: string;
};

/** Create a 24×24 stroke icon component from raw SVG inner markup. */
export function createIcon(name: string, markup: string): IconComponent {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = '1em', color = 'currentColor', strokeWidth = 1.8, spin, title, className, style, ...rest },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
        aria-label={title}
        className={['lg-icon', spin && 'lg-icon-spin', className].filter(Boolean).join(' ')}
        style={style}
        {...rest}
        dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + markup }}
      />
    );
  }) as IconComponent;
  Icon.displayName = `${name}Icon`;
  Icon.iconName = name;
  return Icon;
}

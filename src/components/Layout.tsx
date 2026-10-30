import * as React from 'react';
import { cx } from '../utils';

type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
const gapValue = (g: Gap | undefined) =>
  typeof g === 'number' ? g : ({ xs: 4, sm: 8, md: 12, lg: 20, xl: 32 } as const)[g ?? 'sm'];

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: Gap;
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean;
  block?: boolean;
  split?: React.ReactNode;
}

export const Space: React.FC<SpaceProps> = ({
  direction = 'horizontal',
  size = 'sm',
  align,
  wrap,
  block,
  split,
  className,
  style,
  children,
  ...rest
}) => {
  const items = React.Children.toArray(children);
  return (
    <div
      className={cx('lg-space', `lg-space-${direction}`, block && 'lg-space-block', className)}
      style={{
        gap: gapValue(size),
        alignItems: align ? (align === 'start' || align === 'end' ? `flex-${align}` : align) : direction === 'horizontal' ? 'center' : undefined,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...rest}
    >
      {split
        ? items.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="lg-space-split">{split}</span>}
              {c}
            </React.Fragment>
          ))
        : items}
    </div>
  );
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  gap?: Gap;
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  wrap?: boolean;
  flex?: React.CSSProperties['flex'];
  as?: keyof JSX.IntrinsicElements;
}

export const Flex: React.FC<FlexProps> = ({ vertical, gap, justify, align, wrap, flex, as = 'div', className, style, ...rest }) => {
  const Comp = as as 'div';
  return (
    <Comp
      className={cx('lg-flex', className)}
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: gap != null ? gapValue(gap) : undefined,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : undefined,
        flex,
        ...style,
      }}
      {...rest}
    />
  );
};

const RowContext = React.createContext<{ gutter: [number, number] }>({ gutter: [0, 0] });

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  wrap?: boolean;
}

/** 24-column responsive grid row. */
export const Row: React.FC<RowProps> = ({ gutter = 0, justify, align, wrap = true, className, style, ...rest }) => {
  const g: [number, number] = Array.isArray(gutter) ? gutter : [gutter, 0];
  return (
    <RowContext.Provider value={{ gutter: g }}>
      <div
        className={cx('lg-row', className)}
        style={{
          marginLeft: -g[0] / 2,
          marginRight: -g[0] / 2,
          rowGap: g[1],
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...style,
        }}
        {...rest}
      />
    </RowContext.Provider>
  );
};

type ColSpan = number | { span?: number; offset?: number };
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  flex?: React.CSSProperties['flex'];
  xs?: ColSpan;
  sm?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
  xl?: ColSpan;
}

export const Col: React.FC<ColProps> = ({ span, offset, flex, xs, sm, md, lg, xl, className, style, ...rest }) => {
  const { gutter } = React.useContext(RowContext);
  const bp: string[] = [];
  const add = (name: string, v?: ColSpan) => {
    if (v == null) return;
    const o = typeof v === 'number' ? { span: v } : v;
    if (o.span != null) bp.push(`lg-col-${name}-${o.span}`);
    if (o.offset != null) bp.push(`lg-col-${name}-offset-${o.offset}`);
  };
  add('xs', xs);
  add('sm', sm);
  add('md', md);
  add('lg', lg);
  add('xl', xl);
  return (
    <div
      className={cx('lg-col', span != null && `lg-col-${span}`, offset && `lg-col-offset-${offset}`, bp, className)}
      style={{ paddingLeft: gutter[0] / 2, paddingRight: gutter[0] / 2, flex, ...style }}
      {...rest}
    />
  );
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  dashed?: boolean;
  orientation?: 'left' | 'center' | 'right';
}

export const Divider: React.FC<DividerProps> = ({ vertical, dashed, orientation = 'center', className, children, ...rest }) => (
  <div
    role="separator"
    className={cx(
      'lg-divider',
      vertical ? 'lg-divider-vertical' : 'lg-divider-horizontal',
      dashed && 'lg-divider-dashed',
      children && `lg-divider-with-text lg-divider-${orientation}`,
      className,
    )}
    {...rest}
  >
    {children && !vertical && <span className="lg-divider-text">{children}</span>}
  </div>
);

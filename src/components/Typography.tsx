import * as React from 'react';
import { cx } from '../utils';

type TextType = 'default' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'accent';

interface BaseTextProps {
  type?: TextType;
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  code?: boolean;
  mark?: boolean;
  /** Truncate with ellipsis. `true` = 1 line, number = N lines. */
  ellipsis?: boolean | number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function textClass(p: BaseTextProps, base: string) {
  return cx(
    base,
    p.type && p.type !== 'default' && `lg-text-${p.type}`,
    p.strong && 'lg-text-strong',
    p.italic && 'lg-text-italic',
    p.underline && 'lg-text-underline',
    p.delete && 'lg-text-delete',
    p.ellipsis === true && 'lg-text-ellipsis',
    typeof p.ellipsis === 'number' && 'lg-text-clamp',
    p.className,
  );
}

function wrap(p: BaseTextProps, children: React.ReactNode) {
  let c = children;
  if (p.code) c = <code className="lg-text-code">{c}</code>;
  if (p.mark) c = <mark className="lg-text-mark">{c}</mark>;
  return c;
}

export interface TextProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {}
export const Text: React.FC<TextProps> = (p) => {
  const { type, strong, italic, underline, delete: del, code, mark, ellipsis, className, style, children, ...rest } = p;
  return (
    <span
      className={textClass(p, 'lg-text')}
      style={typeof ellipsis === 'number' ? { WebkitLineClamp: ellipsis, ...style } : style}
      {...rest}
    >
      {wrap(p, children)}
    </span>
  );
};

export interface TitleProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> {
  level?: 1 | 2 | 3 | 4 | 5;
}
export const Title: React.FC<TitleProps> = (p) => {
  const { level = 1, type, strong, italic, underline, delete: del, code, mark, ellipsis, className, style, children, ...rest } = p;
  const Tag = `h${level}` as 'h1';
  return (
    <Tag className={textClass(p, cx('lg-title', `lg-title-${level}`))} style={style} {...rest}>
      {wrap(p, children)}
    </Tag>
  );
};

export interface ParagraphProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> {}
export const Paragraph: React.FC<ParagraphProps> = (p) => {
  const { type, strong, italic, underline, delete: del, code, mark, ellipsis, className, style, children, ...rest } = p;
  return (
    <p
      className={textClass(p, 'lg-paragraph')}
      style={typeof ellipsis === 'number' ? { WebkitLineClamp: ellipsis, ...style } : style}
      {...rest}
    >
      {wrap(p, children)}
    </p>
  );
};

export const Typography = { Text, Title, Paragraph };

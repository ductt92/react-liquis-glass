import * as React from 'react';
import { cx } from '../utils';
import { CheckIcon, CopyIcon } from '../icons';

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
  /** Show a copy button. Copies `text` or the string children. */
  copyable?: boolean | { text?: string; onCopy?: () => void };
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

function nodeText(n: React.ReactNode): string {
  if (n == null || typeof n === 'boolean') return '';
  if (typeof n === 'string' || typeof n === 'number') return String(n);
  if (Array.isArray(n)) return n.map(nodeText).join('');
  if (React.isValidElement(n)) return nodeText((n.props as { children?: React.ReactNode }).children);
  return '';
}

const CopyButton: React.FC<{ copyable: NonNullable<BaseTextProps['copyable']>; children: React.ReactNode }> = ({ copyable, children }) => {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const opts = typeof copyable === 'object' ? copyable : {};
  return (
    <button
      type="button"
      className={cx('lg-text-copy', copied && 'lg-copied')}
      aria-label={copied ? 'Copied' : 'Copy'}
      onClick={async () => {
        const text = opts.text ?? nodeText(children);
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        opts.onCopy?.();
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

function wrap(p: BaseTextProps, children: React.ReactNode) {
  let c = children;
  if (p.code) c = <code className="lg-text-code">{c}</code>;
  if (p.mark) c = <mark className="lg-text-mark">{c}</mark>;
  return c;
}

export interface TextProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {}
export const Text: React.FC<TextProps> = (p) => {
  const { type, strong, italic, underline, delete: del, code, mark, ellipsis, copyable, className, style, children, ...rest } = p;
  return (
    <span
      className={textClass(p, 'lg-text')}
      style={typeof ellipsis === 'number' ? { WebkitLineClamp: ellipsis, ...style } : style}
      {...rest}
    >
      {wrap(p, children)}
      {copyable && <CopyButton copyable={copyable}>{children}</CopyButton>}
    </span>
  );
};

export interface TitleProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> {
  level?: 1 | 2 | 3 | 4 | 5;
}
export const Title: React.FC<TitleProps> = (p) => {
  const { level = 1, type, strong, italic, underline, delete: del, code, mark, ellipsis, copyable, className, style, children, ...rest } = p;
  const Tag = `h${level}` as 'h1';
  return (
    <Tag className={textClass(p, cx('lg-title', `lg-title-${level}`))} style={style} {...rest}>
      {wrap(p, children)}
      {copyable && <CopyButton copyable={copyable}>{children}</CopyButton>}
    </Tag>
  );
};

export interface ParagraphProps extends BaseTextProps, Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> {}
export const Paragraph: React.FC<ParagraphProps> = (p) => {
  const { type, strong, italic, underline, delete: del, code, mark, ellipsis, copyable, className, style, children, ...rest } = p;
  return (
    <p
      className={textClass(p, 'lg-paragraph')}
      style={typeof ellipsis === 'number' ? { WebkitLineClamp: ellipsis, ...style } : style}
      {...rest}
    >
      {wrap(p, children)}
      {copyable && <CopyButton copyable={copyable}>{children}</CopyButton>}
    </p>
  );
};

export const Typography = { Text, Title, Paragraph };

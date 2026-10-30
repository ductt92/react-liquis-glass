import * as React from 'react';
import { cx, useControlled, mergeRefs, type Size } from '../utils';
import { useLocale } from './ConfigProvider';
import { CloseCircleFilledIcon, EyeIcon, EyeOffIcon, SearchIcon, PlusIcon, MinusIcon } from '../icons';

type InputStatus = 'error' | 'warning';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  size?: Size;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
  status?: InputStatus;
  /** Show character count (requires maxLength for "x / max"). */
  showCount?: boolean;
  variant?: 'glass' | 'filled' | 'outline';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    allowClear,
    status,
    showCount,
    variant = 'glass',
    disabled,
    className,
    wrapperClassName,
    style,
    value: valueProp,
    defaultValue,
    onChange,
    onValueChange,
    maxLength,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlled<string>(
    valueProp === undefined ? undefined : String(valueProp ?? ''),
    String(defaultValue ?? ''),
    onValueChange,
  );
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };
  const clear = () => {
    const el = inputRef.current;
    if (!el) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(el, '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.focus();
  };
  const field = (
    <span
      className={cx(
        'lg-input',
        `lg-input-${size}`,
        `lg-input-${variant}`,
        variant === 'glass' && 'lg-glass',
        status && `lg-input-${status}`,
        disabled && 'lg-input-disabled',
        !addonBefore && !addonAfter && wrapperClassName,
        className,
      )}
      style={!addonBefore && !addonAfter ? style : undefined}
      onMouseDown={(e) => {
        if (e.target !== inputRef.current) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
    >
      {prefix && <span className="lg-input-prefix">{prefix}</span>}
      <input
        ref={mergeRefs(inputRef, ref)}
        className="lg-input-el"
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        onChange={handle}
        aria-invalid={status === 'error' || undefined}
        {...rest}
      />
      {allowClear && value && !disabled && (
        <button type="button" tabIndex={-1} aria-label={t.clear} className="lg-input-clear" onClick={clear}>
          <CloseCircleFilledIcon />
        </button>
      )}
      {showCount && (
        <span className="lg-input-count">
          {value.length}
          {maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
      {suffix && <span className="lg-input-suffix">{suffix}</span>}
    </span>
  );
  if (!addonBefore && !addonAfter) return field;
  return (
    <span className={cx('lg-input-group', `lg-input-group-${size}`, wrapperClassName)} style={style}>
      {addonBefore && <span className="lg-input-addon lg-glass">{addonBefore}</span>}
      {field}
      {addonAfter && <span className="lg-input-addon lg-glass">{addonAfter}</span>}
    </span>
  );
});

export interface PasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  visibilityToggle?: boolean;
}
export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(function Password(
  { visibilityToggle = true, ...rest },
  ref,
) {
  const t = useLocale();
  const [visible, setVisible] = React.useState(false);
  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      suffix={
        visibilityToggle && (
          <button
            type="button"
            className="lg-input-action"
            aria-label={visible ? t.hidePassword : t.showPassword}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )
      }
      {...rest}
    />
  );
});

export interface SearchInputProps extends Omit<InputProps, 'prefix'> {
  onSearch?: (value: string) => void;
}
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onSearch, onKeyDown, ...rest },
  ref,
) {
  return (
    <Input
      ref={ref}
      type="search"
      prefix={<SearchIcon />}
      allowClear
      variant="glass"
      className="lg-input-search"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === 'Enter') onSearch?.((e.target as HTMLInputElement).value);
      }}
      {...rest}
    />
  );
});

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  status?: InputStatus;
  showCount?: boolean;
  /** Grow with content. */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { status, showCount, autoSize, className, style, value: valueProp, defaultValue, onChange, onValueChange, maxLength, rows = 3, ...rest },
  ref,
) {
  const elRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useControlled<string>(
    valueProp === undefined ? undefined : String(valueProp ?? ''),
    String(defaultValue ?? ''),
    onValueChange,
  );
  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!el || !autoSize) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 21;
    const opts = typeof autoSize === 'object' ? autoSize : {};
    el.style.height = 'auto';
    let h = el.scrollHeight;
    if (opts.minRows) h = Math.max(h, opts.minRows * lh + 16);
    if (opts.maxRows) h = Math.min(h, opts.maxRows * lh + 16);
    el.style.height = `${h}px`;
  }, [value, autoSize]);
  return (
    <span className={cx('lg-textarea lg-glass', status && `lg-input-${status}`, className)} style={style}>
      <textarea
        ref={mergeRefs(elRef, ref)}
        rows={rows}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
        {...rest}
      />
      {showCount && (
        <span className="lg-textarea-count">
          {value.length}
          {maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
    </span>
  );
});

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'prefix'> {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  size?: Size;
  prefix?: React.ReactNode;
  status?: InputStatus;
  controls?: boolean;
}
export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  { value: valueProp, defaultValue = null, onChange, min = -Infinity, max = Infinity, step = 1, precision, size = 'md', prefix, status, controls = true, disabled, className, style, ...rest },
  ref,
) {
  const t = useLocale();
  const [value, setValue] = useControlled<number | null>(valueProp, defaultValue, onChange);
  const [draft, setDraft] = React.useState<string | null>(null);
  const clamp = (n: number) => {
    let v = Math.min(max, Math.max(min, n));
    if (precision != null) v = Number(v.toFixed(precision));
    return v;
  };
  const stepBy = (dir: 1 | -1) => {
    if (disabled) return;
    const base = value ?? (Number.isFinite(min) ? min : 0);
    const decimals = precision ?? (String(step).split('.')[1]?.length || 0);
    setValue(clamp(Number((base + dir * step).toFixed(decimals))));
  };
  const commit = () => {
    if (draft == null) return;
    const t = draft.trim();
    if (t === '' || t === '-') setValue(null);
    else if (!Number.isNaN(Number(t))) setValue(clamp(Number(t)));
    setDraft(null);
  };
  const display = draft ?? (value == null ? '' : precision != null ? value.toFixed(precision) : String(value));
  return (
    <span
      className={cx('lg-input lg-glass lg-input-number', `lg-input-${size}`, status && `lg-input-${status}`, disabled && 'lg-input-disabled', className)}
      style={style}
    >
      {prefix && <span className="lg-input-prefix">{prefix}</span>}
      <input
        ref={ref}
        className="lg-input-el"
        inputMode="decimal"
        role="spinbutton"
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        aria-valuenow={value ?? undefined}
        disabled={disabled}
        value={display}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') (e.preventDefault(), stepBy(1));
          if (e.key === 'ArrowDown') (e.preventDefault(), stepBy(-1));
          if (e.key === 'Enter') commit();
        }}
        {...rest}
      />
      {controls && (
        <span className="lg-input-number-controls">
          <button type="button" tabIndex={-1} aria-label={t.decrease} disabled={disabled || (value ?? 0) <= min} onClick={() => stepBy(-1)}>
            <MinusIcon />
          </button>
          <button type="button" tabIndex={-1} aria-label={t.increase} disabled={disabled || (value ?? 0) >= max} onClick={() => stepBy(1)}>
            <PlusIcon />
          </button>
        </span>
      )}
    </span>
  );
});

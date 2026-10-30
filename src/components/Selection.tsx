import * as React from 'react';
import { cx, useControlled, useId, type Size } from '../utils';
import { StarFilledIcon } from '../icons';

/* ───────── Checkbox ───────── */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const CheckboxGroupContext = React.createContext<{
  value: (string | number)[];
  toggle: (v: string | number) => void;
  disabled?: boolean;
  name?: string;
} | null>(null);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked: checkedProp, defaultChecked = false, indeterminate, onChange, disabled, className, style, children, value, ...rest },
  ref,
) {
  const group = React.useContext(CheckboxGroupContext);
  const [inner, setInner] = useControlled(checkedProp, defaultChecked);
  const checked = group ? group.value.includes(value as string) : inner;
  const isDisabled = disabled ?? group?.disabled;
  const localRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <label className={cx('lg-checkbox', checked && 'lg-checked', indeterminate && 'lg-indeterminate', isDisabled && 'lg-disabled', className)} style={style}>
      <input
        ref={(n) => {
          (localRef as React.MutableRefObject<HTMLInputElement | null>).current = n;
          if (typeof ref === 'function') ref(n);
          else if (ref) ref.current = n;
        }}
        type="checkbox"
        className="lg-sr-only"
        checked={checked}
        disabled={isDisabled}
        value={value}
        name={group?.name ?? rest.name}
        onChange={(e) => {
          if (group) group.toggle(value as string);
          else setInner(e.target.checked);
          onChange?.(e.target.checked, e);
        }}
        {...rest}
      />
      <span className="lg-checkbox-box lg-glass" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {indeterminate ? <path d="M6 12h12" /> : <path d="M5 12.5l4.5 4.5L19 7.5" />}
        </svg>
      </span>
      {children != null && <span className="lg-checkbox-label">{children}</span>}
    </label>
  );
});

export interface OptionItem<V = string | number> {
  label: React.ReactNode;
  value: V;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface CheckboxGroupProps {
  options?: (OptionItem | string)[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  name?: string;
  className?: string;
  children?: React.ReactNode;
}

const normalize = (o: OptionItem | string): OptionItem => (typeof o === 'string' ? { label: o, value: o } : o);

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, value, defaultValue = [], onChange, disabled, direction = 'horizontal', name, className, children }) => {
  const [val, setVal] = useControlled(value, defaultValue, onChange);
  const toggle = (v: string | number) => setVal(val.includes(v) ? val.filter((x) => x !== v) : [...val, v]);
  return (
    <CheckboxGroupContext.Provider value={{ value: val, toggle, disabled, name }}>
      <div role="group" className={cx('lg-choice-group', `lg-choice-group-${direction}`, className)}>
        {options
          ? options.map(normalize).map((o) => (
              <Checkbox key={String(o.value)} value={o.value as string} disabled={o.disabled}>
                {o.label}
              </Checkbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

/* ───────── Radio ───────── */
const RadioGroupContext = React.createContext<{
  value: unknown;
  select: (v: any) => void;
  disabled?: boolean;
  name: string;
  button?: boolean;
} | null>(null);

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: any;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, checked: checkedProp, onChange, disabled, className, style, children, ...rest },
  ref,
) {
  const group = React.useContext(RadioGroupContext);
  const checked = group ? group.value === value : !!checkedProp;
  const isDisabled = disabled ?? group?.disabled;
  return (
    <label
      className={cx(group?.button ? 'lg-radio-button' : 'lg-radio', checked && 'lg-checked', isDisabled && 'lg-disabled', className)}
      style={style}
    >
      <input
        ref={ref}
        type="radio"
        className="lg-sr-only"
        checked={checked}
        disabled={isDisabled}
        name={group?.name ?? rest.name}
        value={String(value)}
        onChange={(e) => {
          group?.select(value);
          onChange?.(e);
        }}
        {...rest}
      />
      {!group?.button && <span className="lg-radio-dot lg-glass" aria-hidden />}
      {children != null && <span className="lg-radio-label">{children}</span>}
    </label>
  );
});

export interface RadioGroupProps<V = any> {
  options?: (OptionItem<V> | string)[];
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  disabled?: boolean;
  /** `button` renders a glass segmented-style group. */
  optionType?: 'default' | 'button';
  direction?: 'horizontal' | 'vertical';
  name?: string;
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroup<V = any>({ options, value, defaultValue, onChange, disabled, optionType = 'default', direction = 'horizontal', name, className, children }: RadioGroupProps<V>) {
  const [val, setVal] = useControlled<V | undefined>(value, defaultValue, onChange as (v: V | undefined) => void);
  const autoName = useId('lg-radio');
  const button = optionType === 'button';
  return (
    <RadioGroupContext.Provider value={{ value: val, select: setVal, disabled, name: name ?? autoName, button }}>
      <div role="radiogroup" className={cx(button ? 'lg-radio-button-group lg-glass' : cx('lg-choice-group', `lg-choice-group-${direction}`), className)}>
        {options
          ? options.map((o) => normalize(o as OptionItem)).map((o) => (
              <Radio key={String(o.value)} value={o.value} disabled={o.disabled}>
                {o.label}
              </Radio>
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
}

/* ───────── Switch ───────── */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
  loading?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked: checkedProp, defaultChecked = false, onChange, size = 'md', loading, disabled, checkedChildren, unCheckedChildren, className, ...rest },
  ref,
) {
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked, onChange);
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled || loading}
      className={cx('lg-switch', `lg-switch-${size}`, checked && 'lg-checked', loading && 'lg-switch-loading', className)}
      onClick={() => setChecked(!checked)}
      {...rest}
    >
      <span className="lg-switch-inner">{checked ? checkedChildren : unCheckedChildren}</span>
      <span className="lg-switch-thumb" />
    </button>
  );
});

/* ───────── Slider ───────── */
export interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: any) => void;
  onChangeEnd?: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  disabled?: boolean;
  marks?: Record<number, React.ReactNode>;
  /** Show value bubble while dragging. */
  tooltip?: boolean | ((v: number) => React.ReactNode);
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  min = 0,
  max = 100,
  step = 1,
  range,
  disabled,
  marks,
  tooltip = true,
  className,
  style,
}) => {
  const initial = defaultValue ?? (range ? [min, max] : min);
  const [val, setVal] = useControlled<number | [number, number]>(value, initial as any, onChange);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<number | null>(null);
  const values: number[] = Array.isArray(val) ? val : [val];
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  const snap = (v: number) => {
    const s = Math.round((v - min) / step) * step + min;
    const decimals = String(step).split('.')[1]?.length || 0;
    return Math.min(max, Math.max(min, Number(s.toFixed(decimals))));
  };
  const fromEvent = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    return snap(min + ((clientX - r.left) / r.width) * (max - min));
  };
  const setAt = (i: number, v: number) => {
    if (!range) return setVal(v);
    const next = [...values] as [number, number];
    next[i] = v;
    if (next[0] > next[1]) next.reverse();
    setVal(next);
  };
  const latest = React.useRef(val);
  latest.current = val;
  const startDrag = (i: number, e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setActive(i);
    let idx = i;
    const move = (ev: PointerEvent) => {
      const v = fromEvent(ev.clientX);
      if (range) {
        const cur = latest.current as [number, number];
        const other = cur[1 - idx];
        if ((idx === 0 && v > other) || (idx === 1 && v < other)) idx = 1 - idx;
        const next = [...cur] as [number, number];
        next[idx] = v;
        next.sort((a, b) => a - b);
        setVal(next);
      } else setVal(v);
    };
    const up = () => {
      setActive(null);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      onChangeEnd?.(latest.current);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const onTrackDown = (e: React.PointerEvent) => {
    if (disabled) return;
    const v = fromEvent(e.clientX);
    const i = range ? (Math.abs(v - values[0]) <= Math.abs(v - values[1]) ? 0 : 1) : 0;
    setAt(i, v);
    startDrag(i, e);
  };
  const lo = range ? pct(values[0]) : 0;
  const hi = pct(range ? values[1] : values[0]);
  return (
    <div className={cx('lg-slider', disabled && 'lg-disabled', marks && 'lg-slider-with-marks', className)} style={style}>
      <div ref={trackRef} className="lg-slider-rail lg-glass" onPointerDown={onTrackDown}>
        <div className="lg-slider-track" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
        {values.map((v, i) => (
          <div
            key={i}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-disabled={disabled}
            className={cx('lg-slider-handle', active === i && 'lg-active')}
            style={{ left: `${pct(v)}%` }}
            onPointerDown={(e) => {
              e.stopPropagation();
              startDrag(i, e);
            }}
            onKeyDown={(e) => {
              const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? step : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -step : 0;
              if (d) {
                e.preventDefault();
                setAt(i, snap(v + d));
              }
            }}
          >
            {tooltip && <span className="lg-slider-bubble lg-glass lg-glass-strong">{typeof tooltip === 'function' ? tooltip(v) : v}</span>}
          </div>
        ))}
      </div>
      {marks && (
        <div className="lg-slider-marks">
          {Object.entries(marks).map(([k, label]) => (
            <span key={k} className="lg-slider-mark" style={{ left: `${pct(Number(k))}%` }}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────── Rate ───────── */
export interface RateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  size?: Size;
  className?: string;
}

export const Rate: React.FC<RateProps> = ({ value, defaultValue = 0, onChange, count = 5, allowHalf, allowClear = true, disabled, character, size = 'md', className }) => {
  const [val, setVal] = useControlled(value, defaultValue, onChange);
  const [hover, setHover] = React.useState<number | null>(null);
  const shown = hover ?? val;
  const pick = (v: number) => setVal(allowClear && v === val ? 0 : v);
  return (
    <div role="radiogroup" className={cx('lg-rate', `lg-rate-${size}`, disabled && 'lg-disabled', className)} onMouseLeave={() => setHover(null)}>
      {Array.from({ length: count }, (_, i) => {
        const full = shown >= i + 1;
        const half = !full && shown >= i + 0.5;
        const valueFor = (e: React.MouseEvent) => {
          if (!allowHalf) return i + 1;
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          return e.clientX - r.left < r.width / 2 ? i + 0.5 : i + 1;
        };
        return (
          <span
            key={i}
            role="radio"
            aria-checked={val >= i + 1}
            tabIndex={disabled ? -1 : 0}
            className={cx('lg-rate-star', full && 'lg-full', half && 'lg-half')}
            onMouseMove={(e) => !disabled && setHover(valueFor(e))}
            onClick={(e) => !disabled && pick(valueFor(e))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !disabled && pick(i + 1)}
          >
            <span className="lg-rate-bg">{character ?? <StarFilledIcon />}</span>
            <span className="lg-rate-fg">{character ?? <StarFilledIcon />}</span>
          </span>
        );
      })}
    </div>
  );
};

/* ───────── Segmented ───────── */
export interface SegmentedProps<V = string | number> {
  options: (OptionItem<V> | string)[];
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  size?: Size;
  block?: boolean;
  disabled?: boolean;
  className?: string;
}

/** iOS-style segmented control with a sliding glass thumb. */
export function Segmented<V extends string | number = string>({ options, value, defaultValue, onChange, size = 'md', block, disabled, className }: SegmentedProps<V>) {
  const opts = options.map((o) => normalize(o as OptionItem) as OptionItem<V>);
  const [val, setVal] = useControlled<V>(value, defaultValue ?? opts[0]?.value, onChange);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = React.useState<{ left: number; width: number } | null>(null);
  const idx = opts.findIndex((o) => o.value === val);
  React.useLayoutEffect(() => {
    const el = refs.current[idx];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [idx, opts.length, size, block]);
  return (
    <div role="tablist" className={cx('lg-segmented lg-glass', `lg-segmented-${size}`, block && 'lg-segmented-block', disabled && 'lg-disabled', className)}>
      {thumb && <span className="lg-segmented-thumb" style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width }} />}
      {opts.map((o, i) => (
        <button
          key={String(o.value)}
          ref={(n) => {
            refs.current[i] = n;
          }}
          type="button"
          role="tab"
          aria-selected={i === idx}
          disabled={disabled || o.disabled}
          className={cx('lg-segmented-item', i === idx && 'lg-active')}
          onClick={() => setVal(o.value)}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}

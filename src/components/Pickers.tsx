import * as React from 'react';
import { cx, useControlled, useId, type Size, normalizeText } from '../utils';
import { useLocale } from './ConfigProvider';
import { Popup } from './Popup';
import { formatDate } from './DatePicker';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClockIcon,
  CloseCircleFilledIcon,
  ArrowRightIcon,
} from '../icons';

type FieldStatus = 'error' | 'warning';

/* ───────── AutoComplete ───────── */
export interface AutoCompleteOption {
  value: string;
  label?: React.ReactNode;
}

export interface AutoCompleteProps {
  options?: (string | AutoCompleteOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called when an option is picked (click or Enter). */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /** Called on every keystroke — use it to load options asynchronously. */
  onSearch?: (query: string) => void;
  /** Filter options by the typed text. Set `false` when options come from `onSearch`. */
  filterOption?: boolean | ((query: string, option: AutoCompleteOption) => boolean);
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  allowClear?: boolean;
  status?: FieldStatus;
  prefix?: React.ReactNode;
  notFoundContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const toOption = (o: string | AutoCompleteOption): AutoCompleteOption => (typeof o === 'string' ? { value: o } : o);

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options = [],
  value,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  filterOption = true,
  placeholder,
  size = 'md',
  disabled,
  allowClear,
  status,
  prefix,
  notFoundContent,
  className,
  style,
}) => {
  const t = useLocale();
  const [text, setText] = useControlled(value, defaultValue, onChange);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const listId = useId('lg-ac');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const opts = options.map(toOption);
  const q = normalizeText(text.trim());
  const shown =
    filterOption === false
      ? opts
      : opts.filter((o) =>
          typeof filterOption === 'function' ? filterOption(text, o) : !q || normalizeText(o.value).includes(q),
        );

  const pick = (o: AutoCompleteOption) => {
    setText(o.value);
    onSelect?.(o.value, o);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(shown.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && open && shown[active]) {
      e.preventDefault();
      pick(shown[active]);
    }
  };

  const highlight = (s: string) => {
    if (!q) return s;
    const i = normalizeText(s).indexOf(q);
    if (i < 0) return s;
    return (
      <>
        {s.slice(0, i)}
        <mark className="lg-ac-match">{s.slice(i, i + q.length)}</mark>
        {s.slice(i + q.length)}
      </>
    );
  };

  const showEmpty = notFoundContent != null && text && shown.length === 0;
  const dropdown =
    shown.length > 0 || showEmpty ? (
      <div className="lg-select-dropdown lg-glass lg-glass-strong">
        <div id={listId} role="listbox" className="lg-select-list">
          {showEmpty && <div className="lg-select-empty">{notFoundContent}</div>}
          {shown.map((o, i) => (
            <div
              key={o.value}
              role="option"
              aria-selected={i === active}
              className={cx('lg-select-option', i === active && 'lg-active')}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
            >
              <span className="lg-select-option-label">{o.label ?? highlight(o.value)}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <Popup content={dropdown} open={open && !disabled} onOpenChange={setOpen} trigger="manual" placement="bottomLeft" matchWidth offset={6}>
      <span
        className={cx('lg-input lg-glass', `lg-input-${size}`, status && `lg-input-${status}`, disabled && 'lg-input-disabled', className)}
        style={style}
      >
        {prefix && <span className="lg-input-prefix">{prefix}</span>}
        <input
          ref={inputRef}
          className="lg-input-el"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          disabled={disabled}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onSearch?.(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
        />
        {allowClear && text && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={t.clear}
            className="lg-input-clear"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setText('');
              onSearch?.('');
              inputRef.current?.focus();
            }}
          >
            <CloseCircleFilledIcon />
          </button>
        )}
      </span>
    </Popup>
  );
};

/* ───────── TimePicker ───────── */
export interface TimePickerProps {
  /** Time string `HH:mm` or `HH:mm:ss`, or null. */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  format?: 'HH:mm' | 'HH:mm:ss';
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  allowClear?: boolean;
  status?: FieldStatus;
  className?: string;
  style?: React.CSSProperties;
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const parseTime = (s?: string | null) => {
  const [h = 0, m = 0, sec = 0] = (s ?? '').split(':').map((x) => Number(x) || 0);
  return [h, m, sec];
};
const range = (max: number, step: number) => Array.from({ length: Math.ceil(max / step) }, (_, i) => i * step);

const TimeColumn: React.FC<{ values: number[]; selected: number; onPick: (v: number) => void; label: string }> = ({ values, selected, onPick, label }) => {
  const ref = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (el && ref.current) ref.current.scrollTo({ top: el.offsetTop - 4, behavior: 'smooth' });
  }, [selected]);
  return (
    <ul ref={ref} role="listbox" aria-label={label} className="lg-time-column">
      {values.map((v) => (
        <li key={v} role="option" aria-selected={v === selected} className={cx('lg-time-cell', v === selected && 'lg-selected')} onClick={() => onPick(v)}>
          {pad2(v)}
        </li>
      ))}
    </ul>
  );
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue = null,
  onChange,
  format = 'HH:mm',
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  placeholder,
  size = 'md',
  disabled,
  allowClear = true,
  status,
  className,
  style,
}) => {
  const t = useLocale();
  const [val, setVal] = useControlled<string | null>(value, defaultValue, onChange);
  const [open, setOpen] = React.useState(false);
  const withSeconds = format === 'HH:mm:ss';
  const [draft, setDraft] = React.useState(() => parseTime(val));
  React.useEffect(() => {
    if (open) setDraft(parseTime(val ?? undefined));
  }, [open, val]);
  const fmt = ([h, m, s]: number[]) => (withSeconds ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(h)}:${pad2(m)}`);
  const set = (i: number, v: number) => setDraft((d) => d.map((x, j) => (j === i ? v : x)));
  const commit = (t: number[]) => {
    setVal(fmt(t));
    setOpen(false);
  };
  return (
    <Popup
      trigger="click"
      placement="bottomLeft"
      open={open && !disabled}
      onOpenChange={setOpen}
      content={
        <div className="lg-glass lg-glass-strong lg-time-panel">
          <div className="lg-time-columns">
            <TimeColumn label="Hours" values={range(24, hourStep)} selected={draft[0]} onPick={(v) => set(0, v)} />
            <TimeColumn label="Minutes" values={range(60, minuteStep)} selected={draft[1]} onPick={(v) => set(1, v)} />
            {withSeconds && <TimeColumn label="Seconds" values={range(60, secondStep)} selected={draft[2]} onPick={(v) => set(2, v)} />}
          </div>
          <div className="lg-time-footer">
            <button
              type="button"
              className="lg-calendar-today"
              onClick={() => {
                const n = new Date();
                commit([n.getHours(), n.getMinutes(), n.getSeconds()]);
              }}
            >
              {t.now}
            </button>
            <button type="button" className="lg-picker-ok" onClick={() => commit(draft)}>
              {t.ok}
            </button>
          </div>
        </div>
      }
    >
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        className={cx('lg-input lg-glass lg-datepicker', `lg-input-${size}`, status && `lg-input-${status}`, disabled && 'lg-input-disabled', className)}
        style={style}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(true))}
      >
        <span className={cx('lg-datepicker-value', !val && 'lg-select-placeholder')}>{val ?? placeholder ?? t.selectTime}</span>
        {allowClear && val && !disabled ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={t.clear}
            className="lg-input-clear"
            onClick={(e) => {
              e.stopPropagation();
              setVal(null);
            }}
          >
            <CloseCircleFilledIcon />
          </button>
        ) : (
          <ClockIcon className="lg-select-arrow" />
        )}
      </div>
    </Popup>
  );
};

/* ───────── RangePicker ───────── */
export type DateRange = [Date | null, Date | null];

export interface RangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (dates: DateRange, formatted: [string, string]) => void;
  format?: string;
  placeholder?: [string, string];
  disabledDate?: (date: Date) => boolean;
  presets?: { label: React.ReactNode; value: [Date, Date] }[];
  weekStartsOn?: 0 | 1;
  size?: Size;
  disabled?: boolean;
  allowClear?: boolean;
  status?: FieldStatus;
  className?: string;
  style?: React.CSSProperties;
}

const dayKey = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

const MonthGrid: React.FC<{
  month: Date;
  weekStartsOn: 0 | 1;
  start: Date | null;
  end: Date | null;
  hover: Date | null;
  disabledDate?: (d: Date) => boolean;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
}> = ({ month, weekStartsOn, start, end, hover, disabledDate, onPick, onHover }) => {
  const t = useLocale();
  const first = (month.getDay() - weekStartsOn + 7) % 7;
  const days = weekStartsOn === 1 ? [...t.weekdays.slice(1), t.weekdays[0]] : t.weekdays;
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) cells.push(new Date(month.getFullYear(), month.getMonth(), i - first + 1));
  const lo = start ? dayKey(start) : null;
  const hiDate = end ?? (start && hover ? hover : null);
  let a = lo;
  let b = hiDate ? dayKey(hiDate) : null;
  if (a != null && b != null && b < a) [a, b] = [b, a];
  const today = dayKey(new Date());
  return (
    <div className="lg-calendar-grid lg-range-grid" role="grid" onMouseLeave={() => onHover(null)}>
      {days.map((d) => (
        <span key={d} className="lg-calendar-weekday" role="columnheader">{d}</span>
      ))}
      {cells.map((d) => {
        const k = dayKey(d);
        const out = d.getMonth() !== month.getMonth();
        if (out) return <span key={k} className="lg-range-cell lg-range-empty" />;
        const dis = disabledDate?.(d);
        const inRange = a != null && b != null && k > a && k < b;
        const isEdge = k === a || k === b;
        return (
          <span
            key={k}
            className={cx('lg-range-cell', inRange && 'lg-in-range', a != null && b != null && a !== b && k === a && 'lg-range-start', a != null && b != null && a !== b && k === b && 'lg-range-end')}
          >
            <button
              type="button"
              role="gridcell"
              disabled={dis}
              aria-selected={isEdge}
              className={cx('lg-calendar-cell', k === today && 'lg-today', isEdge && 'lg-selected')}
              onClick={() => onPick(d)}
              onMouseEnter={() => onHover(d)}
            >
              {d.getDate()}
            </button>
          </span>
        );
      })}
    </div>
  );
};

export const RangePicker: React.FC<RangePickerProps> = ({
  value,
  defaultValue = [null, null],
  onChange,
  format = 'YYYY-MM-DD',
  placeholder,
  disabledDate,
  presets,
  weekStartsOn = 1,
  size = 'md',
  disabled,
  allowClear = true,
  status,
  className,
  style,
}) => {
  const t = useLocale();
  const [val, setVal] = useControlled<DateRange>(value, defaultValue);
  const [open, setOpen] = React.useState(false);
  const [draftStart, setDraftStart] = React.useState<Date | null>(null);
  const [hover, setHover] = React.useState<Date | null>(null);
  const [view, setView] = React.useState(() => startOfMonth(val[0] ?? new Date()));
  React.useEffect(() => {
    if (open) {
      setDraftStart(null);
      setView(startOfMonth(val[0] ?? new Date()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const change = (r: DateRange) => {
    setVal(r);
    onChange?.(r, [r[0] ? formatDate(r[0], format) : '', r[1] ? formatDate(r[1], format) : '']);
  };
  const pick = (d: Date) => {
    if (!draftStart) {
      setDraftStart(d);
      return;
    }
    const [s, e] = dayKey(d) < dayKey(draftStart) ? [d, draftStart] : [draftStart, d];
    change([s, e]);
    setDraftStart(null);
    setOpen(false);
  };
  const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
  const shift = (m: number) => setView(new Date(view.getFullYear(), view.getMonth() + m, 1));
  const start = draftStart ?? val[0];
  const end = draftStart ? null : val[1];

  return (
    <Popup
      trigger="click"
      placement="bottomLeft"
      open={open && !disabled}
      onOpenChange={setOpen}
      content={
        <div className="lg-glass lg-glass-strong lg-range-panel">
          {presets && presets.length > 0 && (
            <ul className="lg-range-presets">
              {presets.map((p, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      change(p.value);
                      setOpen(false);
                    }}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="lg-range-months">
            {[view, next].map((m, i) => (
              <div key={i} className="lg-calendar lg-range-month">
                <div className="lg-calendar-header">
                  {i === 0 ? (
                    <>
                      <button type="button" aria-label={t.prevYear} onClick={() => shift(-12)}><ChevronsLeftIcon /></button>
                      <button type="button" aria-label={t.prevMonth} onClick={() => shift(-1)}><ChevronLeftIcon /></button>
                    </>
                  ) : (
                    <span className="lg-range-spacer" />
                  )}
                  <span className="lg-calendar-title">
                    {t.months[m.getMonth()]} {m.getFullYear()}
                  </span>
                  {i === 1 ? (
                    <>
                      <button type="button" aria-label={t.nextMonth} onClick={() => shift(1)}><ChevronRightIcon /></button>
                      <button type="button" aria-label={t.nextYear} onClick={() => shift(12)}><ChevronsRightIcon /></button>
                    </>
                  ) : (
                    <span className="lg-range-spacer" />
                  )}
                </div>
                <MonthGrid
                  month={m}
                  weekStartsOn={weekStartsOn}
                  start={start}
                  end={end}
                  hover={draftStart ? hover : null}
                  disabledDate={disabledDate}
                  onPick={pick}
                  onHover={setHover}
                />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        className={cx('lg-input lg-glass lg-datepicker lg-range-input', `lg-input-${size}`, status && `lg-input-${status}`, disabled && 'lg-input-disabled', open && 'lg-select-open', className)}
        style={style}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(true))}
      >
        <span className={cx('lg-range-value', !val[0] && 'lg-select-placeholder')}>{val[0] ? formatDate(val[0], format) : placeholder?.[0] ?? t.startDate}</span>
        <ArrowRightIcon className="lg-range-sep" />
        <span className={cx('lg-range-value', !val[1] && 'lg-select-placeholder')}>{val[1] ? formatDate(val[1], format) : placeholder?.[1] ?? t.endDate}</span>
        {allowClear && (val[0] || val[1]) && !disabled ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={t.clear}
            className="lg-input-clear"
            onClick={(e) => {
              e.stopPropagation();
              change([null, null]);
            }}
          >
            <CloseCircleFilledIcon />
          </button>
        ) : (
          <CalendarIcon className="lg-select-arrow" />
        )}
      </div>
    </Popup>
  );
};

/* ───────── ColorPicker ───────── */
export interface ColorPickerProps {
  /** Hex color: `#rrggbb`, or `#rrggbbaa` when alpha < 1. */
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  /** Called when a drag ends or a preset/hex is committed. */
  onChangeComplete?: (hex: string) => void;
  showAlpha?: boolean;
  /** Show the hex value next to the swatch. */
  showText?: boolean;
  presets?: string[];
  size?: Size;
  disabled?: boolean;
  className?: string;
}

interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function hexToHsva(hex: string): HSVA {
  let h = hex.replace('#', '').trim();
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255 || 0;
  const g = parseInt(h.slice(2, 4), 16) / 255 || 0;
  const b = parseInt(h.slice(4, 6), 16) / 255 || 0;
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let hue = 0;
  if (d) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue = (hue * 60 + 360) % 360;
  }
  return { h: hue, s: max ? d / max : 0, v: max, a: Number.isNaN(a) ? 1 : a };
}

function hsvaToRgb({ h, s, v }: HSVA): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)].map((x) => Math.round(x * 255)) as [number, number, number];
}

const hex2 = (n: number) => n.toString(16).padStart(2, '0');
function hsvaToHex(c: HSVA, alpha: boolean): string {
  const [r, g, b] = hsvaToRgb(c);
  const base = `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  return alpha && c.a < 1 ? base + hex2(Math.round(c.a * 255)) : base;
}

const isHex = (s: string) => /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s.trim());

function useDrag(onMove: (x: number, y: number) => void, onEnd?: () => void) {
  return (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const at = (ev: { clientX: number; clientY: number }) => {
      const r = el.getBoundingClientRect();
      onMove(clamp01((ev.clientX - r.left) / r.width), clamp01((ev.clientY - r.top) / r.height));
    };
    at(e);
    const move = (ev: PointerEvent) => at(ev);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      onEnd?.();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
}

const DEFAULT_PRESETS = ['#0a84ff', '#5e5ce6', '#bf5af2', '#ff375f', '#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#8e8e93', '#1c1c1e', '#ffffff'];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#0a84ff',
  onChange,
  onChangeComplete,
  showAlpha,
  showText,
  presets = DEFAULT_PRESETS,
  size = 'md',
  disabled,
  className,
}) => {
  const t = useLocale();
  const [hex, setHex] = useControlled(value, defaultValue, onChange);
  // Keep HSV locally so hue survives when saturation/value hit 0.
  const [hsva, setHsva] = React.useState<HSVA>(() => hexToHsva(hex));
  const [text, setText] = React.useState(hex);
  const latest = React.useRef(hex);
  React.useEffect(() => {
    if (hex.toLowerCase() !== latest.current.toLowerCase()) {
      setHsva(hexToHsva(hex));
      latest.current = hex;
    }
    setText(hex);
  }, [hex]);

  const update = (next: HSVA) => {
    setHsva(next);
    const h = hsvaToHex(next, !!showAlpha);
    latest.current = h;
    setHex(h);
  };
  const complete = () => onChangeComplete?.(latest.current);
  const hsvaRef = React.useRef(hsva);
  hsvaRef.current = hsva;

  const dragSV = useDrag((x, y) => update({ ...hsvaRef.current, s: x, v: 1 - y }), complete);
  const dragHue = useDrag((x) => update({ ...hsvaRef.current, h: x * 359.9 }), complete);
  const dragAlpha = useDrag((x) => update({ ...hsvaRef.current, a: Math.round(x * 100) / 100 }), complete);

  const [r, g, b] = hsvaToRgb(hsva);
  const pure = hsvaToHex({ h: hsva.h, s: 1, v: 1, a: 1 }, false);
  const solid = `rgb(${r}, ${g}, ${b})`;
  const swatch = (
    <span className="lg-color-swatch-fill" style={{ background: `rgba(${r}, ${g}, ${b}, ${hsva.a})` }} />
  );

  const keyNudge = (key: string, axis: 's' | 'v' | 'h' | 'a') => {
    const step = axis === 'h' ? 3 : 0.02;
    const d = key === 'ArrowRight' || key === 'ArrowUp' ? step : key === 'ArrowLeft' || key === 'ArrowDown' ? -step : 0;
    if (!d) return false;
    const cur = hsvaRef.current;
    const nextVal = axis === 'h' ? Math.min(359.9, Math.max(0, cur.h + d)) : clamp01(cur[axis] + d);
    update({ ...cur, [axis]: nextVal });
    return true;
  };

  return (
    <Popup
      trigger="click"
      placement="bottomLeft"
      disabled={disabled}
      content={
        <div className="lg-glass lg-glass-strong lg-color-panel">
          <div
            className="lg-color-sv"
            style={{ background: pure }}
            onPointerDown={dragSV}
            role="slider"
            tabIndex={0}
            aria-label={t.saturation}
            aria-valuetext={`saturation ${Math.round(hsva.s * 100)}%, brightness ${Math.round(hsva.v * 100)}%`}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') keyNudge(e.key, 's') && e.preventDefault();
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') keyNudge(e.key, 'v') && e.preventDefault();
            }}
          >
            <span className="lg-color-sv-thumb" style={{ left: `${hsva.s * 100}%`, top: `${(1 - hsva.v) * 100}%`, background: solid }} />
          </div>
          <div className="lg-color-sliders">
            <div className="lg-color-bars">
              <div
                className="lg-color-bar lg-color-hue"
                onPointerDown={dragHue}
                role="slider"
                tabIndex={0}
                aria-label={t.hue}
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={Math.round(hsva.h)}
                onKeyDown={(e) => keyNudge(e.key, 'h') && e.preventDefault()}
              >
                <span className="lg-color-bar-thumb" style={{ left: `${(hsva.h / 360) * 100}%`, background: pure }} />
              </div>
              {showAlpha && (
                <div
                  className="lg-color-bar lg-color-alpha"
                  onPointerDown={dragAlpha}
                  role="slider"
                  tabIndex={0}
                  aria-label={t.opacity}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(hsva.a * 100)}
                  onKeyDown={(e) => keyNudge(e.key, 'a') && e.preventDefault()}
                >
                  <span className="lg-color-alpha-fill" style={{ background: `linear-gradient(90deg, rgba(${r},${g},${b},0), ${solid})` }} />
                  <span className="lg-color-bar-thumb" style={{ left: `${hsva.a * 100}%`, background: `rgba(${r}, ${g}, ${b}, ${hsva.a})` }} />
                </div>
              )}
            </div>
            <span className="lg-color-preview lg-color-checker">{swatch}</span>
          </div>
          <div className="lg-color-inputs">
            <span className="lg-input lg-input-sm lg-input-filled lg-color-hex">
              <span className="lg-input-prefix">HEX</span>
              <input
                className="lg-input-el"
                value={text}
                spellCheck={false}
                aria-label={t.hexColor}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => {
                  if (isHex(text)) {
                    const h = text.trim().startsWith('#') ? text.trim() : `#${text.trim()}`;
                    update(hexToHsva(h));
                    complete();
                  } else setText(hex);
                }}
                onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
              />
            </span>
            {showAlpha && <span className="lg-color-alpha-text">{Math.round(hsva.a * 100)}%</span>}
          </div>
          {presets.length > 0 && (
            <div className="lg-color-presets">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-label={p}
                  title={p}
                  className={cx('lg-color-preset lg-color-checker', p.toLowerCase() === hex.toLowerCase() && 'lg-selected')}
                  onClick={() => {
                    update(hexToHsva(p));
                    complete();
                  }}
                >
                  <span className="lg-color-swatch-fill" style={{ background: p }} />
                </button>
              ))}
            </div>
          )}
        </div>
      }
    >
      <button
        type="button"
        disabled={disabled}
        aria-label={`Color ${hex}`}
        className={cx('lg-color-trigger lg-glass', `lg-color-trigger-${size}`, showText && 'lg-color-trigger-text', className)}
      >
        <span className="lg-color-swatch lg-color-checker">{swatch}</span>
        {showText && <span className="lg-color-text">{hex.toUpperCase()}</span>}
      </button>
    </Popup>
  );
};

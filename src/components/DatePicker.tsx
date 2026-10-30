import * as React from 'react';
import { cx, useControlled, type Size } from '../utils';
import { useLocale } from './ConfigProvider';
import { Popup } from './Popup';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, CloseCircleFilledIcon } from '../icons';

const sameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const pad = (n: number) => String(n).padStart(2, '0');
export const formatDate = (d: Date, format = 'YYYY-MM-DD') =>
  format
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()));

export interface CalendarProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  disabledDate?: (date: Date) => boolean;
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  locale?: { months?: string[]; weekdays?: string[]; today?: string };
  className?: string;
  /** Wrap in a glass card. */
  bordered?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({ value, defaultValue = null, onChange, disabledDate, weekStartsOn = 1, locale, className, bordered }) => {
  const t = useLocale();
  const [val, setVal] = useControlled<Date | null>(value, defaultValue, onChange as (d: Date | null) => void);
  const [view, setView] = React.useState(() => {
    const d = val ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  React.useEffect(() => {
    if (val) setView(new Date(val.getFullYear(), val.getMonth(), 1));
  }, [val]);
  const months = locale?.months ?? t.months;
  const days = locale?.weekdays ?? t.weekdays;
  const orderedDays = weekStartsOn === 1 ? [...days.slice(1), days[0]] : days;
  const first = (view.getDay() - weekStartsOn + 7) % 7;
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) cells.push(new Date(view.getFullYear(), view.getMonth(), i - first + 1));
  const today = new Date();
  const shift = (m: number) => setView(new Date(view.getFullYear(), view.getMonth() + m, 1));
  return (
    <div className={cx('lg-calendar', bordered && 'lg-glass lg-calendar-bordered', className)}>
      <div className="lg-calendar-header">
        <button type="button" aria-label={t.prevYear} onClick={() => shift(-12)}><ChevronsLeftIcon /></button>
        <button type="button" aria-label={t.prevMonth} onClick={() => shift(-1)}><ChevronLeftIcon /></button>
        <span className="lg-calendar-title">
          {months[view.getMonth()]} {view.getFullYear()}
        </span>
        <button type="button" aria-label={t.nextMonth} onClick={() => shift(1)}><ChevronRightIcon /></button>
        <button type="button" aria-label={t.nextYear} onClick={() => shift(12)}><ChevronsRightIcon /></button>
      </div>
      <div className="lg-calendar-grid" role="grid">
        {orderedDays.map((d) => (
          <span key={d} className="lg-calendar-weekday" role="columnheader">{d}</span>
        ))}
        {cells.map((d) => {
          const out = d.getMonth() !== view.getMonth();
          const dis = disabledDate?.(d);
          return (
            <button
              key={d.toISOString()}
              type="button"
              role="gridcell"
              disabled={dis}
              aria-selected={sameDay(d, val)}
              className={cx('lg-calendar-cell', out && 'lg-out', sameDay(d, today) && 'lg-today', sameDay(d, val) && 'lg-selected')}
              onClick={() => setVal(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="lg-calendar-footer">
        <button type="button" className="lg-calendar-today" onClick={() => setVal(new Date(today.getFullYear(), today.getMonth(), today.getDate()))}>
          {locale?.today ?? t.today}
        </button>
      </div>
    </div>
  );
};

export interface DatePickerProps extends Omit<CalendarProps, 'onChange' | 'bordered' | 'className'> {
  onChange?: (date: Date | null, formatted: string) => void;
  format?: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  allowClear?: boolean;
  status?: 'error' | 'warning';
  className?: string;
  style?: React.CSSProperties;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue = null,
  onChange,
  format = 'YYYY-MM-DD',
  placeholder,
  size = 'md',
  disabled,
  allowClear = true,
  status,
  className,
  style,
  ...calendarProps
}) => {
  const t = useLocale();
  const [val, setVal] = useControlled<Date | null>(value, defaultValue);
  const [open, setOpen] = React.useState(false);
  const change = (d: Date | null) => {
    setVal(d);
    onChange?.(d, d ? formatDate(d, format) : '');
  };
  return (
    <Popup
      trigger="click"
      placement="bottomLeft"
      open={open && !disabled}
      onOpenChange={setOpen}
      content={
        <div className="lg-glass lg-glass-strong lg-datepicker-panel">
          <Calendar
            {...calendarProps}
            value={val}
            onChange={(d) => {
              change(d);
              setOpen(false);
            }}
          />
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
        <span className={cx('lg-datepicker-value', !val && 'lg-select-placeholder')}>{val ? formatDate(val, format) : placeholder ?? t.selectDate}</span>
        {allowClear && val && !disabled ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={t.clear}
            className="lg-input-clear"
            onClick={(e) => {
              e.stopPropagation();
              change(null);
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

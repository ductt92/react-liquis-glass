import * as React from 'react';
import { cx, useControlled, useId, type Size, normalizeText } from '../utils';
import { Popup } from './Popup';
import { CheckIcon, ChevronDownIcon, CloseIcon, CloseCircleFilledIcon, SearchIcon } from '../icons';

export interface SelectOption<V = string | number> {
  label: React.ReactNode;
  value: V;
  disabled?: boolean;
  icon?: React.ReactNode;
  /** Optional text used for search when label is not a string. */
  searchText?: string;
}

export interface SelectOptionGroup<V = string | number> {
  label: React.ReactNode;
  options: SelectOption<V>[];
}

interface SelectBaseProps<V> {
  options: (SelectOption<V> | SelectOptionGroup<V>)[];
  placeholder?: React.ReactNode;
  size?: Size;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  status?: 'error' | 'warning';
  notFoundContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  prefix?: React.ReactNode;
}

export interface SingleSelectProps<V> extends SelectBaseProps<V> {
  multiple?: false;
  value?: V | null;
  defaultValue?: V | null;
  onChange?: (value: V | null) => void;
}
export interface MultiSelectProps<V> extends SelectBaseProps<V> {
  multiple: true;
  value?: V[];
  defaultValue?: V[];
  onChange?: (value: V[]) => void;
  maxTagCount?: number;
}
export type SelectProps<V = string | number> = SingleSelectProps<V> | MultiSelectProps<V>;

const isGroup = <V,>(o: SelectOption<V> | SelectOptionGroup<V>): o is SelectOptionGroup<V> => 'options' in o;
const textOf = (o: SelectOption<any>) => o.searchText ?? (typeof o.label === 'string' || typeof o.label === 'number' ? String(o.label) : String(o.value));

function SelectImpl<V extends string | number = string>(props: SelectProps<V>) {
  const { options, placeholder = 'Select…', size = 'md', disabled, allowClear, showSearch, status, notFoundContent = 'No options', className, style, prefix } = props;
  const multiple = props.multiple === true;
  const [value, setValue] = useControlled<any>(props.value, props.defaultValue ?? (multiple ? [] : null), props.onChange as any);
  const [open, setOpen] = useControlled<boolean>(props.open, false, props.onOpenChange);
  const [query, setQuery] = React.useState('');
  const [activeIdx, setActiveIdx] = React.useState(0);
  const listId = useId('lg-select');
  const searchRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const flat = React.useMemo(() => options.flatMap((o) => (isGroup(o) ? o.options : [o])), [options]);
  const q = normalizeText(query.trim());
  const filteredGroups = React.useMemo(
    () =>
      options
        .map((o) =>
          isGroup(o)
            ? { ...o, options: o.options.filter((x) => !q || normalizeText(textOf(x)).includes(q)) }
            : !q || normalizeText(textOf(o)).includes(q)
              ? o
              : null,
        )
        .filter((o): o is SelectOption<V> | SelectOptionGroup<V> => !!o && (!isGroup(o) || o.options.length > 0)),
    [options, q],
  );
  const visible = filteredGroups.flatMap((o) => (isGroup(o) ? o.options : [o]));
  const selected: V[] = multiple ? value : value == null ? [] : [value];
  const isSel = (v: V) => selected.includes(v);

  React.useEffect(() => {
    if (open) {
      setActiveIdx(Math.max(0, visible.findIndex((o) => isSel(o.value))));
      setTimeout(() => searchRef.current?.focus(), 30);
    } else setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const choose = (o: SelectOption<V>) => {
    if (o.disabled) return;
    if (multiple) setValue(isSel(o.value) ? selected.filter((v) => v !== o.value) : [...selected, o.value]);
    else {
      setValue(o.value);
      setOpen(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') (e.preventDefault(), setActiveIdx((i) => Math.min(visible.length - 1, i + 1)));
    else if (e.key === 'ArrowUp') (e.preventDefault(), setActiveIdx((i) => Math.max(0, i - 1)));
    else if (e.key === 'Enter') {
      e.preventDefault();
      const o = visible[activeIdx];
      if (o) choose(o);
    } else if (e.key === 'Backspace' && multiple && !query && selected.length) setValue(selected.slice(0, -1));
  };

  let idx = -1;
  const renderOption = (o: SelectOption<V>) => {
    idx++;
    const i = idx;
    return (
      <div
        key={String(o.value)}
        role="option"
        data-idx={i}
        aria-selected={isSel(o.value)}
        aria-disabled={o.disabled}
        className={cx('lg-select-option', isSel(o.value) && 'lg-selected', i === activeIdx && 'lg-active', o.disabled && 'lg-disabled')}
        onMouseEnter={() => setActiveIdx(i)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => choose(o)}
      >
        {o.icon && <span className="lg-select-option-icon">{o.icon}</span>}
        <span className="lg-select-option-label">{o.label}</span>
        {isSel(o.value) && <CheckIcon className="lg-select-option-check" />}
      </div>
    );
  };

  const dropdown = (
    <div className="lg-select-dropdown lg-glass lg-glass-strong" onKeyDown={onKeyDown}>
      {showSearch && (
        <div className="lg-select-search">
          <SearchIcon />
          <input
            ref={searchRef}
            value={query}
            placeholder="Search…"
            aria-controls={listId}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
          />
        </div>
      )}
      <div id={listId} ref={listRef} role="listbox" aria-multiselectable={multiple} className="lg-select-list">
        {visible.length === 0 && <div className="lg-select-empty">{notFoundContent}</div>}
        {filteredGroups.map((o, gi) =>
          isGroup(o) ? (
            <div key={gi} role="group" className="lg-select-group">
              <div className="lg-select-group-label">{o.label}</div>
              {o.options.map(renderOption)}
            </div>
          ) : (
            renderOption(o)
          ),
        )}
      </div>
    </div>
  );

  const selectedOptions = selected.map((v) => flat.find((o) => o.value === v)).filter(Boolean) as SelectOption<V>[];
  const maxTag = multiple ? (props as MultiSelectProps<V>).maxTagCount : undefined;
  const shownTags = maxTag != null ? selectedOptions.slice(0, maxTag) : selectedOptions;

  return (
    <Popup content={dropdown} open={open && !disabled} onOpenChange={setOpen} trigger="click" placement="bottomLeft" matchWidth offset={6} role="presentation">
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        className={cx(
          'lg-select lg-input lg-glass',
          `lg-input-${size}`,
          open && 'lg-select-open',
          status && `lg-input-${status}`,
          disabled && 'lg-input-disabled',
          multiple && 'lg-select-multiple',
          className,
        )}
        style={style}
        onKeyDown={onKeyDown}
      >
        {prefix && <span className="lg-input-prefix">{prefix}</span>}
        <div className="lg-select-value">
          {selectedOptions.length === 0 && <span className="lg-select-placeholder">{placeholder}</span>}
          {!multiple && selectedOptions[0] && (
            <span className="lg-select-single">
              {selectedOptions[0].icon}
              {selectedOptions[0].label}
            </span>
          )}
          {multiple &&
            shownTags.map((o) => (
              <span key={String(o.value)} className="lg-select-tag">
                {o.label}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(selected.filter((v) => v !== o.value));
                  }}
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
          {multiple && maxTag != null && selectedOptions.length > maxTag && (
            <span className="lg-select-tag">+{selectedOptions.length - maxTag}</span>
          )}
        </div>
        {allowClear && selected.length > 0 && !disabled ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear"
            className="lg-input-clear lg-select-clear"
            onClick={(e) => {
              e.stopPropagation();
              setValue(multiple ? [] : null);
            }}
          >
            <CloseCircleFilledIcon />
          </button>
        ) : (
          <ChevronDownIcon className="lg-select-arrow" />
        )}
      </div>
    </Popup>
  );
}

interface SelectComponent {
  <V extends string | number = string>(props: MultiSelectProps<V>): React.ReactElement;
  <V extends string | number = string>(props: SingleSelectProps<V>): React.ReactElement;
}

/** Single or multiple select with search, groups and keyboard navigation. */
export const Select = SelectImpl as SelectComponent;

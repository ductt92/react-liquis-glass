import * as React from 'react';
import { cx, useControlled, type Size, normalizeText } from '../utils';
import { Popup } from './Popup';
import { Checkbox } from './Selection';
import { Button } from './Button';
import { Empty } from './Display';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseCircleFilledIcon,
  CloseIcon,
  SearchIcon,
} from '../icons';

/* ───────── shared tree helpers ───────── */
export interface TreeNode {
  key: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  isLeaf?: boolean;
}

interface TreeIndex {
  byKey: Map<string, TreeNode>;
  parent: Map<string, string | null>;
}

function indexTree(nodes: TreeNode[]): TreeIndex {
  const byKey = new Map<string, TreeNode>();
  const parent = new Map<string, string | null>();
  const walk = (list: TreeNode[], p: string | null) =>
    list.forEach((n) => {
      byKey.set(n.key, n);
      parent.set(n.key, p);
      if (n.children) walk(n.children, n.key);
    });
  walk(nodes, null);
  return { byKey, parent };
}

const nodeText = (n: TreeNode) => (typeof n.title === 'string' || typeof n.title === 'number' ? String(n.title) : n.key);
const hasChildren = (n: TreeNode) => !n.isLeaf && !!n.children?.length;

function allParentKeys(nodes: TreeNode[]): string[] {
  const out: string[] = [];
  const walk = (list: TreeNode[]) =>
    list.forEach((n) => {
      if (hasChildren(n)) {
        out.push(n.key);
        walk(n.children!);
      }
    });
  walk(nodes);
  return out;
}

/** Keeps nodes whose text matches, plus their ancestors. */
function filterTree(nodes: TreeNode[], q: string): TreeNode[] {
  if (!q) return nodes;
  const lower = normalizeText(q);
  return nodes.flatMap((n) => {
    const kids = n.children ? filterTree(n.children, q) : [];
    if (normalizeText(nodeText(n)).includes(lower)) return [n];
    return kids.length ? [{ ...n, children: kids }] : [];
  });
}

/** Cascades a check toggle down to descendants and back up to ancestors. */
function conductCheck(index: TreeIndex, checked: Set<string>, key: string, on: boolean): Set<string> {
  const next = new Set(checked);
  const down = (n: TreeNode) => {
    if (n.disabled) return;
    if (on) next.add(n.key);
    else next.delete(n.key);
    n.children?.forEach(down);
  };
  const node = index.byKey.get(key);
  if (!node) return next;
  down(node);
  let p = index.parent.get(key) ?? null;
  while (p) {
    const pn = index.byKey.get(p)!;
    const kids = (pn.children ?? []).filter((c) => !c.disabled);
    if (kids.length && kids.every((c) => next.has(c.key))) next.add(p);
    else next.delete(p);
    p = index.parent.get(p) ?? null;
  }
  return next;
}

function isHalfChecked(n: TreeNode, checked: Set<string>): boolean {
  if (!hasChildren(n) || checked.has(n.key)) return false;
  return n.children!.some((c) => checked.has(c.key) || isHalfChecked(c, checked));
}

/* ───────── Tree ───────── */
export interface TreeProps {
  treeData: TreeNode[];
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultExpandAll?: boolean;
  onExpand?: (keys: string[]) => void;
  selectable?: boolean;
  /** Allow selecting several nodes. */
  multiple?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (keys: string[], node: TreeNode) => void;
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  onCheck?: (keys: string[], node: TreeNode) => void;
  /** Draw indent guide lines. */
  showLine?: boolean;
  showIcon?: boolean;
  /** Wrap in a glass panel. */
  glass?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Tree: React.FC<TreeProps> = ({
  treeData,
  expandedKeys,
  defaultExpandedKeys,
  defaultExpandAll,
  onExpand,
  selectable = true,
  multiple,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelect,
  checkable,
  checkedKeys,
  defaultCheckedKeys = [],
  onCheck,
  showLine,
  showIcon = true,
  glass,
  className,
  style,
}) => {
  const index = React.useMemo(() => indexTree(treeData), [treeData]);
  const [expanded, setExpanded] = useControlled<string[]>(
    expandedKeys,
    defaultExpandedKeys ?? (defaultExpandAll ? allParentKeys(treeData) : []),
    onExpand,
  );
  const [selected, setSelected] = useControlled<string[]>(selectedKeys, defaultSelectedKeys);
  const [checkedArr, setCheckedArr] = useControlled<string[]>(checkedKeys, defaultCheckedKeys);
  const checked = React.useMemo(() => new Set(checkedArr), [checkedArr]);
  const [focusKey, setFocusKey] = React.useState<string | null>(null);

  const toggleExpand = (k: string) => setExpanded(expanded.includes(k) ? expanded.filter((x) => x !== k) : [...expanded, k]);
  const select = (n: TreeNode) => {
    if (!selectable || n.disabled) return;
    const next = multiple ? (selected.includes(n.key) ? selected.filter((k) => k !== n.key) : [...selected, n.key]) : [n.key];
    setSelected(next);
    onSelect?.(next, n);
  };
  const check = (n: TreeNode) => {
    if (n.disabled) return;
    const next = Array.from(conductCheck(index, checked, n.key, !checked.has(n.key)));
    setCheckedArr(next);
    onCheck?.(next, n);
  };

  // Visible nodes in order, for keyboard navigation.
  const visible: TreeNode[] = [];
  const collect = (list: TreeNode[]) =>
    list.forEach((n) => {
      visible.push(n);
      if (hasChildren(n) && expanded.includes(n.key)) collect(n.children!);
    });
  collect(treeData);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = visible.findIndex((n) => n.key === focusKey);
    const cur = visible[i];
    if (e.key === 'ArrowDown') (e.preventDefault(), setFocusKey(visible[Math.min(visible.length - 1, i + 1)]?.key ?? null));
    else if (e.key === 'ArrowUp') (e.preventDefault(), setFocusKey(visible[Math.max(0, i - 1)]?.key ?? null));
    else if (!cur) return;
    else if (e.key === 'ArrowRight' && hasChildren(cur) && !expanded.includes(cur.key)) (e.preventDefault(), toggleExpand(cur.key));
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (hasChildren(cur) && expanded.includes(cur.key)) toggleExpand(cur.key);
      else setFocusKey(index.parent.get(cur.key) ?? cur.key);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (checkable) check(cur);
      else select(cur);
    }
  };

  const renderNodes = (list: TreeNode[], depth: number): React.ReactNode =>
    list.map((n) => {
      const open = expanded.includes(n.key);
      const parent = hasChildren(n);
      const isChecked = checked.has(n.key);
      return (
        <li key={n.key} role="treeitem" aria-expanded={parent ? open : undefined} aria-selected={selected.includes(n.key)} className={cx('lg-tree-node', open && 'lg-open')}>
          <div
            className={cx(
              'lg-tree-row',
              selected.includes(n.key) && 'lg-selected',
              n.disabled && 'lg-disabled',
              focusKey === n.key && 'lg-focused',
            )}
            style={{ paddingLeft: 6 + depth * 20 }}
            onClick={() => {
              setFocusKey(n.key);
              if (checkable && !selectable) check(n);
              else select(n);
            }}
          >
            {showLine && depth > 0 && (
              <span className="lg-tree-guides" aria-hidden>
                {Array.from({ length: depth }, (_, i) => (
                  <span key={i} className="lg-tree-guide" style={{ left: 16 + i * 20 }} />
                ))}
              </span>
            )}
            <span
              className={cx('lg-tree-switcher', !parent && 'lg-tree-switcher-leaf')}
              onClick={(e) => {
                if (!parent) return;
                e.stopPropagation();
                toggleExpand(n.key);
              }}
            >
              {parent && <ChevronRightIcon />}
            </span>
            {checkable && (
              <span onClick={(e) => e.stopPropagation()} className="lg-tree-check">
                <Checkbox
                  checked={isChecked}
                  indeterminate={!isChecked && isHalfChecked(n, checked)}
                  disabled={n.disabled}
                  aria-label={nodeText(n)}
                  onChange={() => check(n)}
                />
              </span>
            )}
            {showIcon && n.icon && <span className="lg-tree-icon">{n.icon}</span>}
            <span className="lg-tree-title">{n.title}</span>
          </div>
          {parent && (
            <div className="lg-tree-children">
              <ul role="group" className="lg-tree-children-inner">
                {renderNodes(n.children!, depth + 1)}
              </ul>
            </div>
          )}
        </li>
      );
    });

  return (
    <ul
      role="tree"
      tabIndex={0}
      aria-multiselectable={multiple || undefined}
      className={cx('lg-tree', showLine && 'lg-tree-show-line', glass && 'lg-glass lg-tree-glass', className)}
      style={style}
      onKeyDown={onKeyDown}
      onFocus={() => !focusKey && visible[0] && setFocusKey(visible[0].key)}
    >
      {treeData.length ? renderNodes(treeData, 0) : <li><Empty /></li>}
    </ul>
  );
};

/* ───────── shared select-like trigger ───────── */
interface TriggerProps {
  open: boolean;
  size: Size;
  disabled?: boolean;
  status?: 'error' | 'warning';
  multiple?: boolean;
  placeholder: React.ReactNode;
  display: React.ReactNode;
  tags?: { key: string; label: React.ReactNode; onRemove: () => void }[];
  showClear: boolean;
  onClear: () => void;
  className?: string;
  style?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SelectTrigger = React.forwardRef<HTMLDivElement, TriggerProps & React.HTMLAttributes<HTMLDivElement>>(function SelectTrigger(
  { open, size, disabled, status, multiple, placeholder, display, tags, showClear, onClear, className, style, onKeyDown, ...rest },
  ref,
) {
  const empty = multiple ? !tags?.length : display == null;
  return (
    <div
      ref={ref}
      role="combobox"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={open}
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
      {...rest}
    >
      <div className="lg-select-value">
        {empty && <span className="lg-select-placeholder">{placeholder}</span>}
        {!multiple && !empty && <span className="lg-select-single">{display}</span>}
        {multiple &&
          tags?.map((t) => (
            <span key={t.key} className="lg-select-tag">
              {t.label}
              <button
                type="button"
                tabIndex={-1}
                aria-label="Remove"
                onClick={(e) => {
                  e.stopPropagation();
                  t.onRemove();
                }}
              >
                <CloseIcon />
              </button>
            </span>
          ))}
      </div>
      {showClear && !empty && !disabled ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear"
          className="lg-input-clear lg-select-clear"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <CloseCircleFilledIcon />
        </button>
      ) : (
        <ChevronDownIcon className="lg-select-arrow" />
      )}
    </div>
  );
});

const SearchBox: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean }> = ({ value, onChange, placeholder = 'Search…', autoFocus }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (autoFocus) setTimeout(() => ref.current?.focus(), 30);
  }, [autoFocus]);
  return (
    <div className="lg-select-search">
      <SearchIcon />
      <input ref={ref} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

/* ───────── TreeSelect ───────── */
export interface TreeSelectProps {
  treeData: TreeNode[];
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onChange?: (value: any) => void;
  /** Select several nodes by clicking. */
  multiple?: boolean;
  /** Use checkboxes with parent/child cascade. Implies multiple. */
  treeCheckable?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  placeholder?: React.ReactNode;
  size?: Size;
  disabled?: boolean;
  status?: 'error' | 'warning';
  treeDefaultExpandAll?: boolean;
  showLine?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TreeSelect: React.FC<TreeSelectProps> = ({
  treeData,
  value,
  defaultValue,
  onChange,
  multiple: multipleProp,
  treeCheckable,
  showSearch,
  allowClear,
  placeholder = 'Select…',
  size = 'md',
  disabled,
  status,
  treeDefaultExpandAll,
  showLine,
  className,
  style,
}) => {
  const multiple = !!(multipleProp || treeCheckable);
  const [val, setVal] = useControlled<any>(value, defaultValue ?? (multiple ? [] : null), onChange);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState<string[]>(() => (treeDefaultExpandAll ? allParentKeys(treeData) : []));
  const index = React.useMemo(() => indexTree(treeData), [treeData]);
  const keys: string[] = multiple ? val ?? [] : val == null ? [] : [val];
  const filtered = React.useMemo(() => filterTree(treeData, query.trim()), [treeData, query]);

  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  // With checkboxes, show only the top-most checked node of each branch as a tag.
  const tagKeys = treeCheckable ? keys.filter((k) => !keys.includes(index.parent.get(k) ?? '')) : keys;
  const set = new Set(keys);

  const tree = (
    <div className="lg-select-dropdown lg-glass lg-glass-strong lg-treeselect-dropdown">
      {showSearch && <SearchBox value={query} onChange={setQuery} autoFocus />}
      <div className="lg-treeselect-list">
        {filtered.length === 0 ? (
          <div className="lg-select-empty">No results</div>
        ) : (
          <Tree
            treeData={filtered}
            expandedKeys={query ? allParentKeys(filtered) : expanded}
            onExpand={(k) => !query && setExpanded(k)}
            showLine={showLine}
            multiple={multipleProp && !treeCheckable}
            checkable={treeCheckable}
            selectable={!treeCheckable}
            checkedKeys={treeCheckable ? keys : undefined}
            onCheck={(k) => setVal(k)}
            selectedKeys={treeCheckable ? [] : keys}
            onSelect={(k) => {
              if (multiple) setVal(k);
              else {
                setVal(k[0] ?? null);
                setOpen(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <Popup content={tree} open={open && !disabled} onOpenChange={setOpen} trigger="click" placement="bottomLeft" matchWidth offset={6} role="presentation">
      <SelectTrigger
        open={open}
        size={size}
        disabled={disabled}
        status={status}
        multiple={multiple}
        placeholder={placeholder}
        display={keys[0] != null ? index.byKey.get(keys[0])?.title ?? keys[0] : null}
        tags={tagKeys.map((k) => ({
          key: k,
          label: index.byKey.get(k)?.title ?? k,
          onRemove: () => setVal(treeCheckable ? Array.from(conductCheck(index, set, k, false)) : keys.filter((x) => x !== k)),
        }))}
        showClear={!!allowClear}
        onClear={() => setVal(multiple ? [] : null)}
        className={className}
        style={style}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === 'ArrowDown') && !open && (e.preventDefault(), setOpen(true))}
      />
    </Popup>
  );
};

/* ───────── Cascader ───────── */
export interface CascaderOption {
  value: string | number;
  label: React.ReactNode;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  /** Allow picking a non-leaf option. */
  changeOnSelect?: boolean;
  expandTrigger?: 'click' | 'hover';
  showSearch?: boolean;
  allowClear?: boolean;
  placeholder?: React.ReactNode;
  separator?: string;
  /** Custom label for the selected path. */
  displayRender?: (labels: React.ReactNode[], options: CascaderOption[]) => React.ReactNode;
  size?: Size;
  disabled?: boolean;
  status?: 'error' | 'warning';
  className?: string;
  style?: React.CSSProperties;
}

const optText = (o: CascaderOption) => (typeof o.label === 'string' || typeof o.label === 'number' ? String(o.label) : String(o.value));

function pathOptions(options: CascaderOption[], path: (string | number)[]): CascaderOption[] {
  const out: CascaderOption[] = [];
  let list: CascaderOption[] | undefined = options;
  for (const v of path) {
    const o: CascaderOption | undefined = list?.find((x) => x.value === v);
    if (!o) break;
    out.push(o);
    list = o.children;
  }
  return out;
}

export const Cascader: React.FC<CascaderProps> = ({
  options,
  value,
  defaultValue = [],
  onChange,
  changeOnSelect,
  expandTrigger = 'click',
  showSearch,
  allowClear = true,
  placeholder = 'Select…',
  separator = ' / ',
  displayRender,
  size = 'md',
  disabled,
  status,
  className,
  style,
}) => {
  const [val, setValInner] = useControlled<(string | number)[]>(value, defaultValue);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<(string | number)[]>(val);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (open) setActive(val);
    else setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const commit = (path: (string | number)[]) => {
    setValInner(path);
    onChange?.(path, pathOptions(options, path));
  };

  const columns: CascaderOption[][] = [options];
  pathOptions(options, active).forEach((o) => o.children?.length && columns.push(o.children));

  const choose = (depth: number, o: CascaderOption, viaHover = false) => {
    if (o.disabled) return;
    const path = [...active.slice(0, depth), o.value];
    setActive(path);
    if (viaHover) return;
    if (!o.children?.length) {
      commit(path);
      setOpen(false);
    } else if (changeOnSelect) commit(path);
  };

  const searchResults = React.useMemo(() => {
    const q = normalizeText(query.trim());
    if (!q) return [];
    const out: CascaderOption[][] = [];
    const walk = (list: CascaderOption[], trail: CascaderOption[]) =>
      list.forEach((o) => {
        if (o.disabled) return;
        const t = [...trail, o];
        const leaf = !o.children?.length;
        if ((leaf || changeOnSelect) && t.some((x) => normalizeText(optText(x)).includes(q))) out.push(t);
        if (!leaf) walk(o.children!, t);
      });
    walk(options, []);
    return out.slice(0, 50);
  }, [options, query, changeOnSelect]);

  const selected = pathOptions(options, val);
  const display = selected.length
    ? displayRender
      ? displayRender(selected.map((o) => o.label), selected)
      : selected.map((o, i) => (
          <React.Fragment key={String(o.value)}>
            {i > 0 && separator}
            {o.label}
          </React.Fragment>
        ))
    : null;

  const dropdown = (
    <div className="lg-select-dropdown lg-glass lg-glass-strong lg-cascader-dropdown">
      {showSearch && <SearchBox value={query} onChange={setQuery} autoFocus />}
      {query.trim() ? (
        <div className="lg-select-list lg-cascader-search">
          {searchResults.length === 0 && <div className="lg-select-empty">No results</div>}
          {searchResults.map((trail) => (
            <div
              key={trail.map((o) => o.value).join('/')}
              role="option"
              className="lg-select-option"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                commit(trail.map((o) => o.value));
                setOpen(false);
              }}
            >
              <span className="lg-select-option-label">
                {trail.map((o, i) => (
                  <React.Fragment key={String(o.value)}>
                    {i > 0 && <span className="lg-cascader-sep">{separator}</span>}
                    {o.label}
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="lg-cascader-columns">
          {columns.map((col, depth) => (
            <ul key={depth} role="listbox" className="lg-cascader-column">
              {col.map((o) => {
                const isActive = active[depth] === o.value;
                const isSel = val[depth] === o.value && val.length > depth;
                return (
                  <li
                    key={String(o.value)}
                    role="option"
                    aria-selected={isSel}
                    aria-disabled={o.disabled}
                    className={cx('lg-select-option lg-cascader-option', isActive && 'lg-active', isSel && 'lg-selected', o.disabled && 'lg-disabled')}
                    onMouseEnter={expandTrigger === 'hover' && o.children?.length ? () => choose(depth, o, true) : undefined}
                    onClick={() => choose(depth, o)}
                  >
                    <span className="lg-select-option-label">{o.label}</span>
                    {o.children?.length ? <ChevronRightIcon className="lg-cascader-arrow" /> : null}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Popup content={dropdown} open={open && !disabled} onOpenChange={setOpen} trigger="click" placement="bottomLeft" offset={6} role="presentation">
      <SelectTrigger
        open={open}
        size={size}
        disabled={disabled}
        status={status}
        placeholder={placeholder}
        display={display}
        showClear={allowClear}
        onClear={() => commit([])}
        className={cx('lg-cascader', className)}
        style={style}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === 'ArrowDown') && !open && (e.preventDefault(), setOpen(true))}
      />
    </Popup>
  );
};

/* ───────── Transfer ───────── */
export interface TransferItem {
  key: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface TransferProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[], direction: 'left' | 'right', movedKeys: string[]) => void;
  titles?: [React.ReactNode, React.ReactNode];
  showSearch?: boolean;
  /** Custom filter. Defaults to case-insensitive match on string titles/descriptions. */
  filterOption?: (input: string, item: TransferItem) => boolean;
  render?: (item: TransferItem) => React.ReactNode;
  listHeight?: number;
  disabled?: boolean;
  className?: string;
}

const itemText = (it: TransferItem) =>
  [it.title, it.description].filter((x) => typeof x === 'string' || typeof x === 'number').join(' ');

interface PanelProps {
  title: React.ReactNode;
  items: TransferItem[];
  checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
  showSearch?: boolean;
  filterOption?: TransferProps['filterOption'];
  render?: TransferProps['render'];
  height: number;
  disabled?: boolean;
}

const TransferPanel: React.FC<PanelProps> = ({ title, items, checked, setChecked, showSearch, filterOption, render, height, disabled }) => {
  const [q, setQ] = React.useState('');
  const shown = q.trim()
    ? items.filter((it) => (filterOption ? filterOption(q, it) : normalizeText(itemText(it)).includes(normalizeText(q.trim()))))
    : items;
  const enabled = shown.filter((it) => !it.disabled).map((it) => it.key);
  const all = enabled.length > 0 && enabled.every((k) => checked.includes(k));
  const some = !all && enabled.some((k) => checked.includes(k));
  return (
    <div className={cx('lg-transfer-panel lg-glass', disabled && 'lg-disabled')}>
      <div className="lg-transfer-header">
        <Checkbox
          checked={all}
          indeterminate={some}
          disabled={disabled || enabled.length === 0}
          aria-label="Select all"
          onChange={(c) => setChecked((prev) => (c ? Array.from(new Set([...prev, ...enabled])) : prev.filter((k) => !enabled.includes(k))))}
        />
        <span className="lg-transfer-count">
          {checked.length > 0 ? `${checked.length}/` : ''}
          {items.length} items
        </span>
        <span className="lg-transfer-title">{title}</span>
      </div>
      {showSearch && (
        <div className="lg-transfer-search">
          <SearchBox value={q} onChange={setQ} />
        </div>
      )}
      <ul className="lg-transfer-list" style={{ height }}>
        {shown.length === 0 && (
          <li className="lg-transfer-empty">
            <Empty description={q ? 'No match' : 'No data'} />
          </li>
        )}
        {shown.map((it) => {
          const isChecked = checked.includes(it.key);
          const off = disabled || it.disabled;
          return (
            <li
              key={it.key}
              className={cx('lg-transfer-item', isChecked && 'lg-checked', off && 'lg-disabled')}
              onClick={() => !off && setChecked((prev) => (prev.includes(it.key) ? prev.filter((k) => k !== it.key) : [...prev, it.key]))}
            >
              <span onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isChecked}
                  disabled={off}
                  aria-label={typeof it.title === 'string' ? it.title : it.key}
                  onChange={(c) => setChecked((prev) => (c ? [...prev, it.key] : prev.filter((k) => k !== it.key)))}
                />
              </span>
              <div className="lg-transfer-item-main">
                {render ? (
                  render(it)
                ) : (
                  <>
                    <div className="lg-transfer-item-title">{it.title}</div>
                    {it.description && <div className="lg-transfer-item-desc">{it.description}</div>}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys,
  defaultTargetKeys = [],
  onChange,
  titles = ['Source', 'Target'],
  showSearch,
  filterOption,
  render,
  listHeight = 240,
  disabled,
  className,
}) => {
  const [target, setTarget] = useControlled<string[]>(targetKeys, defaultTargetKeys);
  const [leftChecked, setLeftChecked] = React.useState<string[]>([]);
  const [rightChecked, setRightChecked] = React.useState<string[]>([]);
  const left = dataSource.filter((it) => !target.includes(it.key));
  const right = target.map((k) => dataSource.find((it) => it.key === k)).filter(Boolean) as TransferItem[];

  const move = (dir: 'left' | 'right') => {
    const moved = dir === 'right' ? leftChecked : rightChecked;
    const next = dir === 'right' ? [...target, ...moved] : target.filter((k) => !moved.includes(k));
    setTarget(next);
    onChange?.(next, dir, moved);
    if (dir === 'right') setLeftChecked([]);
    else setRightChecked([]);
  };

  return (
    <div className={cx('lg-transfer', className)}>
      <TransferPanel
        title={titles[0]}
        items={left}
        checked={leftChecked}
        setChecked={setLeftChecked}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        height={listHeight}
        disabled={disabled}
      />
      <div className="lg-transfer-actions">
        <Button
          size="sm"
          shape="circle"
          variant={leftChecked.length ? 'filled' : 'glass'}
          color="primary"
          aria-label="Move to target"
          icon={<ChevronRightIcon />}
          disabled={disabled || leftChecked.length === 0}
          onClick={() => move('right')}
        />
        <Button
          size="sm"
          shape="circle"
          variant={rightChecked.length ? 'filled' : 'glass'}
          color="primary"
          aria-label="Move to source"
          icon={<ChevronLeftIcon />}
          disabled={disabled || rightChecked.length === 0}
          onClick={() => move('left')}
        />
      </div>
      <TransferPanel
        title={titles[1]}
        items={right}
        checked={rightChecked}
        setChecked={setRightChecked}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        height={listHeight}
        disabled={disabled}
      />
    </div>
  );
};

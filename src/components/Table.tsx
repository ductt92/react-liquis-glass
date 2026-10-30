import * as React from 'react';
import { cx, useControlled } from '../utils';
import { Checkbox } from './Selection';
import { Pagination, type PaginationProps } from './Navigation';
import { Empty } from './Display';
import { Spin } from './Display';
import { ChevronUpIcon, ChevronDownIcon } from '../icons';

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  /** Property to read from the record. Defaults to `key`. */
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  /** `true` for default compare, or a custom compare fn. */
  sorter?: boolean | ((a: T, b: T) => number);
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
}

export type SortOrder = 'ascend' | 'descend' | null;

export interface TableProps<T> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => React.Key);
  loading?: boolean;
  size?: 'sm' | 'md';
  striped?: boolean;
  bordered?: boolean;
  /** `false` to disable. Defaults to client-side pagination with pageSize 10. */
  pagination?: false | Omit<PaginationProps, 'total'> & { total?: number };
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (keys: React.Key[], rows: T[]) => void;
  };
  onRowClick?: (record: T, index: number) => void;
  emptyText?: React.ReactNode;
  sticky?: boolean;
  scrollY?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

function defaultCompare(a: unknown, b: unknown) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true });
}

export function Table<T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'key' as keyof T,
  loading,
  size = 'md',
  striped,
  bordered,
  pagination = {},
  rowSelection,
  onRowClick,
  emptyText,
  sticky,
  scrollY,
  className,
  style,
}: TableProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; order: SortOrder }>({ key: '', order: null });
  const pageSize = (pagination && pagination.pageSize) || 10;
  const [page, setPage] = useControlled(pagination ? pagination.current : undefined, 1, pagination ? (p: number) => pagination.onChange?.(p, pageSize) : undefined);
  const [selected, setSelected] = useControlled<React.Key[]>(rowSelection?.selectedRowKeys, []);

  const getKey = (r: T, i: number): React.Key => (typeof rowKey === 'function' ? rowKey(r) : (r[rowKey] as React.Key) ?? i);

  const sorted = React.useMemo(() => {
    const col = columns.find((c) => c.key === sort.key);
    if (!col || !sort.order || !col.sorter) return dataSource;
    const idx = (col.dataIndex ?? col.key) as keyof T;
    const cmp = typeof col.sorter === 'function' ? col.sorter : (a: T, b: T) => defaultCompare(a[idx], b[idx]);
    const out = [...dataSource].sort(cmp);
    return sort.order === 'descend' ? out.reverse() : out;
  }, [dataSource, columns, sort]);

  const remote = pagination && pagination.total != null;
  const rows = pagination && !remote ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const toggleSort = (key: string) =>
    setSort((s) => ({ key, order: s.key !== key ? 'ascend' : s.order === 'ascend' ? 'descend' : s.order === 'descend' ? null : 'ascend' }));

  const updateSelection = (keys: React.Key[]) => {
    setSelected(keys);
    rowSelection?.onChange?.(keys, dataSource.filter((r, i) => keys.includes(getKey(r, i))));
  };
  const pageKeys = rows.map((r, i) => getKey(r, i));
  const allChecked = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k));
  const someChecked = !allChecked && pageKeys.some((k) => selected.includes(k));

  return (
    <div className={cx('lg-table-wrapper lg-glass', `lg-table-${size}`, bordered && 'lg-table-bordered', striped && 'lg-table-striped', className)} style={style}>
      <Spin spinning={!!loading}>
        <div className="lg-table-scroll" style={scrollY ? { maxHeight: scrollY, overflowY: 'auto' } : undefined}>
          <table className="lg-table">
            <thead className={cx((sticky || scrollY) && 'lg-table-sticky')}>
              <tr>
                {rowSelection && (
                  <th className="lg-table-selection">
                    <Checkbox
                      checked={allChecked}
                      indeterminate={someChecked}
                      aria-label="Select all rows"
                      onChange={(c) => updateSelection(c ? Array.from(new Set([...selected, ...pageKeys])) : selected.filter((k) => !pageKeys.includes(k)))}
                    />
                  </th>
                )}
                {columns.map((c) => (
                  <th
                    key={c.key}
                    style={{ width: c.width, textAlign: c.align }}
                    className={cx(c.sorter && 'lg-table-sortable')}
                    aria-sort={sort.key === c.key && sort.order ? (sort.order === 'ascend' ? 'ascending' : 'descending') : undefined}
                    onClick={c.sorter ? () => toggleSort(c.key) : undefined}
                  >
                    <span className="lg-table-th">
                      {c.title}
                      {c.sorter && (
                        <span className="lg-table-sorter">
                          <ChevronUpIcon className={cx(sort.key === c.key && sort.order === 'ascend' && 'lg-on')} />
                          <ChevronDownIcon className={cx(sort.key === c.key && sort.order === 'descend' && 'lg-on')} />
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="lg-table-empty">
                    {emptyText ?? <Empty />}
                  </td>
                </tr>
              )}
              {rows.map((r, i) => {
                const k = getKey(r, i);
                const isSel = selected.includes(k);
                return (
                  <tr key={k} className={cx(isSel && 'lg-table-row-selected', onRowClick && 'lg-table-row-clickable')} onClick={onRowClick ? () => onRowClick(r, i) : undefined}>
                    {rowSelection && (
                      <td className="lg-table-selection" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={isSel} aria-label="Select row" onChange={(c) => updateSelection(c ? [...selected, k] : selected.filter((x) => x !== k))} />
                      </td>
                    )}
                    {columns.map((c) => {
                      const v = r[(c.dataIndex ?? c.key) as keyof T];
                      return (
                        <td key={c.key} style={{ textAlign: c.align }} className={cx(c.ellipsis && 'lg-table-ellipsis')}>
                          {c.render ? c.render(v, r, i) : (v as React.ReactNode)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Spin>
      {pagination && (remote ? pagination.total! : sorted.length) > pageSize && (
        <div className="lg-table-pagination">
          <Pagination {...pagination} current={page} pageSize={pageSize} total={remote ? pagination.total! : sorted.length} onChange={(p) => setPage(p)} size="sm" />
        </div>
      )}
    </div>
  );
}

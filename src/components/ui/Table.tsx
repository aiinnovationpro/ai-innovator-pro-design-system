import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T, i: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  striped?: boolean;
  pageSize?: number;
  className?: string;
}

type SortDir = 'asc' | 'desc' | null;

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data available',
  striped = false,
  pageSize,
  className = '',
}: TableProps<T>) {
  const [sortKey, setSortKey]   = useState<string | null>(null);
  const [sortDir, setSortDir]   = useState<SortDir>(null);
  const [page, setPage]         = useState(1);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  }

  let sorted = [...data];
  if (sortKey && sortDir) {
    sorted.sort((a, b) => {
      const av = a[sortKey as keyof T] as unknown;
      const bv = b[sortKey as keyof T] as unknown;
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const paginated  = pageSize ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <div className={`rounded-lg border border-[var(--color-border)] overflow-hidden ${className}`}
         style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-bg)' }}>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={[
                    'px-4 py-3 font-semibold text-xs uppercase tracking-wider',
                    alignClass[col.align ?? 'left'],
                    col.sortable ? 'cursor-pointer select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-fast' : '',
                  ].join(' ')}
                  style={{ color: 'var(--color-text-tertiary)', width: col.width }}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="opacity-50">
                        {sortKey === String(col.key) && sortDir === 'asc'  ? <ChevronUp  size={13} /> :
                         sortKey === String(col.key) && sortDir === 'desc' ? <ChevronDown size={13} /> :
                         <ChevronsUpDown size={13} />}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={i}
                  className={[
                    'border-b border-[var(--color-border)] last:border-0 transition-fast hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                    striped && i % 2 === 1 ? 'bg-neutral-50/50 dark:bg-neutral-800/20' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {columns.map(col => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3 ${alignClass[col.align ?? 'left']}`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {col.render
                        ? col.render(row, i)
                        : String((row[col.key as keyof T] as unknown) ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize && totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <span className="text-xs">
            Page {page} of {totalPages} &middot; {sorted.length} rows
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded transition-fast hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded transition-fast hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

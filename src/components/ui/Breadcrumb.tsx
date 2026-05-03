import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = false }: BreadcrumbProps) {
  const all = showHome
    ? [{ label: 'Home', icon: <Home size={14} />, href: '/' }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 flex-wrap">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  size={14}
                  className="shrink-0"
                  style={{ color: 'var(--color-text-tertiary)' }}
                />
              )}
              {isLast ? (
                <span
                  className="text-sm font-medium flex items-center gap-1"
                  style={{ color: 'var(--color-text-primary)' }}
                  aria-current="page"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  className="text-sm flex items-center gap-1 transition-fast hover:underline"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

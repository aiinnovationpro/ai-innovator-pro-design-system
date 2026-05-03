import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pills' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const sizeClasses = {
  sm:  'text-sm px-3 py-1.5',
  md:  'text-sm px-4 py-2',
  lg:  'text-base px-5 py-2.5',
};

export function Tabs({
  tabs,
  activeTab: controlled,
  onChange,
  variant = 'underline',
  size = 'md',
  children,
}: TabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.id ?? '');
  const active = controlled ?? internal;

  function handleChange(id: string) {
    setInternal(id);
    onChange?.(id);
  }

  return (
    <div>
      <div
        className={[
          'flex',
          variant === 'underline' ? 'border-b border-[var(--color-border)]' : '',
          variant === 'pills'    ? 'gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800' : '',
          variant === 'bordered' ? 'border border-[var(--color-border)] rounded-lg overflow-hidden divide-x divide-[var(--color-border)]' : '',
        ].filter(Boolean).join(' ')}
        role="tablist"
      >
        {tabs.map(tab => {
          const isActive = tab.id === active;

          let tabClass = '';
          if (variant === 'underline') {
            tabClass = isActive
              ? 'border-b-2 border-navy-600 text-navy-600 dark:text-navy-300 -mb-px'
              : 'border-b-2 border-transparent hover:border-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-300';
          } else if (variant === 'pills') {
            tabClass = isActive
              ? 'bg-white dark:bg-neutral-700 text-navy-600 dark:text-navy-300 shadow-sm rounded-md'
              : 'hover:bg-white/50 dark:hover:bg-neutral-700/50 rounded-md';
          } else if (variant === 'bordered') {
            tabClass = isActive
              ? 'bg-navy-600 text-white'
              : 'bg-[var(--color-surface)] hover:bg-neutral-50 dark:hover:bg-neutral-800';
          }

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              className={[
                'inline-flex items-center gap-2 font-medium transition-smooth whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50',
                sizeClasses[size],
                tabClass,
                isActive ? '' : 'text-[var(--color-text-secondary)]',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              ].filter(Boolean).join(' ')}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${isActive ? 'bg-navy-100 text-navy-600' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

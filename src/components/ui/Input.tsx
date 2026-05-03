import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  helper,
  error,
  prefix,
  suffix,
  fullWidth = false,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 flex items-center pointer-events-none"
               style={{ color: 'var(--color-text-tertiary)' }}>
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          {...props}
          className={[
            'block w-full rounded-md border bg-surface text-sm transition-smooth',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500',
            error
              ? 'border-danger-500 focus:ring-danger-500/30 focus:border-danger-500'
              : 'border-[var(--color-border)] hover:border-neutral-300 dark:hover:border-neutral-600',
            prefix ? 'pl-9' : 'pl-3',
            suffix ? 'pr-9' : 'pr-3',
            'py-2',
            fullWidth ? 'w-full' : '',
            className,
          ].filter(Boolean).join(' ')}
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
          }}
        />
        {suffix && (
          <div className="absolute right-3 flex items-center pointer-events-none"
               style={{ color: 'var(--color-text-tertiary)' }}>
            {suffix}
          </div>
        )}
      </div>
      {(error || helper) && (
        <p
          className="mt-1.5 text-xs"
          style={{ color: error ? 'var(--color-danger-500, #EF4444)' : 'var(--color-text-tertiary)' }}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Textarea({
  label,
  helper,
  error,
  fullWidth = false,
  id,
  className = '',
  ...props
}: TextareaProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={[
          'block w-full rounded-md border text-sm transition-smooth resize-none',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
          'focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500',
          'px-3 py-2',
          error
            ? 'border-danger-500 focus:ring-danger-500/30 focus:border-danger-500'
            : 'border-[var(--color-border)] hover:border-neutral-300 dark:hover:border-neutral-600',
          fullWidth ? 'w-full' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
        }}
      />
      {(error || helper) && (
        <p
          className="mt-1.5 text-xs"
          style={{ color: error ? '#EF4444' : 'var(--color-text-tertiary)' }}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  helper,
  error,
  fullWidth = false,
  id,
  options,
  placeholder,
  className = '',
  ...props
}: SelectProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        {...props}
        className={[
          'block w-full rounded-md border text-sm transition-smooth appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500',
          'px-3 py-2 pr-8',
          error
            ? 'border-danger-500 focus:ring-danger-500/30 focus:border-danger-500'
            : 'border-[var(--color-border)] hover:border-neutral-300 dark:hover:border-neutral-600',
          fullWidth ? 'w-full' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {(error || helper) && (
        <p
          className="mt-1.5 text-xs"
          style={{ color: error ? '#EF4444' : 'var(--color-text-tertiary)' }}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  );
}

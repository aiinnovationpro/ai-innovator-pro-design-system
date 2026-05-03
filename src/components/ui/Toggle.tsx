import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Toggle({ checked, onChange, label, disabled = false, size = 'md' }: ToggleProps) {
  const trackSize = size === 'sm' ? 'w-8 h-4' : 'w-10 h-5';
  const thumbSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const thumbTranslate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';
  const padding = size === 'sm' ? 'p-0.5' : 'p-0.5';

  return (
    <label className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          trackSize,
          padding,
          'relative inline-flex items-center rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50',
          checked ? 'bg-navy-600' : 'bg-neutral-300 dark:bg-neutral-700',
        ].join(' ')}
      >
        <span
          className={[
            thumbSize,
            'rounded-full bg-white shadow-sm transition-smooth',
            checked ? thumbTranslate : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {label && (
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
      )}
    </label>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
}

export function Checkbox({ label, helper, id, className = '', ...props }: CheckboxProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-start gap-2.5 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type="checkbox"
        id={inputId}
        {...props}
        className={[
          'mt-0.5 w-4 h-4 rounded border transition-smooth',
          'text-navy-600 border-neutral-300 dark:border-neutral-600',
          'focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-0',
          'checked:bg-navy-600 checked:border-navy-600',
          className,
        ].filter(Boolean).join(' ')}
      />
      {(label || helper) && (
        <div>
          {label && (
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {label}
            </span>
          )}
          {helper && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
              {helper}
            </p>
          )}
        </div>
      )}
    </label>
  );
}

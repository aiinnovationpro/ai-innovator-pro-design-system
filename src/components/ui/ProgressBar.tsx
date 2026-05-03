import React from 'react';

type ProgressVariant = 'navy' | 'accent' | 'success' | 'warning' | 'danger';
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

const trackSizeClasses: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const fillClasses: Record<ProgressVariant, string> = {
  navy:    'bg-navy-600',
  accent:  'bg-cyan-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger:  'bg-danger-500',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'navy',
  size = 'md',
  label,
  showValue = false,
  animated = false,
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${trackSizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-out',
            fillClasses[variant],
            animated ? 'animate-pulse-soft' : '',
          ].filter(Boolean).join(' ')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

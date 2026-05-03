import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  period?: string;
  color?: 'navy' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

const iconBgClasses = {
  navy:    'bg-navy-100 text-navy-600 dark:bg-navy-900/40 dark:text-navy-300',
  accent:  'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300',
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  danger:  'bg-danger-100 text-danger-600',
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  trendLabel,
  period,
  color = 'navy',
  className = '',
}: StatCardProps) {
  const trendUp    = trend !== undefined && trend > 0;
  const trendDown  = trend !== undefined && trend < 0;
  const trendFlat  = trend !== undefined && trend === 0;

  return (
    <div
      className={[
        'rounded-lg border p-5 transition-smooth hover:shadow-elevated',
        className,
      ].join(' ')}
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-xs font-medium uppercase tracking-wider mb-3"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {label}
          </p>
          <p
            className="text-3xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {value}
          </p>

          {trend !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={[
                  'inline-flex items-center gap-0.5 text-xs font-semibold rounded-full px-1.5 py-0.5',
                  trendUp   ? 'text-success-700 bg-success-100' :
                  trendDown ? 'text-danger-700 bg-danger-100' :
                              'text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400',
                ].join(' ')}
              >
                {trendUp   && <TrendingUp  size={12} />}
                {trendDown && <TrendingDown size={12} />}
                {trendFlat && <Minus        size={12} />}
                {trendUp ? '+' : ''}{trend}%
              </span>
              {(trendLabel || period) && (
                <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  {trendLabel ?? period}
                </span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${iconBgClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

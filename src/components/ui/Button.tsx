import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'destructive' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-navy-600 text-white border border-navy-600 hover:bg-navy-700 hover:border-navy-700 active:bg-navy-800 shadow-sm',
  secondary:
    'bg-navy-50 text-navy-600 border border-navy-200 hover:bg-navy-100 hover:border-navy-300 active:bg-navy-200 dark:bg-navy-900/30 dark:text-navy-300 dark:border-navy-700 dark:hover:bg-navy-900/50',
  outline:
    'bg-transparent text-navy-600 border border-navy-300 hover:bg-navy-50 hover:border-navy-400 active:bg-navy-100 dark:text-navy-300 dark:border-navy-600 dark:hover:bg-navy-900/20',
  ghost:
    'bg-transparent text-navy-600 border border-transparent hover:bg-navy-50 active:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-900/30',
  accent:
    'bg-cyan-500 text-white border border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600 active:bg-cyan-700 shadow-sm',
  destructive:
    'bg-danger-600 text-white border border-danger-600 hover:bg-danger-700 hover:border-danger-700 active:bg-danger-700 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs:  'px-2.5 py-1   text-xs  rounded   gap-1',
  sm:  'px-3   py-1.5 text-sm  rounded   gap-1.5',
  md:  'px-4   py-2   text-sm  rounded-md gap-2',
  lg:  'px-5   py-2.5 text-base rounded-md gap-2',
  xl:  'px-6   py-3   text-base rounded-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium transition-smooth select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      {loading ? (
        <Loader2 className="animate-spin-slow shrink-0" size={size === 'xs' || size === 'sm' ? 14 : 16} />
      ) : (
        icon && iconPosition === 'left' && (
          <span className="shrink-0">{icon}</span>
        )
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}

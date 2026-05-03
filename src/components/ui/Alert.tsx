import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'danger' | 'info' | 'navy';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
}

const configs: Record<AlertVariant, {
  icon: React.ReactNode;
  containerClass: string;
  iconClass: string;
  titleClass: string;
  bodyClass: string;
}> = {
  success: {
    icon: <CheckCircle2 size={18} />,
    containerClass: 'bg-success-50 border-success-200 dark:bg-success-700/10 dark:border-success-700/30',
    iconClass:  'text-success-600',
    titleClass: 'text-success-800 dark:text-success-300',
    bodyClass:  'text-success-700 dark:text-success-400',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    containerClass: 'bg-warning-50 border-warning-200 dark:bg-warning-700/10 dark:border-warning-700/30',
    iconClass:  'text-warning-600',
    titleClass: 'text-warning-800 dark:text-warning-300',
    bodyClass:  'text-warning-700 dark:text-warning-400',
  },
  danger: {
    icon: <XCircle size={18} />,
    containerClass: 'bg-danger-50 border-danger-200 dark:bg-danger-700/10 dark:border-danger-700/30',
    iconClass:  'text-danger-600',
    titleClass: 'text-danger-800 dark:text-danger-300',
    bodyClass:  'text-danger-700 dark:text-danger-400',
  },
  info: {
    icon: <Info size={18} />,
    containerClass: 'bg-info-50 border-info-200 dark:bg-info-700/10 dark:border-info-700/30',
    iconClass:  'text-info-600',
    titleClass: 'text-info-800 dark:text-info-300',
    bodyClass:  'text-info-700 dark:text-info-400',
  },
  navy: {
    icon: <Info size={18} />,
    containerClass: 'bg-navy-50 border-navy-200 dark:bg-navy-900/30 dark:border-navy-700/40',
    iconClass:  'text-navy-600 dark:text-navy-400',
    titleClass: 'text-navy-800 dark:text-navy-200',
    bodyClass:  'text-navy-600 dark:text-navy-400',
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  className = '',
  onDismiss,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const cfg = configs[variant];

  function dismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div
      className={[
        'flex gap-3 rounded-lg border p-4 animate-fade-in',
        cfg.containerClass,
        className,
      ].filter(Boolean).join(' ')}
      role="alert"
    >
      <span className={`shrink-0 mt-0.5 ${cfg.iconClass}`}>{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-semibold ${cfg.titleClass}`}>{title}</p>
        )}
        <div className={`text-sm ${title ? 'mt-0.5' : ''} ${cfg.bodyClass}`}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={dismiss}
          className={`shrink-0 mt-0.5 ${cfg.iconClass} opacity-60 hover:opacity-100 transition-fast`}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

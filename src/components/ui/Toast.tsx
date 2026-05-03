import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, 'id'>) => void;
  success: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  danger: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  warning: <AlertTriangle size={18} />,
  danger:  <XCircle size={18} />,
  info:    <Info size={18} />,
};

const variantClasses: Record<ToastVariant, { icon: string; bar: string }> = {
  success: { icon: 'text-success-500', bar: 'bg-success-500' },
  warning: { icon: 'text-warning-500', bar: 'bg-warning-500' },
  danger:  { icon: 'text-danger-500',  bar: 'bg-danger-500'  },
  info:    { icon: 'text-info-500',    bar: 'bg-info-500'    },
};

function ToastCard({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) {
  const cfg = variantClasses[item.variant];

  return (
    <div
      className="relative flex gap-3 rounded-lg border border-[var(--color-border)] p-4 shadow-elevated animate-slide-in-right overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)', minWidth: '300px', maxWidth: '380px' }}
      role="alert"
    >
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${cfg.bar}`} />

      <span className={`shrink-0 mt-0.5 pl-1 ${cfg.icon}`}>{icons[item.variant]}</span>
      <div className="flex-1 min-w-0 pl-1">
        {item.title && (
          <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {item.title}
          </p>
        )}
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {item.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 w-6 h-6 flex items-center justify-center rounded transition-fast hover:bg-neutral-100 dark:hover:bg-neutral-700"
        aria-label="Dismiss"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((opts: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...opts, id }]);
    setTimeout(() => remove(id), 4500);
  }, [remove]);

  const helpers: Pick<ToastContextValue, 'success' | 'warning' | 'danger' | 'info'> = {
    success: (message, title) => toast({ variant: 'success', message, title }),
    warning: (message, title) => toast({ variant: 'warning', message, title }),
    danger:  (message, title) => toast({ variant: 'danger',  message, title }),
    info:    (message, title) => toast({ variant: 'info',    message, title }),
  };

  return (
    <ToastContext.Provider value={{ toast, ...helpers }}>
      {children}
      {createPortal(
        <div
          className="fixed top-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none"
          aria-live="polite"
          aria-atomic="false"
        >
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastCard item={t} onRemove={remove} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

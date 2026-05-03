import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
};

export function Card({ children, className = '', padding = 'md', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-lg border transition-smooth',
        'bg-[var(--color-surface)] border-[var(--color-border)]',
        hover ? 'hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer' : 'shadow-card',
        paddingClasses[padding],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`px-5 py-4 border-b border-[var(--color-border)] ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`px-5 py-4 border-t border-[var(--color-border)] ${className}`}>
      {children}
    </div>
  );
}

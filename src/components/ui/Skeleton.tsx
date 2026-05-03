import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export function Skeleton({ width, height, rounded = 'md', className = '' }: SkeletonProps) {
  const roundedClasses = {
    sm:   'rounded',
    md:   'rounded-md',
    lg:   'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`skeleton ${roundedClasses[rounded]} ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? '1rem',
      }}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '65%' : '100%'}
          height="0.875rem"
          rounded="md"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-[var(--color-border)] p-5 space-y-4 ${className}`}
         style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton height="0.875rem" width="40%" />
          <Skeleton height="0.75rem" width="25%" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

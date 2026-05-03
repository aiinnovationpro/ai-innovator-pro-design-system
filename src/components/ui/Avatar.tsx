import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs:  'w-6  h-6  text-xs',
  sm:  'w-8  h-8  text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-12 h-12 text-base',
  xl:  'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
};

const dotSizeClasses: Record<AvatarSize, string> = {
  xs:  'w-1.5 h-1.5 border',
  sm:  'w-2   h-2   border',
  md:  'w-2.5 h-2.5 border-2',
  lg:  'w-3   h-3   border-2',
  xl:  'w-3.5 h-3.5 border-2',
  '2xl': 'w-4  h-4  border-2',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

const bgColors = [
  'bg-navy-600',
  'bg-cyan-600',
  'bg-success-600',
  'bg-warning-600',
  'bg-info-600',
];

function getColorIndex(name: string) {
  return name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % bgColors.length;
}

export function Avatar({ src, name = '', size = 'md', online, className = '' }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = bgColors[getColorIndex(name)];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white dark:ring-neutral-800`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-white dark:ring-neutral-800`}
        >
          {initials || '?'}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizeClasses[size]} rounded-full border-white dark:border-neutral-800 ${online ? 'bg-success-500' : 'bg-neutral-400'}`}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: { src?: string; name: string }[];
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((a, i) => (
        <Avatar key={i} src={a.src} name={a.name} size={size} />
      ))}
      {overflow > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-semibold ring-2 ring-white dark:ring-neutral-800`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

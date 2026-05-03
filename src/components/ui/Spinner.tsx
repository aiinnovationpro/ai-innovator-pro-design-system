import React from 'react';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: 'navy' | 'accent' | 'white' | 'neutral';
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const strokeMap: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 2.5,
  lg: 3,
  xl: 3,
};

const colorMap: Record<string, string> = {
  navy:    '#1B3A6B',
  accent:  '#0AADD6',
  white:   '#FFFFFF',
  neutral: '#94A3B8',
};

export function Spinner({ size = 'md', color = 'navy', className = '' }: SpinnerProps) {
  const px = sizeMap[size];
  const stroke = strokeMap[size];
  const c = colorMap[color];
  const r = (px - stroke * 2) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      className={`animate-spin-slow ${className}`}
      aria-label="Loading"
    >
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        stroke={c}
        strokeWidth={stroke}
        strokeOpacity={0.2}
      />
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        stroke={c}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        strokeLinecap="round"
        transform={`rotate(-90 ${px / 2} ${px / 2})`}
      />
    </svg>
  );
}

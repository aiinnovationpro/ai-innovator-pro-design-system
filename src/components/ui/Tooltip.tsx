import React, { useState, useRef } from 'react';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: React.ReactElement;
  delay?: number;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full  left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2  mr-2',
  right:  'left-full  top-1/2 -translate-y-1/2  ml-2',
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top:    'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800 dark:border-t-neutral-200',
  bottom: 'absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-800 dark:border-b-neutral-200',
  left:   'absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-neutral-800 dark:border-l-neutral-200',
  right:  'absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-800 dark:border-r-neutral-200',
};

export function Tooltip({ content, placement = 'top', children, delay = 200 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    timer.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          className={[
            'absolute z-50 pointer-events-none animate-fade-in',
            placementClasses[placement],
          ].join(' ')}
        >
          <span className="relative block whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 shadow-overlay">
            {content}
            <span className={arrowClasses[placement]} />
          </span>
        </span>
      )}
    </span>
  );
}

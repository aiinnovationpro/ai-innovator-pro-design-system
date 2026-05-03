import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './Button';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavbarProps {
  navItems?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  transparent?: boolean;
}

export function Navbar({
  navItems = [],
  ctaLabel = 'Get Started',
  onCtaClick,
  darkMode,
  onToggleDark,
  transparent = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isSolid = !transparent || scrolled;

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isSolid
            ? 'bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-card'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 shrink-0">
              <img
                src={darkMode ? '/AIIP-Logo-Navy-Transparent.png' : '/AIIP-Logo-Navy-Transparent.png'}
                alt="AI Innovator Pro"
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop nav */}
            {navItems.length > 0 && (
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={[
                      'px-3 py-1.5 rounded text-sm font-medium transition-smooth',
                      item.active
                        ? 'text-navy-600 bg-navy-50 dark:text-navy-300 dark:bg-navy-900/30'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    ].join(' ')}
                    style={{ color: item.active ? undefined : 'var(--color-text-secondary)' }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleDark}
                className="w-9 h-9 flex items-center justify-center rounded-md transition-smooth hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                aria-label="Toggle dark mode"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {ctaLabel && (
                <div className="hidden sm:block">
                  <Button size="sm" variant="primary" onClick={onCtaClick}>
                    {ctaLabel}
                  </Button>
                </div>
              )}

              {/* Mobile toggle */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-md transition-smooth hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t border-[var(--color-border)] px-4 py-3 space-y-1 animate-fade-up"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className={[
                  'block px-3 py-2 rounded text-sm font-medium transition-smooth',
                  item.active
                    ? 'text-navy-600 bg-navy-50 dark:text-navy-300 dark:bg-navy-900/30'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                ].join(' ')}
                style={{ color: item.active ? undefined : 'var(--color-text-secondary)' }}
              >
                {item.label}
              </a>
            ))}
            {ctaLabel && (
              <div className="pt-2">
                <Button size="sm" variant="primary" fullWidth onClick={onCtaClick}>
                  {ctaLabel}
                </Button>
              </div>
            )}
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

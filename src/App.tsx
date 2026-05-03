import { useState, useEffect } from 'react';
import { ToastProvider } from './components/ui/Toast';
import { Navbar }        from './components/ui/Navbar';
import { DesignSystem }  from './pages/DesignSystem';

const NAV_ITEMS = [
  { label: 'Brand',       href: '#brand'      },
  { label: 'Colors',      href: '#colors'     },
  { label: 'Typography',  href: '#typography' },
  { label: 'Buttons',     href: '#buttons'    },
  { label: 'Forms',       href: '#forms'      },
  { label: 'Components',  href: '#cards'      },
  { label: 'Feedback',    href: '#feedback'   },
];

function AppInner() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('aiip-dark-mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aiip-dark-mode', String(darkMode));
  }, [darkMode]);

  return (
    <>
      <Navbar
        navItems={NAV_ITEMS}
        ctaLabel="View on GitHub"
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(v => !v)}
      />
      <DesignSystem darkMode={darkMode} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}

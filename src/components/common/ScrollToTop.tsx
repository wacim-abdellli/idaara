'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ensures the page always scrolls to the very top whenever the route / pathname changes.
 */
export const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Instant scroll to top for window, documentElement, and body
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

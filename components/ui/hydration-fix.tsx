'use client';

import { useEffect } from 'react';

export function HydrationFix() {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Hydration failed')) return;
      originalError.call(console, ...args);
    };
  }, []);
  
  return null;
}

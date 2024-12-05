import { useState, useEffect } from 'react';

// Define your Tailwind breakpoints or use Tailwind's default breakpoints
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

type Query = 'up' | 'down' | 'between';
type Key = keyof typeof breakpoints | number;

export function useResponsive(query: Query, key: Key, endKey?: Key): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mediaQueryString = '';

    if (query === 'up') {
      mediaQueryString = `(min-width: ${typeof key === 'number' ? key + 'px' : breakpoints[key]})`;
    } else if (query === 'down') {
      mediaQueryString = `(max-width: ${typeof key === 'number' ? key + 'px' : breakpoints[key]})`;
    } else if (query === 'between' && endKey !== undefined) {
      const startWidth = typeof key === 'number' ? key + 'px' : breakpoints[key];
      const endWidth = typeof endKey === 'number' ? endKey + 'px' : breakpoints[endKey];
      mediaQueryString = `(min-width: ${startWidth}) and (max-width: ${endWidth})`;
    }

    const mediaQueryList = window.matchMedia(mediaQueryString);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);
    // Set the initial state
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener('change', documentChangeHandler);
  }, [query, key, endKey]);

  return matches;
}

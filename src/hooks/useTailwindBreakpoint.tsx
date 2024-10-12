import { useEffect, useState } from 'react';

// Define Tailwind breakPoints
const breakPoints = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
};

const breakPointSizes = {
  [breakPoints.sm]: 640,
  [breakPoints.md]: 768,
  [breakPoints.lg]: 1024,
  [breakPoints.xl]: 1280,
  [breakPoints['2xl']]: 1536,
};

// Custom Hook to get current breakpoint
function useTailwindBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= breakPointSizes[breakPoints['2xl']]) {
        setBreakpoint('2xl');
      } else if (width >= breakPointSizes[breakPoints.xl]) {
        setBreakpoint('xl');
      } else if (width >= breakPointSizes[breakPoints.lg]) {
        setBreakpoint('lg');
      } else if (width >= breakPointSizes[breakPoints.md]) {
        setBreakpoint('md');
      } else if (width >= breakPointSizes[breakPoints.sm]) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Update on resize
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return [breakpoint, setBreakpoint];
}

export default useTailwindBreakpoint;

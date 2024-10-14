import { useEffect, useState } from 'react';

// Define Tailwind BreakPoints
export const tailwindBreakPoints = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
};

const tailwindBreakPointSizes = {
  [tailwindBreakPoints.sm]: 640,
  [tailwindBreakPoints.md]: 768,
  [tailwindBreakPoints.lg]: 1024,
  [tailwindBreakPoints.xl]: 1280,
  [tailwindBreakPoints['2xl']]: 1536,
};

// Custom Hook to get current breakpoint
function useTailwindBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= tailwindBreakPointSizes[tailwindBreakPoints['2xl']]) {
        setBreakpoint(tailwindBreakPoints['2xl']);
      } else if (width >= tailwindBreakPointSizes[tailwindBreakPoints.xl]) {
        setBreakpoint(tailwindBreakPoints.xl);
      } else if (width >= tailwindBreakPointSizes[tailwindBreakPoints.lg]) {
        setBreakpoint(tailwindBreakPoints.lg);
      } else if (width >= tailwindBreakPointSizes[tailwindBreakPoints.md]) {
        setBreakpoint(tailwindBreakPoints.md);
      } else if (width >= tailwindBreakPointSizes[tailwindBreakPoints.sm]) {
        setBreakpoint(tailwindBreakPoints.sm);
      } else {
        setBreakpoint(tailwindBreakPoints.xs);
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

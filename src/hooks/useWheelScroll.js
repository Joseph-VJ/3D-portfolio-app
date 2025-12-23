import { useRef, useCallback } from 'react';

// ============================================
// WHEEL SCROLL HOOK - Enhanced for smooth scrolling
// ============================================
const useWheelScroll = (onScrollDown, onScrollUp) => {
  const lastScrollTime = useRef(0);
  const scrollThrottle = 300; // ms between scroll triggers - reduced for responsiveness
  const deltaThreshold = 30; // minimum delta to trigger scroll

  const onWheel = useCallback((e) => {
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTime.current;

    // Throttle rapid scrolls
    if (timeSinceLastScroll < scrollThrottle) return;

    // Check if scroll delta is significant enough
    if (Math.abs(e.deltaY) < deltaThreshold) return;

    lastScrollTime.current = now;

    if (e.deltaY > 0) {
      onScrollDown?.();
    } else {
      onScrollUp?.();
    }
  }, [onScrollDown, onScrollUp, scrollThrottle, deltaThreshold]);

  return { onWheel };
};

export default useWheelScroll;

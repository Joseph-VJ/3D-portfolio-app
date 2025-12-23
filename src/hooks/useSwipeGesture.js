import { useState, useRef, useCallback } from 'react';

// ============================================
// TOUCH SWIPE HOOK - Enhanced for mobile
// ============================================
const useSwipeGesture = (onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown) => {
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const [swiping, setSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });

  const onTouchStart = useCallback((e) => {
    touchEnd.current = { x: 0, y: 0 };
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    setSwiping(true);
  }, []);

  const onTouchMove = useCallback((e) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    const offsetX = touchEnd.current.x - touchStart.current.x;
    const offsetY = touchEnd.current.y - touchStart.current.y;
    setSwipeOffset({ x: offsetX * 0.3, y: offsetY * 0.1 });
  }, []);

  const onTouchEnd = useCallback(() => {
    setSwiping(false);
    setSwipeOffset({ x: 0, y: 0 });

    if (!touchStart.current.x || !touchEnd.current.x) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);
    const threshold = 50;

    if (isHorizontal) {
      if (distanceX > threshold) onSwipeLeft?.();
      else if (distanceX < -threshold) onSwipeRight?.();
    } else {
      if (distanceY > threshold) onSwipeUp?.();
      else if (distanceY < -threshold) onSwipeDown?.();
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { onTouchStart, onTouchMove, onTouchEnd, swiping, swipeOffset };
};

export default useSwipeGesture;

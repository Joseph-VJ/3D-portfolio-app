import { useState, useEffect, useRef, useCallback } from 'react';
import useIsMobile from './useIsMobile';
import useSwipeGesture from './useSwipeGesture';
import useWheelScroll from './useWheelScroll';
import { PORTFOLIO_ITEMS } from '../data/portfolio';

const usePortfolioController = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [surge, setSurge] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [ripples, setRipples] = useState([]);
  const [touchPos, setTouchPos] = useState(null);
  const [cardFlipped, setCardFlipped] = useState({}); // Track which cards are flipped
  const containerRef = useRef(null);
  const hasUnmuted = useRef(false);
  const isMobile = useIsMobile();

  const ticking = useRef(false);

  // Optimized unmute for ALL devices and interactions
  useEffect(() => {
    const unmuteOnInteraction = (e) => {
      if (!hasUnmuted.current) {
        console.log('User interaction detected:', e.type);
        hasUnmuted.current = true;
        setIsMuted(false);
        console.log('Music unmuted!');
      }
    };

    // Desktop interactions
    document.addEventListener('mousemove', unmuteOnInteraction, { passive: true });
    document.addEventListener('mouseenter', unmuteOnInteraction, { passive: true });
    document.addEventListener('click', unmuteOnInteraction);
    document.addEventListener('keydown', unmuteOnInteraction);

    // Mobile/Touch interactions
    document.addEventListener('touchstart', unmuteOnInteraction, { passive: true });
    document.addEventListener('touchmove', unmuteOnInteraction, { passive: true });
    document.addEventListener('touchend', unmuteOnInteraction, { passive: true });

    // Pointer events (modern devices)
    document.addEventListener('pointerdown', unmuteOnInteraction);
    document.addEventListener('pointermove', unmuteOnInteraction, { passive: true });

    // Scroll events
    document.addEventListener('scroll', unmuteOnInteraction, { passive: true });
    window.addEventListener('scroll', unmuteOnInteraction, { passive: true });

    // Focus events (accessibility)
    window.addEventListener('focus', unmuteOnInteraction);

    return () => {
      document.removeEventListener('mousemove', unmuteOnInteraction);
      document.removeEventListener('mouseenter', unmuteOnInteraction);
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('keydown', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
      document.removeEventListener('touchmove', unmuteOnInteraction);
      document.removeEventListener('touchend', unmuteOnInteraction);
      document.removeEventListener('pointerdown', unmuteOnInteraction);
      document.removeEventListener('pointermove', unmuteOnInteraction);
      document.removeEventListener('scroll', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
      window.removeEventListener('focus', unmuteOnInteraction);
    };
  }, []);

  const triggerSurge = () => {
    setSurge(true);
    setTimeout(() => setSurge(false), 600);
  };

  const handleNext = useCallback(() => {
    triggerSurge();

    if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else {
       setLoading(true);
       setTimeout(() => {
           setActiveIndex(0);
           setCardFlipped({}); // Reset all card flips when rebooting
           setTimeout(() => {
               setLoading(false);
           }, 500);
       }, 1000);
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      triggerSurge();
      setActiveIndex(prev => prev - 1);
    }
  }, [activeIndex]);

  // Swipe gesture handling - two-step: flip card first, then navigate
  const handleSwipeLeft = () => {
    if (!cardFlipped[activeIndex]) {
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      handleNext();
    }
  };

  const handleSwipeRight = () => {
    if (!cardFlipped[activeIndex]) {
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      handlePrev();
    }
  };

  const swipeHandlers = useSwipeGesture(handleSwipeLeft, handleSwipeRight, handleSwipeLeft, null);

  // Wheel scroll handling - two-step: flip card first, then navigate
  const handleWheelDown = useCallback(() => {
    if (!cardFlipped[activeIndex]) {
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
        triggerSurge();
        setActiveIndex(prev => prev + 1);
      }
    }
  }, [activeIndex, cardFlipped]);

  const handleWheelUp = useCallback(() => {
    if (!cardFlipped[activeIndex]) {
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      if (activeIndex > 0) {
        triggerSurge();
        setActiveIndex(prev => prev - 1);
      }
    }
  }, [activeIndex, cardFlipped]);

  const wheelHandlers = useWheelScroll(handleWheelDown, handleWheelUp);

  // Touch ripple effect
  const handleTouch = (e) => {
    if (!isMobile) return;
    const touch = e.touches?.[0] || e;
    const x = touch.clientX || touch.pageX;
    const y = touch.clientY || touch.pageY;

    setTouchPos({ x, y });
    setTimeout(() => setTouchPos(null), 300);

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 700);
  };

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;

    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX - innerWidth / 2) / 25;
          const y = (e.clientY - innerHeight / 2) / 25;
          setMousePos({ x, y });
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    window.addEventListener('mousemove', handleMouseMove);

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!cardFlipped[activeIndex]) {
          setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!cardFlipped[activeIndex]) {
          setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
        } else {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMouseMove, activeIndex, cardFlipped, handleNext, handlePrev]);

  const handleDotClick = (index) => {
    if (index !== activeIndex) {
      triggerSurge();
      setActiveIndex(index);
    }
  };

  const activeItem = PORTFOLIO_ITEMS[activeIndex];

  return {
    activeIndex, loading, surge, mousePos, isMusicPlaying, setIsMusicPlaying, isMuted,
    ripples, touchPos, cardFlipped, setCardFlipped, containerRef, isMobile,
    swipeHandlers, wheelHandlers, handleTouch, handleNext, handlePrev, handleDotClick, activeItem
  };
};

export default usePortfolioController;

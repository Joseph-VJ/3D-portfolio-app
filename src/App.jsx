import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

// Hooks
import useIsMobile from './hooks/useIsMobile';
import useSwipeGesture from './hooks/useSwipeGesture';
import useWheelScroll from './hooks/useWheelScroll';

// Data
import { PORTFOLIO_ITEMS } from './data/portfolio';

// Components
import TouchRipple from './components/ui/TouchRipple';
import ParticleBackground from './components/ui/ParticleBackground';
import AudioVisualizer from './components/ui/AudioVisualizer';
import Header from './components/Header';
import Progress from './components/Progress';
import Card3D from './components/Card3D';
import BackgroundMusic from './components/BackgroundMusic';

const App = () => {
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

  // Swipe gesture handling - two-step: flip card first, then navigate
  const handleSwipeLeft = () => {
    // Check if current card is flipped
    if (!cardFlipped[activeIndex]) {
      // First swipe: flip the card to show details
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      // Second swipe: navigate to next card
      if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
        triggerSurge();
        setActiveIndex(prev => prev + 1);
      }
    }
  };

  const handleSwipeRight = () => {
    // Check if current card is flipped
    if (!cardFlipped[activeIndex]) {
      // First swipe: flip the card to show details
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      // Second swipe: navigate to previous card
      if (activeIndex > 0) {
        triggerSurge();
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  const swipeHandlers = useSwipeGesture(handleSwipeLeft, handleSwipeRight, handleSwipeLeft, null);

  // Wheel scroll handling - two-step: flip card first, then navigate
  const handleWheelDown = useCallback(() => {
    // Check if current card is flipped
    if (!cardFlipped[activeIndex]) {
      // First scroll: flip the card to show details
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      // Second scroll: navigate to next card
      if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
        triggerSurge();
        setActiveIndex(prev => prev + 1);
      }
    }
  }, [activeIndex, cardFlipped]);

  const handleWheelUp = useCallback(() => {
    // Check if current card is flipped
    if (!cardFlipped[activeIndex]) {
      // First scroll: flip the card to show details
      setCardFlipped(prev => ({ ...prev, [activeIndex]: true }));
    } else {
      // Second scroll: navigate to previous card
      if (activeIndex > 0) {
        triggerSurge();
        setActiveIndex(prev => prev - 1);
      }
    }
  }, [activeIndex, cardFlipped]);

  const wheelHandlers = useWheelScroll(handleWheelDown, handleWheelUp);

  const triggerSurge = () => {
    setSurge(true);
    setTimeout(() => setSurge(false), 600);
  };

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
    // Skip mouse tracking on mobile for performance
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

    // Keyboard navigation - two-step: flip card first, then navigate
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
  }, [handleMouseMove, activeIndex]);

  const handleNext = () => {
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
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      triggerSurge();
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleDotClick = (index) => {
    if (index !== activeIndex) {
      triggerSurge();
      setActiveIndex(index);
    }
  };

  const activeItem = PORTFOLIO_ITEMS[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-slate-950 font-sans selection:bg-cyan-500/30"
      onTouchStart={(e) => { swipeHandlers.onTouchStart(e); handleTouch(e); }}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
      onWheel={wheelHandlers.onWheel}
    >
      {/* Touch Ripple Effects */}
      {ripples.map(ripple => (
        <TouchRipple key={ripple.id} x={ripple.x} y={ripple.y} color={activeItem?.hex || 'white'} />
      ))}

      <ParticleBackground mouseX={mousePos.x} mouseY={mousePos.y} surge={surge} isMobile={isMobile} touchPos={touchPos} />
      <Header isMobile={isMobile} />

      <main 
        className="relative w-full h-full flex items-center justify-center z-10"
        style={{
          perspective: isMobile ? '1200px' : '1500px',
          perspectiveOrigin: isMobile ? '50% 40%' : '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* NEON DRIFT VISUALIZER - Fills background behind card */}
        <div className="absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
            <AudioVisualizer 
              isPlaying={isMusicPlaying}
              colorHex={activeItem ? activeItem.hex : '#ffffff'}
              className="w-full h-full opacity-80 mix-blend-screen"
              isMobile={isMobile}
            />
        </div>

        <div className="relative w-[85vw] h-[80dvh] md:w-[400px] md:h-[700px] z-10">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${loading ? 'translate-y-[100vh]' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card3D 
                item={item}
                index={index}
                total={PORTFOLIO_ITEMS.length}
                activeIndex={activeIndex}
                onNext={handleNext}
                mouseX={mousePos.x}
                mouseY={mousePos.y}
                isPlaying={isMusicPlaying}
                isMobile={isMobile}
                swipeOffset={swipeHandlers.swipeOffset}
                isFlipped={cardFlipped[index] || false}
                onFlipChange={(flipped) => setCardFlipped(prev => ({ ...prev, [index]: flipped }))}
              />
            </div>
          ))}
        </div>
      </main>

      <Progress total={PORTFOLIO_ITEMS.length} current={activeIndex} isMobile={isMobile} onDotClick={handleDotClick} />

      {/* Background Music Component */}
      <BackgroundMusic isMuted={isMuted} />

      {/* Navigation Controls */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-2 md:gap-4 z-50">
        {/* Previous Button - Mobile only */}
        {isMobile && activeIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white active:scale-90 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-white group-hover:text-black transition-colors" />
          </button>
        )}
        
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
          title={isMusicPlaying ? "Pause Music" : "Play Music"}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          ) : (
            <VolumeX className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          )}
        </button>

        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Navigation</p>
          <p className="text-white font-medium">Flip & Swipe</p>
        </div>
        <button 
          onClick={handleNext}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default App;

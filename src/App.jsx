import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

import PORTFOLIO_ITEMS from './data/portfolio';
import useIsMobile from './hooks/useIsMobile';
import useSwipeGesture from './hooks/useSwipeGesture';

import TouchRipple from './components/ui/TouchRipple';
import ParticleBackground from './components/ui/ParticleBackground';
import AudioVisualizer from './components/ui/AudioVisualizer';
import Card3D from './components/Card3D';
import Header from './components/Header';
import Progress from './components/Progress';
import WelcomeScreen from './components/WelcomeScreen';

const App = () => {
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [surge, setSurge] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [ripples, setRipples] = useState([]);
  const [touchPos, setTouchPos] = useState(null);
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const ticking = useRef(false);

  const triggerSurge = useCallback(() => {
    setSurge(true);
    setTimeout(() => setSurge(false), 600);
  }, []);

  // Swipe gesture handling
  const handleSwipeLeft = useCallback(() => {
    if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
      triggerSurge();
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex, triggerSurge]);

  const handleSwipeRight = useCallback(() => {
    if (activeIndex > 0) {
      triggerSurge();
      setActiveIndex(prev => prev - 1);
    }
  }, [activeIndex, triggerSurge]);

  const swipeHandlers = useSwipeGesture(handleSwipeLeft, handleSwipeRight, handleSwipeLeft, null);

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
    if (started) {
      const timer = setTimeout(() => setLoading(false), 500);
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [started, handleMouseMove]);

  const handleNext = () => {
    triggerSurge();

    if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else {
       setLoading(true);
       setTimeout(() => {
           setActiveIndex(0);
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

  if (!started) {
    return <WelcomeScreen onEnter={() => setStarted(true)} />;
  }

  const activeItem = PORTFOLIO_ITEMS[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-slate-950 font-sans selection:bg-cyan-500/30"
      onTouchStart={(e) => { swipeHandlers.onTouchStart(e); handleTouch(e); }}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
    >
      <style>{`
        /* Mobile-first performance optimizations */
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          .backdrop-blur-md {
            backdrop-filter: none;
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-50px) translateX(-10px); opacity: 0.5; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
        }
        .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-fast { animation: pulse-fast 0.3s ease-in-out; }
        
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-ping-once { animation: ping-once 0.3s ease-out forwards; }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }

        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-flash { animation: flash 0.5s ease-out forwards; }

        @keyframes speed-line {
          0% { transform: translateX(-100%) scaleX(0.1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) scaleX(2); opacity: 0; }
        }
        .animate-speed-line { animation: speed-line 0.4s linear forwards; }

        @keyframes pulse-beat {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.8; }
        }
        .animate-pulse-beat { animation: pulse-beat 0.6s ease-in-out infinite; }
        
        @keyframes slide-up-fade {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up-fade 0.5s ease-out forwards; }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }
        .animate-glow { animation: glow-pulse 2s ease-in-out infinite; }
      `}</style>

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
              isPlaying={isMusicPlaying && started} 
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
                onPrev={handlePrev}
                mouseX={mousePos.x}
                mouseY={mousePos.y}
                isPlaying={isMusicPlaying && started}
                isMobile={isMobile}
                swipeOffset={swipeHandlers.swipeOffset}
              />
            </div>
          ))}
        </div>
      </main>

      <Progress total={PORTFOLIO_ITEMS.length} current={activeIndex} isMobile={isMobile} onDotClick={handleDotClick} />

      {/* Hidden Youtube Player for Background Music - PHONK PLAYLIST */}
      {isMusicPlaying && started && (
        <div className="fixed opacity-0 pointer-events-none">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-aytZ0n_KNQ?autoplay=1&loop=1&playlist=-aytZ0n_KNQ&controls=0&showinfo=0"
            title="Background Music"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-2 md:gap-4 z-50">
        {/* Previous Button - Mobile only */}
        {isMobile && activeIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white active:scale-90 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
          </button>
        )}
        
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
          title={isMusicPlaying ? "Pause Music" : "Play Music"}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          ) : (
            <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          )}
        </button>

        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Navigation</p>
          <p className="text-white font-medium">Flip & Swipe</p>
        </div>
        <button 
          onClick={handleNext}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
        </button>
      </div>
      
      {/* Card counter indicator - Mobile */}
      {isMobile && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold tracking-wider">
            {activeIndex + 1} / {PORTFOLIO_ITEMS.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

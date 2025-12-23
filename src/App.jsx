import React from 'react';
import { ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

// Hooks
import usePortfolioController from './hooks/usePortfolioController';

// Data
import { PORTFOLIO_ITEMS } from './data/portfolio';

// Components
import TouchRipple from './components/ui/TouchRipple';
import ParticleBackground from './components/ui/ParticleBackground';
import AudioVisualizer from './components/ui/AudioVisualizer';
import Header from './components/layout/Header';
import BackgroundMusic from './components/layout/BackgroundMusic';
import Progress from './components/portfolio/Progress';
import Card3D from './components/portfolio/Card3D';

const App = () => {
  const {
    activeIndex, loading, surge, mousePos, isMusicPlaying, setIsMusicPlaying, isMuted,
    ripples, touchPos, cardFlipped, setCardFlipped, containerRef, isMobile,
    swipeHandlers, wheelHandlers, handleTouch, handleNext, handlePrev, handleDotClick, activeItem
  } = usePortfolioController();

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

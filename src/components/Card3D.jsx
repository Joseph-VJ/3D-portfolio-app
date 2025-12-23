import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Code, User, Mail, GraduationCap, Cpu, RefreshCw, Phone, Instagram } from 'lucide-react';
import GlitchText from './ui/GlitchText';
import SpeedLines from './ui/SpeedLines';

const Card3D = ({ item, index, activeIndex, onNext, total, mouseX, mouseY, isPlaying, isMobile = false, swipeOffset = { x: 0, y: 0 }, isFlipped = false, onFlipChange }) => {
  const [touchFeedback, setTouchFeedback] = useState(false);
  const [enterAnim, setEnterAnim] = useState(false);
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  useEffect(() => {
    if (isActive) {
      setEnterAnim(true);
      const animTimer = setTimeout(() => setEnterAnim(false), 500);
      return () => clearTimeout(animTimer);
    }
  }, [isActive, activeIndex]);

  const handleTouchStart = () => {
    setTouchFeedback(true);
    setTimeout(() => setTouchFeedback(false), 150);
  };

  const getDiscardTransform = (type) => {
    // Simple exit animations optimized for performance
    if (isMobile) {
      // Use simple translateX/Y only - no rotate or scale for smooth performance
      switch(type) {
        case 'float-up': return `translateY(-120vh)`;
        case 'slide-right': return `translateX(120vw)`;
        case 'warp-zoom': return `translateX(120vw)`;
        case 'slide-left': return `translateX(-120vw)`;
        case 'drop-down': return `translateY(120vh)`;
        default: return `translateY(-120vh)`;
      }
    }
    // Desktop can handle slightly more complex transforms
    switch(type) {
      case 'float-up': return `translateY(-120vh) scale(0.9)`;
      case 'slide-right': return `translateX(120vw) scale(0.9)`;
      case 'warp-zoom': return `translateX(120vw) scale(0.9)`;
      case 'slide-left': return `translateX(-120vw) scale(0.9)`;
      case 'drop-down': return `translateY(120vh) scale(0.9)`;
      default: return `translateY(-120vh) scale(0.9)`;
    }
  };

  // Calculate swipe-based transform
  const swipeTransform = isActive && isMobile
    ? `translateX(${swipeOffset.x}px) rotate(${swipeOffset.x * 0.02}deg)`
    : '';

  // Card positioning - create stacked deck effect at bottom
  const getCardTransform = () => {
    if (isPast) {
      return getDiscardTransform(item.animation);
    }

    // Stacked deck effect: show cards at the bottom edge, outside the active card
    if (!isActive) {
      const offset = (index - activeIndex) * (isMobile ? 8 : 10); // Less spacing for cleaner look
      const scaleOffset = (index - activeIndex) * 0.03; // Each card slightly smaller
      // Position cards at the bottom by using negative translateY to push them down
      return `translateY(${offset}px) translateZ(-${offset * 5}px) scale(${0.98 - scaleOffset})`;
    }

    if (isMobile) {
      return swipeTransform || 'translateZ(0) scale(1)';
    }

    // Desktop: Active card with subtle mouse interaction
    return `rotateX(${(mouseY * 0.015)}deg) rotateY(${(mouseX * 0.015)}deg) scale(1)`;
  };

  // Dynamic shadow for active card only
  const getCardShadow = () => {
    if (!isActive) return 'none';
    return `
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 12px 24px -8px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1)
    `;
  };

  const style = {
    zIndex: isActive ? 10 : (isPast ? 1 : 5),
    transform: getCardTransform(),
    // Hide stacked cards to prevent overlap - only show active card
    opacity: isPast ? 0 : (isActive ? 1 : 0),
    filter: 'none',
    // Simple shadow
    boxShadow: isActive ? '0 10px 40px -10px rgba(0,0,0,0.3)' : 'none',
    // Ultra simple transitions - linear is smoothest on low-end devices
    transition: 'transform 0.3s ease-out, opacity 0.2s ease-out',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  };

  // CRT Scanlines - disabled on mobile for performance
  const scanlineStyle = isMobile ? {} : {
      backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
      backgroundSize: '100% 3px, 3px 100%'
  };

  const handleCardClick = (e) => {
    // Flip functionality now controlled by scroll/swipe only
    // Do nothing on direct click
  };

  // Entrance animation class - subtle pop-in effect
  const entranceClass = isActive && enterAnim ? 'card-entrance-pop' : '';

  return (
    <div
      className={`absolute w-[85vw] h-[80dvh] md:w-[400px] md:h-[700px] card-3d ${isActive ? 'cursor-pointer' : (isPast ? 'pointer-events-none' : 'pointer-events-auto')}`}
      style={{
        ...style,
        perspective: '1500px',
        perspectiveOrigin: '50% 30%'
      }}
      onClick={handleCardClick}
      onTouchStart={(e) => {
        // Don't trigger feedback if touching a button
        if (!e.target.closest('button') && !e.target.closest('a')) {
          handleTouchStart();
        }
      }}
    >
      {/* Multi-layer depth shadows - creates the stacked look */}
      {!isPast && (
        <>
          {/* Layer 1: Card edge highlight for depth */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: isActive
                ? `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)`
                : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)`,
              transform: 'translateZ(1px)',
              opacity: 1
            }}
          />
          {/* Layer 2: Colored glow for active card */}
          {isActive && (
            <div
              className={`absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br ${item.color}`}
              style={{
                transform: 'translateZ(-30px) scale(1.08)',
                filter: 'blur(50px)',
                opacity: 0.2
              }}
            />
          )}
          {/* Layer 3: Bottom shadow for floating effect */}
          <div
            className="absolute inset-x-4 bottom-0 h-20 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
              transform: `translateY(${isActive ? 30 : 20}px) translateZ(-50px) scaleY(0.3)`,
              filter: `blur(${isActive ? 20 : 15}px)`,
              opacity: isActive ? 0.6 : 0.3
            }}
          />
        </>
      )}

      {/* Touch feedback ring */}
      {touchFeedback && (
        <div className="absolute inset-0 rounded-3xl border-4 border-white/50 animate-ping-once z-50" />
      )}

      {/* Entry glow effect */}
      {enterAnim && isActive && (
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-30 animate-pulse-fast z-0`} />
      )}

      {isPast && (
        <div
          className="absolute inset-0 rounded-3xl bg-white/10 blur-md transition-transform duration-1000"
          style={{ transform: 'scale(1.1) translateZ(-50px)' }}
        />
      )}

      <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* FRONT FACE */}
        <div className={`absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl group transition-all duration-100
            ${isActive
              ? `bg-slate-900 border-2 ${isPlaying ? `animate-pulse-beat border-[${item.hex}] shadow-[0_0_15px_${item.hex}]` : 'border-white/20'}`
              : 'bg-slate-900/95 border border-white/10'
            }
        `}
        style={{
          // Add subtle inner glow for stacked cards
          boxShadow: isActive
            ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.4)'
            : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 20px -5px rgba(0,0,0,0.3)'
        }}
        >

          {/* Ambient Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} ${isActive ? 'opacity-10' : 'opacity-5'} group-hover:opacity-20 transition-opacity duration-500`} />

          {/* Card shine effect for 3D feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)',
              opacity: isActive ? 1 : 0.5
            }}
          />

          {/* Visual Effects Layer */}
          {isPast && !isMobile && (
            <>
               {item.animation === 'warp-zoom' && <div className="absolute inset-0 bg-white animate-flash z-50 mix-blend-overlay" />}
               <SpeedLines type={item.animation} isMobile={isMobile} />
            </>
          )}

          {/* Card Content */}
          <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className={`p-2 md:p-3 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-20 shadow-lg shadow-${item.accent}-500/20 border border-white/10`}>
                {item.type === 'Development' && <Code className="text-white w-5 h-5 md:w-6 md:h-6" />}
                {item.type === 'Identity' && <User className="text-white w-5 h-5 md:w-6 md:h-6" />}
                {item.type === 'Contact' && <Mail className="text-white w-5 h-5 md:w-6 md:h-6" />}
                {item.type === 'Education' && <GraduationCap className="text-white w-5 h-5 md:w-6 md:h-6" />}
                {item.type === 'Innovation' && <Cpu className="text-white w-5 h-5 md:w-6 md:h-6" />}
              </div>
              <div className="text-[10px] md:text-xs font-mono text-white/60 tracking-widest uppercase border border-white/10 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md">
                <GlitchText text={`0${index + 1} // 0${total}`} trigger={isActive} isMobile={isMobile} />
              </div>
            </div>

            {/* Centering container for image and text */}
            <div className={`flex flex-col items-center justify-center flex-1 ${item.image ? 'gap-3 md:gap-4' : 'gap-6 md:gap-8'}`}>
              {item.image && (
                 <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl">
                    <div className={`absolute inset-0 border-2 rounded-full z-10 ${isActive && isPlaying ? 'border-white opacity-100' : 'border-white/20 opacity-50'}`} />
                    <img src={item.image} alt="Vijay Joseph" className="w-full h-full object-cover" />
                 </div>
              )}
              <div className="text-center space-y-2">
                <h2 className={`${item.image ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-black text-white leading-tight tracking-tight uppercase drop-shadow-lg`}>
                  <GlitchText text={item.title} trigger={isActive} isMobile={isMobile} />
                </h2>
                <p className={`text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                  {item.subtitle}
                </p>
              </div>

              {item.highlights && (
                <div className="w-full px-2 md:px-2 flex flex-col gap-3 md:gap-3">
                  {item.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/90 bg-white/5 p-4 md:p-4 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-[1.02]">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_10px_currentColor]`} />
                      <span className="text-sm md:text-base font-semibold tracking-wide">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 md:space-y-6">
               <div className="flex flex-wrap gap-2 justify-center">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] md:text-xs font-bold text-white/80 bg-white/5 px-2 py-1 md:px-3 md:py-1 rounded border border-white/10 uppercase tracking-wider hover:bg-white/20 transition-colors">
                      {tag}
                    </span>
                  ))}
               </div>

               <div className="flex items-center justify-center gap-2 text-white/50 text-[10px] md:text-xs font-mono uppercase group-hover:text-white transition-colors">
                  <span className="animate-pulse">{'>'}</span>
                  <span>Tap to decrypt</span>
                  <RefreshCw className={`w-3 h-3 ${isActive && isPlaying ? 'animate-spin' : ''}`} />
               </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl p-6 md:p-8 flex flex-col justify-center border ${isActive && isPlaying ? `border-[${item.hex}]` : 'border-white/10'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={scanlineStyle} />
           {/* Decorative bg element */}
           <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} animate-pulse`} />

           <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-white text-center uppercase tracking-widest">
                    <GlitchText text="System Data" trigger={isFlipped} isMobile={isMobile} />
                </h3>
                <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-[${item.hex}] to-transparent`} />
              </div>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg text-center font-medium">
                {item.description}
              </p>

              {item.details && (
                <ul className="space-y-2 mt-4 w-full px-4">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300/80 text-sm md:text-base">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {item.links && (
                 <div className="grid grid-cols-1 gap-2 md:gap-3 mt-2 md:mt-4">
                    <a href={item.links.whatsapp} target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded bg-white/5 border border-white/10 flex items-center justify-between hover:bg-green-500/20 hover:border-green-500/50 transition-all hover:translate-x-1 cursor-pointer group/link">
                       <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/link:text-green-400" />
                          <span className="text-white font-bold uppercase text-xs md:text-sm">WhatsApp Link</span>
                       </div>
                       <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/50" />
                    </a>
                    <a href={item.links.instagram} target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded bg-white/5 border border-white/10 flex items-center justify-between hover:bg-pink-500/20 hover:border-pink-500/50 transition-all hover:translate-x-1 cursor-pointer group/link">
                       <div className="flex items-center gap-3">
                          <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/link:text-pink-400" />
                          <span className="text-white font-bold uppercase text-xs md:text-sm">Instagram Feed</span>
                       </div>
                       <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/50" />
                    </a>
                    <a href={item.links.email} className="p-3 md:p-4 rounded bg-white/5 border border-white/10 flex items-center justify-between hover:bg-blue-500/20 hover:border-blue-500/50 transition-all hover:translate-x-1 cursor-pointer group/link">
                       <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/link:text-blue-400" />
                          <span className="text-white font-bold uppercase text-xs md:text-sm">Secure Email</span>
                       </div>
                       <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/50" />
                    </a>
                 </div>
              )}
           </div>

           {/* Show button only on last card */}
           {index === total - 1 && (
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 e.preventDefault();
                 onNext();
               }}
               onTouchEnd={(e) => {
                 e.stopPropagation();
                 e.preventDefault();
                 onNext();
               }}
               onTouchStart={(e) => {
                 e.stopPropagation();
               }}
               className={`relative z-20 w-full py-4 md:py-5 rounded-xl bg-gradient-to-r ${item.color} text-white font-black text-lg md:text-xl tracking-widest shadow-2xl hover:shadow-3xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 group mt-4 md:mt-6 uppercase touch-manipulation animate-pulse`}
             >
               <span>↻ Start Over</span>
               <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform animate-bounce" />
             </button>
           )}
        </div>

      </div>
    </div>
  );
};

export default Card3D;

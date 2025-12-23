import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlitchText from './ui/GlitchText';

const Progress = ({ total, current, isMobile = false, onDotClick }) => (
  <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-2 z-50 mix-blend-difference">
    <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">
        {isMobile
          ? `System Load: ${Math.round(((current + 1) / total) * 100)}%`
          : <GlitchText text={`System Load: ${Math.round(((current + 1) / total) * 100)}%`} isMobile={isMobile} />
        }
    </span>
    <div className="flex gap-1.5">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick && onDotClick(i)}
          className={`rounded-full transition-all duration-500 active:scale-150 ${
            i === current
              ? 'w-8 md:w-12 h-2 bg-white shadow-[0_0_15px_white] animate-pulse'
              : i < current
                ? 'w-2 h-2 bg-white/60 hover:bg-white/80'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
          }`}
        />
      ))}
    </div>
    {/* Swipe hint for mobile */}
    {isMobile && current === 0 && (
      <div className="flex items-center gap-1 text-white/40 text-[9px] mt-1 animate-pulse">
        <ChevronLeft className="w-3 h-3" />
        <span>Swipe cards</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    )}
  </div>
);

export default Progress;

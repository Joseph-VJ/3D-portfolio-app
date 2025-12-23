import React from 'react';

const Progress = ({ total, current, isMobile = false, onDotClick }) => (
  <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-2 z-50 mix-blend-difference">
    <div className="flex gap-1.5">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick && onDotClick(i)}
          className={`rounded-full transition-all duration-500 active:scale-150 cursor-pointer ${
            i === current
              ? 'w-8 md:w-12 h-2 bg-white shadow-[0_0_15px_white] animate-pulse'
              : i < current
                ? 'w-2 h-2 bg-white/60 hover:bg-white/80 hover:scale-125'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
          }`}
        />
      ))}
    </div>
  </div>
);

export default Progress;

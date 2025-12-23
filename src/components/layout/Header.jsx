import React from 'react';
import { Zap } from 'lucide-react';
import GlitchText from '../ui/GlitchText';

const Header = ({ isMobile = false }) => (
  <header className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
    <div className="flex items-center gap-2 pointer-events-auto">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded bg-white flex items-center justify-center ${isMobile ? '' : 'animate-pulse'}`}>
        <Zap className="w-5 h-5 md:w-6 md:h-6 text-black fill-current" />
      </div>
      <span className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
        {isMobile ? 'VIJAY' : <GlitchText text="VIJAY" isMobile={isMobile} />}
        <span className="text-white/50 text-lg md:text-xl not-italic">.DEV</span>
      </span>
    </div>
    <nav className="hidden md:flex gap-8 pointer-events-auto">
      {['Work', 'Skills', 'Contact'].map((item) => (
        <a key={item} href="#" className="text-sm font-black text-white/70 hover:text-white uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
          <GlitchText text={item} isMobile={isMobile} />
        </a>
      ))}
    </nav>
  </header>
);

export default Header;

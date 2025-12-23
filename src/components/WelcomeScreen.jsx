import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Zap } from 'lucide-react';

const WelcomeScreen = ({ onEnter }) => {
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Delayed button appearance
    const timer = setTimeout(() => setShowButton(true), 1500);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 3,
      color: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white p-4 overflow-hidden">
      {/* Animated background particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-particle opacity-40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(236,72,153,0.1)_0%,_transparent_40%)]" />

      <div className="text-center space-y-6 md:space-y-8 relative z-10">
        {/* Logo with glow */}
        <div className="relative inline-block animate-bounce-slow">
          <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 animate-pulse scale-150"></div>
          <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse scale-125" style={{ animationDelay: '0.5s' }}></div>
          <Zap className="w-16 h-16 md:w-24 md:h-24 mx-auto text-white relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" />
        </div>

        {/* Title with stagger animation */}
        <div className="overflow-hidden">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic animate-slide-up">
            VIJAY<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">.DEV</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Initialize System
        </p>

        {/* Animated loading bar */}
        <div className="w-48 md:w-64 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-loading-bar rounded-full" />
        </div>

        {/* Start button with pulse */}
        {showButton && (
          <button
            onClick={onEnter}
            className="relative px-8 py-3 md:px-10 md:py-4 bg-white text-black text-sm md:text-base font-black tracking-widest rounded hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] uppercase animate-fade-in group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">Start Engine</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        )}

        {/* Sound hint with animation */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] md:text-xs font-mono mt-4 animate-pulse">
           <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
           <span>Sound On • Headphones Recommended</span>
        </div>

        {/* Touch hint for mobile */}
        <div className="flex items-center justify-center gap-2 text-white/30 text-[9px] md:hidden animate-bounce">
          <Sparkles className="w-3 h-3" />
          <span>Swipe to navigate cards</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }

        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar { animation: loading-bar 1.5s ease-out forwards; }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        }
        .animate-float-particle { animation: float-particle 6s ease-in-out infinite; }

        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowRight, Github, ExternalLink, Layers, Zap, User, Mail, Code, Star, ChevronRight, ChevronLeft, RefreshCw, Instagram, Phone, GraduationCap, Cpu, Smartphone, Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

// Mobile detection hook for performance optimization
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// ============================================
// TOUCH SWIPE HOOK - Enhanced for mobile
// ============================================
const useSwipeGesture = (onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown) => {
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const [swiping, setSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });

  const onTouchStart = (e) => {
    touchEnd.current = { x: 0, y: 0 };
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    setSwiping(true);
  };

  const onTouchMove = (e) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    const offsetX = touchEnd.current.x - touchStart.current.x;
    const offsetY = touchEnd.current.y - touchStart.current.y;
    setSwipeOffset({ x: offsetX * 0.3, y: offsetY * 0.1 });
  };

  const onTouchEnd = () => {
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
  };

  return { onTouchStart, onTouchMove, onTouchEnd, swiping, swipeOffset };
};

// ============================================
// TOUCH RIPPLE EFFECT COMPONENT
// ============================================
const TouchRipple = ({ x, y, color = 'white' }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x - 50, top: y - 50 }}
    >
      <div 
        className="w-[100px] h-[100px] rounded-full animate-ripple"
        style={{ 
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

// ============================================
// FLOATING PARTICLES WITH TOUCH INTERACTION
// ============================================
const InteractiveParticle = ({ delay, color }) => {
  const [pos, setPos] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  
  return (
    <div
      className="absolute w-1 h-1 rounded-full animate-float-particle"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        background: color,
        boxShadow: `0 0 10px ${color}`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

// --- Data ---
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: 'Identity',
    title: "Vijay Joseph . R",
    subtitle: "Dev • Digital Marketer • Prompt Engineer",
    description: "A multidisciplinary tech professional combining code, AI, and digital strategy. Transforming complex problems into elegant digital solutions.",
    tags: ["Full Stack", "Gen AI", "Strategy"],
    highlights: ["1 Year Experience", "AI Integration Specialist", "Strategic Thinker"],
    details: ["Based in India, Open to Remote", "Tech Stack Agnostic", "Problem Solver First"],
    color: "from-cyan-400 to-blue-600",
    accent: "cyan",
    hex: "#06b6d4", // Cyan-500
    image: "https://i.postimg.cc/26C5BfhL/IMG-20250806-131914.jpg",
    animation: "float-up" 
  },
  {
    id: 2,
    type: 'Development',
    title: "Full Stack Eng.",
    subtitle: "Web & App Development",
    description: "Building scalable, high-performance applications. Expert in modern JavaScript frameworks, responsive design, and seamless API integrations.",
    tags: ["React", "Node.js", "Mobile Apps"],
    highlights: ["Scalable Architecture", "Clean Code Practices", "Performance Optimization"],
    details: ["MERN Stack Proficiency", "Cross-Platform Mobile Dev", "Cloud Deployment (Firebase/Vercel)"],
    color: "from-violet-400 to-purple-600",
    accent: "purple",
    hex: "#8b5cf6", // Violet-500
    animation: "slide-right"
  },
  {
    id: 3,
    type: 'Innovation',
    title: "AI & Marketing",
    subtitle: "AI • Prompt Engineering • Growth",
    description: "Expert in CNN architectures and fine-tuning models like Embedding Gemma (308M), Gemma 3 (270M) & Qwen2 (0.5B). Merging AI with marketing strategy.",
    tags: ["Machine Learning", "Fine-tuning", "Gen AI"],
    highlights: ["CNN Architectures", "SLM Fine-tuning", "AI-Driven Growth"],
    details: ["Custom Model Fine-tuning", "Automation for AI workflow", "Automated Content"],
    color: "from-pink-400 to-rose-600",
    accent: "pink",
    hex: "#ec4899", // Pink-500
    animation: "warp-zoom"
  },
  {
    id: 4,
    type: 'Education',
    title: "Academic Base",
    subtitle: "MSc & BCA Graduate",
    description: "Advanced Master of Science degree coupled with a Bachelor of Computer Applications. A strong theoretical foundation fueling practical innovation.",
    tags: ["Computer Science", "Research", "Algorithms"],
    highlights: ["Master of Science", "Bachelor of Computer Applications", "Continuous Learner"],
    details: ["M.Sc. Computer Science", "B.C.A. Computer Applications", "Research on Marketing Analytics"],
    color: "from-amber-300 to-orange-600",
    accent: "amber",
    hex: "#f59e0b", // Amber-500
    animation: "slide-left"
  },
  {
    id: 5,
    type: 'Contact',
    title: "Let's Connect",
    subtitle: "Open for Collaboration",
    description: "Available for freelance projects, consulting, and full-time roles. Let's build something visionary together.",
    tags: ["WhatsApp", "Email", "Instagram"],
    highlights: ["Quick Response", "Professional Service", "Global Availability"],
    details: ["Freelance & Contract", "Technical Consultation", "Full-time Opportunities"],
    color: "from-emerald-400 to-teal-600",
    accent: "emerald",
    hex: "#10b981", // Emerald-500
    links: {
      whatsapp: "https://wa.me/916385129470",
      email: "mailto:vijayjoseph751@gmail.com",
      instagram: "https://www.instagram.com/vj_movielover?utm_source=qr&igsh=M3Q5ZGI4YzllaWoz"
    },
    animation: "drop-down"
  }
];

// --- Components ---

const GlitchText = ({ text, className, as: Component = 'span', trigger, isMobile = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  
  useEffect(() => {
    // Skip animation on mobile for performance
    if (isMobile) {
      setDisplayText(text);
      return;
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split('')
        .map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('')
      );
      
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 2; // Faster completion
    }, 40); // Slightly slower interval for better performance
    
    return () => clearInterval(interval);
  }, [text, trigger, isMobile]);

  return <Component className={className}>{displayText}</Component>;
};

const SpeedLines = ({ type, isMobile = false }) => {
  if (type !== 'slide-right' && type !== 'slide-left' && type !== 'warp-zoom') return null;
  // Disable on mobile for performance
  if (isMobile) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50 mix-blend-overlay">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {/* Dynamic Speed Lines - reduced count */}
        {[...Array(5)].map((_, i) => (
          <rect
            key={i}
            x={Math.random() * 100 + "%"}
            y={Math.random() * 100 + "%"}
            width={type === 'warp-zoom' ? Math.random() * 100 + 50 : Math.random() * 100 + 100}
            height={Math.random() * 2 + 1}
            fill="white"
            className="animate-speed-line"
            style={{
              transform: type === 'warp-zoom' 
                ? `rotate(${Math.random() * 360}deg)` 
                : `rotate(${type === 'slide-right' ? -15 : 15}deg)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: '0.5s'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const ParticleBackground = ({ mouseX, mouseY, surge, isMobile = false, touchPos = null }) => {
  // Memoize particle positions to prevent re-renders
  const particles = useMemo(() => 
    [...Array(isMobile ? 6 : 12)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      color: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
    })), [isMobile]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Deep Atmospheric Pulse */}
      <div className={`absolute inset-0 ${surge ? 'opacity-60' : 'opacity-30'} bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)] transition-opacity duration-300`} />
      
      {/* Touch-reactive glow */}
      {touchPos && (
        <div 
          className="absolute w-[200px] h-[200px] rounded-full blur-[80px] bg-white/30 transition-all duration-150"
          style={{ 
            left: touchPos.x - 100, 
            top: touchPos.y - 100,
            opacity: 0.5
          }}
        />
      )}
      
      {/* Dynamic Orbs with Surge Effect - simplified transforms on mobile */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}
          ${surge ? 'opacity-60 bg-cyan-500 scale-110' : 'opacity-20 bg-blue-600 scale-100'} transition-all duration-500`}
        style={isMobile ? {} : { transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)` }}
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}
          ${surge ? 'opacity-60 bg-purple-500 scale-110' : 'opacity-20 bg-purple-600 scale-100'} transition-all duration-500`}
        style={isMobile ? {} : { transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)` }}
      />
      
      {/* Additional animated orb */}
      <div 
        className={`absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full blur-[100px] animate-pulse-slow
          ${surge ? 'opacity-40 bg-pink-500' : 'opacity-10 bg-pink-600'} transition-all duration-500`}
      />

      {/* Digital Mesh Grid - Simplified on mobile */}
      {!isMobile && (
        <div 
          className={`absolute inset-0 ${surge ? 'opacity-20' : 'opacity-[0.08]'} transition-opacity duration-300`}
          style={{ 
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: `perspective(1000px) rotateX(60deg) translateY(${mouseY * 0.5}px) scale(${surge ? 2.2 : 2})`,
            transformOrigin: 'center top'
          }}
        />
      )}
      
      {/* Floating Particles with colors */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${isMobile ? '' : 'animate-float'} ${surge ? 'opacity-80 scale-150' : 'opacity-30 scale-100'} transition-all duration-300`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDelay: isMobile ? undefined : `${p.delay}s`
          }}
        />
      ))}
      
      {/* Scanlines overlay for retro effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
};

// --- NEON DRIFT HORIZON VISUALIZER ---
// Mobile-optimized with reduced complexity
const AudioVisualizer = ({ isPlaying, colorHex, className, isMobile = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Throttle FPS on mobile
    const frameInterval = 1000 / targetFPS;
    
    // State for the moving grid
    let gridOffset = 0;
    
    // Cache canvas dimensions to avoid reflow
    let w, h, cx, cy, dpr;
    const updateDimensions = () => {
      dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Lower resolution on mobile
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      w = canvas.width;
      h = canvas.height;
      cx = w / 2;
      cy = h / 2;
    };
    updateDimensions();
    
    const render = (currentTime) => {
      animationId = requestAnimationFrame(render);
      
      // Throttle frame rate on mobile
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      // Phonk Beat Simulation
      const time = currentTime / 1000;
      const beatFreq = 8; 
      const rawWave = Math.sin(time * beatFreq);
      const kick = Math.pow(Math.max(0, rawWave), 12);
      
      // Move grid faster on kick
      gridOffset += (1 + kick * 15) * dpr; 
      if (gridOffset > h / 2) gridOffset = 0;

      // --- CAMERA SHAKE & GLITCH --- (disabled on mobile)
      ctx.save();
      if (!isMobile && kick > 0.5) {
         const shakeX = (Math.random() - 0.5) * kick * 40 * dpr;
         const shakeY = (Math.random() - 0.5) * kick * 40 * dpr;
         ctx.translate(shakeX, shakeY);
      }

      // Clear Background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // --- DRAW FUNCTION ---
      const drawScene = (color) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * dpr;

        // 1. HORIZON LINE
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(w, cy);
        ctx.stroke();

        // 2. PERSPECTIVE GRID (FLOOR) - Reduced on mobile
        const numVLines = isMobile ? 6 : 10;
        for(let i = -numVLines; i <= numVLines; i++) {
            const spread = w * 2; 
            const xBottom = cx + (i * (spread / numVLines));
            
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(xBottom, h);
            ctx.globalAlpha = 0.3;
            ctx.stroke();
        }

        // Horizontal moving lines - Reduced on mobile
        const numHLines = isMobile ? 4 : 6;
        for(let i = 0; i < numHLines; i++) {
            const progress = (gridOffset + (i * 100 * dpr)) % (h/2);
            const perspectiveY = cy + (progress * progress) / (h/3);
            
            if(perspectiveY > h) continue;

            ctx.beginPath();
            ctx.moveTo(0, perspectiveY);
            ctx.lineTo(w, perspectiveY);
            ctx.globalAlpha = 0.2 + (perspectiveY - cy) / (h/2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // 3. JAGGED AUDIO SKYLINE - Reduced bars on mobile
        ctx.beginPath();
        ctx.moveTo(0, cy);
        
        const bars = isMobile ? 15 : 30;
        const step = w / bars;

        for(let i = 0; i <= bars; i++) {
            const x = i * step;
            const dist = Math.abs(x - cx) / (w/2);
            const noise = Math.random();
            const wave = Math.sin(i * 0.5 + time * 10);
            
            let barHeight = (noise * 50 * kick) + (wave * 20) + 5;
            barHeight *= (1 - dist); 
            
            if (!isPlaying) barHeight = 2;

            ctx.lineTo(x, cy - barHeight * dpr);
        }
        
        ctx.lineTo(w, cy);
        
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.stroke();
      };

      // --- COMPOSITE RENDER (RGB SPLIT) --- Disabled on mobile
      if (!isMobile && kick > 0.6) {
          ctx.globalCompositeOperation = 'screen';
          
          ctx.save();
          ctx.translate(-10 * kick * dpr, 0);
          drawScene('#ff0000');
          ctx.restore();

          ctx.save();
          ctx.translate(10 * kick * dpr, 0);
          drawScene('#00ffff');
          ctx.restore();

          drawScene(colorHex);
          
          ctx.globalCompositeOperation = 'source-over';
      } else {
          drawScene(colorHex);
      }

      ctx.restore();
    };

    render(0);

    // Handle resize
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, colorHex, isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

const Card3D = ({ item, index, activeIndex, onNext, onPrev, total, mouseX, mouseY, isPlaying, isMobile = false, swipeOffset = { x: 0, y: 0 } }) => {
  const [flipped, setFlipped] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState(false);
  const [enterAnim, setEnterAnim] = useState(false);
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;
  const offset = index - activeIndex;
  
  useEffect(() => {
    if (!isActive) setFlipped(false);
    if (isActive) {
      setEnterAnim(true);
      const timer = setTimeout(() => setEnterAnim(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isActive, activeIndex]);

  const handleTouchStart = () => {
    setTouchFeedback(true);
    setTimeout(() => setTouchFeedback(false), 150);
  };

  const getDiscardTransform = (type) => {
    // Enhanced exit animations
    if (isMobile) {
      switch(type) {
        case 'float-up': return `translateY(-150vh) rotate(-5deg) scale(0.8)`;
        case 'slide-right': return `translateX(150vw) rotate(15deg)`;
        case 'warp-zoom': return `scale(3) translateZ(500px) rotate(10deg)`; 
        case 'slide-left': return `translateX(-150vw) rotate(-15deg)`;
        case 'drop-down': return `translateY(150vh) rotate(5deg) scale(0.8)`;
        default: return `translateY(-200%)`;
      }
    }
    switch(type) {
      case 'float-up': return `translateY(-150vh) rotate(-10deg) scale(0.9)`;
      case 'slide-right': return `translateX(150vw) rotate(45deg) scale(1.1)`;
      case 'warp-zoom': return `scale(5) translateZ(1000px) rotateZ(45deg)`; 
      case 'slide-left': return `translateX(-150vw) rotate(-45deg) scale(0.8)`;
      case 'drop-down': return `translateY(150vh) rotateX(60deg)`;
      default: return `translateY(-200%) rotate(-20deg) scale(0.8)`;
    }
  };

  // Calculate swipe-based transform
  const swipeTransform = isActive && isMobile 
    ? `translateX(${swipeOffset.x}px) rotate(${swipeOffset.x * 0.05}deg)`
    : '';

  const style = {
    zIndex: total - index,
    transform: isPast 
      ? getDiscardTransform(item.animation)
      : isMobile 
        ? `translateY(${offset * 12}px) scale(${1 - offset * 0.05}) ${swipeTransform}`
        : `
          translateY(${offset * 12}px) 
          scale(${1 - offset * 0.05}) 
          translateZ(${-offset * 50}px)
          ${isActive ? `rotateX(${(mouseY * 0.05)}deg) rotateY(${(mouseX * 0.05)}deg)` : ''}
        `,
    opacity: isActive ? 1 : 0,
    filter: 'none',
    transition: isMobile ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    willChange: 'transform, opacity'
  };

  // Holographic Foil Gradient
  const holoGradient = `
    linear-gradient(
        115deg, 
        transparent 20%, 
        rgba(255, 0, 150, 0.1) 40%, 
        rgba(0, 255, 255, 0.1) 60%, 
        transparent 80%
    )
  `;
  
  const holoStyle = isActive ? {
    backgroundImage: holoGradient,
    transform: `translate(${mouseX * 1.5}px, ${mouseY * 1.5}px) scale(1.2)`,
    opacity: 0.6,
    mixBlendMode: 'color-dodge'
  } : {};

  // CRT Scanlines
  const scanlineStyle = {
      backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
      backgroundSize: '100% 3px, 3px 100%'
  };

  const handleCardClick = (e) => {
    // Don't flip if clicking on a button or link
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    if (isActive) {
      setFlipped(!flipped);
    }
  };

  return (
    <div 
      className={`absolute w-[85vw] h-[80dvh] md:w-[400px] md:h-[700px] perspective-1000 ${isActive ? 'cursor-pointer' : 'pointer-events-none'}`}
      style={style}
      onClick={handleCardClick}
      onTouchStart={(e) => {
        // Don't trigger feedback if touching a button
        if (!e.target.closest('button') && !e.target.closest('a')) {
          handleTouchStart();
        }
      }}
    >
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

      <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT FACE */}
        <div className={`absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-slate-900 shadow-2xl group border transition-all duration-100
            ${isActive && isPlaying ? `animate-pulse-beat border-[${item.hex}] shadow-[0_0_15px_${item.hex}]` : 'border-white/10 shadow-black/50'}
        `}>
          
          {/* Ambient Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
          
          {/* Overlays removed for cleaner look */}

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
                 <div className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl transition-transform duration-300 ${isActive && isPlaying ? 'scale-105' : 'scale-100'}`}> 
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
                    <GlitchText text="System Data" trigger={flipped} isMobile={isMobile} />
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
             className={`relative z-20 w-full py-3 md:py-4 rounded bg-gradient-to-r ${item.color} text-white font-black text-base md:text-lg tracking-widest shadow-lg shadow-${item.accent}-500/30 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 group mt-4 md:mt-6 uppercase touch-manipulation`}
           >
             <span>{index === total - 1 ? 'Reboot System' : 'Next File'}</span>
             <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

      </div>
    </div>
  );
};

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

  // Swipe gesture handling
  const handleSwipeLeft = () => {
    if (activeIndex < PORTFOLIO_ITEMS.length - 1) {
      triggerSurge();
      setActiveIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (activeIndex > 0) {
      triggerSurge();
      setActiveIndex(prev => prev - 1);
    }
  };

  const swipeHandlers = useSwipeGesture(handleSwipeLeft, handleSwipeRight, handleSwipeLeft, null);

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

      <main className="relative w-full h-full flex items-center justify-center z-10 perspective-1000">
        
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
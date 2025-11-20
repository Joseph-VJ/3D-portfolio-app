import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Github, ExternalLink, Layers, Zap, User, Mail, Code, Star, ChevronRight, RefreshCw, Instagram, Phone, GraduationCap, Cpu, Smartphone, Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

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

const GlitchText = ({ text, className, as: Component = 'span', trigger }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  
  useEffect(() => {
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
      iterations += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <Component className={className}>{displayText}</Component>;
};

const SpeedLines = ({ type }) => {
  if (type !== 'slide-right' && type !== 'slide-left' && type !== 'warp-zoom') return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50 mix-blend-overlay">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {/* Dynamic Speed Lines */}
        {[...Array(10)].map((_, i) => (
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

const ParticleBackground = ({ mouseX, mouseY, surge }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Deep Atmospheric Pulse */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${surge ? 'opacity-60' : 'opacity-30'} animate-pulse-slow bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)]`} />
      
      {/* Dynamic Orbs with Surge Effect */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-all duration-700 ease-out
          ${surge ? 'opacity-60 scale-150 bg-cyan-500' : 'opacity-20 scale-100 bg-blue-600'}`}
        style={{ transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)` }}
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-all duration-700 ease-out
          ${surge ? 'opacity-60 scale-150 bg-purple-500' : 'opacity-20 scale-100 bg-purple-600'}`}
        style={{ transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)` }}
      />

      {/* Digital Mesh Grid - Reacts to Surge */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${surge ? 'opacity-20' : 'opacity-[0.08]'}`}
        style={{ 
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${mouseY * 0.5}px) scale(${surge ? 2.2 : 2})`,
          transformOrigin: 'center top'
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-white animate-float ${surge ? 'opacity-60' : 'opacity-20'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            transition: 'opacity 0.5s'
          }}
        />
      ))}
    </div>
  );
};

// --- NEON DRIFT HORIZON VISUALIZER ---
// "Full Freedom" Mode: Perspective Grid + Jagged Horizon + Camera Shake
const AudioVisualizer = ({ isPlaying, colorHex, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // State for the moving grid
    let gridOffset = 0;
    
    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      // Make canvas internal resolution match screen for sharpness
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Phonk Beat Simulation
      const time = Date.now() / 1000;
      const beatFreq = 8; 
      const rawWave = Math.sin(time * beatFreq);
      const kick = Math.pow(Math.max(0, rawWave), 12); // Very sharp kick
      
      // Move grid faster on kick
      gridOffset += (1 + kick * 15) * dpr; 
      if (gridOffset > h / 2) gridOffset = 0;

      // --- CAMERA SHAKE & GLITCH ---
      ctx.save();
      if (kick > 0.5) {
         // Random shake on heavy beats
         const shakeX = (Math.random() - 0.5) * kick * 40 * dpr;
         const shakeY = (Math.random() - 0.5) * kick * 40 * dpr;
         ctx.translate(shakeX, shakeY);
      }

      // Clear Background
      ctx.fillStyle = '#020617'; // Slate 950
      ctx.fillRect(0, 0, w, h);

      // --- DRAW FUNCTION ---
      // We separate drawing into a function to allow for RGB splitting
      const drawScene = (color, offset = 0) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * dpr;
        ctx.shadowBlur = 0;

        // 1. HORIZON LINE
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(w, cy);
        ctx.stroke();

        // 2. PERSPECTIVE GRID (FLOOR)
        // Vertical fanning lines
        const numVLines = 20;
        for(let i = -numVLines; i <= numVLines; i++) {
            // X position at bottom of screen spread out, converging to center
            const spread = w * 2; 
            const xBottom = cx + (i * (spread / numVLines));
            
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(xBottom, h);
            ctx.globalAlpha = 0.3;
            ctx.stroke();
        }

        // Horizontal moving lines
        const numHLines = 10;
        for(let i = 0; i < numHLines; i++) {
            // Exponential spacing for perspective
            let yPos = cy + ((i * (h/2)) / numHLines) + (gridOffset % (h/2 / numHLines));
            // Correct math to make it look like it's coming towards you is complex, 
            // linear approximation with modulo is "retro" enough
            
            // Better perspective math:
            const progress = (gridOffset + (i * 100 * dpr)) % (h/2);
            const perspectiveY = cy + (progress * progress) / (h/3); // Exponential acceleration
            
            if(perspectiveY > h) continue;

            ctx.beginPath();
            ctx.moveTo(0, perspectiveY);
            ctx.lineTo(w, perspectiveY);
            ctx.globalAlpha = 0.2 + (perspectiveY - cy) / (h/2); // Fade in as it gets closer
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // 3. JAGGED AUDIO SKYLINE (The "Visualizer" part)
        // We mirror it left/right from center
        ctx.beginPath();
        ctx.moveTo(0, cy);
        
        const bars = 50;
        const step = w / bars;

        for(let i = 0; i <= bars; i++) {
            const x = i * step;
            
            // Calculate distance from center (normalized 0 to 1)
            const dist = Math.abs(x - cx) / (w/2);
            
            // Frequency noise
            // High in middle, low at edges
            const noise = Math.random();
            const wave = Math.sin(i * 0.5 + time * 10);
            
            // Height calculation
            let barHeight = (noise * 50 * kick) + (wave * 20) + 5;
            // Make center huge
            barHeight *= (1 - dist); 
            
            if (!isPlaying) barHeight = 2; // Flatline if paused

            ctx.lineTo(x, cy - barHeight * dpr);
        }
        
        ctx.lineTo(w, cy);
        
        // Fill the mountains
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.fill();
        
        // Stroke the top edge
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 15 * dpr;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      // --- COMPOSITE RENDER (RGB SPLIT) ---
      if (kick > 0.6) {
          // Glitch Mode: Draw Red and Blue channels offset
          ctx.globalCompositeOperation = 'screen';
          
          // Red Channel (Left)
          ctx.save();
          ctx.translate(-10 * kick * dpr, 0);
          drawScene('#ff0000');
          ctx.restore();

          // Blue Channel (Right)
          ctx.save();
          ctx.translate(10 * kick * dpr, 0);
          drawScene('#00ffff');
          ctx.restore();

          // Center (White/Main Color)
          drawScene(colorHex);
          
          ctx.globalCompositeOperation = 'source-over';
      } else {
          // Normal Mode
          drawScene(colorHex);
      }

      ctx.restore(); // Restore from camera shake

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, colorHex]);

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

const Card3D = ({ item, index, activeIndex, onNext, total, mouseX, mouseY, isPlaying }) => {
  const [flipped, setFlipped] = useState(false);
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;
  const offset = index - activeIndex;
  
  // Calculate beat for border pulse (client-side simulation for React state)
  const [beatPulse, setBeatPulse] = useState(false);

  useEffect(() => {
     if(!isPlaying || !isActive) return;
     const interval = setInterval(() => {
         setBeatPulse(true);
         setTimeout(() => setBeatPulse(false), 100);
     }, 600); // ~100 BPM sim
     return () => clearInterval(interval);
  }, [isPlaying, isActive]);

  useEffect(() => {
    if (!isActive) setFlipped(false);
  }, [isActive]);

  const getDiscardTransform = (type) => {
    switch(type) {
      case 'float-up': return `translateY(-150vh) rotate(-10deg) scale(0.9)`;
      case 'slide-right': return `translateX(150vw) rotate(45deg) scale(1.1)`;
      case 'warp-zoom': return `scale(5) translateZ(1000px) rotateZ(45deg)`; 
      case 'slide-left': return `translateX(-150vw) rotate(-45deg) scale(0.8)`;
      case 'drop-down': return `translateY(150vh) rotateX(60deg)`;
      default: return `translateY(-200%) rotate(-20deg) scale(0.8)`;
    }
  };

  const style = {
    zIndex: total - index,
    transform: isPast 
      ? getDiscardTransform(item.animation)
      : `
        translateY(${offset * 12}px) 
        scale(${1 - offset * 0.05}) 
        translateZ(${-offset * 50}px)
        ${isActive ? `rotateX(${(mouseY * 0.05)}deg) rotateY(${(mouseX * 0.05)}deg)` : ''}
      `,
    opacity: isPast ? 0 : 1 - offset * 0.2,
    filter: isActive ? 'none' : `brightness(${1 - offset * 0.15}) blur(${offset * 1}px)`,
    transition: `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`
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

  return (
    <div 
      className={`absolute w-[85vw] h-[75vh] md:w-[400px] md:h-[700px] perspective-1000 ${isActive ? 'cursor-pointer' : 'pointer-events-none'}`}
      style={style}
      onClick={() => isActive && setFlipped(!flipped)}
    >
      {isPast && (
        <div 
          className="absolute inset-0 rounded-3xl bg-white/10 blur-md transition-transform duration-1000"
          style={{ transform: 'scale(1.1) translateZ(-50px)' }} 
        />
      )}

      <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT FACE */}
        <div className={`absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-slate-900/90 backdrop-blur-xl shadow-2xl group border transition-all duration-100
            ${beatPulse ? `border-[${item.hex}] shadow-[0_0_30px_${item.hex}]` : 'border-white/10 shadow-black/50'}
        `}>
          
          {/* Ambient Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
          
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-30" style={scanlineStyle} />

          {/* Holographic Foil Layer */}
          <div className="absolute inset-0 z-30 pointer-events-none" style={holoStyle} />

          {/* Visual Effects Layer */}
          {isPast && (
            <>
               {item.animation === 'warp-zoom' && <div className="absolute inset-0 bg-white animate-flash z-50 mix-blend-overlay" />}
               <SpeedLines type={item.animation} />
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
                <GlitchText text={`0${index + 1} // 0${total}`} trigger={isActive} />
              </div>
            </div>

            {/* Centering container for image and text */}
            <div className={`flex flex-col items-center justify-center flex-1 ${item.image ? 'gap-2 md:gap-4' : 'gap-4 md:gap-8'}`}> 
              {item.image && (
                 <div className={`relative w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl transition-transform duration-300 ${beatPulse ? 'scale-105' : 'scale-100'}`}> 
                    <div className={`absolute inset-0 border-2 rounded-full z-10 ${beatPulse ? 'border-white opacity-100' : 'border-white/20 opacity-50'}`} />
                    <img src={item.image} alt="Vijay Joseph" className="w-full h-full object-cover" /> 
                 </div>
              )}
              <div className="text-center space-y-1 md:space-y-2">
                <h2 className={`${item.image ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'} font-black text-white leading-tight tracking-tight uppercase drop-shadow-lg`}> 
                  <GlitchText text={item.title} trigger={isActive} />
                </h2>
                <p className={`text-base md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                  {item.subtitle}
                </p>
              </div>

              {item.highlights && (
                <div className="w-full px-1 md:px-2 flex flex-col gap-2 md:gap-3">
                  {item.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-4 text-white/90 bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-[1.02]">
                      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_10px_currentColor]`} />
                      <span className="text-xs md:text-base font-semibold tracking-wide">{highlight}</span>
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
                  <RefreshCw className={`w-3 h-3 ${beatPulse ? 'animate-spin' : ''}`} />
               </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden bg-slate-900/95 backdrop-blur-xl shadow-2xl p-6 md:p-8 flex flex-col justify-center border ${beatPulse ? `border-[${item.hex}]` : 'border-white/10'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={scanlineStyle} />
           {/* Decorative bg element */}
           <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} animate-pulse`} />
           
           <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-white text-center uppercase tracking-widest">
                    <GlitchText text="System Data" trigger={flipped} />
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
               onNext();
             }}
             className={`relative z-10 w-full py-3 md:py-4 rounded bg-gradient-to-r ${item.color} text-white font-black text-base md:text-lg tracking-widest shadow-lg shadow-${item.accent}-500/30 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 group mt-4 md:mt-6 uppercase`}
           >
             <span>{index === total - 1 ? 'Reboot System' : 'Next File'}</span>
             <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

      </div>
    </div>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
    <div className="flex items-center gap-2 pointer-events-auto">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-white flex items-center justify-center animate-pulse">
        <Zap className="w-5 h-5 md:w-6 md:h-6 text-black fill-current" />
      </div>
      <span className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
        <GlitchText text="VIJAY" />
        <span className="text-white/50 text-lg md:text-xl not-italic">.DEV</span>
      </span>
    </div>
    <nav className="hidden md:flex gap-8 pointer-events-auto">
      {['Work', 'Skills', 'Contact'].map((item) => (
        <a key={item} href="#" className="text-sm font-black text-white/70 hover:text-white uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
          <GlitchText text={item} />
        </a>
      ))}
    </nav>
  </header>
);

const Progress = ({ total, current }) => (
  <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-2 z-50 mix-blend-difference">
    <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">
        <GlitchText text={`System Load: ${Math.round(((current + 1) / total) * 100)}%`} />
    </span>
    <div className="flex gap-1">
      {[...Array(total)].map((_, i) => (
        <div 
          key={i} 
          className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 md:w-12 bg-white shadow-[0_0_10px_white]' : i < current ? 'w-1.5 md:w-2 bg-white/50' : 'w-1.5 md:w-2 bg-white/10'}`}
        />
      ))}
    </div>
  </div>
);

const WelcomeScreen = ({ onEnter }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white p-4">
    <div className="text-center space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-1000">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
        <Zap className="w-16 h-16 md:w-24 md:h-24 mx-auto text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic">
        VIJAY<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">.DEV</span>
      </h1>
      <p className="text-white/60 text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold">Initialize System</p>
      <button 
        onClick={onEnter}
        className="px-8 py-3 md:px-10 md:py-4 bg-white text-black text-sm md:text-base font-black tracking-widest rounded hover:scale-110 hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] uppercase"
      >
        Start Engine
      </button>
    </div>
  </div>
);

const App = () => {
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [surge, setSurge] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 25;
    const y = (e.clientY - innerHeight / 2) / 25;
    setMousePos({ x, y });
  }, []);

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
    setSurge(true);
    setTimeout(() => setSurge(false), 600);

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

  if (!started) {
    return <WelcomeScreen onEnter={() => setStarted(true)} />;
  }

  const activeItem = PORTFOLIO_ITEMS[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans selection:bg-cyan-500/30"
    >
      <style>{`
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
      `}</style>

      <ParticleBackground mouseX={mousePos.x} mouseY={mousePos.y} surge={surge} />
      <Header />

      <main className="relative w-full h-full flex items-center justify-center z-10 perspective-1000">
        
        {/* NEON DRIFT VISUALIZER - Fills background behind card */}
        <div className="absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
            <AudioVisualizer 
              isPlaying={isMusicPlaying && started} 
              colorHex={activeItem ? activeItem.hex : '#ffffff'}
              className="w-full h-full opacity-80 mix-blend-screen"
            />
        </div>

        <div className="relative w-[85vw] h-[75vh] md:w-[400px] md:h-[700px] z-10">
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
                isPlaying={isMusicPlaying && started}
              />
            </div>
          ))}
        </div>
      </main>

      <Progress total={PORTFOLIO_ITEMS.length} current={activeIndex} />

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

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-3 md:gap-4 z-50">
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 transition-all duration-300"
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
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default App;
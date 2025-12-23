import React, { useRef, useEffect } from 'react';

// --- NEON DRIFT HORIZON VISUALIZER ---
// Ultra-simplified for old phones
const AudioVisualizer = ({ isPlaying, colorHex, className, isMobile = false }) => {
  // Disable on mobile for performance
  if (isMobile) return null;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;

    // State for the moving grid
    let gridOffset = 0;

    // Cache canvas dimensions to avoid reflow
    let w, h, cx, cy, dpr;
    const updateDimensions = () => {
      dpr = 1; // Always use 1x resolution for performance
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

export default AudioVisualizer;

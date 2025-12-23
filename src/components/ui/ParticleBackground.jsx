import React from 'react';

const ParticleBackground = ({ isMobile = false }) => {
  // Ultra-simplified background for maximum performance
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Simple gradient background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)]" />

      {/* Static orbs - no animation for performance */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-20 bg-blue-600"
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-20 bg-purple-600"
      />

      {/* Grid only on desktop */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2)',
            transformOrigin: 'center top'
          }}
        />
      )}
    </div>
  );
};

export default ParticleBackground;

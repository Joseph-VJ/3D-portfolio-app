import React, { useState, useEffect } from 'react';

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

export default TouchRipple;

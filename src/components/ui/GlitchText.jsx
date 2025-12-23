import React from 'react';

// Simplified text component - no animations for better performance
const GlitchText = ({ text, className = '', as: Component = 'span' }) => (
  <Component className={className}>{text}</Component>
);

export default GlitchText;

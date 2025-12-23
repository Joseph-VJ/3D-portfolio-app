import React, { useRef, useEffect } from 'react';

const BackgroundMusic = ({ isMuted }) => {
  const iframeRef = useRef(null);

  // Use YouTube IFrame API to control mute/unmute
  useEffect(() => {
    if (!isMuted && iframeRef.current) {
      // Send unmute command via postMessage to YouTube IFrame API
      try {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        console.log('Unmute command sent to YouTube iframe');
      } catch (e) {
        console.log('Could not send unmute command:', e);
      }
    }
  }, [isMuted]);

  return (
    <div className="fixed" style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden'
      }}>
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/0TP-VCsfieE?autoplay=1&loop=1&playlist=0TP-VCsfieE&controls=0&showinfo=0&rel=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
          title="Background Music"
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen={false}
          frameBorder="0"
          loading="eager"
          style={{
            opacity: 0,
            position: 'absolute',
            pointerEvents: 'none',
            border: 0
          }}
        />
    </div>
  );
};
export default BackgroundMusic;

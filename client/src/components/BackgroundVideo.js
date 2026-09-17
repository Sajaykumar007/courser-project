import React from 'react';
import '../styles/BackgroundVideo.css';

function BackgroundVideo() {
  return (
    <>
      <video 
        className="global-bg-video"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        {/* Make sure the path is exactly like this */}
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="global-bg-overlay"></div>
    </>
  );
}

export default BackgroundVideo;
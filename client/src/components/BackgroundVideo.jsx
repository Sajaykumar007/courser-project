import React from 'react';

function BackgroundVideo() {
  return (
    <>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          fixed
          inset-0
          z-[-20]
          h-full
          w-full
          object-cover
          scale-[1.02]
          animate-[videoZoom_18s_ease-in-out_infinite_alternate]
        "
      >
        <source
          src="/assets/hero-bg.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Professional Overlay */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[-19]
          bg-gradient-to-br
          from-slate-950/85
          via-slate-950/65
          to-emerald-950/75
        "
      />

      {/* Animated Green Glow */}
      <div
        className="
          pointer-events-none
          fixed
          -left-32
          top-20
          z-[-18]
          h-96
          w-96
          rounded-full
          bg-emerald-500/10
          blur-3xl
          animate-pulse
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          pointer-events-none
          fixed
          -bottom-40
          -right-32
          z-[-18]
          h-[500px]
          w-[500px]
          rounded-full
          bg-green-400/10
          blur-3xl
          animate-[floatGlow_8s_ease-in-out_infinite_alternate]
        "
      />

      {/* Subtle Grid */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[-17]
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      {/* Animations */}
      <style>{`
        @keyframes videoZoom {
          0% {
            transform: scale(1.02);
          }

          100% {
            transform: scale(1.08);
          }
        }

        @keyframes floatGlow {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(-30px, -20px) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

export default BackgroundVideo;
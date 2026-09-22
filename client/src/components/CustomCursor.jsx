import React, { useEffect, useRef, useState } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Touch devices-ல் custom cursor வேண்டாம்
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Default cursor- மறைக்க
    const style = document.createElement('style');
    style.innerHTML = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animationId;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.matches('a, button, input, textarea, select, [role="button"], .cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.matches('a, button, input, textarea, select, [role="button"], .cursor-hover')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smooth animation loop
    const animate = () => {
      const cursor = cursorRef.current;
      const trail = trailRef.current;

      if (cursor) {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      if (trail) {
        // Trail follows with slight delay
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver, true);
    window.addEventListener('mouseout', handleMouseOut, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver, true);
      window.removeEventListener('mouseout', handleMouseOut, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationId) cancelAnimationFrame(animationId);
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Main Mouse Arrow Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          transform: 'translate(-100px, -100px)',
          willChange: 'transform',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-200 ${
            isHovering ? 'scale-125' : 'scale-100'
          } ${isClicking ? 'scale-90' : 'scale-100'}`}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))',
          }}
        >
          {/* Arrow Shape - Mouse Pointer */}
          <path
            d="M4 2L4 18L8.5 13.5L12.5 20L14.5 19L10.5 12.5L16 12L4 2Z"
            fill="rgba(16, 185, 129, 0.95)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Glowing Trail Effect */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          transform: 'translate(-100px, -100px)',
          willChange: 'transform',
        }}
      >
        <div
          className={`transition-all duration-300 ${
            isHovering ? 'w-12 h-12 opacity-40' : 'w-8 h-8 opacity-25'
          }`}
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0) 70%)',
            filter: 'blur(3px)',
            marginLeft: '-16px',
            marginTop: '-16px',
          }}
        />
      </div>

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="fixed z-[99997] pointer-events-none"
          style={{
            left: '0px',
            top: '0px',
            animation: 'cursorRipple 0.5s ease-out forwards',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(16, 185, 129, 0.6)',
              marginLeft: '-10px',
              marginTop: '-10px',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes cursorRipple {
          0% {
            transform: translate(var(--mouse-x, 0px), var(--mouse-y, 0px)) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--mouse-x, 0px), var(--mouse-y, 0px)) scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default CustomCursor;
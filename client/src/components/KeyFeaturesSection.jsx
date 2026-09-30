import React, { useRef, useEffect } from 'react';

function KeyFeaturesSection() {
  const whiteCanvasRef = useRef(null);

  // ============================================================
  // NETWORK BACKGROUND ANIMATION - WHITE SECTION (LIGHT)
  // ============================================================
  useEffect(() => {
    const canvas = whiteCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 140 };
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles(rect.width, rect.height);
    };

    const createParticles = (width, height) => {
      const area = width * height;
      let particleCount = Math.floor(area / 11000);
      particleCount = Math.max(35, particleCount);
      particleCount = Math.min(95, particleCount);

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 1.8 + 0.7,
          opacity: Math.random() * 0.55 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.05 + 0.02,
        });
      }
    };

    const drawParticle = (particle) => {
      particle.pulse += particle.pulseSpeed;
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.12;
      const radius = particle.radius + Math.sin(particle.pulse) * 0.25;

      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0, particle.x, particle.y, radius * 5
      );
      gradient.addColorStop(0, `rgba(22, 163, 74, ${Math.max(0.15, pulseOpacity * 0.6)})`);
      gradient.addColorStop(0.5, `rgba(34, 197, 94, ${Math.max(0.05, pulseOpacity * 0.3)})`);
      gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, radius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(22, 163, 74, ${Math.max(0.3, pulseOpacity * 0.7)})`;
      ctx.arc(particle.x, particle.y, Math.max(0.7, radius), 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnections = () => {
      const connectionDistance = 125;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(22, 163, 74, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseConnections = () => {
      if (mouse.x === null || mouse.y === null) return;
      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const opacity = (1 - distance / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      if (!isReducedMotion) {
        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -20 || particle.x > width + 20) particle.vx *= -1;
          if (particle.y < -20 || particle.y > height + 20) particle.vy *= -1;
        });
      }

      drawConnections();
      drawMouseConnections();
      particles.forEach(drawParticle);

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
    const handleTouchMove = (event) => {
      if (!event.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };
    const handleTouchEnd = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const features = [
    'Choose ur favourite course either Online or Offline',
    'Land a job within 6 months of graduation',
    'Assured Job placements from top Tech and internet companies',
    'Get Interactive classes from the industry experts',
    'Get 100% hands-on training on all Live Tools',
    '24/7 Mentor Support from Industry Experts',
    'Access to cloud labs for real-time projects',
    'Industry recognized certification',
    'Access to Cutting Edge Tools Real Time Applications',
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 lg:px-10">
      
      {/* =========================================
          NETWORK ANIMATION CANVAS
      ========================================== */}
      <canvas
        ref={whiteCanvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />

      {/* =========================================
          BACKGROUND DECORATION
      ========================================== */}
      <div className="pointer-events-none absolute -left-24 top-10 z-[1] h-64 w-64 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 z-[1] h-72 w-72 rounded-full bg-green-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* =======================================
            HEADER
        ======================================== */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-green-600">
            Why Choose Us
          </span>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Key Features
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Everything you need to learn, practice and build your career
            with industry-ready skills.
          </p>

          {/* Underline */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-1.5 w-14 rounded-full bg-green-500" />
            <div className="h-1.5 w-4 rounded-full bg-green-300" />
          </div>
        </div>

        {/* =======================================
            FEATURES GRID
        ======================================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="
                group
                relative
                flex
                min-h-[125px]
                items-center
                gap-5
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white/80
                backdrop-blur-sm
                px-6
                py-6
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-green-300
                hover:shadow-xl
              "
            >
              {/* Top Green Line */}
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-0.5
                  rounded-tl-2xl
                  rounded-tr-2xl
                  bg-gradient-to-r
                  from-green-400
                  via-green-500
                  to-green-600
                  transition-all
                  duration-500
                  ease-in-out
                  group-hover:h-1.5
                  group-hover:shadow-[0_8px_25px_rgba(34,197,94,0.8)]
                "
              />

              {/* Number */}
              <div
                className="
                  absolute
                  right-4
                  top-4
                  text-4xl
                  font-black
                  text-gray-100
                  transition-all
                  duration-300
                  group-hover:text-green-50
                "
              >
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Icon Box */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-50
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                  group-hover:bg-green-100
                "
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <p
                className="
                  relative
                  z-10
                  flex-1
                  text-sm
                  font-semibold
                  leading-6
                  text-gray-700
                  transition-colors
                  duration-300
                  group-hover:text-gray-900
                  sm:text-base
                "
              >
                {feature}
              </p>

              {/* Arrow */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-50
                  text-sm
                  text-gray-400
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:bg-green-500
                  group-hover:text-white
                "
              >
                →
              </div>

              {/* Glow Effect */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-12
                  -right-12
                  h-28
                  w-28
                  rounded-full
                  bg-green-200/40
                  blur-2xl
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFeaturesSection;
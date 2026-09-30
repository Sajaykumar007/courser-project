import React, { useRef, useEffect } from 'react';

function GovtJobSection() {
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

  const categories = [
    'BANKING',
    'TNPSC',
    'INSURANCE',
    'RAILWAYS',
    'CAT',
    'GATE',
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-10 sm:py-12">
      {/* =========================================
          NETWORK ANIMATION CANVAS
      ========================================== */}
      <canvas
        ref={whiteCanvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />

      {/* =========================================
          BACKGROUND EFFECTS
      ========================================== */}
      <div className="pointer-events-none absolute -left-24 top-10 z-[1] h-56 w-56 rounded-full bg-green-100/60 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-[1] h-64 w-64 rounded-full bg-green-100/50 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] [background-image:linear-gradient(rgba(34,197,94,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,.8)_1px,transparent_1px)] [background-size:45px_45px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* =======================================
            HEADER
        ======================================== */}
        <div className="mx-auto mb-8 max-w-2xl text-center animate-[fadeUp_.6s_ease-out]">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-bold tracking-wider text-green-600 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            GOVERNMENT EXAM PREPARATION
          </span>

          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Get Your{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Permanent Government Job
            </span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-14 overflow-hidden rounded-full bg-green-500">
            <div className="h-full w-1/2 rounded-full bg-green-300 animate-[lineMove_2s_ease-in-out_infinite]" />
          </div>

          <p className="mt-4 text-xs leading-6 text-gray-500 sm:text-sm">
            Courser provides Offline Classes for Competitive Examinations
            <br className="hidden sm:block" />
            in Bangalore and Coimbatore.
          </p>
        </div>

        {/* =======================================
            CONTENT
        ======================================== */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_.95fr]">
          
          {/* Image */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-2 shadow-lg shadow-gray-200/60 animate-[slideLeft_.7s_ease-out]">
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-300/20 blur-xl" />

            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                alt="Student with laptop"
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-60 lg:h-64"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-green-600">
                  Career Preparation
                </p>
                <p className="mt-0.5 text-xs font-bold text-gray-800">
                  Learn • Practice • Succeed
                </p>
              </div>

              {/* Floating Dot */}
              <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-ping" />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4 animate-[slideRight_.7s_ease-out]">
            {categories.map((cat, index) => (
              <div
                key={cat}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/70"
                style={{
                  animation: `categoryIn .5s ease-out ${index * 80}ms both`,
                }}
              >
                {/* Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_8px_25px_rgba(34,197,94,0.8)]" />

                {/* Hover Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-50/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Number */}
                <span className="absolute right-2 top-1 text-3xl font-black text-gray-100 transition-colors duration-300 group-hover:text-green-50">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="relative mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                  {index === 0 && '🏦'}
                  {index === 1 && '📚'}
                  {index === 2 && '🛡️'}
                  {index === 3 && '🚆'}
                  {index === 4 && '🎓'}
                  {index === 5 && '💻'}
                </div>

                <span className="relative text-[11px] font-extrabold tracking-wide text-gray-700 transition-colors duration-300 group-hover:text-green-600 sm:text-xs">
                  {cat}
                </span>

                {/* Bottom Line */}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-300 group-hover:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* =======================================
            BOTTOM INFO
        ======================================== */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[10px] text-gray-500 sm:text-xs">
          <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Expert Faculty
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Offline Classes
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Exam-Focused Training
          </div>
        </div>
      </div>

      {/* =========================================
          CUSTOM ANIMATIONS
      ========================================== */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes categoryIn {
          from { opacity: 0; transform: translateY(15px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes lineMove {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

export default GovtJobSection;
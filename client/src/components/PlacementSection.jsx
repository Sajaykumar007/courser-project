import React, { useRef, useEffect } from 'react';

function PlacementSection() {
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

  const companiesRow1 = [
    'TATA',
    'Microsoft',
    'Flipkart',
    'Standard Chartered',
    'Amazon',
    'Mahindra',
    'Airtel',
    'Paytm',
  ];

  const companiesRow2 = [
    'Google',
    'MasterCard',
    'Myntra',
    'PayPal',
    'Toshiba',
    'BOSCH',
    'SONY',
    'Intel',
  ];

  // Duplicate for seamless infinite animation
  const row1 = [...companiesRow1, ...companiesRow1];
  const row2 = [...companiesRow2, ...companiesRow2];

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 lg:px-10">
      {/* Network Animation Canvas */}
      <canvas
        ref={whiteCanvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />
      
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-0 top-20 z-[1] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-flex animate-[fadeDown_0.8s_ease-out] rounded-full border border-green-200 bg-green-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-green-600">
            Placement Support
          </span>

          <h2 className="animate-[fadeUp_0.8s_ease-out] text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Get your{' '}
            <span className="text-green-600">
              Dream Job
            </span>
          </h2>

          {/* Animated Underline */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-1.5 w-14 animate-[lineExpand_1s_ease-out] rounded-full bg-green-500" />
            <div className="h-1.5 w-4 animate-pulse rounded-full bg-green-300" />
          </div>

          <p className="mx-auto mt-6 max-w-3xl animate-[fadeUp_1s_ease-out] text-sm leading-7 text-gray-500 sm:text-base">
            Courser program guarantees successful placement performance
            based on the average salary packages offered, the hiring
            companies participating, and speed of offer roll-out. If you
            couldn't get the placement within 180 days of graduation,
            50% of your course fees will be Refunded back to you,
            No Questions Asked.
          </p>
        </div>

        {/* Companies */}
        <div className="mt-16">
          <h3 className="mb-10 text-center text-xl font-bold text-gray-800 sm:text-2xl">
            Our Alumni work in{' '}
            <span className="text-green-600">
              Top Companies
            </span>
          </h3>

          {/* ================= ROW 1 ================= */}
          <div className="relative mb-7 overflow-hidden rounded-3xl border border-gray-200 bg-white/80 py-6 shadow-sm backdrop-blur-sm">
            {/* Left Gradient */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent" />
            {/* Right Gradient */}
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent" />

            <div className="marquee-track flex w-max gap-6">
              {row1.map((company, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="
                    company-card
                    group
                    relative
                    flex
                    h-24
                    w-48
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white/80
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:scale-105
                    hover:border-green-300
                    hover:shadow-xl
                    backdrop-blur-sm
                  "
                >
                  <div className="absolute left-0 right-0 top-0 h-1.5 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 group-hover:h-1.5 group-hover:shadow-[0_4px_15px_rgba(34,197,94,0.6)]" />
                  
                  <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  
                  <div className="absolute inset-0 rounded-2xl bg-green-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <span className="relative z-10 text-lg font-extrabold tracking-wide text-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:text-green-600">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 py-6 shadow-sm backdrop-blur-sm">
            {/* Left Gradient */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent" />
            {/* Right Gradient */}
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent" />

            <div className="marquee-track-reverse flex w-max gap-6">
              {row2.map((company, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="
                    company-card
                    group
                    relative
                    flex
                    h-24
                    w-48
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white/80
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:scale-105
                    hover:border-green-300
                    hover:shadow-xl
                    backdrop-blur-sm
                  "
                >
                  <div className="absolute left-0 right-0 top-0 h-1.5 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 group-hover:h-1.5 group-hover:shadow-[0_4px_15px_rgba(34,197,94,0.6)]" />
                  
                  <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  
                  <div className="absolute inset-0 rounded-2xl bg-green-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <span className="relative z-10 text-lg font-extrabold tracking-wide text-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:text-green-600">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 12px)); }
        }

        @keyframes marqueeRight {
          from { transform: translateX(calc(-50% - 12px)); }
          to { transform: translateX(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineExpand {
          from { width: 0; }
          to { width: 56px; }
        }

        .marquee-track {
          animation: marqueeLeft 25s linear infinite;
        }

        .marquee-track-reverse {
          animation: marqueeRight 28s linear infinite;
        }

        .marquee-track:hover,
        .marquee-track-reverse:hover {
          animation-play-state: paused;
        }

        .company-card:nth-child(3n) {
          animation: floatingCard 4s ease-in-out infinite;
        }

        .company-card:nth-child(4n) {
          animation: floatingCard 5s ease-in-out infinite reverse;
        }

        @keyframes floatingCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track,
          .marquee-track-reverse,
          .company-card {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default PlacementSection;
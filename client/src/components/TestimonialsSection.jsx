import React, { useRef, useEffect } from 'react';

function TestimonialsSection() {
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

  const testimonials = [
    {
      name: 'Vaishnavi',
      role: 'UPSC Aspirant',
      college: 'PSG Krishnammal College',
      image: 'https://i.pravatar.cc/150?img=1',
      testimonial:
        'Joined Courser, Coimbatore Institute for UPSC Training. Trainers from Courser have helped me to gain deep knowledge on Preliminary and Main Papers. They helped us with the Previous Year Question papers and to crack them',
    },
    {
      name: 'Aravinth kumaravelu',
      role: 'Cloud Architect',
      college: 'Muthayammal Engineering College',
      image: 'https://i.pravatar.cc/150?img=11',
      testimonial:
        'Joined Courser for Cloud Architect Course. Learnt Cloud Infrastructure from scratch. Worked on Tier Account of AWS and had a clear understanding of Compute, Storage and Security Services.',
    },
    {
      name: 'Pravin Murugesan',
      role: 'Full Stack Developer',
      college: 'Bharathiyar University',
      image: 'https://i.pravatar.cc/150?img=13',
      testimonial:
        'Studying Full Stack Developer with Placement Assistance from Courser. I am from Non IT Background. Learning Website Development from Scratch, working on JavaScript and PHP. Building my own website and implementing all the Front End and Back End Frameworks',
    },
    {
      name: 'Harish TS',
      role: 'Diploma in Computer Applications',
      college: 'Bangalore',
      image: 'https://i.pravatar.cc/150?img=8',
      testimonial:
        'Joined Courser for DCA Course and started to improvise on all Microsoft Apps. Started developing Professional Presentations. It gave us more confidence to pursue My Post Graduate degree',
    },
    {
      name: 'Priya Sharma',
      role: 'Data Analyst',
      college: 'Anna University',
      image: 'https://i.pravatar.cc/150?img=5',
      testimonial:
        'The Data Analyst course at Courser transformed my career. The hands-on projects and expert guidance helped me land my dream job at a top MNC.',
    },
    {
      name: 'Karthik R',
      role: 'Digital Marketing Executive',
      college: 'Madras University',
      image: 'https://i.pravatar.cc/150?img=12',
      testimonial:
        'Excellent training and placement support. The trainers are very knowledgeable and the practical approach made learning easy and effective.',
    },
  ];

  // Duplicate cards for seamless infinite scrolling
  const scrollingTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 lg:px-10">
      
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
      <div className="pointer-events-none absolute -left-32 top-20 z-[1] h-72 w-72 animate-pulse rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 z-[1] h-80 w-80 animate-pulse rounded-full bg-green-100/50 blur-3xl [animation-delay:1.5s]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex animate-[testimonialFadeDown_0.8s_ease-out] rounded-full border border-green-200 bg-green-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-green-600">
            Student Reviews
          </span>

          <h2 className="animate-[testimonialFadeUp_0.9s_ease-out] text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Hear from our{' '}
            <span className="text-green-600">
              Learners
            </span>
          </h2>

          {/* Animated Underline */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-1.5 w-14 animate-[testimonialLine_1s_ease-out] rounded-full bg-green-500" />
            <div className="h-1.5 w-4 animate-pulse rounded-full bg-green-300" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl animate-[testimonialFadeUp_1.1s_ease-out] text-sm leading-7 text-gray-500 sm:text-base">
            Our Learners who have taken our Masters Program with
            Placement Assistance
          </p>
        </div>

        {/* ================= TESTIMONIAL SLIDER ================= */}
        <div className="relative mt-14 overflow-hidden">
          
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent" />
          
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent" />

          {/* Scrolling Track */}
          <div className="testimonial-track flex w-max gap-6 hover:[animation-play-state:paused]">
            {scrollingTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="
                  testimonial-card
                  group
                  relative
                  flex
                  min-h-[330px]
                  w-[340px]
                  shrink-0
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white/80
                  backdrop-blur-sm
                  p-6
                  shadow-md
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-green-300
                  hover:shadow-2xl
                  sm:w-[390px]
                "
              >
                {/* Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-1.5 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 group-hover:h-1.5 group-hover:shadow-[0_4px_15px_rgba(34,197,94,0.6)]" />

                {/* Decorative Quote */}
                <div className="absolute right-5 top-4 text-7xl font-serif leading-none text-green-50 transition-all duration-500 group-hover:scale-110 group-hover:text-green-100">
                  "
                </div>

                {/* ================= USER INFO ================= */}
                <div className="relative z-10 flex items-center gap-4">
                  {/* Image */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-400/30 blur-md transition-all duration-500 group-hover:scale-125" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative h-16 w-16 rounded-full border-4 border-white object-cover shadow-md transition-all duration-500 group-hover:scale-110 group-hover:border-green-200"
                      onError={(e) => {
                        e.target.src =
                          'https://ui-avatars.com/api/?name=' +
                          encodeURIComponent(testimonial.name) +
                          '&background=22c55e&color=fff&size=150';
                      }}
                    />
                    {/* Online Dot */}
                    <span className="absolute bottom-0 right-0 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-green-500" />
                  </div>

                  {/* User Details */}
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                      {testimonial.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-green-600">
                      {testimonial.role}
                    </p>
                    <p className="mt-1 truncate text-[11px] text-gray-400">
                      {testimonial.college}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* ================= STARS ================= */}
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="text-lg text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                      style={{ transitionDelay: `${star * 40}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="relative flex-1">
                  <p className="text-sm leading-7 text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {testimonial.testimonial}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-600">
                    Verified Learner
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-sm text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-green-500 group-hover:text-white">
                    →
                  </div>
                </div>

                {/* Bottom Glow */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-green-300/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="mt-10 flex justify-center gap-2">
          <span className="h-2 w-8 animate-pulse rounded-full bg-green-500" />
          <span className="h-2 w-2 rounded-full bg-green-200" />
          <span className="h-2 w-2 rounded-full bg-green-200" />
        </div>
      </div>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style>{`
        @keyframes testimonialMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }

        .testimonial-track {
          animation: testimonialMarquee 35s linear infinite;
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        @keyframes testimonialFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes testimonialFadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes testimonialLine {
          from { width: 0; }
          to { width: 56px; }
        }

        .testimonial-card:nth-child(3n) {
          animation: testimonialFloat 5s ease-in-out infinite;
        }

        .testimonial-card:nth-child(4n) {
          animation: testimonialFloatReverse 6s ease-in-out infinite;
        }

        @keyframes testimonialFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes testimonialFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track,
          .testimonial-card {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
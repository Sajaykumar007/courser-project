import React, { useState, useEffect, useRef } from 'react';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ============================================================
  // NETWORK BACKGROUND ANIMATION - HERO SECTION (DARK)
  // ============================================================
  const heroCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = heroCanvasRef.current;
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
          // INCREASED SPEED HERE (was 0.45)
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 1.8 + 0.7,
          opacity: Math.random() * 0.55 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          // INCREASED PULSE SPEED HERE
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
      gradient.addColorStop(0, `rgba(74, 222, 128, ${Math.max(0.15, pulseOpacity)})`);
      gradient.addColorStop(0.5, `rgba(34, 197, 94, ${Math.max(0.05, pulseOpacity * 0.35)})`);
      gradient.addColorStop(1, 'rgba(22, 163, 74, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, radius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(134, 239, 172, ${Math.max(0.25, pulseOpacity)})`;
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
            const opacity = (1 - distance / connectionDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
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
          const opacity = (1 - distance / mouse.radius) * 0.45;
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

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (event) => {
      if (!event.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

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

  // ============================================================
  // NETWORK BACKGROUND ANIMATION - WHITE SECTION (LIGHT)
  // ============================================================
  const whiteCanvasRef = useRef(null);

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
          // INCREASED SPEED HERE (was 0.45)
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 1.8 + 0.7,
          opacity: Math.random() * 0.55 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          // INCREASED PULSE SPEED HERE
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

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (event) => {
      if (!event.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

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

  // =====================================================
  // URL SCROLL
  // =====================================================
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('scrollTo');

    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  // =====================================================
  // NAVBAR SCROLL EVENT
  // =====================================================
  useEffect(() => {
    const handleScrollToSection = (e) => {
      setTimeout(() => {
        const element = document.getElementById(e.detail);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    };

    window.addEventListener('scrollToContactSection', handleScrollToSection);
    return () => {
      window.removeEventListener('scrollToContactSection', handleScrollToSection);
    };
  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', company: '', phone: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 text-gray-800">

      {/* =====================================================
          HERO SECTION WITH NETWORK ANIMATION
      ====================================================== */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-green-900 px-4 py-24 sm:min-h-[460px]">

        {/* NETWORK BACKGROUND ANIMATION CANVAS - HERO */}
        <canvas
          ref={heroCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Animated Background Glow 1 */}
        <div className="pointer-events-none absolute -left-32 -top-32 z-[1] h-80 w-80 rounded-full bg-green-500/20 blur-3xl animate-[heroFloat_8s_ease-in-out_infinite_alternate]" />

        {/* Animated Background Glow 2 */}
        <div className="pointer-events-none absolute -bottom-40 -right-20 z-[1] h-96 w-96 rounded-full bg-green-400/20 blur-3xl animate-[heroFloatReverse_10s_ease-in-out_infinite_alternate]" />

        {/* Floating Circle */}
        <div className="pointer-events-none absolute left-[12%] top-[25%] z-[1] h-4 w-4 rounded-full bg-green-300/50 shadow-lg shadow-green-400/50 animate-[floatingDot_4s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute right-[15%] top-[30%] z-[1] h-3 w-3 rounded-full bg-green-300/60 animate-ping" />
        <div className="pointer-events-none absolute bottom-[25%] left-[20%] z-[1] h-2 w-2 rounded-full bg-green-300/60 animate-pulse" />

        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:45px_45px]" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center animate-[heroContent_0.9s_ease-out]">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-300 backdrop-blur-md">
            <span className="animate-pulse">●</span>
            We're Here To Help
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Contact{' '}
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 overflow-hidden rounded-full bg-green-500">
            <div className="h-full w-full rounded-full bg-green-300 animate-[lineMove_2s_ease-in-out_infinite]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg">
            Courser is ready to provide the right solution according to your needs.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT SECTION WITH NETWORK ANIMATION
      ====================================================== */}
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        
        {/* NETWORK BACKGROUND ANIMATION CANVAS - WHITE SECTION */}
        <canvas
          ref={whiteCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Background Glows */}
        <div className="pointer-events-none absolute left-0 top-20 z-[1] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-slate-900/10 animate-[cardReveal_0.9s_ease-out]">
            <div className="grid lg:grid-cols-2">

              {/* =================================================
                  LEFT SIDE
              ================================================== */}
              <div id="contact-centers" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-green-900 p-7 text-white sm:p-10 lg:p-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-300">
                    Get In Touch
                  </div>

                  <h2 className="text-3xl font-black sm:text-4xl">Get in touch</h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                    Have questions about courses, batches or career paths? Our team is here to help you succeed.
                  </p>

                  <div className="mt-9 space-y-5">
                    {/* Location */}
                    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/10">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-xl transition-transform duration-300 group-hover:scale-110">
                        📍
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Head Office</h4>
                        <p className="mt-1 text-sm text-slate-300">Bangalore, Karnataka</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-green-300">Our Training Centres</p>
                        <div className="mt-1 space-y-0.5 text-xs leading-5 text-slate-400">
                          <p>Coimbatore - Peelamedu</p>
                          <p>Tirupur - Opposite Shiva Textiles</p>
                          <p>Karumathampatti - Four Road Junction</p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/10">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-xl transition-transform duration-300 group-hover:scale-110">
                        ✉️
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Email Us</h4>
                        <p className="mt-1 text-sm text-slate-300">hi@courser.in</p>
                        <p className="text-sm text-slate-300">upskill@courser.in</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/10">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-xl transition-transform duration-300 group-hover:scale-110">
                        📞
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Call Us</h4>
                        <p className="mt-1 text-sm text-slate-300">Phone: +91 77060 37060</p>
                        <p className="text-sm text-slate-300">Phone: +91 73396 37060</p>
                        <p className="mt-2 text-[11px] text-slate-400">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="mt-9 border-t border-white/10 pt-7">
                    <h4 className="text-sm font-bold text-white">Follow our social media</h4>
                    <div className="mt-4 flex gap-3">
                      <a href="https://facebook.com/courser" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-black transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30">f</a>
                      <a href="https://instagram.com/courser" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30">📸</a>
                      <a href="https://twitter.com/courser" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30">𝕏</a>
                      <a href="https://youtube.com/@courser" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30">▶</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT SIDE FORM
              ================================================== */}
              <div id="contact-form" className="relative bg-white p-7 sm:p-10 lg:p-12">
                <div className="mb-7">
                  <div className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600">
                    Contact Form
                  </div>
                  <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Send us a message</h2>
                  <p className="mt-2 text-sm text-slate-500">Fill in the details and our team will get back to you shortly.</p>
                </div>

                {submitted ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center text-center animate-[successReveal_0.6s_ease-out]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600 shadow-lg shadow-green-500/20 animate-[successPop_0.6s_ease-out]">
                      ✓
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-slate-900">Message Sent!</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    <div className="mt-6 h-1 w-20 overflow-hidden rounded-full bg-green-100">
                      <div className="h-full w-full origin-left rounded-full bg-green-500 animate-[successTimer_5s_linear]" />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="group">
                        <label className="mb-2 block text-xs font-bold text-slate-600">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                      </div>
                      <div className="group">
                        <label className="mb-2 block text-xs font-bold text-slate-600">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-600">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone number" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-600">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email address" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-600">Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-600">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Write your message..." className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600 animate-[errorShake_0.4s_ease-out]">
                        <span>⚠️</span>
                        <span>{error}</span>
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
                      {!loading && (
                        <span className="absolute inset-y-0 -left-20 w-12 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[110%]" />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP SECTION
      ====================================================== */}
      <section className="relative overflow-hidden border-t border-gray-200 bg-white">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-gray-50 to-transparent" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.998123456789!2d80.2548!3d13.0604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM3LjQiTiA4MMKwMTUnMTcuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Courser Location Map"
            className="grayscale-[15%] transition-all duration-700 hover:grayscale-0"
          />
        </div>
      </section>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}
      <style>{`
        @keyframes heroContent {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes heroFloatReverse {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, -30px) scale(1.1); }
        }
        @keyframes floatingDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes lineMove {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes cardReveal {
          0% { opacity: 0; transform: translateY(35px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes successReveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes successTimer {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactUsPage;
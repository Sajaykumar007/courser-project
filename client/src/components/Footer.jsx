import React, { useState, useEffect, useRef } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({
    loading: false,
    message: '',
    type: '',
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');

  // ============================================================
  // NETWORK BACKGROUND ANIMATION (UNCHANGED)
  // ============================================================

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 0.7,
          opacity: Math.random() * 0.55 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.01,
        });
      }
    };

    const drawParticle = (particle) => {
      particle.pulse += particle.pulseSpeed;
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.12;
      const radius = particle.radius + Math.sin(particle.pulse) * 0.25;

      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 5);
      gradient.addColorStop(0, `rgba(96, 165, 250, ${Math.max(0.15, pulseOpacity)})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${Math.max(0.05, pulseOpacity * 0.35)})`);
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, radius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(147, 197, 253, ${Math.max(0.25, pulseOpacity)})`;
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
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
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
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
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

  // ============================================================
  // FOOTER DATA
  // ============================================================

  const currentYear = new Date().getFullYear();

  const popularCourses = ['Web Developer', 'Digital Marketing', 'Java Developer', 'Data Analyst'];
  const supportLinks = ['Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy'];
  const centers = [
    { name: 'Bangalore', location: 'Bangalore' },
    { name: 'Coimbatore', location: 'Coimbatore' },
    { name: 'Peelamedu', location: 'Peelamedu' },
    { name: 'Karumathampatti', location: 'Karumathampatti' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', color: '#1877F2', href: 'https://facebook.com/courser' },
    { name: 'Instagram', icon: '📸', color: '#E4405F', href: 'https://instagram.com/courser' },
    { name: 'LinkedIn', icon: '💼', color: '#0A66C2', href: 'https://linkedin.com/company/courser' },
    { name: 'YouTube', icon: '▶️', color: '#FF0000', href: 'https://youtube.com/@courser' },
  ];

  const badges = ['ISO Certified', '5000+ Students', '95% Placement'];

  const locationData = {
    Bangalore: {
      name: 'Courser - Bangalore',
      address: 'Bangalore, Karnataka, India',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248366.36789208996!2d77.4488276!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890',
    },
    Coimbatore: {
      name: 'Courser - Coimbatore',
      address: 'Coimbatore, Tamil Nadu, India',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124567.89!2d76.9389!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858c7b8c8c8c8%3A0x123456789abcdef!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890',
    },
    Peelamedu: {
      name: 'Courser - Peelamedu',
      address: 'Peelamedu, Coimbatore, Tamil Nadu',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d76.9839!3d11.0293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzQ1LjUiTiA3NsKwNTknMDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    },
    Karumathampatti: {
      name: 'Courser - Karumathampatti',
      address: 'Karumathampatti, Coimbatore, Tamil Nadu',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.123456789!2d76.9956!3d11.0876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA1JzE1LjQiTiA3NsKwNTknNDQuMiJF!5e0!3m2!1sen!2sin!4v1234567890',
    },
  };

  // ============================================================
  // EFFECTS & HANDLERS
  // ============================================================

  useEffect(() => {
    document.body.style.overflow = isLocationModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLocationModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isLocationModalOpen) setIsLocationModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLocationModalOpen]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubscribeStatus({ loading: false, message: 'Please enter an email address.', type: 'error' });
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus({ loading: false, message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setSubscribeStatus({ loading: true, message: '', type: '' });
    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setSubscribeStatus({ loading: false, message: data.message, type: 'success' });
        setEmail('');
        setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
      } else {
        setSubscribeStatus({ loading: false, message: data.message || 'Subscription failed.', type: 'error' });
        setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
      }
    } catch (error) {
      setSubscribeStatus({ loading: false, message: 'Network error. Please try again.', type: 'error' });
      setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(true);
  };

  const currentLocation = locationData[selectedLocation] || locationData.Bangalore;

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentLocation.address)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917706037060';
  };

  // ============================================================
  // JSX (COMPACT & RE-STYLED)
  // ============================================================

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-950 text-white">
        {/* Animated Network Canvas */}
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true" />

        {/* Blue Glow Effects */}
        <div className="pointer-events-none absolute left-[10%] top-[10%] h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-[5%] right-[5%] h-56 w-56 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-slate-950/60" />
        
        {/* Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Footer Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          
          {/* TOP SECTION */}
          <div className="grid gap-5 md:grid-cols-3 md:items-center">
            {/* Logo */}
            <div className="group animate-[footerUp_.6s_ease-out]">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <span>C</span>
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-300 animate-ping" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">Courser</h2>
                  <p className="text-[10px] text-slate-400">Transforming Learners into Creators</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-1.5 animate-[footerUp_.7s_ease-out]">
              <a href="tel:+917706037060" className="group flex items-center gap-2.5 text-xs text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-blue-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-xs transition-all group-hover:bg-blue-500/10">📞</span>
                <span>+91 77060 37060</span>
              </a>
              <a href="mailto:hi@courser.in" className="group flex items-center gap-2.5 text-xs text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-blue-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-xs transition-all group-hover:bg-blue-500/10">✉️</span>
                <span>hi@courser.in</span>
              </a>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5">📍</span>
                <span>Bangalore | Coimbatore</span>
              </div>
            </div>

            {/* Social */}
            <div className="animate-[footerUp_.8s_ease-out] md:text-right">
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Follow Us</h3>
              <div className="flex gap-1.5 md:justify-end">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="group flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-blue-400/30 hover:bg-white/10"
                  >
                    <span className="transition-transform duration-300 group-hover:rotate-6">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* MIDDLE SECTION */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Popular Courses */}
            <div className="animate-[footerUp_.8s_ease-out]">
              <h3 className="mb-2 text-xs font-bold text-white">Popular Courses</h3>
              <ul className="space-y-1.5">
                {popularCourses.map((course, index) => (
                  <li key={index} className="group flex cursor-pointer items-center gap-2 text-[11px] text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-400">
                    <span className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="animate-[footerUp_.9s_ease-out]">
              <h3 className="mb-2 text-xs font-bold text-white">Support</h3>
              <ul className="space-y-1.5">
                {supportLinks.map((link, index) => (
                  <li key={index} className="group flex cursor-pointer items-center gap-2 text-[11px] text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-400">
                    <span className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Centers */}
            <div className="animate-[footerUp_1s_ease-out]">
              <h3 className="mb-2 text-xs font-bold text-white">Our Centers</h3>
              <ul className="space-y-1.5">
                {centers.map((center, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationClick(center.location)}
                    className="group flex cursor-pointer items-center gap-2 text-[11px] text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
                  >
                    <span className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span>{center.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="animate-[footerUp_1.1s_ease-out]">
              <h3 className="mb-2 text-xs font-bold text-white">Stay Updated</h3>
              <p className="mb-2 text-[11px] text-slate-400">Get course updates & offers</p>
              <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/10">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeStatus.loading}
                  className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-[11px] text-white outline-none placeholder:text-slate-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus.loading}
                  className="flex w-8 items-center justify-center bg-blue-600 text-xs font-bold transition-all duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {subscribeStatus.loading ? <span className="animate-spin text-[10px]">⏳</span> : <span>→</span>}
                </button>
              </form>
              {subscribeStatus.message && (
                <p className={`mt-1.5 rounded-md px-2 py-1.5 text-[10px] animate-[messageIn_.3s_ease-out] ${subscribeStatus.type === 'success' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                  {subscribeStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Star Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[10px] text-blue-500 animate-pulse">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-[10px] text-slate-500">
              © {currentYear} <span className="font-bold text-blue-400">COURSER™</span> | Bangalore, India | All Rights Reserved
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 sm:justify-end">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="rounded-full border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-[9px] font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================
          LOCATION MODAL (COMPACT)
      ====================================================== */}
      {isLocationModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/80 px-4 py-4 backdrop-blur-md animate-[fadeIn_.25s_ease-out]"
          onClick={() => setIsLocationModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl animate-[modalIn_.35s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-xs text-white transition-all duration-300 hover:rotate-90 hover:bg-red-500"
            >
              ✕
            </button>

            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-4 py-3 text-white">
              <h2 className="text-base font-extrabold">{currentLocation.name}</h2>
              <p className="mt-0.5 text-[11px] text-blue-100">{currentLocation.address}</p>
            </div>

            <div className="h-48 bg-slate-100 sm:h-56">
              <iframe
                src={currentLocation.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Map of ${selectedLocation}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 p-3">
              <button
                type="button"
                onClick={handleDirections}
                className="rounded-lg bg-blue-600 px-3 py-2.5 text-[11px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
              >
                🗺️ Directions
              </button>
              <button
                type="button"
                onClick={handleCall}
                className="rounded-lg bg-slate-900 px-3 py-2.5 text-[11px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                📞 Call Us
              </button>
            </div>

            <div className="grid gap-2 border-t border-slate-100 bg-slate-50 p-3 sm:grid-cols-2">
              <div className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 shadow-sm">
                <span className="text-sm">🕐</span>
                <div>
                  <strong className="block text-[10px] font-bold text-slate-800">Working Hours</strong>
                  <p className="mt-0.5 text-[10px] text-slate-500">Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 shadow-sm">
                <span className="text-sm">📞</span>
                <div>
                  <strong className="block text-[10px] font-bold text-slate-800">Contact</strong>
                  <p className="mt-0.5 text-[10px] text-slate-500">+91 77060 37060</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS (UNCHANGED)
      ====================================================== */}
      <style>{`
        @keyframes footerUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;
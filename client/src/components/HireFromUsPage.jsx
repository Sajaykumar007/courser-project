import React, { useState, useEffect, useRef } from 'react';

function HireFromUsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    positions: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const benefits = [
    { icon: '🚀', title: 'Industry-Ready Talent', desc: 'Graduates trained on real-world projects and latest technologies' },
    { icon: '⚡', title: 'Quick Hiring Process', desc: 'Access to pre-screened candidates and streamlined recruitment' },
    { icon: '💰', title: 'Cost-Effective', desc: 'Save on recruitment costs with our placement assistance' },
    { icon: '✅', title: 'Verified Skills', desc: 'All candidates undergo rigorous assessments and certifications' },
    { icon: '🌍', title: 'Diverse Talent Pool', desc: 'Access candidates from various technical backgrounds' },
    { icon: '🎓', title: 'Continuous Support', desc: 'Post-hiring support and training assistance available' },
  ];

  const talentPool = [
    { category: 'Full Stack Developers', count: '1,200+', skills: 'MERN, MEAN, Java Spring' },
    { category: 'Data Scientists', count: '800+', skills: 'Python, ML, AI, Analytics' },
    { category: 'Cloud Engineers', count: '650+', skills: 'AWS, Azure, GCP' },
    { category: 'DevOps Engineers', count: '500+', skills: 'Docker, Kubernetes, CI/CD' },
    { category: 'Mobile Developers', count: '450+', skills: 'React Native, Flutter, iOS, Android' },
    { category: 'QA Engineers', count: '600+', skills: 'Automation, Manual Testing' },
  ];

  const hiringProcess = [
    { step: 1, title: 'Share Requirements', desc: 'Tell us about your open positions and skill requirements' },
    { step: 2, title: 'Candidate Matching', desc: 'We match you with pre-screened, qualified candidates' },
    { step: 3, title: 'Interview Process', desc: 'Conduct interviews at your convenience' },
    { step: 4, title: 'Selection & Onboarding', desc: 'Select the best fit and we assist with onboarding' },
  ];

  const industries = ['IT Services', 'Banking & Finance', 'Healthcare', 'E-commerce', 'Telecommunications', 'Manufacturing', 'Consulting', 'Startups'];

  const testimonials = [
    { text: 'Courser helped us find exceptional talent for our development team. The candidates were well-prepared and skilled.', name: 'Rajesh Kumar', role: 'HR Director, Tech Solutions Ltd' },
    { text: "The quality of graduates from Courser is outstanding. We've hired 15+ professionals and all have been excellent.", name: 'Priya Sharma', role: 'Talent Acquisition, Digital Innovations' },
    { text: 'Streamlined hiring process and access to pre-screened candidates saved us months of recruitment time.', name: 'Arun Patel', role: 'CTO, StartupHub Inc' },
  ];

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/placement/hire-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ companyName: '', contactPerson: '', email: '', phone: '', industry: '', positions: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 text-gray-800">

      {/* =====================================================
          HERO SECTION (EXACT MATCH TO CONTACT US PAGE)
      ====================================================== */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-green-900 px-4 py-24 sm:min-h-[460px]">
        <canvas
          ref={heroCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute -left-32 -top-32 z-[1] h-80 w-80 rounded-full bg-green-500/20 blur-3xl animate-[heroFloat_8s_ease-in-out_infinite_alternate]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 z-[1] h-96 w-96 rounded-full bg-green-400/20 blur-3xl animate-[heroFloatReverse_10s_ease-in-out_infinite_alternate]" />
        <div className="pointer-events-none absolute left-[12%] top-[25%] z-[1] h-4 w-4 rounded-full bg-green-300/50 shadow-lg shadow-green-400/50 animate-[floatingDot_4s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute right-[15%] top-[30%] z-[1] h-3 w-3 rounded-full bg-green-300/60 animate-ping" />
        <div className="pointer-events-none absolute bottom-[25%] left-[20%] z-[1] h-2 w-2 rounded-full bg-green-300/60 animate-pulse" />
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:45px_45px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center animate-[heroContent_0.9s_ease-out]">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-300 backdrop-blur-md animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            <span className="animate-pulse">●</span>
            Partnership Opportunities
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            Hire Top Tech Talent
            <br />
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              From Courser
            </span>
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 overflow-hidden rounded-full bg-green-500 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
            <div className="h-full w-full rounded-full bg-green-300 animate-[lineMove_2s_ease-in-out_infinite]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
            Access our pool of 6,200+ industry-ready professionals trained in cutting-edge technologies. Find the perfect fit for your organization.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT WITH WHITE NETWORK ANIMATION
      ====================================================== */}
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <canvas
          ref={whiteCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute left-0 top-20 z-[1] h-72 w-72 rounded-full bg-green-100/60 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-80 w-80 rounded-full bg-green-100/50 blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-16">
          
          {/* Benefits */}
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <SectionHeader title="Why Partner With Us?" subtitle="We connect you with pre-vetted, job-ready professionals" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                  <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-green-500/0 group-hover:bg-green-500/15 blur-3xl transition-all duration-700" />
                  <div className="text-3xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{benefit.icon}</div>
                  <h3 className="text-base font-bold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Talent Pool */}
          <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <SectionHeader title="Our Talent Pool" subtitle="Skilled professionals across multiple domains" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {talentPool.map((talent, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                  <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-green-500/0 group-hover:bg-green-500/15 blur-3xl transition-all duration-700" />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900">{talent.category}</h3>
                    <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600 animate-pulse">{talent.count}</span>
                  </div>
                  <div className="mt-3 h-px bg-gray-100" />
                  <p className="mt-3 text-sm text-gray-600">{talent.skills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Process */}
          <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <SectionHeader title="Simple Hiring Process" subtitle="From requirement to onboarding in 4 easy steps" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {hiringProcess.map((item, index) => (
                <div key={item.step} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                  <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-green-500/0 group-hover:bg-green-500/15 blur-3xl transition-all duration-700" />
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-sm font-black text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="text-center animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 inline-block animate-[bounce_2s_infinite]">Industries</span>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">Industries We Serve</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <button key={index} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-xs font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 animate-[fadeInUp_0.5s_ease-out_both]" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                  <span className="text-green-500 mr-1 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">✓</span>
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="animate-[fadeInUp_0.8s_ease-out_1s_both]">
            <SectionHeader title="What Our Partners Say" subtitle="Success stories from our hiring partners" />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                  <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-green-500/0 group-hover:bg-green-500/15 blur-3xl transition-all duration-700" />
                  <div className="mb-3 flex gap-1 text-xs text-amber-400 animate-[pulse_2s_infinite]">★★★★★</div>
                  <p className="text-sm leading-6 text-gray-600">"{item.text}"</p>
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mx-auto max-w-3xl animate-[fadeInUp_0.8s_ease-out_1.2s_both]">
            <div className="mx-auto max-w-xl text-center mb-8">
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">Get Started</span>
              <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">Partner With Us</h2>
              <p className="mt-2 text-sm text-gray-600">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-md p-6 shadow-xl sm:p-8 animate-[fadeInUp_0.8s_ease-out_1.4s_both]">
              {success ? (
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center animate-[successReveal_0.6s_ease-out]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 animate-[successPop_0.6s_ease-out]">✓</div>
                  <h3 className="mt-4 text-xl font-black text-gray-900">Thank You!</h3>
                  <p className="mt-2 max-w-md text-sm text-gray-600">Our partnership team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter company name" />
                    <FormInput label="Contact Person *" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput label="Email Address *" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="company@email.com" />
                    <FormInput label="Phone Number *" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-gray-700">Industry *</label>
                      <select name="industry" value={formData.industry} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10">
                        <option value="">Select your industry</option>
                        {industries.map((ind, idx) => <option key={idx} value={ind}>{ind}</option>)}
                      </select>
                    </div>
                    <FormInput label="Number of Positions" type="number" name="positions" value={formData.positions} onChange={handleChange} placeholder="e.g., 5" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Additional Requirements</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about the skills you're looking for..." className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm leading-5 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
                  </div>
                  <button type="submit" disabled={loading} className="group relative w-full overflow-hidden rounded-lg bg-green-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70">
                    {!loading && <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[110%]" />}
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Submitting...</>) : (<>Submit Hiring Request <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>)}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}
      <style>{`
        @keyframes heroContent { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes heroFloat { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(60px, 40px) scale(1.15); } }
        @keyframes heroFloatReverse { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-50px, -30px) scale(1.1); } }
        @keyframes floatingDot { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes lineMove { 0% { transform: translateX(-100%); } 50% { transform: translateX(0); } 100% { transform: translateX(100%); } }
        @keyframes cardReveal { 0% { opacity: 0; transform: translateY(35px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes successReveal { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes successPop { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center animate-[fadeInUp_0.6s_ease-out_both]">
      <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">Why Partner With Us</span>
      <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

function FormInput({ label, type = 'text', name, value, onChange, required = false, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-gray-700">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10" />
    </div>
  );
}

export default HireFromUsPage;
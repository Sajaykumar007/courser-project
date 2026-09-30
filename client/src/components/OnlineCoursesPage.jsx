import React, { useEffect, useMemo, useState, useRef } from 'react';

function OnlineCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiredCourses, setEnquiredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const categories = [
    'All',
    'Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Cloud',
  ];

  const hardcodedCourses = [
    {
      _id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'John Smith',
      category: 'Development',
      rating: 4.8,
      reviews: 2547,
      duration: '52 hours',
      lectures: 142,
      level: 'Beginner',
      image: '',
      features: ['HTML, CSS, JavaScript', 'React & Node.js', 'MongoDB & Express', 'Real Projects'],
    },
    {
      _id: '2',
      title: 'Data Science & Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      category: 'Data Science',
      rating: 4.9,
      reviews: 1893,
      duration: '64 hours',
      lectures: 178,
      level: 'Intermediate',
      image: '📊',
      features: ['Python Programming', 'Machine Learning', 'Deep Learning', 'TensorFlow & Keras'],
    },
    {
      _id: '3',
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Chen',
      category: 'Design',
      rating: 4.7,
      reviews: 1256,
      duration: '38 hours',
      lectures: 96,
      level: 'Beginner',
      image: '',
      features: ['Figma & Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    },
    {
      _id: '4',
      title: 'Digital Marketing Strategy',
      instructor: 'Michael Brown',
      category: 'Marketing',
      rating: 4.6,
      reviews: 987,
      duration: '28 hours',
      lectures: 74,
      level: 'Beginner',
      image: '📱',
      features: ['SEO & SEM', 'Social Media Marketing', 'Google Analytics', 'Content Strategy'],
    },
    {
      _id: '5',
      title: 'AWS Cloud Practitioner',
      instructor: 'David Wilson',
      category: 'Cloud',
      rating: 4.8,
      reviews: 1543,
      duration: '42 hours',
      lectures: 112,
      level: 'Intermediate',
      image: '☁️',
      features: ['AWS Fundamentals', 'EC2 & S3', 'Lambda Functions', 'Cloud Security'],
    },
    {
      _id: '6',
      title: 'Business Analytics with Excel',
      instructor: 'Lisa Anderson',
      category: 'Business',
      rating: 4.7,
      reviews: 876,
      duration: '24 hours',
      lectures: 68,
      level: 'Beginner',
      image: '📈',
      features: ['Advanced Excel', 'Data Visualization', 'Pivot Tables', 'Business Intelligence'],
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');
    if (courseFilter) setSearchTerm(courseFilter);
  }, []);

  useEffect(() => {
    const handleFilterCourse = (event) => {
      const value = event.detail;
      if (!value) return;
      setSelectedCategory('All');
      setSearchTerm(value);
      setTimeout(() => {
        document.getElementById('online-courses-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    };
    window.addEventListener('filterOnlineCourse', handleFilterCourse);
    return () => window.removeEventListener('filterOnlineCourse', handleFilterCourse);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/online-courses');
        const data = await response.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCourses(data.data);
        } else {
          setCourses(hardcodedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(hardcodedCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();
    return courses.filter((course) => {
      const title = course.title?.toLowerCase() || '';
      const instructor = course.instructor?.toLowerCase() || '';
      const category = course.category?.toLowerCase() || '';
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory.toLowerCase();
      const matchesSearch = !search || title.includes(search) || instructor.includes(search) || category.includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm]);

  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert('✅ You have already submitted an enquiry for this course!');
      return;
    }
    const studentName = prompt(` Course Enquiry\n\n${course.title}\n\nEnter your full name:`);
    if (!studentName) return;
    const phone = prompt('Enter your phone number:');
    if (!phone) return;
    if (phone.length < 10) {
      alert('❌ Please enter a valid phone number (minimum 10 digits)!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/online-courses/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course._id, courseTitle: course.title, studentName, phone }),
      });
      const data = await response.json();
      if (data.success) {
        setEnquiredCourses((prev) => [...prev, course._id]);
        alert('✅ Thank you! Your enquiry has been submitted.\n\nOur team will contact you within 24 hours.');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      alert('❌ Server error. Please try again.');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-slate-800 font-sans animate-[pageLoad_0.6s_ease-out_forwards]">
      <style>{`
        @keyframes pageLoad { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cardIn { 0% { opacity: 0; transform: translateY(25px) scale(.97); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes modalFade { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes modalIn { 0% { opacity: 0; transform: translateY(25px) scale(.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes lineMove { 0% { transform: translateX(-100%); } 50% { transform: translateX(200%); } 100% { transform: translateX(-100%); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
        .animate-fade-in-up { animation: fadeUp 0.6s ease-out forwards; }
        .animate-glow { animation: glowPulse 4s ease-in-out infinite; }
        .delay-200 { animation-delay: 200ms; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
      `}</style>

      {/* ===== HERO SECTION WITH DARK NETWORK ANIMATION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-slate-950 to-green-950 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <canvas
          ref={heroCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />
        <div className="absolute -left-32 -top-32 z-[1] h-64 w-64 rounded-full bg-green-500/20 blur-3xl animate-glow" />
        <div className="absolute -bottom-32 -right-24 z-[1] h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-glow delay-200" />
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-green-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> ONLINE LEARNING
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Learn From Anywhere
            <br />
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              At Your Own Pace
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            Access industry-leading courses taught by expert instructors. Learn new skills and advance your career with flexible online learning.
          </p>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['📚', '100+', 'Courses'],
              ['👨‍🏫', '50+', 'Expert Instructors'],
              ['👥', '50k+', 'Students'],
              ['🎓', '100%', 'Certification']
            ].map(([icon, number, label], index) => (
              <div key={index} className="animate-fade-in-up rounded-xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-xl">{icon}</div>
                <div className="mt-1 text-lg font-black text-white sm:text-xl">{number}</div>
                <div className="mt-0.5 text-[10px] text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEARCH + FILTER ===== */}
      <section className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm">🔍</div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses or instructors..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-xs text-slate-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-500 transition-all hover:bg-green-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-gray-100 text-slate-500 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT WITH WHITE NETWORK ANIMATION ===== */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <canvas
          ref={whiteCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute left-0 top-20 z-[1] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-16">
          
          {/* ===== COURSES GRID ===== */}
          <div id="online-courses-grid">
            <div className="mb-10 text-center animate-fade-in-up">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Professional Training</span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Featured Courses</h2>
              <p className="mt-2 text-xs text-gray-500">Choose from our wide range of professional courses</p>
              <div className="mx-auto mt-3 h-1 w-12 overflow-hidden rounded-full bg-green-100">
                <div className="h-full w-1/2 bg-green-500 animate-[lineMove_2s_ease-in-out_infinite]" />
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />
                  <p className="mt-4 text-xs font-semibold text-gray-500">Loading courses...</p>
                </div>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, index) => {
                  const isSelected = selectedCourse?._id === course._id;
                  const isEnquired = enquiredCourses.includes(course._id);
                  return (
                    <div
                      key={course._id}
                      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:border-green-300 hover:shadow-xl ${
                        isSelected ? 'border-green-400 ring-2 ring-green-100' : ''
                      }`}
                      style={{ animation: `cardIn .55s ease-out ${index * 80}ms both` }}
                    >
                      <div className="absolute left-0 right-0 top-0 h-1.5 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 group-hover:h-1.5 group-hover:shadow-[0_4px_15px_rgba(34,197,94,0.6)]" />
                      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-100/50 blur-3xl transition-transform duration-500 group-hover:scale-150" />
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-green-950">
                        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(16,185,129,.5),transparent_55%)]" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-5xl shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          {course.image || '💻'}
                        </div>
                        <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-md">
                          {course.level || 'Beginner'}
                        </span>
                        <span className="absolute bottom-3 left-3 rounded-full bg-green-500 px-2.5 py-1 text-[9px] font-bold text-white shadow-lg">
                          {course.category}
                        </span>
                      </div>

                      <div className="relative p-4">
                        <h3 className="min-h-[42px] text-base font-extrabold leading-5 text-slate-800 transition-colors duration-300 group-hover:text-green-600">
                          {course.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50">👨‍🏫</span>
                          <span className="truncate">{course.instructor}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">⭐ {course.rating}</span>
                          <span className="text-[9px] text-gray-400">({course.reviews} reviews)</span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-gray-50 px-2 py-2 text-center transition-colors group-hover:bg-green-50">
                            <div className="text-[9px] text-gray-400">Duration</div>
                            <div className="mt-0.5 text-[10px] font-bold text-slate-700">️ {course.duration}</div>
                          </div>
                          <div className="rounded-lg bg-gray-50 px-2 py-2 text-center transition-colors group-hover:bg-green-50">
                            <div className="text-[9px] text-gray-400">Lectures</div>
                            <div className="mt-0.5 text-[10px] font-bold text-slate-700">📚 {course.lectures}</div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          {course.features?.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-[10px] text-gray-500">
                              <span className="text-green-500">✓</span>
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCourse(course)}
                            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[10px] font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            disabled={isEnquired}
                            onClick={() => handleEnquiry(course)}
                            className={`flex-1 rounded-xl px-3 py-2.5 text-[10px] font-bold transition-all duration-300 ${
                              isEnquired
                                ? 'cursor-not-allowed bg-green-100 text-green-600'
                                : 'bg-green-600 text-white shadow-md shadow-green-200 hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-lg'
                            }`}
                          >
                            {isEnquired ? '✓ Enquired' : 'Enquire Now'}
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-500 group-hover:w-2/3" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 text-center shadow-sm animate-fade-in-up">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-3xl">📭</div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-800">No courses found</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">Try adjusting your search or filter criteria.</p>
                <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-lg">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* ===== WHY ONLINE LEARNING ===== */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-200/50">
            <div className="mb-10 text-center animate-fade-in-up">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Learn Better</span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Why Choose Online Learning?</h2>
              <p className="mt-2 text-xs text-gray-500">Flexible, affordable, and effective learning</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '⏰', title: 'Learn at Your Pace', text: 'Access course materials anytime, anywhere.' },
                { icon: '💰', title: 'Affordable Pricing', text: 'High-quality education at an affordable cost.' },
                { icon: '👨‍🏫', title: 'Expert Instructors', text: 'Learn from industry professionals.' },
                { icon: '📜', title: 'Certification', text: 'Earn industry-recognized certificates.' },
                { icon: '💬', title: '24/7 Support', text: 'Get help whenever you need it.' },
                { icon: '🔄', title: 'Lifetime Access', text: 'Access course materials and updates.' },
              ].map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-lg animate-fade-in-up"
                  style={{ animation: `cardIn .5s ease-out ${index * 70}ms both` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1.5 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 group-hover:h-1.5 group-hover:shadow-[0_4px_15px_rgba(34,197,94,0.6)]" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-100">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-green-600">{benefit.title}</h3>
                      <p className="mt-1 text-[10px] leading-5 text-gray-500">{benefit.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== CTA ===== */}
          <div className="relative overflow-hidden bg-gradient-to-r from-green-900/95 via-green-800/95 to-green-900/95 backdrop-blur-md rounded-3xl border border-white/10 px-4 py-12 text-center text-white sm:px-6 lg:px-8 lg:py-16">
            <div className="absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-pulse" />
            <div className="relative mx-auto max-w-2xl animate-fade-in-up">
              <div className="text-3xl animate-bounce">🚀</div>
              <h2 className="mt-3 text-2xl font-black">Ready to Start Learning?</h2>
              <p className="mt-2 text-xs text-green-100">Join thousands of students already learning with Courser.</p>
              <button
                type="button"
                onClick={() => document.getElementById('online-courses-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-5 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Browse All Courses →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===== COURSE DETAILS MODAL ===== */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setSelectedCourse(null)} style={{ animation: 'modalFade .25s ease-out both' }}>
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200" style={{ animation: 'modalIn .35s ease-out both' }}>
            <div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-slate-900 to-green-950 px-6 py-7 text-white">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/20 blur-2xl" />
              <button type="button" onClick={() => setSelectedCourse(null)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm transition-all hover:bg-white/20">✕</button>
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-sm">{selectedCourse.image || '💻'}</div>
                <span className="mt-4 inline-block rounded-full bg-green-500 px-2.5 py-1 text-[9px] font-bold">{selectedCourse.category}</span>
                <h2 className="mt-3 pr-8 text-xl font-black">{selectedCourse.title}</h2>
                <p className="mt-1 text-xs text-gray-400">👨‍🏫 {selectedCourse.instructor}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-sm">⭐</div>
                  <div className="mt-1 text-xs font-bold">{selectedCourse.rating}</div>
                  <div className="text-[8px] text-gray-400">Rating</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-sm">⏱️</div>
                  <div className="mt-1 text-xs font-bold">{selectedCourse.duration}</div>
                  <div className="text-[8px] text-gray-400">Duration</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-sm">📚</div>
                  <div className="mt-1 text-xs font-bold">{selectedCourse.lectures}</div>
                  <div className="text-[8px] text-gray-400">Lectures</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-extrabold text-slate-800">What You'll Learn</h3>
                <div className="mt-3 space-y-2">
                  {selectedCourse.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-[10px] text-slate-600">
                      <span className="font-bold text-green-500">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setSelectedCourse(null)} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-gray-200">Close</button>
                <button
                  type="button"
                  disabled={enquiredCourses.includes(selectedCourse._id)}
                  onClick={() => handleEnquiry(selectedCourse)}
                  className={`flex-1 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                    enquiredCourses.includes(selectedCourse._id) ? 'bg-green-100 text-green-600' : 'bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-500'
                  }`}
                >
                  {enquiredCourses.includes(selectedCourse._id) ? '✓ Enquired' : 'Enquire Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnlineCoursesPage;
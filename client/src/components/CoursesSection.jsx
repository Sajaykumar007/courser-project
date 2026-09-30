import React, { useRef, useEffect } from "react";

function CoursesSection() {
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

  const courses = [
    {
      name: "Web Developer",
      learners: "18,456",
      icon: "💻",
      route: "allCourses",
    },
    {
      name: "Cloud Architect",
      learners: "33,442",
      icon: "☁️",
      route: "onlineCourses",
    },
    {
      name: "Business Analyst",
      learners: "14,668",
      icon: "📊",
      route: "allCourses",
    },
    {
      name: "Java Developer",
      learners: "14,111",
      icon: "☕",
      route: "allCourses",
    },
    {
      name: "Digital Marketing",
      learners: "17,557",
      icon: "📱",
      route: "onlineCourses",
    },
    {
      name: "Cyber Security",
      learners: "11,432",
      icon: "🔒",
      route: "allCourses",
    },
    {
      name: "Data Analyst",
      learners: "12,456",
      icon: "📈",
      route: "onlineCourses",
    },
    {
      name: "DevOps Engineer",
      learners: "24,487",
      icon: "⚙️",
      route: "allCourses",
    },
    {
      name: "Big Data",
      learners: "14,889",
      icon: "💾",
      route: "onlineCourses",
    },
  ];

  const handleCourseClick = (route) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: route || "allCourses",
      })
    );
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gray-50
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-10
        lg:px-14
        lg:py-20
        xl:px-20
      "
    >
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
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          z-[1]
          h-64
          w-64
          animate-pulse
          rounded-full
          bg-green-100/60
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          z-[1]
          h-72
          w-72
          animate-pulse
          rounded-full
          bg-green-100/50
          blur-3xl
        "
      />

      {/* =========================================
          CONTAINER
      ========================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* =======================================
            SECTION HEADER
        ======================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-200
              bg-green-50
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-green-700
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <span className="animate-pulse">✨</span>
            Explore Our Courses
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-gray-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Choose from{" "}
            <span
              className="
                bg-gradient-to-r
                from-green-600
                to-green-500
                bg-clip-text
                text-transparent
              "
            >
              Offline & Online
            </span>{" "}
            Courses
          </h2>

          <p
            className="
              mt-5
              text-sm
              leading-7
              text-gray-600
              sm:text-base
            "
          >
            Courser provides a Range of Courses Masters
            Program, Post Graduate Program. You can choose
            both Offline and Online classes at your preferred
            location at your desired pricing. Contact us for
            course details, location and pricing.
          </p>
        </div>

        {/* =======================================
            SUB SECTION TITLE
        ======================================== */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-200" />
          <h3
            className="
              rounded-full
              bg-white/80
              backdrop-blur-sm
              px-5
              py-2
              text-lg
              font-bold
              text-gray-800
              shadow-sm
              ring-1
              ring-gray-100
              sm:text-xl
            "
          >
            Master's Program
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-200" />
        </div>

        {/* =======================================
            COURSES GRID
        ======================================== */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => handleCourseClick(course.route)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white/80
                backdrop-blur-sm
                p-5
                shadow-sm
                transition-all
                duration-500
                cursor-pointer
                hover:-translate-y-2
                hover:border-green-300
                hover:shadow-xl
                hover:shadow-green-100/70
                active:scale-[0.98]
              "
              style={{
                animation: "courseCardFloat 4s ease-in-out infinite",
                animationDelay: `${idx * 0.15}s`,
              }}
            >
              {/* ✅ UPDATED: Very thin initially (h-0.5), grows BIG (h-1.5) on hover with smooth animation */}
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

              {/* Background glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-green-50
                  opacity-0
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              {/* Icon & Number */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-50
                    to-green-50
                    text-3xl
                    shadow-sm
                    transition-all
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                    group-hover:shadow-md
                  "
                >
                  {course.icon}
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    text-gray-300
                    transition-colors
                    duration-300
                    group-hover:text-green-500
                  "
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title & Description */}
              <h4
                className="
                  relative
                  z-10
                  mt-5
                  text-lg
                  font-bold
                  text-gray-800
                  transition-colors
                  duration-300
                  group-hover:text-green-700
                "
              >
                {course.name}
              </h4>

              <p className="relative z-10 mt-2 text-xs leading-5 text-gray-500">
                {course.route === "onlineCourses"
                  ? "100% Online Class"
                  : "Offline & Online Class"}
              </p>

              {/* Learners & Action */}
              <div className="relative z-10 mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      text-green-600
                    "
                  >
                    👥
                  </span>
                  {course.learners} Learners
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-50
                    text-gray-400
                    transition-all
                    duration-300
                    group-hover:bg-green-500
                    group-hover:text-white
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </div>

              {/* Bottom shine */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-10
                  left-1/2
                  h-20
                  w-20
                  -translate-x-1/2
                  rounded-full
                  bg-green-400/10
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>

        {/* =======================================
            BOTTOM INFO
        ======================================== */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <p className="text-sm font-medium text-gray-500">
            Learn from industry experts and build job-ready skills.
          </p>
        </div>
      </div>

      {/* =========================================
          CARD FLOAT ANIMATION
      ========================================== */}
      <style>{`
        @keyframes courseCardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `}</style>
    </section>
  );
}

export default CoursesSection;
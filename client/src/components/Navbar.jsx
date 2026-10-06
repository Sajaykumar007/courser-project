import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { BarsIcon } from "primereact/icons/bars";
import { TimesIcon } from "primereact/icons/times";
import { ChevronRightIcon } from "primereact/icons/chevronright";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const [allCourses, setAllCourses] = useState([]);
  const [onlineCourses, setOnlineCourses] = useState([]);
  const [placementDrives, setPlacementDrives] = useState([]);
  const [hiringPartners, setHiringPartners] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpandedMenu, setSidebarExpandedMenu] = useState(null);

  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const navbarCanvasRef = useRef(null);

  // ============================================================
  // 1. FETCH REAL DATA FOR NAVBAR DROPDOWNS
  // ============================================================
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const coursesRes = await fetch("http://localhost:5000/api/courses");
        const coursesData = await coursesRes.json();
        if (coursesData.success) setAllCourses(coursesData.data);

        const onlineRes = await fetch("http://localhost:5000/api/online-courses");
        const onlineData = await onlineRes.json();
        if (onlineData.success) setOnlineCourses(onlineData.data);

        const drivesRes = await fetch("http://localhost:5000/api/placement/placement-drives");
        const drivesData = await drivesRes.json();
        if (drivesData.success) setPlacementDrives(drivesData.data.slice(0, 6));

        const partnersRes = await fetch("http://localhost:5000/api/placement/hiring-partners");
        const partnersData = await partnersRes.json();
        if (partnersData.success) setHiringPartners(partnersData.data.slice(0, 6));

      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    };
    fetchNavbarData();
  }, []);

  // ============================================================
  // 2. NETWORK BACKGROUND ANIMATION
  // ============================================================
  useEffect(() => {
    const canvas = navbarCanvasRef.current;
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
      particleCount = Math.max(20, particleCount);
      particleCount = Math.min(50, particleCount);

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

  // ============================================================
  // 3. NAVIGATION & EVENT HANDLERS
  // ============================================================
  const announcements = [
    "🎓 100% Placement Assistance",
    "💰 12 Months No Cost EMI",
    "👨‍ Industry Expert Trainers",
    " Live Real-time Projects",
    "🌍 Internationally Recognized Certification",
  ];

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
        setSidebarExpandedMenu(null);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isSidebarOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateTo = (page) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: page }));
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCourse = (courseName) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "allCourses" }));
    window.history.pushState({}, "", `/courses?course=${encodeURIComponent(courseName)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("filterCourse", { detail: courseName }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToOnlineCourse = (courseName) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "onlineCourses" }));
    window.history.pushState({}, "", `/online-courses?course=${encodeURIComponent(courseName)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("filterOnlineCourse", { detail: courseName }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCorporateTraining = (trainingType) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "corporateTraining" }));
    window.history.pushState({}, "", `/corporate-training?training=${encodeURIComponent(trainingType)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("filterCorporateTraining", { detail: trainingType }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToHireFromUs = (industry) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "hireFromUs" }));
    window.history.pushState({}, "", `/hire-from-us?industry=${encodeURIComponent(industry)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("filterHireFromUs", { detail: industry }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToPlacements = (section) => {
    window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "placements" }));
    window.history.pushState({}, "", `/placements?section=${encodeURIComponent(section)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("scrollToPlacementsSection", { detail: section }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToContactUs = (action, value) => {
    if (action === "link") {
      window.location.href = value;
    } else {
      window.dispatchEvent(new CustomEvent("navigateToPage", { detail: "contactUs" }));
      window.history.pushState({}, "", `/contact?scrollTo=${encodeURIComponent(value)}`);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("scrollToContactSection", { detail: value }));
      }, 300);
    }
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const toggleSidebarSubmenu = (menuKey) => {
    setSidebarExpandedMenu(sidebarExpandedMenu === menuKey ? null : menuKey);
  };

  const handleMouseEnter = (menuKey) => {
    if (!isMobile && menuData[menuKey].type !== "link") {
      clearTimeout(timeoutRef.current);
      setActiveMenu(menuKey);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
    }
  };

  // ✅ FIXED: Click handler now navigates to page AND shows dropdown
  const handleClick = (menuKey, e) => {
    e.preventDefault();
    
    // Always navigate to the main page first
    if (menuData[menuKey].onClick) {
      menuData[menuKey].onClick();
    }
    
    // Then toggle dropdown
    if (!isMobile) {
      setActiveMenu(activeMenu === menuKey ? null : menuKey);
    } else {
      // On mobile, just toggle
      setActiveMenu(activeMenu === menuKey ? null : menuKey);
    }
  };

  const handleJoinNow = () => {
    window.dispatchEvent(new CustomEvent("navigateToJoinNow"));
    setIsSidebarOpen(false);
  };

  const handleCourseClick = (e, course) => {
    e.preventDefault();
    e.stopPropagation();

    if (course.type === "course") navigateToCourse(course.name);
    else if (course.type === "onlineCourse") navigateToOnlineCourse(course.name);
    else if (course.type === "corporate") navigateToCorporateTraining(course.value);
    else if (course.type === "hire") navigateToHireFromUs(course.value);
    else if (course.type === "placement") navigateToPlacements(course.value);
    else if (course.type === "link") window.location.href = course.value;
    else if (course.type === "scroll") navigateToContactUs("scroll", course.value);
  };

  // ============================================================
  // 4. DYNAMIC MENU DATA
  // ============================================================
  const menuData = {
    home: { 
      label: "Home", 
      type: "link", 
      onClick: () => navigateTo("home") 
    },
    allCourses: {
      label: "All Courses",
      type: "mega",
      onClick: () => navigateTo("allCourses"),
      items: allCourses.length > 0 
        ? allCourses.slice(0, 6).map((course) => ({ name: course.title, type: "course" })) 
        : [
            { name: "Web Developer", type: "course" },
            { name: "Cloud Architect", type: "course" },
            { name: "Business Analyst", type: "course" },
            { name: "Java Developer", type: "course" },
            { name: "Digital Marketing", type: "course" },
            { name: "Cyber Security", type: "course" },
          ],
    },
    onlineCourses: {
      label: "Online Courses",
      type: "mega",
      onClick: () => navigateTo("onlineCourses"),
      items: onlineCourses.length > 0 
        ? onlineCourses.slice(0, 6).map((course) => ({ name: course.title, type: "onlineCourse" })) 
        : [
            { name: "Web Development Bootcamp", type: "onlineCourse" },
            { name: "Data Science & ML", type: "onlineCourse" },
            { name: "UI/UX Design Masterclass", type: "onlineCourse" },
            { name: "Digital Marketing Strategy", type: "onlineCourse" },
          ],
    },
    placements: {
      label: "Placements",
      type: "mega",
      onClick: () => navigateTo("placements"),
      items: placementDrives.length > 0
        ? placementDrives.map((drive) => ({ 
            name: `${drive.company} - ${drive.role}`, 
            type: "placement", 
            value: "placement-enquiry" 
          }))
        : [
            { name: "📋 Placement Support", type: "placement", value: "placement-enquiry" },
            { name: "⭐ Success Stories", type: "placement", value: "success-stories" },
            { name: "🏢 Hiring Partners", type: "placement", value: "hiring-partners" },
            { name: "📅 Upcoming Drives", type: "placement", value: "placement-enquiry" },
            { name: "💼 Career Guidance", type: "placement", value: "placement-enquiry" },
          ],
    },
    hireFromUs: {
      label: "Hire From Us",
      type: "mega",
      onClick: () => navigateTo("hireFromUs"),
      items: [
        { name: "IT Services", type: "hire", value: "IT Services" },
        { name: "Banking & Finance", type: "hire", value: "Banking & Finance" },
        { name: "Healthcare", type: "hire", value: "Healthcare" },
        { name: "E-commerce", type: "hire", value: "E-commerce" },
        { name: "Manufacturing", type: "hire", value: "Manufacturing" },
      ],
    },
    corporateTraining: {
      label: "Corporate Training",
      type: "mega",
      onClick: () => navigateTo("corporateTraining"),
      items: [
        { name: "Technical Skills", type: "corporate", value: "Technical" },
        { name: "Data & Analytics", type: "corporate", value: "Data" },
        { name: "Leadership & Management", type: "corporate", value: "Leadership" },
        { name: "Cybersecurity", type: "corporate", value: "Cybersecurity" },
        { name: "Digital Marketing", type: "corporate", value: "Digital Marketing" },
      ],
    },
    contactUs: {
      label: "Contact Us",
      type: "mega",
      onClick: () => navigateTo("contactUs"),
      items: [
        { name: " Call Us", type: "link", value: "tel:+917706037060" },
        { name: "️ Email Us", type: "link", value: "mailto:hi@courser.in" },
        { name: "📍 Our Centers", type: "scroll", value: "contact-centers" },
        { name: "📝 Contact Form", type: "scroll", value: "contact-form" },
      ],
    },
  };

  const menuKeys = Object.keys(menuData);

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-[72px] sm:top-[76px] left-0 right-0 z-[999] h-10 sm:h-11 bg-emerald-50/95 backdrop-blur-sm border-b border-emerald-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap h-full items-center">
          {[...announcements, ...announcements, ...announcements].map((text, idx) => (
            <span key={idx} className="mx-4 sm:mx-6 text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-1.5 sm:gap-2">
              {text}
              <span className="text-emerald-500 text-sm sm:text-lg leading-none">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[1000] h-[72px] sm:h-[76px] flex items-center bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <canvas
          ref={navbarCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          className="relative z-10 ml-2 sm:ml-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm transition hover:bg-gray-100 lg:hidden"
        >
          <BarsIcon className="h-5 w-5 text-gray-700" />
        </button>

        <div
          onClick={() => navigateTo("home")}
          role="button"
          aria-label="Courser Home"
          className="relative z-10 ml-2 sm:ml-4 flex cursor-pointer items-center lg:ml-6"
        >
          <img src="/logo.png" alt="Courser Logo" className="h-9 sm:h-11 w-auto object-contain" />
        </div>

        <ul role="menubar" className="relative z-10 ml-2 sm:ml-6 hidden h-full items-center gap-1 lg:flex">
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isActive = activeMenu === key;
            const hasDropdown = item.type !== "link";

            return (
              <li
                key={key}
                role="none"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                className="relative h-full flex items-center"
              >
                <button
                  role="menuitem"
                  aria-expanded={isActive}
                  aria-haspopup={hasDropdown}
                  onClick={(e) => handleClick(key, e)}
                  className={`flex h-full items-center gap-1.5 whitespace-nowrap px-3 sm:px-4 text-[14px] sm:text-[15px] font-semibold tracking-wide transition duration-200 ${
                    isActive ? "text-emerald-600" : "text-slate-700 hover:text-emerald-600"
                  }`}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} 
                    />
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {hasDropdown && isActive && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-0 z-[1100] w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-900/20 animate-[fadeIn_0.2s_ease-out]"
                    onMouseEnter={() => {
                      clearTimeout(timeoutRef.current);
                      setActiveMenu(key);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.items && item.items.length > 0 ? (
                      item.items.map((subItem, idx) => (
                        <button
                          key={idx}
                          role="menuitem"
                          onClick={(e) => handleCourseClick(e, subItem)}
                          className="w-full group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition duration-200 hover:bg-emerald-50 hover:text-emerald-700 text-left"
                        >
                          <span className="line-clamp-1">{subItem.name}</span>
                          <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-600" />
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        Loading...
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="relative z-10 ml-auto mr-2 sm:mr-4 lg:mr-6">
          <button
            type="button"
            onClick={handleJoinNow}
            aria-label="Join Now"
            className="rounded-full bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0"
          >
            Join Now
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => {
            setIsSidebarOpen(false);
            setSidebarExpandedMenu(null);
          }}
          aria-hidden="true"
          className="fixed inset-0 z-[1190] bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="vertical-sidebar"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isSidebarOpen}
        className={`fixed left-0 top-0 z-[1200] flex h-screen w-[min(320px,85vw)] sm:w-[min(360px,85vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 px-4 sm:px-5">
          <div onClick={() => navigateTo("home")} role="button" aria-label="Courser Home" className="cursor-pointer">
            <img src="/logo.png" alt="Courser Logo" className="h-9 sm:h-10 w-auto object-contain" />
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSidebarOpen(false);
              setSidebarExpandedMenu(null);
            }}
            aria-label="Close menu"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <TimesIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-5">
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isExpanded = sidebarExpandedMenu === key;
            const hasSubmenu = item.type === "mega";

            return (
              <div key={key} className="mb-2">
                {hasSubmenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        toggleSidebarSubmenu(key);
                        if (item.onClick) item.onClick();
                      }}
                      aria-expanded={isExpanded}
                      className={`flex w-full items-center justify-between rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-left text-[14px] sm:text-[15px] font-semibold transition ${
                        isExpanded ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-1 ml-3 border-l-2 border-emerald-100 pl-3">
                        {item.items.map((subItem, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleCourseClick(e, subItem)}
                            className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <span>{subItem.name}</span>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="flex w-full items-center rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-left text-[14px] sm:text-[15px] font-semibold text-slate-700 transition hover:bg-gray-50 hover:text-emerald-700"
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-gray-200 p-4 sm:p-5">
          <button
            type="button"
            onClick={handleJoinNow}
            className="w-full rounded-xl bg-emerald-600 px-5 py-3 sm:py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg"
          >
            Join Now
          </button>
        </div>
      </aside>

      <div className="h-[112px] sm:h-[120px]" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
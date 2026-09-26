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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpandedMenu, setSidebarExpandedMenu] = useState(null);

  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);

  const announcements = [
    "🎓 100% Placement Assistance",
    "💰 12 Months No Cost EMI",
    "👨‍🏫 Industry Expert Trainers",
    "🚀 Live Real-time Projects",
    "🌍 Internationally Recognized Certification",
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        if (data.success) setAllCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchOnlineCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/online-courses");
        const data = await res.json();
        if (data.success) setOnlineCourses(data.data);
      } catch (error) {
        console.error("Error fetching online courses:", error);
      }
    };
    fetchOnlineCourses();
  }, []);

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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

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

  const menuData = {
    home: { label: "Home", type: "link", onClick: () => navigateTo("home") },
    allCourses: {
      label: "All Courses",
      type: "mega",
      onClick: () => navigateTo("allCourses"),
      items: allCourses.length > 0 ? allCourses.map((course) => ({ name: course.title, type: "course" })) : [
        { name: "Web Developer", type: "course" },
        { name: "Cloud Architect", type: "course" },
        { name: "Business Analyst", type: "course" },
        { name: "Java Developer", type: "course" },
        { name: "Digital Marketing", type: "course" },
        { name: "Cyber Security", type: "course" },
        { name: "Data Analyst", type: "course" },
        { name: "DevOps Engineer", type: "course" },
        { name: "Big Data", type: "course" },
      ],
    },
    onlineCourses: {
      label: "Online Courses",
      type: "mega",
      onClick: () => navigateTo("onlineCourses"),
      items: onlineCourses.length > 0 ? onlineCourses.map((course) => ({ name: course.title, type: "onlineCourse" })) : [
        { name: "Web Development Bootcamp", type: "onlineCourse" },
        { name: "Data Science & ML", type: "onlineCourse" },
        { name: "UI/UX Design Masterclass", type: "onlineCourse" },
        { name: "Digital Marketing Strategy", type: "onlineCourse" },
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
        { name: "Emerging Technologies", type: "corporate", value: "Emerging Tech" },
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
        { name: "Telecommunications", type: "hire", value: "Telecommunications" },
        { name: "Manufacturing", type: "hire", value: "Manufacturing" },
      ],
    },
    placements: {
      label: "Placements",
      type: "mega",
      onClick: () => navigateTo("placements"),
      items: [
        { name: "Placement Support", type: "placement", value: "placement-enquiry" },
        { name: "Success Stories", type: "placement", value: "success-stories" },
        { name: "Hiring Partners", type: "placement", value: "hiring-partners" },
        { name: "Career Guidance", type: "placement", value: "placement-enquiry" },
      ],
    },
    contactUs: {
      label: "Contact Us",
      type: "mega",
      onClick: () => navigateTo("contactUs"),
      items: [
        { name: "Call Us", type: "link", value: "tel:+917706037060" },
        { name: "Email Us", type: "link", value: "mailto:hi@courser.in" },
        { name: "Our Centers", type: "scroll", value: "contact-centers" },
        { name: "Contact Form", type: "scroll", value: "contact-form" },
      ],
    },
  };

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

  const handleMouseEnter = (menuKey) => {
    if (!isMobile && menuData[menuKey].type !== "link") {
      clearTimeout(timeoutRef.current);
      setActiveMenu(menuKey);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
    }
  };

  const handleClick = (menuKey) => {
    if (isMobile) {
      if (menuData[menuKey].type === "link" && menuData[menuKey].onClick) {
        menuData[menuKey].onClick();
      } else {
        setActiveMenu(activeMenu === menuKey ? null : menuKey);
      }
    }
  };

  const handleJoinNow = () => {
    window.dispatchEvent(new CustomEvent("navigateToJoinNow"));
    setIsSidebarOpen(false);
  };

  const menuKeys = Object.keys(menuData);

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

  return (
    <>
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}
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

      {/* =====================================================
          HORIZONTAL NAVBAR
      ====================================================== */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[1000] h-[72px] sm:h-[76px] flex items-center bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        {/* Hamburger Menu (PrimeReact Icon) */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          aria-expanded={isSidebarOpen}
          aria-controls="vertical-sidebar"
          className="ml-2 sm:ml-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:bg-gray-100 lg:hidden"
        >
          <BarsIcon className="h-5 w-5 text-gray-700" />
        </button>

        {/* Logo */}
        <div
          onClick={() => navigateTo("home")}
          role="button"
          aria-label="Courser Home"
          className="ml-2 sm:ml-4 flex cursor-pointer items-center lg:ml-6"
        >
          <img src="/logo.png" alt="Courser Logo" className="h-9 sm:h-11 w-auto object-contain" />
        </div>

        {/* Desktop Menu */}
        <ul role="menubar" className="ml-2 sm:ml-6 hidden h-full items-center gap-1 lg:flex">
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
                onClick={() => handleClick(key)}
                className="relative h-full flex items-center"
              >
                <a
                  href="#!"
                  role="menuitem"
                  aria-expanded={isActive}
                  aria-haspopup={hasDropdown}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
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
                </a>

                {/* ========================================
                    VERTICAL DROPDOWN MENU
                ========================================= */}
                {hasDropdown && isActive && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-2 z-[1100] w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/50 animate-[fadeIn_0.2s_ease-out]"
                  >
                    {item.items.map((subItem, idx) => (
                      <a
                        key={idx}
                        href="#!"
                        role="menuitem"
                        onClick={(e) => handleCourseClick(e, subItem)}
                        className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <span className="line-clamp-1">{subItem.name}</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-600" />
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Join Now Button - COMPACT SIZE */}
        <div className="ml-auto mr-2 sm:mr-4 lg:mr-6">
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

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
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

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}
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
                      onClick={() => toggleSidebarSubmenu(key)}
                      aria-expanded={isExpanded}
                      aria-controls={`sidebar-submenu-${key}`}
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
                      <div id={`sidebar-submenu-${key}`} role="menu" className="mt-1 ml-3 border-l-2 border-emerald-100 pl-3">
                        {item.items.map((subItem, idx) => (
                          <a
                            key={idx}
                            href="#!"
                            role="menuitem"
                            onClick={(e) => handleCourseClick(e, subItem)}
                            className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <span>{subItem.name}</span>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-emerald-600" />
                          </a>
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

      {/* ✅ FIXED SPACER - Navbar (72px/76px) + Announcement Bar (40px/44px) = 112px/120px */}
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
      `}</style>
    </>
  );
}

export default Navbar;
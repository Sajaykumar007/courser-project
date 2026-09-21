import React, { useState, useEffect, useRef } from "react";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [onlineCourses, setOnlineCourses] = useState([]);

  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpandedMenu, setSidebarExpandedMenu] = useState(null);

  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const scrollRef = useRef(null);

  // ============================================
  // FETCH ALL COURSES
  // ============================================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://courser-project.onrender.com/api/courses"
        );

        const data = await res.json();

        if (data.success) {
          setAllCourses(data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // ============================================
  // FETCH ONLINE COURSES
  // ============================================
  useEffect(() => {
    const fetchOnlineCourses = async () => {
      try {
        const res = await fetch(
          "https://courser-project.onrender.com/api/online-courses"
        );

        const data = await res.json();

        if (data.success) {
          setOnlineCourses(data.data);
        }
      } catch (error) {
        console.error("Error fetching online courses:", error);
      }
    };

    fetchOnlineCourses();
  }, []);

  // ============================================
  // CLOSE SIDEBAR WITH ESC
  // ============================================
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
        setSidebarExpandedMenu(null);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isSidebarOpen]);

  // ============================================
  // PREVENT BODY SCROLL
  // ============================================
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

  // ============================================
  // NAVIGATION
  // ============================================
  const navigateTo = (page) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: page,
      })
    );

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCourse = (courseName) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "allCourses",
      })
    );

    window.history.pushState(
      {},
      "",
      `/courses?course=${encodeURIComponent(courseName)}`
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("filterCourse", {
          detail: courseName,
        })
      );
    }, 300);

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToOnlineCourse = (courseName) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "onlineCourses",
      })
    );

    window.history.pushState(
      {},
      "",
      `/online-courses?course=${encodeURIComponent(courseName)}`
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("filterOnlineCourse", {
          detail: courseName,
        })
      );
    }, 300);

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCorporateTraining = (trainingType) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "corporateTraining",
      })
    );

    window.history.pushState(
      {},
      "",
      `/corporate-training?training=${encodeURIComponent(trainingType)}`
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("filterCorporateTraining", {
          detail: trainingType,
        })
      );
    }, 300);

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToHireFromUs = (industry) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "hireFromUs",
      })
    );

    window.history.pushState(
      {},
      "",
      `/hire-from-us?industry=${encodeURIComponent(industry)}`
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("filterHireFromUs", {
          detail: industry,
        })
      );
    }, 300);

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToPlacements = (section) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "placements",
      })
    );

    window.history.pushState(
      {},
      "",
      `/placements?section=${encodeURIComponent(section)}`
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("scrollToPlacementsSection", {
          detail: section,
        })
      );
    }, 300);

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToContactUs = (action, value) => {
    if (action === "link") {
      window.location.href = value;
    } else {
      window.dispatchEvent(
        new CustomEvent("navigateToPage", {
          detail: "contactUs",
        })
      );

      window.history.pushState(
        {},
        "",
        `/contact?scrollTo=${encodeURIComponent(value)}`
      );

      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("scrollToContactSection", {
            detail: value,
          })
        );
      }, 300);
    }

    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  // ============================================
  // SIDEBAR SUBMENU
  // ============================================
  const toggleSidebarSubmenu = (menuKey) => {
    setSidebarExpandedMenu(
      sidebarExpandedMenu === menuKey ? null : menuKey
    );
  };

  // ============================================
  // MENU DATA
  // ============================================
  const menuData = {
    home: {
      label: "Home",
      type: "link",
      onClick: () => navigateTo("home"),
    },

    allCourses: {
      label: "All Courses",
      type: "mega",
      onClick: () => navigateTo("allCourses"),
      items:
        allCourses.length > 0
          ? allCourses.map((course) => ({
              name: course.title,
              type: "course",
            }))
          : [
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
      items:
        onlineCourses.length > 0
          ? onlineCourses.map((course) => ({
              name: course.title,
              type: "onlineCourse",
            }))
          : [
              {
                name: "Web Development Bootcamp",
                type: "onlineCourse",
              },
              {
                name: "Data Science & ML",
                type: "onlineCourse",
              },
              {
                name: "UI/UX Design Masterclass",
                type: "onlineCourse",
              },
              {
                name: "Digital Marketing Strategy",
                type: "onlineCourse",
              },
            ],
    },

    corporateTraining: {
      label: "Corporate Training",
      type: "mega",
      onClick: () => navigateTo("corporateTraining"),
      items: [
        {
          name: "Technical Skills",
          type: "corporate",
          value: "Technical",
        },
        {
          name: "Data & Analytics",
          type: "corporate",
          value: "Data",
        },
        {
          name: "Leadership & Management",
          type: "corporate",
          value: "Leadership",
        },
        {
          name: "Cybersecurity",
          type: "corporate",
          value: "Cybersecurity",
        },
        {
          name: "Digital Marketing",
          type: "corporate",
          value: "Digital Marketing",
        },
        {
          name: "Emerging Technologies",
          type: "corporate",
          value: "Emerging Tech",
        },
      ],
    },

    hireFromUs: {
      label: "Hire From Us",
      type: "mega",
      onClick: () => navigateTo("hireFromUs"),
      items: [
        {
          name: "IT Services",
          type: "hire",
          value: "IT Services",
        },
        {
          name: "Banking & Finance",
          type: "hire",
          value: "Banking & Finance",
        },
        {
          name: "Healthcare",
          type: "hire",
          value: "Healthcare",
        },
        {
          name: "E-commerce",
          type: "hire",
          value: "E-commerce",
        },
        {
          name: "Telecommunications",
          type: "hire",
          value: "Telecommunications",
        },
        {
          name: "Manufacturing",
          type: "hire",
          value: "Manufacturing",
        },
      ],
    },

    placements: {
      label: "Placements",
      type: "mega",
      onClick: () => navigateTo("placements"),
      items: [
        {
          name: "Placement Support",
          type: "placement",
          value: "placement-enquiry",
        },
        {
          name: "Success Stories",
          type: "placement",
          value: "success-stories",
        },
        {
          name: "Hiring Partners",
          type: "placement",
          value: "hiring-partners",
        },
        {
          name: "Career Guidance",
          type: "placement",
          value: "placement-enquiry",
        },
      ],
    },

    contactUs: {
      label: "Contact Us",
      type: "mega",
      onClick: () => navigateTo("contactUs"),
      items: [
        {
          name: "Call Us",
          type: "link",
          value: "tel:+917706037060",
        },
        {
          name: "Email Us",
          type: "link",
          value: "mailto:hi@courser.in",
        },
        {
          name: "Our Centers",
          type: "scroll",
          value: "contact-centers",
        },
        {
          name: "Contact Form",
          type: "scroll",
          value: "contact-form",
        },
      ],
    },
  };

  // ============================================
  // DETECT MOBILE
  // ============================================
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // ============================================
  // CLICK OUTSIDE
  // ============================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ============================================
  // DESKTOP HOVER
  // ============================================
  const handleMouseEnter = (menuKey) => {
    if (
      !isMobile &&
      menuData[menuKey].type !== "link"
    ) {
      clearTimeout(timeoutRef.current);
      setActiveMenu(menuKey);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 200);
    }
  };

  // ============================================
  // MOBILE CLICK
  // ============================================
  const handleClick = (menuKey) => {
    if (isMobile) {
      if (
        menuData[menuKey].type === "link" &&
        menuData[menuKey].onClick
      ) {
        menuData[menuKey].onClick();
      } else {
        setActiveMenu(
          activeMenu === menuKey ? null : menuKey
        );
      }
    }
  };

  // ============================================
  // MEGA MENU SCROLL
  // ============================================
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;

      scrollRef.current.scrollBy({
        left:
          direction === "left"
            ? -scrollAmount
            : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ============================================
  // JOIN NOW
  // ============================================
  const handleJoinNow = () => {
    window.dispatchEvent(
      new CustomEvent("navigateToJoinNow")
    );

    setIsSidebarOpen(false);
  };

  const menuKeys = Object.keys(menuData);

  // ============================================
  // COURSE ITEM CLICK
  // ============================================
  const handleCourseClick = (e, course) => {
    e.preventDefault();
    e.stopPropagation();

    if (course.type === "course") {
      navigateToCourse(course.name);
    } else if (course.type === "onlineCourse") {
      navigateToOnlineCourse(course.name);
    } else if (course.type === "corporate") {
      navigateToCorporateTraining(course.value);
    } else if (course.type === "hire") {
      navigateToHireFromUs(course.value);
    } else if (course.type === "placement") {
      navigateToPlacements(course.value);
    } else if (course.type === "link") {
      window.location.href = course.value;
    } else if (course.type === "scroll") {
      navigateToContactUs("scroll", course.value);
    }
  };

  // ============================================
  // JSX
  // ============================================
  return (
    <>
      {/* =====================================================
          HORIZONTAL NAVBAR
      ====================================================== */}
      <nav
        ref={navbarRef}
        className="
          fixed top-0 left-0 right-0 z-[1000]
          h-[76px]
          flex items-center
          bg-white
          border-b border-gray-200
          shadow-sm
        "
      >
        {/* ================================================
            HAMBURGER
        ================================================= */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          aria-expanded={isSidebarOpen}
          aria-controls="vertical-sidebar"
          className="
            ml-4
            flex h-10 w-10
            flex-col items-center justify-center
            gap-1.5
            rounded-lg
            border border-gray-200
            bg-white
            transition
            hover:bg-gray-100
            lg:hidden
          "
        >
          <span className="block h-0.5 w-5 bg-gray-700" />
          <span className="block h-0.5 w-5 bg-gray-700" />
          <span className="block h-0.5 w-5 bg-gray-700" />
        </button>

        {/* ================================================
            LOGO
        ================================================= */}
        <div
          onClick={() => navigateTo("home")}
          role="button"
          aria-label="Courser Home"
          className="
            ml-4
            flex
            cursor-pointer
            items-center
            lg:ml-6
          "
        >
          <img
            src="/logo.png"
            alt="Courser Logo"
            className="
              h-12
              w-auto
              object-contain
            "
          />
        </div>

        {/* ================================================
            DESKTOP MENU
        ================================================= */}
        <ul
          role="menubar"
          className="
            ml-6
            hidden
            h-full
            items-center
            gap-1
            lg:flex
          "
        >
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isActive = activeMenu === key;
            const hasDropdown = item.type !== "link";

            return (
              <li
                key={key}
                role="none"
                onMouseEnter={() =>
                  handleMouseEnter(key)
                }
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(key)}
                className="relative h-full flex items-center"
              >
                {/* MENU LINK */}
                <a
                  href="#!"
                  role="menuitem"
                  aria-expanded={isActive}
                  aria-haspopup={hasDropdown}
                  onClick={(e) => {
                    e.preventDefault();

                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className={`
                    flex
                    h-full
                    items-center
                    gap-1
                    whitespace-nowrap
                    px-3
                    text-[15px]
                    font-medium
                    transition
                    duration-200
                    ${
                      isActive
                        ? "text-emerald-600"
                        : "text-gray-700 hover:text-emerald-600"
                    }
                  `}
                >
                  {item.label}

                  {hasDropdown && (
                    <span
                      className={`
                        text-xs
                        transition-transform
                        duration-200
                        ${
                          isActive
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      ▾
                    </span>
                  )}
                </a>

                {/* ========================================
                    MEGA MENU
                ========================================= */}
                {hasDropdown && isActive && (
                  <div
                    role="menu"
                    className="
                      absolute
                      left-1/2
                      top-[76px]
                      z-[1100]
                      w-[min(1000px,calc(100vw-40px))]
                      -translate-x-1/2
                      rounded-b-2xl
                      border
                      border-gray-200
                      bg-white
                      p-5
                      shadow-2xl
                    "
                  >
                    <div className="flex items-center gap-3">
                      {/* LEFT ARROW */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScroll("left");
                        }}
                        aria-label="Scroll left"
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-gray-200
                          bg-white
                          text-xl
                          text-gray-700
                          shadow-sm
                          transition
                          hover:border-emerald-500
                          hover:bg-emerald-50
                          hover:text-emerald-600
                        "
                      >
                        ←
                      </button>

                      {/* COURSE LIST */}
                      <div
                        ref={scrollRef}
                        role="list"
                        className="
                          flex
                          flex-1
                          gap-3
                          overflow-x-auto
                          scroll-smooth
                          py-2
                          [scrollbar-width:none]
                          [&::-webkit-scrollbar]:hidden
                        "
                      >
                        {item.items.map(
                          (course, idx) => (
                            <a
                              key={idx}
                              href="#!"
                              role="menuitem"
                              onClick={(e) =>
                                handleCourseClick(
                                  e,
                                  course
                                )
                              }
                              className="
                                group
                                flex
                                min-w-[220px]
                                shrink-0
                                items-center
                                justify-between
                                gap-3
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                px-4
                                py-4
                                text-sm
                                font-medium
                                text-gray-700
                                transition
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-emerald-300
                                hover:bg-emerald-50
                                hover:text-emerald-700
                                hover:shadow-md
                              "
                            >
                              <span className="line-clamp-2">
                                {course.name}
                              </span>

                              <span
                                className="
                                  shrink-0
                                  text-lg
                                  transition-transform
                                  duration-200
                                  group-hover:translate-x-1
                                "
                              >
                                →
                              </span>
                            </a>
                          )
                        )}
                      </div>

                      {/* RIGHT ARROW */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScroll("right");
                        }}
                        aria-label="Scroll right"
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-gray-200
                          bg-white
                          text-xl
                          text-gray-700
                          shadow-sm
                          transition
                          hover:border-emerald-500
                          hover:bg-emerald-50
                          hover:text-emerald-600
                        "
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* ================================================
            JOIN NOW
        ================================================= */}
        <div className="ml-auto mr-4 lg:mr-6">
          <button
            type="button"
            onClick={handleJoinNow}
            aria-label="Join Now"
            className="
              rounded-full
              bg-emerald-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              duration-200
              hover:-translate-y-0.5
              hover:bg-emerald-700
              hover:shadow-lg
              active:translate-y-0
            "
          >
            Join Now
          </button>
        </div>
      </nav>

      {/* =====================================================
          OVERLAY
      ====================================================== */}
      {isSidebarOpen && (
        <div
          onClick={() => {
            setIsSidebarOpen(false);
            setSidebarExpandedMenu(null);
          }}
          aria-hidden="true"
          className="
            fixed
            inset-0
            z-[1190]
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
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
        className={`
          fixed
          left-0
          top-0
          z-[1200]
          flex
          h-screen
          w-[min(340px,88vw)]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:hidden
        `}
      >
        {/* ================================================
            SIDEBAR HEADER
        ================================================= */}
        <div
          className="
            flex
            h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-gray-200
            px-5
          "
        >
          <div
            onClick={() => navigateTo("home")}
            role="button"
            aria-label="Courser Home"
            className="cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Courser Logo"
              className="h-11 w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSidebarOpen(false);
              setSidebarExpandedMenu(null);
            }}
            aria-label="Close menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-2xl
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            ✕
          </button>
        </div>

        {/* ================================================
            SIDEBAR MENU
        ================================================= */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            py-5
          "
        >
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isExpanded =
              sidebarExpandedMenu === key;
            const hasSubmenu =
              item.type === "mega";

            return (
              <div
                key={key}
                className="mb-2"
              >
                {hasSubmenu ? (
                  <>
                    {/* SIDEBAR MENU BUTTON */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleSidebarSubmenu(key)
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`sidebar-submenu-${key}`}
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-3.5
                        text-left
                        text-[15px]
                        font-medium
                        transition
                        ${
                          isExpanded
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span>
                        {item.label}
                      </span>

                      <span
                        className="
                          text-xl
                          font-light
                        "
                      >
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {/* SUBMENU */}
                    {isExpanded && (
                      <div
                        id={`sidebar-submenu-${key}`}
                        role="menu"
                        className="
                          mt-1
                          ml-3
                          border-l-2
                          border-emerald-100
                          pl-3
                        "
                      >
                        {item.items.map(
                          (subItem, idx) => (
                            <a
                              key={idx}
                              href="#!"
                              role="menuitem"
                              onClick={(e) =>
                                handleCourseClick(
                                  e,
                                  subItem
                                )
                              }
                              className="
                                block
                                rounded-lg
                                px-3
                                py-2.5
                                text-sm
                                text-gray-600
                                transition
                                hover:bg-emerald-50
                                hover:text-emerald-700
                              "
                            >
                              {subItem.name}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* SIMPLE MENU */
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="
                      flex
                      w-full
                      items-center
                      rounded-xl
                      px-4
                      py-3.5
                      text-left
                      text-[15px]
                      font-medium
                      text-gray-700
                      transition
                      hover:bg-gray-50
                      hover:text-emerald-700
                    "
                  >
                    <span>
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ================================================
            SIDEBAR FOOTER
        ================================================= */}
        <div
          className="
            shrink-0
            border-t
            border-gray-200
            p-5
          "
        >
          <button
            type="button"
            onClick={handleJoinNow}
            className="
              w-full
              rounded-xl
              bg-emerald-600
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-emerald-700
              hover:shadow-lg
            "
          >
            Join Now
          </button>
        </div>
      </aside>

      {/* Navbar fixed space */}
      <div className="h-[76px]" />
    </>
  );
}

export default Navbar;
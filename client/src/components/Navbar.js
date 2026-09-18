import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

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

  // Fetch all courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('https://courser-project.onrender.com/api/courses');
        const data = await res.json();
        if (data.success) setAllCourses(data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch online courses for dropdown
  useEffect(() => {
    const fetchOnlineCourses = async () => {
      try {
        const res = await fetch('https://courser-project.onrender.com/api/online-courses');
        const data = await res.json();
        if (data.success) setOnlineCourses(data.data);
      } catch (error) {
        console.error('Error fetching online courses:', error);
      }
    };
    fetchOnlineCourses();
  }, []);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
        setSidebarExpandedMenu(null);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Navigation handler
  const navigateTo = (page) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: page }));
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCourse = (courseName) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'allCourses' }));
    window.history.pushState({}, '', `/courses?course=${encodeURIComponent(courseName)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterCourse', { detail: courseName }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToOnlineCourse = (courseName) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'onlineCourses' }));
    window.history.pushState({}, '', `/online-courses?course=${encodeURIComponent(courseName)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterOnlineCourse', { detail: courseName }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToCorporateTraining = (trainingType) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'corporateTraining' }));
    window.history.pushState({}, '', `/corporate-training?training=${encodeURIComponent(trainingType)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterCorporateTraining', { detail: trainingType }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToHireFromUs = (industry) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'hireFromUs' }));
    window.history.pushState({}, '', `/hire-from-us?industry=${encodeURIComponent(industry)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterHireFromUs', { detail: industry }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToPlacements = (section) => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'placements' }));
    window.history.pushState({}, '', `/placements?section=${encodeURIComponent(section)}`);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scrollToPlacementsSection', { detail: section }));
    }, 300);
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  const navigateToContactUs = (action, value) => {
    if (action === 'link') {
      window.location.href = value;
    } else {
      window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'contactUs' }));
      window.history.pushState({}, '', `/contact?scrollTo=${encodeURIComponent(value)}`);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollToContactSection', { detail: value }));
      }, 300);
    }
    setActiveMenu(null);
    setIsSidebarOpen(false);
    setSidebarExpandedMenu(null);
  };

  // Toggle sidebar submenu
  const toggleSidebarSubmenu = (menuKey) => {
    setSidebarExpandedMenu(sidebarExpandedMenu === menuKey ? null : menuKey);
  };

  // ✅ Menu Data - REMOVED emoji icons for clean professional look
  const menuData = {
    home: {
      label: 'Home',
      type: 'link',
      onClick: () => navigateTo('home'),
    },
    allCourses: {
      label: 'All Courses',
      type: 'mega',
      onClick: () => navigateTo('allCourses'),
      items: allCourses.length > 0
        ? allCourses.map(course => ({ name: course.title, type: 'course' }))
        : [
            { name: 'Web Developer', type: 'course' },
            { name: 'Cloud Architect', type: 'course' },
            { name: 'Business Analyst', type: 'course' },
            { name: 'Java Developer', type: 'course' },
            { name: 'Digital Marketing', type: 'course' },
            { name: 'Cyber Security', type: 'course' },
            { name: 'Data Analyst', type: 'course' },
            { name: 'DevOps Engineer', type: 'course' },
            { name: 'Big Data', type: 'course' },
          ],
    },
    onlineCourses: {
      label: 'Online Courses',
      type: 'mega',
      onClick: () => navigateTo('onlineCourses'),
      items: onlineCourses.length > 0
        ? onlineCourses.map(course => ({ name: course.title, type: 'onlineCourse' }))
        : [
            { name: 'Web Development Bootcamp', type: 'onlineCourse' },
            { name: 'Data Science & ML', type: 'onlineCourse' },
            { name: 'UI/UX Design Masterclass', type: 'onlineCourse' },
            { name: 'Digital Marketing Strategy', type: 'onlineCourse' },
          ],
    },
    corporateTraining: {
      label: 'Corporate Training',
      type: 'mega',
      onClick: () => navigateTo('corporateTraining'),
      items: [
        { name: 'Technical Skills', type: 'corporate', value: 'Technical' },
        { name: 'Data & Analytics', type: 'corporate', value: 'Data' },
        { name: 'Leadership & Management', type: 'corporate', value: 'Leadership' },
        { name: 'Cybersecurity', type: 'corporate', value: 'Cybersecurity' },
        { name: 'Digital Marketing', type: 'corporate', value: 'Digital Marketing' },
        { name: 'Emerging Technologies', type: 'corporate', value: 'Emerging Tech' },
      ],
    },
    hireFromUs: {
      label: 'Hire From Us',
      type: 'mega',
      onClick: () => navigateTo('hireFromUs'),
      items: [
        { name: 'IT Services', type: 'hire', value: 'IT Services' },
        { name: 'Banking & Finance', type: 'hire', value: 'Banking & Finance' },
        { name: 'Healthcare', type: 'hire', value: 'Healthcare' },
        { name: 'E-commerce', type: 'hire', value: 'E-commerce' },
        { name: 'Telecommunications', type: 'hire', value: 'Telecommunications' },
        { name: 'Manufacturing', type: 'hire', value: 'Manufacturing' },
      ],
    },
    placements: {
      label: 'Placements',
      type: 'mega',
      onClick: () => navigateTo('placements'),
      items: [
        { name: 'Placement Support', type: 'placement', value: 'placement-enquiry' },
        { name: 'Success Stories', type: 'placement', value: 'success-stories' },
        { name: 'Hiring Partners', type: 'placement', value: 'hiring-partners' },
        { name: 'Career Guidance', type: 'placement', value: 'placement-enquiry' },
      ],
    },
    contactUs: {
      label: 'Contact Us',
      type: 'mega',
      onClick: () => navigateTo('contactUs'),
      items: [
        { name: 'Call Us', type: 'link', value: 'tel:+917706037060' },
        { name: 'Email Us', type: 'link', value: 'mailto:hi@courser.in' },
        { name: 'Our Centers', type: 'scroll', value: 'contact-centers' },
        { name: 'Contact Form', type: 'scroll', value: 'contact-form' },
      ],
    },
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Desktop hover
  const handleMouseEnter = (menuKey) => {
    if (!isMobile && menuData[menuKey].type !== 'link') {
      clearTimeout(timeoutRef.current);
      setActiveMenu(menuKey);
    }
  };

  // Desktop mouse leave
  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 200);
    }
  };

  // Mobile/Tablet click
  const handleClick = (menuKey) => {
    if (isMobile) {
      if (menuData[menuKey].type === 'link' && menuData[menuKey].onClick) {
        menuData[menuKey].onClick();
      } else {
        setActiveMenu(activeMenu === menuKey ? null : menuKey);
      }
    }
  };

  // Mega menu scroll
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Join Now
  const handleJoinNow = () => {
    window.dispatchEvent(new CustomEvent('navigateToJoinNow'));
    setIsSidebarOpen(false);
  };

  const menuKeys = Object.keys(menuData);

  return (
    <>
      {/* ===== HORIZONTAL NAVBAR ===== */}
      <nav className="navbar" ref={navbarRef}>
        
        {/* HAMBURGER ICON - LEFT SIDE */}
        <button 
          className={`hamburger-btn ${isSidebarOpen ? 'active' : ''}`}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          aria-expanded={isSidebarOpen}
          aria-controls="vertical-sidebar"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="logo" onClick={() => navigateTo('home')} role="button" aria-label="Courser Home">
          <img src="/logo.png" alt="Courser Logo" className="logo-image" />
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu" role="menubar">
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isActive = activeMenu === key;
            const hasDropdown = item.type !== undefined && item.type !== 'link';

            return (
              <li
                key={key}
                className={`nav-item ${isActive ? 'active' : ''} ${hasDropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(key)}
                role="none"
              >
                <a
                  href="#!"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  role="menuitem"
                  aria-expanded={isActive}
                  aria-haspopup={hasDropdown}
                >
                  {item.label}
                  {hasDropdown && <span className="dropdown-arrow" aria-hidden="true">▾</span>}
                </a>

                {hasDropdown && isActive && (
                  <div className="mega-menu mega-menu-wide all-courses-menu" role="menu">
                    <div className="kovaion-mega-menu">
                      <button
                        type="button"
                        className="scroll-arrow scroll-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScroll('left');
                        }}
                        aria-label="Scroll left"
                      >
                        ←
                      </button>

                      <div className="mega-menu-scroll" ref={scrollRef} role="list">
                        {item.items.map((course, idx) => (
                          <a
                            key={idx}
                            href="#!"
                            className="mega-menu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (course.type === 'course') {
                                navigateToCourse(course.name);
                              } else if (course.type === 'onlineCourse') {
                                navigateToOnlineCourse(course.name);
                              } else if (course.type === 'corporate') {
                                navigateToCorporateTraining(course.value);
                              } else if (course.type === 'hire') {
                                navigateToHireFromUs(course.value);
                              } else if (course.type === 'placement') {
                                navigateToPlacements(course.value);
                              } else if (course.type === 'link') {
                                window.location.href = course.value;
                              } else if (course.type === 'scroll') {
                                navigateToContactUs('scroll', course.value);
                              }
                            }}
                            role="menuitem"
                          >
                            <span className="item-text">{course.name}</span>
                            <span className="item-arrow" aria-hidden="true">→</span>
                          </a>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="scroll-arrow scroll-right"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScroll('right');
                        }}
                        aria-label="Scroll right"
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

        <div className="nav-right">
          <button 
            type="button" 
            className="join-now-nav-btn" 
            onClick={handleJoinNow}
            aria-label="Join Now"
          >
            Join Now
          </button>
        </div>
      </nav>

      {/* ===== OVERLAY ===== */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => {
            setIsSidebarOpen(false);
            setSidebarExpandedMenu(null);
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* ===== VERTICAL SIDEBAR - CLEAN PROFESSIONAL ===== */}
      <aside 
        id="vertical-sidebar"
        className={`vertical-sidebar ${isSidebarOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isSidebarOpen}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigateTo('home')} role="button" aria-label="Courser Home">
            <img src="/logo.png" alt="Courser Logo" className="logo-image" />
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={() => {
              setIsSidebarOpen(false);
              setSidebarExpandedMenu(null);
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="sidebar-menu">
          {menuKeys.map((key) => {
            const item = menuData[key];
            const isExpanded = sidebarExpandedMenu === key;
            const hasSubmenu = item.type === 'mega';

            return (
              <div key={key} className="sidebar-menu-item">
                {hasSubmenu ? (
                  <>
                    <button
                      className={`sidebar-menu-btn ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => toggleSidebarSubmenu(key)}
                      aria-expanded={isExpanded}
                      aria-controls={`sidebar-submenu-${key}`}
                    >
                      <span className="sidebar-label">{item.label}</span>
                      <span className="sidebar-arrow" aria-hidden="true">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    
                    {isExpanded && (
                      <div 
                        id={`sidebar-submenu-${key}`}
                        className="sidebar-submenu"
                        role="menu"
                      >
                        {item.items.map((subItem, idx) => (
                          <a
                            key={idx}
                            href="#!"
                            className="sidebar-submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              if (subItem.type === 'course') {
                                navigateToCourse(subItem.name);
                              } else if (subItem.type === 'onlineCourse') {
                                navigateToOnlineCourse(subItem.name);
                              } else if (subItem.type === 'corporate') {
                                navigateToCorporateTraining(subItem.value);
                              } else if (subItem.type === 'hire') {
                                navigateToHireFromUs(subItem.value);
                              } else if (subItem.type === 'placement') {
                                navigateToPlacements(subItem.value);
                              } else if (subItem.type === 'link') {
                                window.location.href = subItem.value;
                              } else if (subItem.type === 'scroll') {
                                navigateToContactUs('scroll', subItem.value);
                              }
                            }}
                            role="menuitem"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    className="sidebar-menu-btn"
                    onClick={item.onClick}
                  >
                    <span className="sidebar-label">{item.label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with Join Now */}
        <div className="sidebar-footer">
          <button 
            className="sidebar-join-btn"
            onClick={handleJoinNow}
          >
            Join Now
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
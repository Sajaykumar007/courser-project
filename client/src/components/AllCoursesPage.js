import React, { useState, useEffect } from 'react';
import '../styles/AllCoursesPage.css';

function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [enquiredCourses, setEnquiredCourses] = useState([]);

  // ✅ NEW: Check URL for course filter on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');
    
    if (courseFilter) {
      setSearchTerm(courseFilter);
    }
  }, []);

  // ✅ NEW: Listen for filterCourse event from Navbar
  useEffect(() => {
    const handleFilterCourse = (e) => {
      setSearchTerm(e.detail);
    };
    
    window.addEventListener('filterCourse', handleFilterCourse);
    return () => window.removeEventListener('filterCourse', handleFilterCourse);
  }, []);

  // Fetch courses from backend
  useEffect(() => {
    fetchData();
  }, []);

  // Filter & sort when dependencies change
  useEffect(() => {
    applyFilters();
  }, [courses, selectedCategory, selectedLevel, searchTerm, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        setFilteredCourses(data.data);
        
        // Extract unique categories
        const uniqueCats = [...new Set(data.data.map(c => c.category))];
        setCategories(['All', ...uniqueCats]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(c => c.level === selectedLevel);
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.instructor.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term)
      );
    }

    // Sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCourses(filtered);
  };

  // ===== ENQUIRY HANDLER =====
  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert('✅ You have already submitted an enquiry for this course!');
      return;
    }

    const studentName = prompt(`📚 Course Enquiry: ${course.title}\n\nEnter your full name:`);
    if (!studentName) return;

    const phone = prompt('Enter your phone number:');
    if (!phone) return;

    // Validate phone
    if (phone.length < 10) {
      alert('❌ Please enter a valid phone number (minimum 10 digits)!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/courses/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: course.title,
          courseId: course._id,
          studentName,
          phone
        })
      });

      const data = await res.json();
      if (data.success) {
        setEnquiredCourses([...enquiredCourses, course._id]);
        alert('✅ Thank you! Your enquiry has been submitted.\n\nOur team will contact you within 24 hours.');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      alert('❌ Server error. Please try again.');
    }
  };

  const getLevelColor = (level) => {
    if (level === 'Beginner') return 'beginner';
    if (level === 'Intermediate') return 'intermediate';
    if (level === 'Advanced') return 'advanced';
    return '';
  };

  const getDiscount = (price, originalPrice) => {
    return Math.round((1 - price / originalPrice) * 100);
  };

  return (
    <div className="all-courses-page">
      {/* ===== HERO SECTION ===== */}
      <section className="courses-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">📚 COMPLETE CATALOG</span>
          <h1 className="hero-title">
            Explore Our <span className="highlight">All Courses</span>
          </h1>
          <p className="hero-subtitle">
            Choose from {courses.length}+ industry-leading courses across multiple domains.
            Start your learning journey today!
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">{courses.length}+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">{categories.length - 1}+</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Instructors</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">50k+</div>
              <div className="stat-label">Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTERS SECTION ===== */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search courses, instructors, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>📂 Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>📊 Level</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="filter-group">
              <label>🔃 Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button 
              className="reset-btn" 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSortBy('newest');
                setSearchTerm('');
              }}
            >
              🔄 Reset
            </button>
          </div>

          <div className="results-info">
            <span className="results-count">
              Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
            </span>
            {searchTerm && (
              <span className="search-term">for "{searchTerm}"</span>
            )}
          </div>
        </div>
      </section>

      {/* ===== COURSES GRID ===== */}
      <section className="courses-grid-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="no-courses">
            <div className="no-courses-icon">📭</div>
            <h3>No courses found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button 
              className="reset-btn-large"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchTerm('');
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map((course, idx) => (
              <div 
                key={course._id} 
                className="course-card"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="course-image">
                  <div className="course-icon">{course.image || '💻'}</div>
                  <span className={`level-badge ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="discount-badge">
                    {getDiscount(course.price, course.originalPrice)}% OFF
                  </span>
                </div>

                <div className="course-content">
                  <div className="course-category">{course.category}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-instructor">
                    <span className="instructor-icon">👨‍🏫</span>
                    {course.instructor}
                  </div>

                  <div className="course-rating">
                    <span className="rating-value">⭐ {course.rating}</span>
                    <span className="rating-count">({course.reviews} reviews)</span>
                  </div>

                  <div className="course-meta">
                    <span className="meta-item">⏱️ {course.duration}</span>
                    <span className="meta-item">📚 {course.lectures} lectures</span>
                  </div>

                  {course.features && course.features.length > 0 && (
                    <ul className="course-features">
                      {course.features.slice(0, 3).map((feature, fidx) => (
                        <li key={fidx}>✓ {feature}</li>
                      ))}
                    </ul>
                  )}

                  <div className="course-footer">
                    <div className="course-price">
                      <span className="current-price">₹{course.price.toLocaleString()}</span>
                      <span className="original-price">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      className={`enroll-btn ${enquiredCourses.includes(course._id) ? 'enrolled' : ''}`}
                      onClick={() => handleEnquiry(course)}
                      disabled={enquiredCourses.includes(course._id)}
                    >
                      {enquiredCourses.includes(course._id) ? '✓ Enquired' : 'Enquire Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="courses-cta">
        <div className="cta-content">
          <h2>Can't Find What You're Looking For?</h2>
          <p>Get personalized course recommendations from our experts</p>
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'contactUs' }))}
            >
              Contact Us
            </button>
            <button 
              className="btn-secondary"
              onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'onlineCourses' }))}
            >
              View Online Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllCoursesPage;
import React, { useState, useEffect } from 'react';
import '../styles/OnlineCoursesPage.css';

function OnlineCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiredCourses, setEnquiredCourses] = useState([]); // ✅ Changed from enrolledCourses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Cloud'];

  // Hardcoded courses as fallback (Price removed)
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
      image: '💻',
      features: ['HTML, CSS, JavaScript', 'React & Node.js', 'MongoDB & Express', 'Real Projects']
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
      features: ['Python Programming', 'Machine Learning', 'Deep Learning', 'TensorFlow & Keras']
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
      image: '🎨',
      features: ['Figma & Adobe XD', 'User Research', 'Prototyping', 'Design Systems']
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
      features: ['SEO & SEM', 'Social Media Marketing', 'Google Analytics', 'Content Strategy']
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
      features: ['AWS Fundamentals', 'EC2 & S3', 'Lambda Functions', 'Cloud Security']
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
      features: ['Advanced Excel', 'Data Visualization', 'Pivot Tables', 'Business Intelligence']
    }
  ];

  // Check URL for course filter on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');
    if (courseFilter) {
      setSearchTerm(courseFilter);
    }
  }, []);

  // Listen for filterOnlineCourse event from Navbar
  useEffect(() => {
    const handleFilterCourse = (e) => {
      setSearchTerm(e.detail);
    };
    window.addEventListener('filterOnlineCourse', handleFilterCourse);
    return () => window.removeEventListener('filterOnlineCourse', handleFilterCourse);
  }, []);

  // Fetch courses from Backend on page load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://courser-project.onrender.com/api/online-courses');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
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

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ✅ NEW: Enquiry function connected to Backend
  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert('✅ You have already submitted an enquiry for this course!');
      return;
    }

    const studentName = prompt(`📚 Course Enquiry: ${course.title}\n\nEnter your full name:`);
    if (!studentName) return;

    const phone = prompt('Enter your phone number:');
    if (!phone) return;

    if (phone.length < 10) {
      alert('❌ Please enter a valid phone number (minimum 10 digits)!');
      return;
    }

    try {
      const response = await fetch('https://courser-project.onrender.com/api/online-courses/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course._id,
          courseTitle: course.title,
          studentName,
          phone
        })
      });

      const data = await response.json();
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

  return (
    <div className="online-courses-page">
      {/* ===== HERO SECTION ===== */}
      <section className="courses-hero">
        <div className="hero-content">
          <span className="hero-badge">🎓 ONLINE LEARNING</span>
          <h1 className="hero-title">
            Learn From Anywhere<br />
            <span className="highlight">At Your Own Pace</span>
          </h1>
          <p className="hero-subtitle">
            Access 100+ industry-leading courses taught by expert instructors. 
            Learn new skills and advance your career with flexible online learning.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">{courses.length}+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Instructors</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">50k+</div>
              <div className="stat-label">Students Enrolled</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH & FILTER ===== */}
      <section className="courses-filter-section">
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')} style={{position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b'}}>✕</button>
            )}
          </div>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES GRID ===== */}
      <section className="courses-grid-section">
        <div className="section-header">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">Choose from our wide range of professional courses</p>
        </div>
        
        {loading ? (
          <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#64748b', padding: '3rem'}}>Loading courses... ⏳</p>
        ) : (
          <>
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div key={course._id} className="course-card">
                  <div className="course-image">
                    <div className="course-icon">{course.image || '💻'}</div>
                    <span className="course-level">{course.level}</span>
                  </div>
                  
                  <div className="course-content">
                    <div className="course-category">{course.category}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-instructor">
                      <span>👨‍🏫</span> {course.instructor}
                    </div>
                    
                    <div className="course-rating">
                      <span className="rating-stars">⭐ {course.rating}</span>
                      <span className="rating-count">({course.reviews} reviews)</span>
                    </div>

                    <div className="course-meta">
                      <span className="meta-item">⏱️ {course.duration}</span>
                      <span className="meta-item">📚 {course.lectures} lectures</span>
                    </div>

                    <ul className="course-features">
                      {course.features && course.features.map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                    </ul>

                    <div className="course-footer">
                      {/* ✅ Fees/Price Section Removed */}
                      
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

            {filteredCourses.length === 0 && (
              <div className="no-courses">
                <div className="no-courses-icon">📭</div>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button 
                  className="reset-btn-large"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== WHY ONLINE LEARNING ===== */}
      <section className="why-online-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Online Learning?</h2>
          <p className="section-subtitle">Flexible, affordable, and effective learning</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">⏰</div>
            <h3>Learn at Your Pace</h3>
            <p>Access course materials anytime, anywhere. Study when it's convenient for you.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Affordable Pricing</h3>
            <p>High-quality education at fraction of the cost of traditional learning.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👨‍🏫</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of real-world experience.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📜</div>
            <h3>Certification</h3>
            <p>Earn industry-recognized certificates to boost your career.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Get help whenever you need it with our dedicated support team.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h3>Lifetime Access</h3>
            <p>Once enrolled, access course materials forever, including updates.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="courses-cta">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Join 50,000+ students already learning with Courser</p>
          <div className="cta-buttons">
            <button 
              className="btn-primary" 
              onClick={() => document.querySelector('.courses-grid-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse All Courses
            </button>
            <button 
              className="btn-secondary"
              onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'learningPaths' }))}
            >
              View Learning Paths
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OnlineCoursesPage;
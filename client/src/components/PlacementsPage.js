import React, { useState, useEffect } from 'react';
import '../styles/PlacementsPage.css';

function PlacementsPage() {
  // Loading States
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [stats, setStats] = useState({ studentsPlaced: 0, hiringPartners: 0, highestPackage: '0 LPA', averagePackage: '0 LPA' });
  const [hiringPartners, setHiringPartners] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [placementDrives, setPlacementDrives] = useState([]);

  // Enquiry Form States
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '', email: '', phone: '', course: '', location: '', experience: '', message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Registration Modal States
  const [registrationModal, setRegistrationModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '', email: '', phone: '', course: ''
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  // ✅ NEW: Check URL for section scroll on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
      setTimeout(() => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // ✅ NEW: Listen for scrollToPlacementsSection event from Navbar
  useEffect(() => {
    const handleScrollToSection = (e) => {
      setTimeout(() => {
        const element = document.querySelector(`.${e.detail}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    };
    window.addEventListener('scrollToPlacementsSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToPlacementsSection', handleScrollToSection);
  }, []);

  // Fetch All Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, partnersRes, studentsRes, storiesRes, drivesRes] = await Promise.all([
          fetch('https://courser-project.onrender.com/api/placement/stats'),
          fetch('https://courser-project.onrender.com/api/placement/hiring-partners'),
          fetch('https://courser-project.onrender.com/api/placement/placed-students'),
          fetch('https://courser-project.onrender.com/api/placement/success-stories'),
          fetch('https://courser-project.onrender.com/api/placement/placement-drives')
        ]);

        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.data);

        const partnersData = await partnersRes.json();
        if (partnersData.success) setHiringPartners(partnersData.data);

        const studentsData = await studentsRes.json();
        if (studentsData.success) setPlacedStudents(studentsData.data);

        const storiesData = await storiesRes.json();
        if (storiesData.success) setSuccessStories(storiesData.data);

        const drivesData = await drivesRes.json();
        if (drivesData.success) setPlacementDrives(drivesData.data);

      } catch (error) {
        console.error('Error fetching placement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enquiry Form Handlers
  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('https://courser-project.onrender.com/api/placement/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryForm),
      });

      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        setEnquiryForm({ fullName: '', email: '', phone: '', course: '', location: '', experience: '', message: '' });
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormError(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      setFormError('Server error. Please try again later.');
    } finally {
      setFormLoading(false);
    }
  };

  // Registration Handlers
  const handleDriveRegister = (drive) => {
    setSelectedDrive(drive);
    setRegistrationModal(true);
    setRegSuccess(false);
    setRegError('');
    setRegistrationForm({ fullName: '', email: '', phone: '', course: '' });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError('');

    try {
      const payload = {
        driveId: selectedDrive._id,
        companyName: selectedDrive.company,
        jobRole: selectedDrive.role,
        driveDate: selectedDrive.date,
        fullName: registrationForm.fullName,
        email: registrationForm.email,
        phone: registrationForm.phone,
        course: registrationForm.course,
      };

      const response = await fetch('https://courser-project.onrender.com/api/placement/register-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setRegSuccess(true);
        setTimeout(() => {
          setRegistrationModal(false);
          setRegSuccess(false);
        }, 3000);
      } else {
        setRegError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setRegError('Server error. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  // Navigation & Scroll Helpers
  const navigateToCourses = () => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'allCourses' }));
  };

  const scrollToEnquiry = () => {
    document.querySelector('.placement-enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Static Data
  const placementProcess = [
    { step: 1, title: 'Choose Your Course', icon: '📚', desc: 'Pick your career path' },
    { step: 2, title: 'Build Industry Skills', icon: '🛠️', desc: 'Learn in-demand tech' },
    { step: 3, title: 'Work on Real Projects', icon: '💼', desc: 'Build your portfolio' },
    { step: 4, title: 'Build Your Resume', icon: '📄', desc: 'Professional CV' },
    { step: 5, title: 'Mock Interviews', icon: '🗣️', desc: 'Practice with experts' },
    { step: 6, title: 'Interview Preparation', icon: '📝', desc: 'Aptitude & technical' },
    { step: 7, title: 'Attend Hiring Drives', icon: '🏢', desc: 'Meet top companies' },
    { step: 8, title: 'Get Hired', icon: '🎉', desc: 'Start your career' },
  ];

  const placementPrep = [
    { icon: '🧮', title: 'Aptitude Training', desc: 'Quantitative, logical & verbal' },
    { icon: '💻', title: 'Coding Practice', desc: 'DSA & problem-solving sessions' },
    { icon: '👨‍💻', title: 'Technical Interview', desc: 'Core subjects & coding rounds' },
    { icon: '👔', title: 'HR Interview', desc: 'Communication & behavioral prep' },
    { icon: '📄', title: 'Resume Building', desc: 'Professional resume creation' },
    { icon: '💼', title: 'LinkedIn Optimization', desc: 'Professional profile setup' },
    { icon: '🗣️', title: 'Communication Skills', desc: 'Spoken English & soft skills' },
    { icon: '🎤', title: 'Mock Interviews', desc: 'Real interview simulations' },
    { icon: '👥', title: 'Group Discussion', desc: 'GD practice & techniques' },
    { icon: '🤝', title: 'Soft Skills Training', desc: 'Teamwork & leadership skills' },
  ];

  const faqs = [
    { q: 'Does Courser provide placement assistance?', a: 'Yes, we provide comprehensive placement assistance including resume building, mock interviews, and connections with our 200+ hiring partners.' },
    { q: 'Which companies hire Courser students?', a: 'Our students are placed in top companies like TCS, Infosys, Wipro, HCL, Accenture, Cognizant, and 200+ other hiring partners.' },
    { q: 'Is placement assistance available for all courses?', a: 'Yes, all our courses include placement assistance. However, some specialized courses may have dedicated placement drives.' },
    { q: 'How does the placement process work?', a: 'After course completion, you will go through resume building, mock interviews, and then attend placement drives conducted by our hiring partners.' },
    { q: 'Do you provide mock interviews?', a: 'Yes, we conduct regular mock interviews with industry experts to prepare you for real interview scenarios.' },
    { q: 'Do online students receive placement support?', a: 'Yes, both online and offline students receive the same placement support and opportunities.' },
    { q: 'How can I participate in placement drives?', a: 'Once you complete your course and assessments, you will be notified about upcoming placement drives and can register for them.' },
    { q: "What happens if I don't get placed?", a: 'We provide continuous support until you get placed. You can attend multiple drives and get retrained if needed.' },
  ];

  const [faqOpen, setFaqOpen] = useState(null);

  if (loading) {
    return (
      <div className="placements-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <h2 style={{ color: 'white' }}>Loading Placement Data... ⏳</h2>
      </div>
    );
  }

  return (
    <div className="placements-page">
      {/* ===== HERO SECTION ===== */}
      <section className="placements-hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">🎯 CAREER SUCCESS</span>
            <h1 className="hero-title">
              Build Skills.<br />
              Get Hired.<br />
              <span className="title-accent">Start Your Career.</span>
            </h1>
            <p className="hero-subtitle">
              Get industry-ready training, career guidance, interview preparation, and dedicated placement assistance to take the next step in your career.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={navigateToCourses}>Explore Courses</button>
              <button className="btn-secondary" onClick={scrollToEnquiry}>Get Placement Assistance</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card main-card">
              <div className="visual-icon">🎓</div>
              <h3>Career Ready</h3>
              <p>Industry-trained professionals</p>
            </div>
            <div className="visual-card float-card-1">
              <span className="card-number">{stats.studentsPlaced.toLocaleString()}+</span>
              <span className="card-label">Students Placed</span>
            </div>
            <div className="visual-card float-card-2">
              <span className="card-number">{stats.hiringPartners}+</span>
              <span className="card-label">Hiring Partners</span>
            </div>
            <div className="visual-card float-card-3">
              <span className="card-number">{stats.highestPackage}</span>
              <span className="card-label">Highest Package</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT HIGHLIGHTS ===== */}
      <section className="placement-highlights">
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">🎓</div>
            <h3 className="highlight-number">{stats.studentsPlaced.toLocaleString()}+</h3>
            <p className="highlight-label">Students Placed</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">🏢</div>
            <h3 className="highlight-number">{stats.hiringPartners}+</h3>
            <p className="highlight-label">Hiring Partners</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">✅</div>
            <h3 className="highlight-number">100%</h3>
            <p className="highlight-label">Placement Assistance</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">💰</div>
            <h3 className="highlight-number">{stats.highestPackage}</h3>
            <p className="highlight-label">Highest Package</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">📊</div>
            <h3 className="highlight-number">{stats.averagePackage}</h3>
            <p className="highlight-label">Average Package</p>
          </div>
        </div>
      </section>

      {/* ===== HIRING PARTNERS ===== */}
      <section className="hiring-partners">
        <div className="section-header">
          <h2 className="section-title">Our Hiring Partners</h2>
          <p className="section-subtitle">Top companies that trust our talent</p>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-row row-left">
            <div className="marquee-content">
              {[...hiringPartners, ...hiringPartners].map((partner, idx) => (
                <div key={`row1-${idx}`} className="partner-card-marquee">
                  <div className="partner-logo">{partner.logo || partner.companyName.substring(0, 3).toUpperCase()}</div>
                  <h4 className="partner-name">{partner.companyName}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-row row-right">
            <div className="marquee-content">
              {[...hiringPartners, ...hiringPartners].map((partner, idx) => (
                <div key={`row2-${idx}`} className="partner-card-marquee">
                  <div className="partner-logo">{partner.logo || partner.companyName.substring(0, 3).toUpperCase()}</div>
                  <h4 className="partner-name">{partner.companyName}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT PROCESS ===== */}
      <section className="placement-process">
        <div className="section-header">
          <h2 className="section-title">Your Journey From Learning to Getting Hired</h2>
          <p className="section-subtitle">A step-by-step approach to your dream career</p>
        </div>
        <div className="process-timeline">
          {placementProcess.map((item) => (
            <div key={item.step} className="process-step">
              <div className="step-number">{item.step}</div>
              <div className="step-icon">{item.icon}</div>
              <h4 className="step-title">{item.title}</h4>
              <p className="step-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PLACEMENT PREPARATION ===== */}
      <section className="placement-prep">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Crack Interviews</h2>
          <p className="section-subtitle">Comprehensive preparation for your success</p>
        </div>
        <div className="prep-grid">
          {placementPrep.map((item, index) => (
            <div key={index} className="prep-card">
              <div className="prep-icon">{item.icon}</div>
              <h4 className="prep-title">{item.title}</h4>
              <p className="prep-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PLACED STUDENTS ===== */}
      <section className="placed-students">
        <div className="section-header">
          <div>
            <h2 className="section-title">Our Students Are Getting Hired</h2>
            <p className="section-subtitle">Real placements, real success stories</p>
          </div>
          <button className="view-all-btn">View All Placements →</button>
        </div>
        <div className="students-grid">
          {placedStudents.map((student) => (
            <div key={student._id} className="student-card">
              <div className="student-photo">{student.photo || student.studentName.substring(0, 2).toUpperCase()}</div>
              <div className="student-info">
                <h4 className="student-name">{student.studentName}</h4>
                <p className="student-course">{student.course}</p>
                <div className="student-company">
                  <span>🏢</span>
                  <span>{student.company}</span>
                </div>
                <p className="student-role">{student.jobRole}</p>
                <p className="student-package">₹{student.package}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="success-stories">
        <div className="section-header">
          <h2 className="section-title">Real Students. Real Careers.</h2>
          <p className="section-subtitle">Hear from our placed students</p>
        </div>
        <div className="stories-grid">
          {successStories.map((story) => (
            <div key={story._id} className="story-card">
              <div className="story-photo">{story.photo || story.studentName.substring(0, 2).toUpperCase()}</div>
              <div className="story-content">
                <h4 className="story-name">{story.studentName}</h4>
                <p className="story-course">{story.course}</p>
                <p className="story-company">{story.company} - {story.jobRole}</p>
                <p className="story-package">₹{story.package}</p>
                <p className="story-testimonial">"{story.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== UPCOMING DRIVES ===== */}
      <section className="upcoming-drives">
        <div className="section-header">
          <h2 className="section-title">Upcoming Placement Drives</h2>
          <p className="section-subtitle">Register now for your dream job</p>
        </div>
        <div className="drives-grid">
          {placementDrives.map((drive) => (
            <div key={drive._id} className="drive-card">
              <div className="drive-header">
                <div className="drive-logo">🏢</div>
                <div>
                  <h4 className="drive-company">{drive.company}</h4>
                  <p className="drive-role">{drive.role}</p>
                </div>
              </div>
              <div className="drive-details">
                <div className="drive-detail"><span className="detail-icon">📍</span><span>{drive.location}</span></div>
                <div className="drive-detail"><span className="detail-icon">📅</span><span>{new Date(drive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                <div className="drive-detail"><span className="detail-icon">👥</span><span>{drive.openings} Openings</span></div>
                <div className="drive-detail"><span className="detail-icon">✓</span><span>{drive.eligibility}</span></div>
              </div>
              <div className="drive-footer">
                <span className={`drive-status status-${drive.status.toLowerCase()}`}>{drive.status}</span>
                <button className="register-btn" onClick={() => handleDriveRegister(drive)}>Register Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PLACEMENT ELIGIBILITY ===== */}
      <section className="placement-eligibility">
        <div className="section-header">
          <h2 className="section-title">Who Can Participate?</h2>
          <p className="section-subtitle">Simple eligibility criteria</p>
        </div>
        <div className="eligibility-list">
          <div className="eligibility-item">✓ Course completion</div>
          <div className="eligibility-item">✓ Required attendance</div>
          <div className="eligibility-item">✓ Project completion</div>
          <div className="eligibility-item">✓ Assessment completion</div>
          <div className="eligibility-item">✓ Resume ready</div>
          <div className="eligibility-item">✓ Interview preparation completed</div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="placement-faq">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Get answers to common questions</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${faqOpen === index ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                <span>{faq.q}</span>
                <span className="faq-icon">{faqOpen === index ? '−' : '+'}</span>
              </button>
              {faqOpen === index && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Career?</h2>
          <p>Build the skills employers are looking for and take the next step toward your dream career.</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={navigateToCourses}>Explore Courses</button>
            <button className="btn-secondary" onClick={scrollToEnquiry}>Talk to a Career Advisor</button>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT ENQUIRY FORM ===== */}
      <section className="placement-enquiry">
        <div className="section-header">
          <h2 className="section-title">Get Placement Assistance</h2>
          <p className="section-subtitle">Fill the form and our team will contact you</p>
        </div>
        {formSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Enquiry Submitted Successfully!</h3>
            <p>Our placement team will contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleEnquirySubmit} className="enquiry-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={enquiryForm.fullName} onChange={handleEnquiryChange} required placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={enquiryForm.email} onChange={handleEnquiryChange} required placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={enquiryForm.phone} onChange={handleEnquiryChange} required placeholder="Enter your phone number" />
              </div>
              <div className="form-group">
                <label>Course Interested In</label>
                <select name="course" value={enquiryForm.course} onChange={handleEnquiryChange}>
                  <option value="">Select a course</option>
                  <option value="Python Full Stack">Python Full Stack</option>
                  <option value="Data Science">Data Science</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="Java Full Stack">Java Full Stack</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Location</label>
                <input type="text" name="location" value={enquiryForm.location} onChange={handleEnquiryChange} placeholder="Enter preferred location" />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select name="experience" value={enquiryForm.experience} onChange={handleEnquiryChange}>
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3+ years">3+ years</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={enquiryForm.message} onChange={handleEnquiryChange} rows="4" placeholder="Tell us about your career goals..." />
            </div>
            {formError && <div className="error-message">{formError}</div>}
            <button type="submit" className="submit-btn" disabled={formLoading}>
              {formLoading ? 'Submitting...' : 'Get Placement Assistance'}
            </button>
          </form>
        )}
      </section>

      {/* ===== REGISTRATION MODAL ===== */}
      {registrationModal && selectedDrive && (
        <div className="registration-modal-overlay" onClick={() => setRegistrationModal(false)}>
          <div className="registration-modal" onClick={(e) => e.stopPropagation()}>
            {regSuccess ? (
              <div className="reg-success">
                <div className="reg-success-icon">✓</div>
                <h3>Registration Successful!</h3>
                <p>You have registered for <strong>{selectedDrive.company}</strong></p>
                <p className="reg-role">{selectedDrive.role}</p>
                <p>We will contact you soon with further details.</p>
              </div>
            ) : (
              <>
                <div className="reg-header">
                  <h3>Register for Placement Drive</h3>
                  <button className="reg-close" onClick={() => setRegistrationModal(false)}>×</button>
                </div>
                <div className="reg-drive-info">
                  <h4>{selectedDrive.company}</h4>
                  <p>{selectedDrive.role}</p>
                  <p>📍 {selectedDrive.location} | 📅 {new Date(selectedDrive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <form onSubmit={handleRegistrationSubmit} className="reg-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="fullName" value={registrationForm.fullName} onChange={handleRegistrationChange} required placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={registrationForm.email} onChange={handleRegistrationChange} required placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={registrationForm.phone} onChange={handleRegistrationChange} required placeholder="Enter your phone number" />
                  </div>
                  <div className="form-group">
                    <label>Course</label>
                    <select name="course" value={registrationForm.course} onChange={handleRegistrationChange}>
                      <option value="">Select your course</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="Data Science">Data Science</option>
                      <option value="MERN Stack">MERN Stack</option>
                      <option value="Java Full Stack">Java Full Stack</option>
                    </select>
                  </div>
                  {regError && <div className="error-message">{regError}</div>}
                  <button type="submit" className="submit-btn" disabled={regLoading}>
                    {regLoading ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementsPage;
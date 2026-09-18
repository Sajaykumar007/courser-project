import React from 'react';
import '../styles/Hero.css';

function HeroSection() {
  const handleExploreCourses = () => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'allCourses' }));
  };

  const handleBookDemo = () => {
    window.dispatchEvent(new CustomEvent('navigateToJoinNow'));
  };

  const features = [
    { icon: '‍🏫', label: 'Expert Trainers', bg: '#e0f2fe' },
    { icon: '💼', label: 'Placement Support', bg: '#fee2e2' },
    { icon: '💻', label: 'Online & Offline', bg: '#f0fdf4' },
    { icon: '', label: 'Certification', bg: '#fef3c7' },
  ];

  return (
    <section className="hero-section-pro">
      {/* Subtle Dotted Pattern */}
      <div className="dotted-pattern"></div>
      
      <div className="hero-content-wrapper">
        
        {/* LEFT SIDE */}
        <div className="hero-left-content">
          <div className="hero-badge">
            <span className="badge-icon">🎓</span>
            #1 Learning Platform in Courser
          </div>
          
          <h1 className="hero-main-title">
            Upgrade Your Skills<br />
            For a <span className="highlight-text">Brighter Tomorrow</span>
          </h1>
          
          <p className="hero-subtitle">
            Industry-focused courses, expert mentors, hands-on projects and 100% 
            placement support to kickstart your career.
          </p>

          <div className="hero-cta-buttons">
            <button className="btn-explore" onClick={handleExploreCourses}>
              Explore Courses →
            </button>
            <button className="btn-demo" onClick={handleBookDemo}>
              📅 Book a Free Demo
            </button>
          </div>

          <div className="hero-features">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-badge" style={{ backgroundColor: feature.bg }}>
                <span className="feature-badge-icon">{feature.icon}</span>
                <span className="feature-badge-text">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Visual */}
        <div className="hero-right-content">
          <div className="hero-visual-container">
            
            {/* Handwritten Text - Top Left */}
            <div className="handwritten-text top-left">
              <span>Learn</span>
              <span>Grow</span>
              <span>Get Placed</span>
              <svg className="arrow-svg" viewBox="0 0 40 40" fill="none">
                <path d="M5 5 C 15 15, 25 25, 35 35" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 2"/>
              </svg>
            </div>

            {/* Student Image */}
            <div className="student-image-container">
              <div className="student-placeholder">
                <span className="student-emoji">👨‍💻</span>
              </div>
            </div>

            {/* Stat Card 1 - Top Right */}
            <div className="stat-card-pro stat-top-right">
              <div className="stat-icon-pro">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#10b981" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="stat-info-pro">
                <div className="stat-number-pro">10K+</div>
                <div className="stat-label-pro">Students Enrolled</div>
              </div>
            </div>

            {/* Stat Card 2 - Bottom Left */}
            <div className="stat-card-pro stat-bottom-left">
              <div className="stat-icon-pro">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 20V4" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 20v-6" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="stat-info-pro">
                <div className="stat-number-pro">95%</div>
                <div className="stat-label-pro">Placement Rate</div>
              </div>
            </div>

            {/* Stat Card 3 - Bottom Right */}
            <div className="stat-card-pro stat-bottom-right">
              <div className="stat-icon-pro">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-info-pro">
                <div className="stat-number-pro">Industry</div>
                <div className="stat-label-pro">Recognized Courses</div>
              </div>
            </div>

            {/* Handwritten Text - Right Side */}
            <div className="handwritten-text right-side">
              <span>Your</span>
              <span>Future</span>
              <span>Starts Here</span>
              <svg className="arrow-svg-right" viewBox="0 0 40 40" fill="none">
                <path d="M35 5 C 25 15, 15 25, 5 35" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
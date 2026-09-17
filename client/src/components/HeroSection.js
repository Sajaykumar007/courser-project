import React, { useState } from 'react';  // ← CHANGE 1: Add useState
import DemoClassModal from './DemoClassModal';  // ← CHANGE 2: Import Modal
import '../styles/DemoClassModal.css';  // ← CHANGE 3: Import Modal CSS

function HeroSection() {
  // ← CHANGE 4: Add state for modal
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="left-section">
      {/* Top Badge */}
      <div className="hero-top-badge">
        <span className="badge-dot"></span>
        <span>India's #1 Certified Course Provider</span>
      </div>

      <h1 className="stats-heading">
        Web Developer<br/>
        <span className="highlight">Masters Program</span>
      </h1>
      
      <p className="course-subtitle">
         Become a Full-Stack Developer in 4 Weeks!
      </p>

      <div className="trust-badge-compact">
        <span> 5000+ Students</span>
        <span className="separator">|</span>
        <span>⭐ 4.8/5 Rating</span>
        <span className="separator">|</span>
        <span>💼 95% Placement</span>
      </div>

      <div className="stats-list">
        <div className="stat-item">
          <span className="stat-number">4</span>
          <span className="stat-label">Week Instructor-led Online Course</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Hours of Online classes, Assignment</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">20+</span>
          <span className="stat-label">Hours of project</span>
        </div>
      </div>

      {/* ← CHANGE 5: Add onClick to button */}
      <button 
        className="demo-btn"
        onClick={() => setIsDemoModalOpen(true)}
      >
         FREE DEMO CLASS →
      </button>

      {/* ← CHANGE 6: Add Modal component at the end */}
      <DemoClassModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}

export default HeroSection;
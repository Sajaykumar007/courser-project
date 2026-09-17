import React from 'react';
import '../styles/LearningPathsPage.css';

function LearningPathsPage() {
  const paths = [
    { title: 'Full Stack Developer', duration: '6 Months', courses: 5, icon: '💻', desc: 'Master MERN stack, databases, and deployment to build complete web applications.' },
    { title: 'Data Scientist', duration: '8 Months', courses: 6, icon: '📊', desc: 'Learn Python, Machine Learning, Deep Learning, and Data Visualization.' },
    { title: 'Cloud Architect', duration: '5 Months', courses: 4, icon: '☁️', desc: 'Become proficient in AWS, Azure, Docker, and Cloud Security.' },
    { title: 'UI/UX Designer', duration: '4 Months', courses: 4, icon: '🎨', desc: 'Master Figma, user research, wireframing, and interactive prototyping.' }
  ];

  return (
    <div className="learning-paths-page">
      {/* Hero Section */}
      <section className="paths-hero">
        <div className="hero-content">
          <span className="hero-badge">🚀 CAREER ROADMAPS</span>
          <h1>Structured Learning Paths</h1>
          <p>Achieve your career goals with our expert-curated course bundles</p>
          <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'onlineCourses' }))}>
            Browse All Courses
          </button>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="paths-grid-section">
        <div className="section-header">
          <h2 className="section-title">Choose Your Career Path</h2>
          <p className="section-subtitle">Step-by-step guidance from beginner to job-ready professional</p>
        </div>
        
        <div className="paths-grid">
          {paths.map((path, idx) => (
            <div key={idx} className="path-card">
              <div className="path-icon">{path.icon}</div>
              <h3 className="path-title">{path.title}</h3>
              <p className="path-desc">{path.desc}</p>
              <div className="path-meta">
                <span className="meta-item">⏱️ {path.duration}</span>
                <span className="meta-item">📚 {path.courses} Courses</span>
              </div>
              <button className="path-btn" onClick={() => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'onlineCourses' }))}>
                Start Learning Path
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LearningPathsPage;
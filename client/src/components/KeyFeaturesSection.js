import React from 'react';
import '../styles/KeyFeaturesSection.css';

function KeyFeaturesSection() {
  const features = [
    'Choose ur favourite course either Online or Offline',
    'Land a job within 6 months of graduation',
    'Assured Job placements from top Tech and internet companies',
    'Get Interactive classes from the industry experts',
    'Get 100% hands-on training on all Live Tools',
    '24/7 Mentor Support from Industry Experts',
    'Access to cloud labs for real-time projects',
    'Industry recognized certification',
    'Access to Cutting Edge Tools Real Time Applications'
  ];

  return (
    <section className="key-features-section">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Key Features</h2>
          <div className="title-underline"></div>
        </div>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="feature-text">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFeaturesSection;
import React from 'react';
import '../styles/Banner.css'; // Ensure correct CSS import

function ScrollingBanner() {
  const items = [
    '📄 Resume Building Support',
    '🌐 100% Online Live Classes',
    '🎯 100% Placement Assistance',
    '💰 12 Months No Cost EMI',
    '👨‍🏫 Industry Expert Trainers',
    '🚀 Live Real-time Projects',
    '🏆 Internationally Recognized Certification',
    '🎤 Interview Preparation',
    '⏰ Flexible Class Timings',
    '♾️ Lifetime Access to Course Material'
  ];

  return (
    <div className="scrolling-banner">
      <div className="scroll-content">
        {/* Repeat 3 times for seamless infinite scroll */}
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="scroll-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollingBanner;
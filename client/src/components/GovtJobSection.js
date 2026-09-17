import React from 'react';

function GovtJobSection() {
  const categories = ['BANKING', 'TNPSC', 'INSURANCE', 'RAILWAYS', 'CAT', 'GATE'];

  return (
    <section className="govt-job-section">
      <div className="govt-job-container">
        <div className="govt-job-header">
          <h2 className="govt-job-title">Get your Permanent Government Job</h2>
          <p className="govt-job-subtitle">
            Courser provides Offline Classes for Competitive Examinations 
            in Bangalore and Coimbatore.
          </p>
        </div>
        
        <div className="govt-job-content">
          <div className="govt-job-image">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop" 
              alt="Student with laptop"
            />
          </div>
          
          <div className="govt-job-categories">
            {categories.map((cat) => (
              <div key={cat} className="category-btn">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GovtJobSection;
import React from 'react';
import '../styles/PlacementSection.css';

function PlacementSection() {
  const companies = [
    'TATA', 'Microsoft', 'Flipkart', 'Standard Chartered',
    'Amazon', 'Mahindra', 'Airtel', 'Paytm',
    'Google', 'MasterCard', 'Myntra', 'PayPal',
    'Toshiba', 'BOSCH', 'SONY', 'Intel'
  ];

  const stats = [
    { label: 'Placement Success Rate', value: '94%', icon: '' },
    { label: 'Minimum Salary', value: '3,00,000', icon: '💰' },
    { label: 'Maximum Salary', value: '24,00,000', icon: '' }
  ];

  return (
    <section className="placement-section">
      <div className="placement-container">
        <div className="section-header">
          <h2 className="section-title">Get your Dream Job</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Courser program guarantees successful placement performance based on the average salary packages offered, 
            the hiring companies participating, and speed of offer roll-out. If you couldn't get the placement within 
            180 days of graduation, 50% of your course fees will be Refunded back to you, No Questions Asked.
          </p>
        </div>

        <div className="placement-content">
          <div className="placement-stats">
            <h3 className="subsection-title">Placement Statistics</h3>
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="companies-section">
            <h3 className="subsection-title">Our Alumini work in Top Companies</h3>
            <div className="companies-grid">
              {companies.map((company, idx) => (
                <div key={idx} className="company-card">
                  <span className="company-name">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlacementSection;
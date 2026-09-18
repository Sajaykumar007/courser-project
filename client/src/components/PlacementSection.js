import React from 'react';
import '../styles/PlacementSection.css';

function PlacementSection() {
  const companiesRow1 = [
    'TATA', 'Microsoft', 'Flipkart', 'Standard Chartered',
    'Amazon', 'Mahindra', 'Airtel', 'Paytm'
  ];

  const companiesRow2 = [
    'Google', 'MasterCard', 'Myntra', 'PayPal',
    'Toshiba', 'BOSCH', 'SONY', 'Intel'
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

        <div className="companies-section">
          <h3 className="companies-title">Our Alumni work in Top Companies</h3>
          
          {/* Row 1 - Scrolling Left */}
          <div className="marquee-container">
            <div className="marquee-row marquee-left">
              {[...companiesRow1, ...companiesRow1, ...companiesRow1].map((company, idx) => (
                <div key={`row1-${idx}`} className="company-card-marquee">
                  <span className="company-name-marquee">{company}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="marquee-container">
            <div className="marquee-row marquee-right">
              {[...companiesRow2, ...companiesRow2, ...companiesRow2].map((company, idx) => (
                <div key={`row2-${idx}`} className="company-card-marquee">
                  <span className="company-name-marquee">{company}</span>
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
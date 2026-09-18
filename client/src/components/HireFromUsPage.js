import React, { useState, useEffect } from 'react';
import '../styles/HireFromUs.css';

function HireFromUsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    positions: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ NEW: Check URL for industry filter on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const industryFilter = urlParams.get('industry');
    if (industryFilter) {
      setFormData(prev => ({ ...prev, industry: industryFilter }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  // ✅ NEW: Listen for filterHireFromUs event from Navbar
  useEffect(() => {
    const handleFilterHire = (e) => {
      setFormData(prev => ({ ...prev, industry: e.detail }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };
    window.addEventListener('filterHireFromUs', handleFilterHire);
    return () => window.removeEventListener('filterHireFromUs', handleFilterHire);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/placement/hire-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          industry: '',
          positions: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download Brochure Function
  const handleDownloadBrochure = () => {
    const printWindow = window.open('/brochure.html', '_blank');
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  const stats = [
    { number: '6,200+', label: 'Trained Professionals', icon: '🎓' },
    { number: '95%', label: 'Placement Rate', icon: '📊' },
    { number: '200+', label: 'Hiring Partners', icon: '🤝' },
    { number: '15+', label: 'Industries Covered', icon: '🏢' }
  ];

  const benefits = [
    { icon: '🚀', title: 'Industry-Ready Talent', desc: 'Our graduates are trained on real-world projects and latest technologies' },
    { icon: '⚡', title: 'Quick Hiring Process', desc: 'Access to pre-screened candidates and streamlined recruitment' },
    { icon: '💰', title: 'Cost-Effective', desc: 'Save on recruitment costs with our placement assistance' },
    { icon: '✅', title: 'Verified Skills', desc: 'All candidates undergo rigorous assessments and certifications' },
    { icon: '🌍', title: 'Diverse Talent Pool', desc: 'Access candidates from various technical backgrounds' },
    { icon: '🎓', title: 'Continuous Support', desc: 'Post-hiring support and training assistance available' }
  ];

  const talentPool = [
    { category: 'Full Stack Developers', count: '1,200+', skills: 'MERN, MEAN, Java Spring' },
    { category: 'Data Scientists', count: '800+', skills: 'Python, ML, AI, Analytics' },
    { category: 'Cloud Engineers', count: '650+', skills: 'AWS, Azure, GCP' },
    { category: 'DevOps Engineers', count: '500+', skills: 'Docker, Kubernetes, CI/CD' },
    { category: 'Mobile Developers', count: '450+', skills: 'React Native, Flutter, iOS, Android' },
    { category: 'QA Engineers', count: '600+', skills: 'Automation, Manual Testing' }
  ];

  const hiringProcess = [
    { step: 1, title: 'Share Requirements', desc: 'Tell us about your open positions and skill requirements' },
    { step: 2, title: 'Candidate Matching', desc: 'We match you with pre-screened, qualified candidates' },
    { step: 3, title: 'Interview Process', desc: 'Conduct interviews at your convenience' },
    { step: 4, title: 'Selection & Onboarding', desc: 'Select the best fit and we assist with onboarding' }
  ];

  const industries = [
    'IT Services', 'Banking & Finance', 'Healthcare', 'E-commerce',
    'Telecommunications', 'Manufacturing', 'Consulting', 'Startups'
  ];

  return (
    <div className="hire-from-us-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hire-hero">
        <div className="hero-content">
          <span className="hero-badge">🤝 PARTNERSHIP OPPORTUNITIES</span>
          <h1 className="hero-title">
            Hire Top Tech Talent<br />
            <span className="highlight">From Courser</span>
          </h1>
          <p className="hero-subtitle">
            Access our pool of 6,200+ industry-ready professionals trained in cutting-edge technologies.
            Find the perfect fit for your organization.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Post a Job Opening
            </button>
            <button className="btn-secondary" onClick={() => document.querySelector('.talent-pool')?.scrollIntoView({ behavior: 'smooth' })}>
              View Talent Pool
            </button>
          </div>
        </div>
        <div className="hero-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY HIRE FROM US ===== */}
      <section className="why-hire-section">
        <div className="section-header">
          <h2 className="section-title">Why Partner With Us?</h2>
          <p className="section-subtitle">We connect you with pre-vetted, job-ready professionals</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TALENT POOL ===== */}
      <section className="talent-pool">
        <div className="section-header">
          <h2 className="section-title">Our Talent Pool</h2>
          <p className="section-subtitle">Skilled professionals across multiple domains</p>
        </div>
        <div className="talent-grid">
          {talentPool.map((talent, idx) => (
            <div key={idx} className="talent-card">
              <div className="talent-header">
                <h3 className="talent-category">{talent.category}</h3>
                <span className="talent-count">{talent.count}</span>
              </div>
              <p className="talent-skills">{talent.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HIRING PROCESS ===== */}
      <section className="hiring-process">
        <div className="section-header">
          <h2 className="section-title">Simple Hiring Process</h2>
          <p className="section-subtitle">From requirement to onboarding in 4 easy steps</p>
        </div>
        <div className="process-timeline">
          {hiringProcess.map((item) => (
            <div key={item.step} className="process-step">
              <div className="step-number">{item.step}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="industries-section">
        <div className="section-header">
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-subtitle">Trusted by companies across diverse sectors</p>
        </div>
        <div className="industries-grid">
          {industries.map((industry, idx) => (
            <div key={idx} className="industry-tag">
              <span className="industry-icon">✓</span>
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">What Our Partners Say</h2>
          <p className="section-subtitle">Success stories from our hiring partners</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">"Courser helped us find exceptional talent for our development team. The candidates were well-prepared and skilled."</p>
              <div className="testimonial-author">
                <div className="author-name">Rajesh Kumar</div>
                <div className="author-role">HR Director, Tech Solutions Ltd</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">"The quality of graduates from Courser is outstanding. We've hired 15+ professionals and all have been excellent."</p>
              <div className="testimonial-author">
                <div className="author-name">Priya Sharma</div>
                <div className="author-role">Talent Acquisition, Digital Innovations</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">"Streamlined hiring process and access to pre-screened candidates saved us months of recruitment time."</p>
              <div className="testimonial-author">
                <div className="author-name">Arun Patel</div>
                <div className="author-role">CTO, StartupHub Inc</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="contact-form-section">
        <div className="section-header">
          <h2 className="section-title">Partner With Us</h2>
          <p className="section-subtitle">Fill out the form and our team will get back to you within 24 hours</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank You for Your Interest!</h3>
            <p>Our partnership team will contact you within 24 hours to discuss your requirements.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="hire-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter your company name" />
              </div>
              <div className="form-group">
                <label>Contact Person *</label>
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="Your full name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="company@email.com" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Industry *</label>
                <select name="industry" value={formData.industry} onChange={handleChange} required>
                  <option value="">Select your industry</option>
                  {industries.map((ind, idx) => (
                    <option key={idx} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Number of Positions</label>
                <input type="number" name="positions" value={formData.positions} onChange={handleChange} placeholder="e.g., 5" />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Requirements</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell us about the skills you're looking for, experience level, and any specific requirements..." />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Hiring Request'}
            </button>
          </form>
        )}
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build Your Dream Team?</h2>
          <p>Join 200+ companies that trust Courser for their hiring needs</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Hiring Now
            </button>
            <button className="btn-secondary" onClick={handleDownloadBrochure} type="button">
              📄 Download Talent Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HireFromUsPage;
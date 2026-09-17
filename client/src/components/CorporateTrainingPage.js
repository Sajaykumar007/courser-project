import React, { useState, useEffect } from 'react';
import '../styles/CorporateTrainingPage.css';

function CorporateTrainingPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employees: '',
    trainingType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ NEW: Check URL for training filter on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trainingFilter = urlParams.get('training');
    if (trainingFilter) {
      setFormData(prev => ({ ...prev, trainingType: trainingFilter }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  // ✅ NEW: Listen for filterCorporateTraining event from Navbar
  useEffect(() => {
    const handleFilterTraining = (e) => {
      setFormData(prev => ({ ...prev, trainingType: e.detail }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };
    window.addEventListener('filterCorporateTraining', handleFilterTraining);
    return () => window.removeEventListener('filterCorporateTraining', handleFilterTraining);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Real API Call to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/placement/corporate-training-request', {
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
          employees: '',
          trainingType: '',
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

  // Handle Pricing Button Click (Get Quote / Contact Us)
  const handleGetQuote = (packageType) => {
    document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'm interested in the ${packageType} corporate training package. Please provide more details about pricing, schedule, and customization options.`
      }));
    }, 800);
  };

  const trainingPrograms = [
    {
      icon: '💻',
      title: 'Technical Skills',
      duration: '4-12 Weeks',
      description: 'Full Stack Development, Data Science, Cloud Computing, DevOps, AI/ML',
      features: ['Hands-on Projects', 'Expert Trainers', 'Certification', 'Post-training Support']
    },
    {
      icon: '📊',
      title: 'Data & Analytics',
      duration: '6-8 Weeks',
      description: 'Data Analysis, Business Intelligence, Machine Learning, Big Data',
      features: ['Real Datasets', 'Industry Tools', 'Case Studies', 'Portfolio Building']
    },
    {
      icon: '🎯',
      title: 'Digital Marketing',
      duration: '4-6 Weeks',
      description: 'SEO, SEM, Social Media Marketing, Content Strategy, Analytics',
      features: ['Live Campaigns', 'Tools Access', 'Strategy Development', 'ROI Tracking']
    },
    {
      icon: '👔',
      title: 'Leadership & Management',
      duration: '3-6 Weeks',
      description: 'Team Management, Strategic Thinking, Decision Making, Communication',
      features: ['Executive Coaching', 'Peer Learning', 'Action Plans', '360 Feedback']
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      duration: '8-12 Weeks',
      description: 'Network Security, Ethical Hacking, Cloud Security, Compliance',
      features: ['Security Labs', 'Certification Prep', 'Threat Simulation', 'Best Practices']
    },
    {
      icon: '🤖',
      title: 'Emerging Technologies',
      duration: '6-10 Weeks',
      description: 'Blockchain, IoT, AR/VR, Quantum Computing, Edge Computing',
      features: ['Cutting-edge Tech', 'Innovation Projects', 'Expert Mentorship', 'Future Skills']
    }
  ];

  const benefits = [
    { icon: '📈', title: 'Customized Curriculum', desc: 'Training tailored to your company\'s specific needs and goals' },
    { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Industry veterans with 10+ years of experience' },
    { icon: '📍', title: 'Flexible Delivery', desc: 'On-site, online, or hybrid training options' },
    { icon: '📜', title: 'Certification', desc: 'Industry-recognized certificates upon completion' },
    { icon: '⏰', title: 'Flexible Timing', desc: 'Weekend, weekday, or after-hours sessions' },
    { icon: '💵', title: 'Cost Effective', desc: 'Bulk pricing and corporate discounts available' }
  ];

  const caseStudies = [
    {
      company: 'Tech Solutions Ltd',
      industry: 'IT Services',
      challenge: 'Needed to upskill 200 developers in cloud technologies',
      solution: 'Customized AWS & Azure training program over 8 weeks',
      result: '95% certification rate, 40% productivity improvement'
    },
    {
      company: 'Finance Corp',
      industry: 'Banking',
      challenge: 'Required data analytics skills for 150 analysts',
      solution: 'Data Science bootcamp with real financial datasets',
      result: '50% faster reporting, better decision-making'
    },
    {
      company: 'Retail Giants',
      industry: 'E-commerce',
      challenge: 'Digital transformation for 300 employees',
      solution: 'Digital marketing & e-commerce strategy training',
      result: '35% increase in online sales within 6 months'
    }
  ];

  const industries = [
    'IT & Software', 'Banking & Finance', 'Healthcare', 'Manufacturing',
    'Retail & E-commerce', 'Telecommunications', 'Consulting', 'Startups'
  ];

  return (
    <div className="corporate-training-page">
      {/* ===== HERO SECTION ===== */}
      <section className="corp-hero">
        <div className="hero-content">
          <span className="hero-badge">🏢 CORPORATE TRAINING SOLUTIONS</span>
          <h1 className="hero-title">
            Empower Your Workforce<br />
            <span className="highlight">With Industry-Leading Training</span>
          </h1>
          <p className="hero-subtitle">
            Transform your team's skills with customized corporate training programs.
            From technical skills to leadership development, we've got you covered.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Request Training Proposal
            </button>
            <button className="btn-secondary" onClick={() => document.querySelector('.training-programs')?.scrollIntoView({ behavior: 'smooth' })}>
              View Programs
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Corporate Clients</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Professionals Trained</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Training Programs</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* ===== TRAINING PROGRAMS ===== */}
      <section className="training-programs">
        <div className="section-header">
          <h2 className="section-title">Our Corporate Training Programs</h2>
          <p className="section-subtitle">Comprehensive training solutions for modern businesses</p>
        </div>
        <div className="programs-grid">
          {trainingPrograms.map((program, idx) => (
            <div key={idx} className="program-card">
              <div className="program-icon">{program.icon}</div>
              <h3 className="program-title">{program.title}</h3>
              <div className="program-duration">
                <span className="duration-icon">⏱️</span>
                {program.duration}
              </div>
              <p className="program-desc">{program.description}</p>
              <ul className="program-features">
                {program.features.map((feature, fidx) => (
                  <li key={fidx}>✓ {feature}</li>
                ))}
              </ul>
              <button className="program-btn" onClick={() => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="corp-why-choose">
        <div className="section-header">
          <h2 className="section-title">Why Companies Choose Courser?</h2>
          <p className="section-subtitle">Trusted by Fortune 500 and leading startups</p>
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

      {/* ===== TRAINING METHODOLOGY ===== */}
      <section className="training-methodology">
        <div className="section-header">
          <h2 className="section-title">Our Training Methodology</h2>
          <p className="section-subtitle">Proven approach to maximize learning outcomes</p>
        </div>
        <div className="methodology-timeline">
          <div className="methodology-step">
            <div className="step-number">1</div>
            <h3>Needs Assessment</h3>
            <p>Understand your team's skill gaps and business objectives</p>
          </div>
          <div className="methodology-step">
            <div className="step-number">2</div>
            <h3>Custom Curriculum</h3>
            <p>Design training program tailored to your requirements</p>
          </div>
          <div className="methodology-step">
            <div className="step-number">3</div>
            <h3>Expert Delivery</h3>
            <p>Industry experts deliver engaging, practical sessions</p>
          </div>
          <div className="methodology-step">
            <div className="step-number">4</div>
            <h3>Hands-on Practice</h3>
            <p>Real-world projects and case studies for practical learning</p>
          </div>
          <div className="methodology-step">
            <div className="step-number">5</div>
            <h3>Assessment & Feedback</h3>
            <p>Regular evaluations and personalized feedback</p>
          </div>
          <div className="methodology-step">
            <div className="step-number">6</div>
            <h3>Certification & Support</h3>
            <p>Industry-recognized certification and post-training support</p>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="case-studies">
        <div className="section-header">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">Real results from real partnerships</p>
        </div>
        <div className="case-studies-grid">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="case-study-card">
              <div className="case-header">
                <h3 className="case-company">{study.company}</h3>
                <span className="case-industry">{study.industry}</span>
              </div>
              <div className="case-content">
                <div className="case-item">
                  <strong>Challenge:</strong> {study.challenge}
                </div>
                <div className="case-item">
                  <strong>Solution:</strong> {study.solution}
                </div>
                <div className="case-result">
                  <strong>Result:</strong> {study.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INDUSTRIES SERVED ===== */}
      <section className="industries-served">
        <div className="section-header">
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-subtitle">Expertise across multiple sectors</p>
        </div>
        <div className="industries-grid">
          {industries.map((industry, idx) => (
            <div key={idx} className="industry-badge">
              <span className="industry-icon">✓</span>
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING PACKAGES ===== */}
      <section className="pricing-packages">
        <div className="section-header">
          <h2 className="section-title">Corporate Training Packages</h2>
          <p className="section-subtitle">Flexible pricing to fit your budget</p>
        </div>
        <div className="pricing-grid">
          {/* Starter Package */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Starter</h3>
              <div className="pricing-price">₹15,000<span>/participant</span></div>
            </div>
            <ul className="pricing-features">
              <li>✓ Up to 20 participants</li>
              <li>✓ 4-week program</li>
              <li>✓ Online training</li>
              <li>✓ Study materials</li>
              <li>✓ Certificate of completion</li>
              <li>✓ Email support</li>
            </ul>
            <button className="pricing-btn" onClick={() => handleGetQuote('Starter')}>
              Get Quote
            </button>
          </div>

          {/* Professional Package */}
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Professional</h3>
              <div className="pricing-price">₹12,000<span>/participant</span></div>
            </div>
            <ul className="pricing-features">
              <li>✓ 21-50 participants</li>
              <li>✓ 6-8 week program</li>
              <li>✓ Hybrid (Online + On-site)</li>
              <li>✓ Premium study materials</li>
              <li>✓ Industry certification</li>
              <li>✓ Priority support</li>
              <li>✓ Post-training assessment</li>
            </ul>
            <button className="pricing-btn" onClick={() => handleGetQuote('Professional')}>
              Get Quote
            </button>
          </div>

          {/* Enterprise Package */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Enterprise</h3>
              <div className="pricing-price">Custom<span>/pricing</span></div>
            </div>
            <ul className="pricing-features">
              <li>✓ 50+ participants</li>
              <li>✓ Customized duration</li>
              <li>✓ On-site training</li>
              <li>✓ Custom curriculum</li>
              <li>✓ Dedicated trainer</li>
              <li>✓ 24/7 support</li>
              <li>✓ ROI tracking</li>
            </ul>
            <button className="pricing-btn" onClick={() => handleGetQuote('Enterprise')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="contact-form-section">
        <div className="section-header">
          <h2 className="section-title">Request Training Proposal</h2>
          <p className="section-subtitle">Tell us about your training needs and we'll get back within 24 hours</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank You for Your Interest!</h3>
            <p>Our corporate training team will contact you within 24 hours with a customized proposal.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="corp-form">
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
                <label>Number of Employees</label>
                <select name="employees" value={formData.employees} onChange={handleChange}>
                  <option value="">Select range</option>
                  <option value="1-20">1-20</option>
                  <option value="21-50">21-50</option>
                  <option value="51-100">51-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Training Type</label>
                <select name="trainingType" value={formData.trainingType} onChange={handleChange}>
                  <option value="">Select training type</option>
                  <option value="Technical">Technical Skills</option>
                  <option value="Data">Data & Analytics</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Leadership">Leadership & Management</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Emerging Tech">Emerging Technologies</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Training Requirements</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell us about your training needs, preferred dates, and specific requirements..." />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Request Proposal'}
            </button>
          </form>
        )}
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="corp-cta">
        <div className="cta-content">
          <h2>Ready to Upskill Your Team?</h2>
          <p>Join 500+ companies that have transformed their workforce with Courser</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Free Consultation
            </button>
            <button className="btn-secondary" onClick={() => window.open('/brochure.html', '_blank')}>
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CorporateTrainingPage;
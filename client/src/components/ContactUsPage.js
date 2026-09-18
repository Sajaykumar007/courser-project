import React, { useState, useEffect } from 'react';
import '../styles/ContactUs.css';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ NEW: Check URL for section scroll on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('scrollTo');
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  // ✅ NEW: Listen for scrollToContactSection event from Navbar
  useEffect(() => {
    const handleScrollToSection = (e) => {
      setTimeout(() => {
        const element = document.getElementById(e.detail);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    };
    window.addEventListener('scrollToContactSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToContactSection', handleScrollToSection);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://courser-project.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', company: '', phone: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Banner with Animated Background */}
      <section className="contact-hero">
        <div className="animated-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="gradient-overlay"></div>
        </div>

        <div className="hero-content">
          <h1>Contact us</h1>
          <p>Courser is ready to provide the right solution according to your needs</p>
        </div>
      </section>

      {/* Main Contact Card */}
      <section className="contact-main">
        <div className="contact-card">
          {/* Left Side - Get in Touch */}
          <div className="contact-left" id="contact-centers">
            <h2>Get in touch</h2>
            <p className="intro-text">Have questions about courses, batches or career paths? Our team is here to help you succeed.</p>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>Head Office</h4>
                  <p>Bangalore, Karnataka</p>
                  <p className="small-text">Our Training Centres:</p>
                  <p>Coimbatore - Peelamedu</p>
                  <p>Tirupur - Opposite Shiva Textiles</p>
                  <p>Karumathampatti - Four Road Junction</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  <p>hi@courser.in</p>
                  <p>upskill@courser.in</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  <p>Phone: +91 77060 37060</p>
                  <p>Phone: +91 73396 37060</p>
                  <p className="small-text">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h4>Follow our social media</h4>
              <div className="social-icons">
                <a href="https://facebook.com/courser" target="_blank" rel="noopener noreferrer" className="social-icon">f</a>
                <a href="https://instagram.com/courser" target="_blank" rel="noopener noreferrer" className="social-icon">📷</a>
                <a href="https://twitter.com/courser" target="_blank" rel="noopener noreferrer" className="social-icon">🐦</a>
                <a href="https://youtube.com/@courser" target="_blank" rel="noopener noreferrer" className="social-icon">▶</a>
              </div>
            </div>
          </div>

          {/* Right Side - Send Message Form */}
          <div className="contact-right" id="contact-form">
            <h2>Send us a message</h2>
            
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Company"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    rows="5"
                    placeholder="Message"
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.998123456789!2d80.2548!3d13.0604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM3LjQiTiA4MMKwMTUnMTcuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Courser Location Map"
        ></iframe>
      </section>
    </div>
  );
}

export default ContactUsPage;
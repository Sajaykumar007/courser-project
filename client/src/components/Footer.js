import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', type: '' });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const currentYear = new Date().getFullYear();

  const popularCourses = ['Web Developer', 'Digital Marketing', 'Java Developer', 'Data Analyst'];
  const supportLinks = ['Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy'];
  const centers = [
    { name: 'Bangalore', location: 'Bangalore' },
    { name: 'Coimbatore', location: 'Coimbatore' },
    { name: 'Peelamedu', location: 'Peelamedu' },
    { name: 'Karumathampatti', location: 'Karumathampatti' },
  ];
  const socialLinks = [
    { name: 'Facebook', icon: '📘', color: '#1877F2', href: 'https://facebook.com/courser' },
    { name: 'Instagram', icon: '📸', color: '#E4405F', href: 'https://instagram.com/courser' },
    { name: 'LinkedIn', icon: '💼', color: '#0A66C2', href: 'https://linkedin.com/company/courser' },
    { name: 'YouTube', icon: '▶️', color: '#FF0000', href: 'https://youtube.com/@courser' },
  ];
  const badges = ['ISO Certified', '5000+ Students', '95% Placement'];

  const locationData = {
    'Bangalore': { name: 'Courser - Bangalore', address: 'Bangalore, Karnataka, India', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248366.36789208996!2d77.4488276!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890' },
    'Coimbatore': { name: 'Courser - Coimbatore', address: 'Coimbatore, Tamil Nadu, India', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124567.89!2d76.9389!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858c7b8c8c8c8%3A0x123456789abcdef!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890' },
    'Peelamedu': { name: 'Courser - Peelamedu', address: 'Peelamedu, Coimbatore, Tamil Nadu', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d76.9839!3d11.0293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzQ1LjUiTiA3NsKwNTknMDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890' },
    'Karumathampatti': { name: 'Courser - Karumathampatti', address: 'Karumathampatti, Coimbatore, Tamil Nadu', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.123456789!2d76.9956!3d11.0876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA1JzE1LjQiTiA3NsKwNTknNDQuMiJF!5e0!3m2!1sen!2sin!4v1234567890' },
  };

  useEffect(() => {
    if (isLocationModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLocationModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && isLocationModalOpen) setIsLocationModalOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLocationModalOpen]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubscribeStatus({ loading: false, message: 'Please enter an email address.', type: 'error' });
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus({ loading: false, message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setSubscribeStatus({ loading: true, message: '', type: '' });

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setSubscribeStatus({ loading: false, message: data.message, type: 'success' });
        setEmail('');
        setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
      } else {
        setSubscribeStatus({ loading: false, message: data.message || 'Subscription failed.', type: 'error' });
        setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus({ loading: false, message: 'Network error. Please try again.', type: 'error' });
      setTimeout(() => setSubscribeStatus({ loading: false, message: '', type: '' }), 5000);
    }
  };

  const handleLocationClick = (location) => { setSelectedLocation(location); setIsLocationModalOpen(true); };
  const currentLocation = locationData[selectedLocation] || locationData['Bangalore'];
  const handleDirections = () => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentLocation.address)}`, '_blank');
  const handleCall = () => { window.location.href = 'tel:+917706037060'; };

  return (
    <footer className="new-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section">
            <div className="logo-box"><span className="logo-c">C</span></div>
            <h2 className="footer-brand-name">Courser</h2>
            <p className="footer-tagline">Transforming Learners into Creators</p>
          </div>
          <div className="footer-contact-section">
            <a href="tel:+917706037060" className="contact-row contact-link"><span className="contact-icon phone-icon">📞</span><span>+91 77060 37060</span></a>
            <a href="mailto:hi@courser.in" className="contact-row contact-link"><span className="contact-icon email-icon">✉️</span><span>hi@courser.in</span></a>
            <div className="contact-row"><span className="contact-icon location-icon">📍</span><span>Bangalore | Coimbatore</span></div>
          </div>
          <div className="footer-social-section">
            <h3 className="follow-title">Follow Us</h3>
            <div className="social-icons-grid">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="social-icon-box" style={{ '--social-color': social.color }} title={social.name}>{social.icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-middle">
          <div className="footer-column">
            <h3 className="column-heading">Popular Courses</h3>
            <ul className="footer-list">{popularCourses.map((course, idx) => (<li key={idx} className="footer-list-item"><span className="arrow-icon">→</span>{course}</li>))}</ul>
          </div>
          <div className="footer-column">
            <h3 className="column-heading">Support</h3>
            <ul className="footer-list">{supportLinks.map((link, idx) => (<li key={idx} className="footer-list-item"><span className="arrow-icon">→</span>{link}</li>))}</ul>
          </div>
          <div className="footer-column">
            <h3 className="column-heading">Our Centers</h3>
            <ul className="footer-list">{centers.map((center, idx) => (<li key={idx} className="footer-list-item location-link" onClick={() => handleLocationClick(center.location)}><span className="arrow-icon">→</span><span className="location-name">{center.name}</span><span className="map-icon">📍</span></li>))}</ul>
          </div>
          <div className="footer-column newsletter-column">
            <h3 className="column-heading">Stay Updated</h3>
            <p className="newsletter-desc">Get course updates & offers</p>
            <form className="newsletter-box" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeStatus.loading}
              />
              <button type="submit" className="newsletter-submit" disabled={subscribeStatus.loading}>
                {subscribeStatus.loading ? '⏳' : '→'}
              </button>
            </form>
            {subscribeStatus.message && (
              <p className={`newsletter-message ${subscribeStatus.type}`}>{subscribeStatus.message}</p>
            )}
          </div>
        </div>
        <div className="footer-divider-with-star"><div className="divider-line"></div><div className="divider-star">✦</div><div className="divider-line"></div></div>
        <div className="footer-bottom">
          <p className="copyright-text">© {currentYear} <span className="brand-name">COURSER™</span> | Bangalore, India | All Rights Reserved</p>
          <div className="footer-badges">{badges.map((badge, idx) => (<span key={idx} className="badge-pill">{badge}</span>))}</div>
        </div>
      </div>

      {isLocationModalOpen && (
        <div className="location-modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <button className="location-modal-close" onClick={() => setIsLocationModalOpen(false)}>✕</button>
            <div className="location-header">
              <h2 className="location-title">{currentLocation.name}</h2>
              <p className="location-address">📍 {currentLocation.address}</p>
            </div>
            <div className="map-container">
              <iframe src={currentLocation.embedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Google Map of ${selectedLocation}`}></iframe>
            </div>
            <div className="location-actions">
              <button className="btn-directions" onClick={handleDirections}>🗺️ Get Directions</button>
              <button className="btn-call-location" onClick={handleCall}>📞 Call Us</button>
            </div>
            <div className="location-info">
              <div className="info-item"><span className="info-icon">🕐</span><div><strong>Working Hours</strong><p>Mon - Sat: 9:00 AM - 7:00 PM</p></div></div>
              <div className="info-item"><span className="info-icon">📞</span><div><strong>Contact</strong><p>+91 77060 37060</p></div></div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
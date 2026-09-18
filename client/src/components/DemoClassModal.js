import React, { useState, useEffect } from 'react';

function DemoClassModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    course: '',
    learningMode: '',
    preferredCenter: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const courses = [
    'MERN Stack Development',
    'Java Full Stack Development',
    'Python Full Stack Development',
    'Data Science',
    'Data Analytics',
    'AI & Machine Learning',
    'Flutter Development',
    'UI/UX Design',
    'Software Testing',
    'AWS & DevOps',
  ];

  const centers = ['Coimbatore', 'Chennai', 'Bangalore', 'Madurai'];

  const benefits = [
    'Meet our instructors',
    'Understand the course structure',
    'Experience live teaching',
    'Clear your course-related doubts',
  ];

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.learningMode) newErrors.learningMode = 'Please select learning mode';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
    if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;

  setLoading(true); // Loading start

  try {
    // Backend-ku data anuppudhu
    const response = await fetch('https://courser-project.onrender.com/api/leads/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        type: 'demo_class' // Idhu demo class nu identify panna
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Demo data saved:', data.data);
      setSubmitted(true); // Success screen kaatum
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error! Backend run aagudha nu check pannunga.');
  } finally {
    setLoading(false); // Loading stop
  }
};

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      course: '',
      learningMode: '',
      preferredCenter: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="demo-modal-header">
              <h2 className="demo-modal-title">Book Your Free Demo Class</h2>
              <p className="demo-modal-subtitle">Experience our training before you join.</p>
            </div>

            <form onSubmit={handleSubmit} className="demo-form">
              <div className="demo-form-row">
                <div className="demo-form-group">
                  <label className="demo-form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`demo-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="demo-error">{errors.fullName}</span>}
                </div>

                <div className="demo-form-group">
                  <label className="demo-form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`demo-input ${errors.mobile ? 'error' : ''}`}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength="10"
                  />
                  {errors.mobile && <span className="demo-error">{errors.mobile}</span>}
                </div>
              </div>

              <div className="demo-form-row">
                <div className="demo-form-group">
                  <label className="demo-form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`demo-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <span className="demo-error">{errors.email}</span>}
                </div>

                <div className="demo-form-group">
                  <label className="demo-form-label">Select Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`demo-select ${errors.course ? 'error' : ''}`}
                  >
                    <option value="">-- Choose a Course --</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.course && <span className="demo-error">{errors.course}</span>}
                </div>
              </div>

              <div className="demo-form-row">
                <div className="demo-form-group">
                  <label className="demo-form-label">Learning Mode *</label>
                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleChange}
                    className={`demo-select ${errors.learningMode ? 'error' : ''}`}
                  >
                    <option value="">-- Select Mode --</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                  {errors.learningMode && <span className="demo-error">{errors.learningMode}</span>}
                </div>

                {formData.learningMode === 'Offline' && (
                  <div className="demo-form-group">
                    <label className="demo-form-label">Preferred Center</label>
                    <select
                      name="preferredCenter"
                      value={formData.preferredCenter}
                      onChange={handleChange}
                      className="demo-select"
                    >
                      <option value="">-- Select Center --</option>
                      {centers.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="demo-form-row">
                <div className="demo-form-group">
                  <label className="demo-form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`demo-input ${errors.preferredDate ? 'error' : ''}`}
                  />
                  {errors.preferredDate && <span className="demo-error">{errors.preferredDate}</span>}
                </div>

                <div className="demo-form-group">
                  <label className="demo-form-label">Preferred Time *</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`demo-input ${errors.preferredTime ? 'error' : ''}`}
                  />
                  {errors.preferredTime && <span className="demo-error">{errors.preferredTime}</span>}
                </div>
              </div>

              <div className="demo-form-group">
                <label className="demo-form-label">Message / Requirement (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="demo-textarea"
                  placeholder="Any specific requirements..."
                  rows="3"
                />
              </div>

              <button type="submit" className="demo-submit-btn" disabled={loading}>
  {loading ? 'Booking...' : 'Book Free Demo Class'}
</button>

              <p className="demo-free-badge">100% Free • No Payment Required</p>
            </form>

            <div className="demo-benefits">
              <h4 className="demo-benefits-title">Why Attend Our Free Demo?</h4>
              <ul className="demo-benefits-list">
                {benefits.map((b, i) => (
                  <li key={i} className="demo-benefit-item">
                    <span className="demo-check">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="demo-success">
            <div className="demo-success-icon">✓</div>
            <h3 className="demo-success-title">Demo Class Booked!</h3>
            <p className="demo-success-text">
              Your free demo class request has been submitted successfully.
            </p>
            <p className="demo-success-text">
              Our team will contact you shortly with the demo class schedule.
            </p>
            <button onClick={handleReset} className="demo-back-btn">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoClassModal;
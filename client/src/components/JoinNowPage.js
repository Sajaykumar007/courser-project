import React, { useState } from 'react';

function JoinNowPage({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    course: '',
    learningMode: '',
    preferredCenter: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const courseInfo = {
    'MERN Stack Development': { duration: '4 Months', placement: true },
    'Java Full Stack Development': { duration: '5 Months', placement: true },
    'Python Full Stack Development': { duration: '4 Months', placement: true },
    'Data Science': { duration: '6 Months', placement: true },
    'Data Analytics': { duration: '4 Months', placement: true },
    'AI & Machine Learning': { duration: '6 Months', placement: true },
    'Flutter Development': { duration: '3 Months', placement: true },
    'UI/UX Design': { duration: '3 Months', placement: true },
    'Software Testing': { duration: '3 Months', placement: true },
    'AWS & DevOps': { duration: '4 Months', placement: true },
  };

  const courses = Object.keys(courseInfo);
  const centers = ['Coimbatore', 'Chennai', 'Bangalore', 'Madurai'];

 const benefits = [
  { icon: '🎯', text: 'Industry-Oriented Training' },
  { icon: '💼', text: 'Real-World Projects' },
  { icon: '🏆', text: 'Placement Assistance' },
  { icon: '👨‍🏫', text: 'Expert Mentors' },
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Invalid';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid';
    if (!formData.course) newErrors.course = 'Required';
    if (!formData.learningMode) newErrors.learningMode = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;

  setLoading(true); // Loading start

  try {
    // Backend-ku data anuppudhu
    const response = await fetch('http://localhost:5000/api/leads/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        type: 'join_now' 
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Data saved:', data.data);
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
    setFormData({ fullName: '', mobile: '', email: '', course: '', learningMode: '', preferredCenter: '' });
    setErrors({});
    setSubmitted(false);
  };

  const selectedCourseInfo = formData.course ? courseInfo[formData.course] : null;

  return (
    <div className="join-now-page">
      {/* COMPACT HERO */}
      <section className="join-hero">
        <h1 className="join-hero-title">Start Your Career With Courser</h1>
        <p className="join-hero-subtitle">Choose your path. Build your future.</p>
      </section>

      {/* MAIN SECTION */}
      <section className="join-main">
        <div className="join-container">
          
          {/* LEFT - Benefits */}
          <div className="join-left">
            <h2 className="section-title">Why Choose Courser?</h2>
            <ul className="benefits-list">
              {benefits.map((b, i) => (
                <li key={i} className="benefit-item">
                  <span className="benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="benefit-footer">
              <p>📞 <strong>+91 77060 37060</strong></p>
              <p>💬 WhatsApp available</p>
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="join-right">
            <div className="form-card">
              <h2 className="form-title">Enroll Now</h2>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="enroll-form">
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="Your name"
                      />
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile *</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`form-input ${errors.mobile ? 'error' : ''}`}
                        placeholder="10-digit number"
                        inputMode="numeric"
                        maxLength="10"
                      />
                      {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Course *</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`form-select ${errors.course ? 'error' : ''}`}
                      >
                        <option value="">Select course</option>
                        {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.course && <span className="error-text">{errors.course}</span>}
                    </div>
                  </div>

                  {/* Course Info */}
                  {selectedCourseInfo && (
                    <div className="course-info-box">
                      <div className="course-info-row">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">{selectedCourseInfo.duration}</span>
                      </div>
                      <div className="course-info-row">
                        <span className="info-label">Placement:</span>
                        <span className="info-value placement-yes">✓ Included</span>
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Mode *</label>
                      <select
                        name="learningMode"
                        value={formData.learningMode}
                        onChange={handleChange}
                        className={`form-select ${errors.learningMode ? 'error' : ''}`}
                      >
                        <option value="">Select mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                      {errors.learningMode && <span className="error-text">{errors.learningMode}</span>}
                    </div>

                    {formData.learningMode === 'Offline' && (
                      <div className="form-group animate-show">
                        <label className="form-label">Center</label>
                        <select
                          name="preferredCenter"
                          value={formData.preferredCenter}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select center</option>
                          {centers.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
  {loading ? 'Submitting...' : 'Submit Application →'}
</button>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Application Submitted!</h3>
                  <p className="success-text">Our counsellor will contact you shortly.</p>
                  <button onClick={handleReset} className="back-btn">
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JoinNowPage;
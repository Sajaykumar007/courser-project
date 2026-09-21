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

  // Prevent background scrolling
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

  // Close on ESC
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

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

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    if (!formData.learningMode) {
      newErrors.learningMode = 'Please select learning mode';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a time';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        'https://courser-project.onrender.com/api/leads/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            type: 'demo_class',
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('Demo data saved:', data.data);
        setSubmitted(true);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error! Backend run aagudha nu check pannunga.');
    } finally {
      setLoading(false);
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
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md animate-[fadeIn_.3s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-white shadow-2xl animate-[modalIn_.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition-all duration-300 hover:rotate-90 hover:bg-red-50 hover:text-red-500 hover:shadow-lg"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 px-6 py-8 text-center text-white sm:px-10">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-5 h-20 w-20 rounded-full bg-white blur-2xl animate-pulse" />
                <div className="absolute bottom-0 right-10 h-28 w-28 rounded-full bg-emerald-200 blur-3xl animate-pulse" />
              </div>

              <div className="relative">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur-sm">
                  🎓
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Book Your Free Demo Class
                </h2>

                <p className="mt-2 text-sm text-emerald-50 sm:text-base">
                  Experience our training before you join.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 p-5 sm:p-8"
            >
              {/* Row 1 */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.fullName
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  />

                  {errors.fullName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength="10"
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.mobile
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  />

                  {errors.mobile && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.mobile}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Select Course *
                  </label>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full cursor-pointer rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
                      errors.course
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  >
                    <option value="">-- Choose a Course --</option>

                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>

                  {errors.course && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.course}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Learning Mode */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Learning Mode *
                  </label>

                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleChange}
                    className={`w-full cursor-pointer rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
                      errors.learningMode
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  >
                    <option value="">-- Select Mode --</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>

                  {errors.learningMode && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.learningMode}
                    </p>
                  )}
                </div>

                {/* Preferred Center */}
                {formData.learningMode === 'Offline' && (
                  <div className="animate-[slideDown_.3s_ease-out]">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Preferred Center
                    </label>

                    <select
                      name="preferredCenter"
                      value={formData.preferredCenter}
                      onChange={handleChange}
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    >
                      <option value="">-- Select Center --</option>

                      {centers.map((center) => (
                        <option key={center} value={center}>
                          {center}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Date + Time */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred Date *
                  </label>

                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
                      errors.preferredDate
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  />

                  {errors.preferredDate && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred Time *
                  </label>

                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
                      errors.preferredTime
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                    }`}
                  />

                  {errors.preferredTime && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.preferredTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message / Requirement{' '}
                  <span className="font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any specific requirements..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {loading ? 'Booking...' : 'Book Free Demo Class'}
                </span>
              </button>

              <p className="text-center text-xs font-medium text-emerald-600">
                100% Free • No Payment Required
              </p>
            </form>

            {/* Benefits */}
            <div className="mx-5 mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:mx-8">
              <h4 className="mb-4 text-center text-sm font-bold text-slate-800">
                Why Attend Our Free Demo?
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white/80 p-3 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-sm">
                      ✓
                    </span>

                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Success */
          <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-5xl font-bold text-white shadow-xl shadow-emerald-500/30 animate-[successPop_.5s_ease-out]">
                ✓
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
              Demo Class Booked!
            </h3>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Your free demo class request has been submitted successfully.
            </p>

            <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
              Our team will contact you shortly with the demo class schedule.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-8 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* Tailwind animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default DemoClassModal;
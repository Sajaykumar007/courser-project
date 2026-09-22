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
    'MERN Stack Development': {
      duration: '4 Months',
      placement: true,
    },
    'Java Full Stack Development': {
      duration: '5 Months',
      placement: true,
    },
    'Python Full Stack Development': {
      duration: '4 Months',
      placement: true,
    },
    'Data Science': {
      duration: '6 Months',
      placement: true,
    },
    'Data Analytics': {
      duration: '4 Months',
      placement: true,
    },
    'AI & Machine Learning': {
      duration: '6 Months',
      placement: true,
    },
    'Flutter Development': {
      duration: '3 Months',
      placement: true,
    },
    'UI/UX Design': {
      duration: '3 Months',
      placement: true,
    },
    'Software Testing': {
      duration: '3 Months',
      placement: true,
    },
    'AWS & DevOps': {
      duration: '4 Months',
      placement: true,
    },
  };

  const courses = Object.keys(courseInfo);

  const centers = [
    'Coimbatore',
    'Chennai',
    'Bangalore',
  
  ];

  const benefits = [
    {
      icon: '🎯',
      text: 'Industry-Oriented Training',
    },
    {
      icon: '💼',
      text: 'Real-World Projects',
    },
    {
      icon: '🏆',
      text: 'Placement Assistance',
    },
    {
      icon: '👨‍🏫',
      text: 'Expert Mentors',
    },
  ];

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
      newErrors.fullName = 'Required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Invalid';
    }

    if (!formData.course) {
      newErrors.course = 'Required';
    }

    if (!formData.learningMode) {
      newErrors.learningMode = 'Required';
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
            type: 'join_now',
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('Data saved:', data.data);
        setSubmitted(true);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        'Server error! Backend run aagudha nu check pannunga.'
      );
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
    });

    setErrors({});
    setSubmitted(false);
  };

  const selectedCourseInfo = formData.course
    ? courseInfo[formData.course]
    : null;

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-9 text-center text-white sm:py-11">
        {/* Glow */}
        <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />

        <div
          className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-green-500/15 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative animate-[heroIn_.7s_ease-out]">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[9px] font-bold tracking-wider text-emerald-300 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            START YOUR JOURNEY
          </span>

          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
            Start Your Career With{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Courser
            </span>
          </h1>

          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            Choose your path. Build your future.
          </p>

          <div className="mx-auto mt-4 h-0.5 w-12 overflow-hidden rounded-full bg-emerald-500">
            <div className="h-full w-1/2 bg-emerald-200 animate-[lineMove_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <section className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[.72fr_1.28fr]">
          {/* =================================================
              LEFT BENEFITS
          ================================================= */}
          <div className="animate-[slideLeft_.7s_ease-out]">
            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Why Courser?
              </span>

              <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                Why Choose Courser?
              </h2>

              <div className="mt-2 h-1 w-10 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50"
                  style={{
                    animation: `benefitIn .5s ease-out ${
                      index * 100
                    }ms both`,
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-emerald-500">
                    {benefit.icon}
                  </div>

                  <span className="text-xs font-semibold text-slate-700 transition-colors group-hover:text-emerald-600">
                    {benefit.text}
                  </span>

                  <span className="ml-auto text-emerald-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-4">
              <p className="text-xs text-slate-500">
                📞{' '}
                <strong className="text-slate-800">
                  +91 77060 37060
                </strong>
              </p>

              <p className="mt-2 text-xs text-slate-500">
                💬{' '}
                <span className="font-medium text-emerald-600">
                  WhatsApp available
                </span>
              </p>
            </div>

            {/* Mini Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-black text-emerald-600">
                  10+
                </p>
                <p className="text-[9px] text-slate-500">
                  Career Courses
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-black text-emerald-600">
                  100%
                </p>
                <p className="text-[9px] text-slate-500">
                  Practical Focus
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}
          <div className="animate-[slideRight_.7s_ease-out]">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
              {/* Top Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400" />

              {/* Glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />

              <div className="relative p-5 sm:p-7">
                {!submitted ? (
                  <>
                    {/* Form Header */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                            Quick Enrollment
                          </span>

                          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                            Enroll Now
                          </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                          🎓
                        </div>
                      </div>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Fill in your details and our counsellor will
                        contact you.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Name + Mobile */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                          label="Full Name *"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your name"
                          error={errors.fullName}
                        />

                        <FormInput
                          label="Mobile *"
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          error={errors.mobile}
                          inputMode="numeric"
                          maxLength="10"
                        />
                      </div>

                      {/* Email + Course */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                          label="Email *"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          error={errors.email}
                        />

                        <FormSelect
                          label="Course *"
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          error={errors.course}
                          options={courses}
                          placeholder="Select course"
                        />
                      </div>

                      {/* Course Info */}
                      {selectedCourseInfo && (
                        <div className="rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-3.5 animate-[courseInfo_.3s_ease-out]">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                                Duration
                              </p>

                              <p className="mt-1 text-xs font-bold text-slate-800">
                                ⏱️ {selectedCourseInfo.duration}
                              </p>
                            </div>

                            <div>
                              <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                                Placement
                              </p>

                              <p className="mt-1 text-xs font-bold text-emerald-600">
                                ✓ Included
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mode + Center */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormSelect
                          label="Mode *"
                          name="learningMode"
                          value={formData.learningMode}
                          onChange={handleChange}
                          error={errors.learningMode}
                          options={['Online', 'Offline']}
                          placeholder="Select mode"
                        />

                        {formData.learningMode === 'Offline' ? (
                          <div className="animate-[showField_.3s_ease-out]">
                            <FormSelect
                              label="Center"
                              name="preferredCenter"
                              value={formData.preferredCenter}
                              onChange={handleChange}
                              options={centers}
                              placeholder="Select center"
                            />
                          </div>
                        ) : (
                          <div className="hidden sm:block" />
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                        <span className="relative flex items-center justify-center gap-2">
                          {loading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          )}

                          {loading
                            ? 'Submitting...'
                            : 'Submit Application →'}
                        </span>
                      </button>

                      <p className="text-center text-[9px] text-slate-400">
                        🔒 Your information is safe and secure
                      </p>
                    </form>
                  </>
                ) : (
                  /* SUCCESS */
                  <div className="flex min-h-[390px] flex-col items-center justify-center text-center animate-[successIn_.5s_ease-out]">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />

                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-4xl font-bold text-white shadow-xl shadow-emerald-500/30 animate-[successPop_.6s_ease-out]">
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                      Application Submitted!
                    </h3>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                      Our counsellor will contact you shortly.
                    </p>

                    <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-2 text-[10px] font-medium text-emerald-600">
                      Thank you for choosing Courser 🎓
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md"
                    >
                      Back to Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Strip */}
      <div className="border-t border-slate-200 bg-white px-4 py-3 text-center">
        <p className="text-[9px] text-slate-400 sm:text-[10px]">
          © {new Date().getFullYear()} Courser • Learn • Build • Grow
        </p>
      </div>

      <style>{`
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes benefitIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes courseInfo {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes showField {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(.5);
          }

          70% {
            transform: scale(1.1);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes lineMove {
          0%, 100% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(200%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

/* =====================================================
   INPUT COMPONENT
===================================================== */

function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  inputMode,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
        }`}
      />

      {error && (
        <p className="mt-1 text-[9px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* =====================================================
   SELECT COMPONENT
===================================================== */

function FormSelect({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full cursor-pointer rounded-xl border bg-slate-50 px-3 py-2.5 text-xs text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
        }`}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-[9px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default JoinNowPage;
import React, { useState, useEffect } from 'react';

function HireFromUsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    positions: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const stats = [
    { number: '6,200+', label: 'Trained Professionals', icon: '🎓' },
    { number: '95%', label: 'Placement Rate', icon: '📊' },
    { number: '200+', label: 'Hiring Partners', icon: '🤝' },
    { number: '15+', label: 'Industries Covered', icon: '🏢' },
  ];

  const benefits = [
    {
      icon: '🚀',
      title: 'Industry-Ready Talent',
      desc: 'Our graduates are trained on real-world projects and latest technologies',
    },
    {
      icon: '⚡',
      title: 'Quick Hiring Process',
      desc: 'Access to pre-screened candidates and streamlined recruitment',
    },
    {
      icon: '💰',
      title: 'Cost-Effective',
      desc: 'Save on recruitment costs with our placement assistance',
    },
    {
      icon: '✅',
      title: 'Verified Skills',
      desc: 'All candidates undergo rigorous assessments and certifications',
    },
    {
      icon: '🌍',
      title: 'Diverse Talent Pool',
      desc: 'Access candidates from various technical backgrounds',
    },
    {
      icon: '🎓',
      title: 'Continuous Support',
      desc: 'Post-hiring support and training assistance available',
    },
  ];

  const talentPool = [
    {
      category: 'Full Stack Developers',
      count: '1,200+',
      skills: 'MERN, MEAN, Java Spring',
    },
    {
      category: 'Data Scientists',
      count: '800+',
      skills: 'Python, ML, AI, Analytics',
    },
    {
      category: 'Cloud Engineers',
      count: '650+',
      skills: 'AWS, Azure, GCP',
    },
    {
      category: 'DevOps Engineers',
      count: '500+',
      skills: 'Docker, Kubernetes, CI/CD',
    },
    {
      category: 'Mobile Developers',
      count: '450+',
      skills: 'React Native, Flutter, iOS, Android',
    },
    {
      category: 'QA Engineers',
      count: '600+',
      skills: 'Automation, Manual Testing',
    },
  ];

  const hiringProcess = [
    {
      step: 1,
      title: 'Share Requirements',
      desc: 'Tell us about your open positions and skill requirements',
    },
    {
      step: 2,
      title: 'Candidate Matching',
      desc: 'We match you with pre-screened, qualified candidates',
    },
    {
      step: 3,
      title: 'Interview Process',
      desc: 'Conduct interviews at your convenience',
    },
    {
      step: 4,
      title: 'Selection & Onboarding',
      desc: 'Select the best fit and we assist with onboarding',
    },
  ];

  const industries = [
    'IT Services',
    'Banking & Finance',
    'Healthcare',
    'E-commerce',
    'Telecommunications',
    'Manufacturing',
    'Consulting',
    'Startups',
  ];

  const testimonials = [
    {
      text: 'Courser helped us find exceptional talent for our development team. The candidates were well-prepared and skilled.',
      name: 'Rajesh Kumar',
      role: 'HR Director, Tech Solutions Ltd',
    },
    {
      text: "The quality of graduates from Courser is outstanding. We've hired 15+ professionals and all have been excellent.",
      name: 'Priya Sharma',
      role: 'Talent Acquisition, Digital Innovations',
    },
    {
      text: 'Streamlined hiring process and access to pre-screened candidates saved us months of recruitment time.',
      name: 'Arun Patel',
      role: 'CTO, StartupHub Inc',
    },
  ];

  // URL industry filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const industryFilter = urlParams.get('industry');

    if (industryFilter) {
      setFormData((prev) => ({
        ...prev,
        industry: industryFilter,
      }));

      setTimeout(() => {
        document
          .querySelector('.contact-form-section')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  // Navbar filter event
  useEffect(() => {
    const handleFilterHire = (e) => {
      setFormData((prev) => ({
        ...prev,
        industry: e.detail,
      }));

      setTimeout(() => {
        document
          .querySelector('.contact-form-section')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };

    window.addEventListener('filterHireFromUs', handleFilterHire);

    return () => {
      window.removeEventListener('filterHireFromUs', handleFilterHire);
    };
  }, []);

  const scrollToContact = () => {
    document
      .querySelector('.contact-form-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTalent = () => {
    document
      .querySelector('.talent-pool')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://courser-project.onrender.com/api/placement/hire-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

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
          message: '',
        });

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
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

  const handleDownloadBrochure = () => {
    const printWindow = window.open('/brochure.html', '_blank');

    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    }
  };

  return (
    <div className="overflow-hidden bg-white text-gray-800 font-sans">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,.12),transparent_30%)]" />

        <div className="absolute -left-20 top-20 h-48 w-48 rounded-full bg-green-500/10 blur-3xl animate-pulse" />

        <div
          className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-green-400/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:45px_45px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            {/* Hero Content */}
            <div className="animate-[heroLeft_.7s_ease-out]">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-green-300 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                🤝 PARTNERSHIP OPPORTUNITIES
              </span>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Hire Top Tech Talent
                <br />
                <span className="bg-gradient-to-r from-green-400 via-green-300 to-emerald-300 bg-clip-text text-transparent">
                  From Courser
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Access our pool of 6,200+ industry-ready professionals trained
                in cutting-edge technologies. Find the perfect fit for your
                organization.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group rounded-xl bg-green-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/30"
                >
                  Post a Job Opening
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={scrollToTalent}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/10"
                >
                  View Talent Pool
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 animate-[heroRight_.8s_ease-out]">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.09]"
                >
                  <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-green-400/10 blur-xl transition-all duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                      {stat.icon}
                    </div>

                    <div className="mt-3 text-2xl font-black text-white">
                      {stat.number}
                    </div>

                    <div className="mt-1 text-[10px] text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY HIRE
      ===================================================== */}
      <section className="relative bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Why Partner With Us?"
            subtitle="We connect you with pre-vetted, job-ready professionals"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50"
                style={{
                  animation: `cardIn .5s ease-out ${index * 70}ms both`,
                }}
              >
                <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-green-50 transition-all duration-500 group-hover:h-24 group-hover:w-24" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                    {benefit.icon}
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-gray-800">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {benefit.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-300 group-hover:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TALENT POOL
      ===================================================== */}
      <section className="talent-pool relative bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Our Talent Pool"
            subtitle="Skilled professionals across multiple domains"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talentPool.map((talent, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-green-600">
                    {talent.category}
                  </h3>

                  <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                    {talent.count}
                  </span>
                </div>

                <div className="mt-4 h-px bg-gray-100 transition-colors group-hover:bg-green-100" />

                <p className="mt-3 text-xs text-gray-500">
                  {talent.skills}
                </p>

                <div className="mt-4 flex items-center text-[10px] font-semibold text-green-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Explore Talent
                  <span className="ml-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HIRING PROCESS
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            dark
            title="Simple Hiring Process"
            subtitle="From requirement to onboarding in 4 easy steps"
          />

          <div className="grid gap-5 md:grid-cols-4">
            {hiringProcess.map((item, index) => (
              <div
                key={item.step}
                className="group relative text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10 text-sm font-black text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                  {item.step}
                </div>

                {index < hiringProcess.length - 1 && (
                  <div className="absolute left-[calc(50%+30px)] top-6 hidden h-px w-[calc(100%-60px)] bg-gradient-to-r from-green-500/40 to-transparent md:block" />
                )}

                <h3 className="mt-4 text-sm font-bold text-white">
                  {item.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[210px] text-[11px] leading-5 text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Industries We Serve"
            subtitle="Trusted by companies across diverse sectors"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    industry,
                  }));
                  scrollToContact();
                }}
                className="group rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-green-50 hover:text-green-600 hover:shadow-md"
              >
                <span className="mr-1.5 text-green-500">✓</span>
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="What Our Partners Say"
            subtitle="Success stories from our hiring partners"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg"
              >
                <div className="absolute right-4 top-3 text-4xl font-black text-green-100 transition-colors group-hover:text-green-200">
                  "
                </div>

                <div className="relative">
                  <div className="mb-4 flex gap-1 text-xs text-amber-400">
                    ★ ★ ★ ★ ★
                  </div>

                  <p className="text-xs leading-6 text-gray-600">
                    "{item.text}"
                  </p>

                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <p className="text-xs font-bold text-gray-800">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}
      <section className="contact-form-section relative overflow-hidden bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-green-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <SectionHeader
            title="Partner With Us"
            subtitle="Fill out the form and our team will get back to you within 24 hours"
          />

          {success ? (
            <div className="rounded-3xl border border-green-200 bg-white px-6 py-12 text-center shadow-xl animate-[successIn_.5s_ease-out]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600 shadow-inner animate-[successPop_.6s_ease-out]">
                ✓
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-gray-800">
                Thank You for Your Interest!
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                Our partnership team will contact you within 24 hours to
                discuss your requirements.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/50 sm:p-7"
            >
              {/* Row 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Company Name *"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your company name"
                />

                <FormInput
                  label="Contact Person *"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              {/* Row 2 */}
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="company@email.com"
                />

                <FormInput
                  label="Phone Number *"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Row 3 */}
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Industry *
                  </label>

                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-xs text-gray-700 outline-none transition-all duration-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  >
                    <option value="">Select your industry</option>

                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <FormInput
                  label="Number of Positions"
                  type="number"
                  name="positions"
                  value={formData.positions}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                />
              </div>

              {/* Message */}
              <div className="mt-4">
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Additional Requirements
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about the skills you're looking for, experience level, and any specific requirements..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-xs text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-5 w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {loading
                    ? 'Submitting...'
                    : 'Submit Hiring Request'}
                </span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-800 px-4 py-12 text-center text-white sm:px-6">
        <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl animate-[fadeUp_.6s_ease-out]">
          <div className="mb-3 text-3xl">🤝</div>

          <h2 className="text-2xl font-black sm:text-3xl">
            Ready to Build Your Dream Team?
          </h2>

          <p className="mt-3 text-xs text-green-50 sm:text-sm">
            Join 200+ companies that trust Courser for their hiring needs
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToContact}
              className="rounded-xl bg-white px-5 py-3 text-xs font-bold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Start Hiring Now →
            </button>

            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              📄 Download Talent Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes heroLeft {
          from {
            opacity: 0;
            transform: translateX(-35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heroRight {
          from {
            opacity: 0;
            transform: translateX(35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
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
   REUSABLE SECTION HEADER
===================================================== */

function SectionHeader({ title, subtitle, dark = false }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <h2
        className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>

      <div className="mx-auto mt-3 h-1 w-12 overflow-hidden rounded-full bg-green-500">
        <div className="h-full w-1/2 bg-green-200 animate-[lineMove_2s_ease-in-out_infinite]" />
      </div>

      <p
        className={`mt-3 text-xs sm:text-sm ${
          dark ? 'text-slate-400' : 'text-gray-500'
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* =====================================================
   FORM INPUT
===================================================== */

function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-xs text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}

export default HireFromUsPage;
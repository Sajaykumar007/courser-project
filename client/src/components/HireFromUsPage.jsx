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
    { icon: '🚀', title: 'Industry-Ready Talent', desc: 'Graduates trained on real-world projects and latest technologies' },
    { icon: '⚡', title: 'Quick Hiring Process', desc: 'Access to pre-screened candidates and streamlined recruitment' },
    { icon: '💰', title: 'Cost-Effective', desc: 'Save on recruitment costs with our placement assistance' },
    { icon: '✅', title: 'Verified Skills', desc: 'All candidates undergo rigorous assessments and certifications' },
    { icon: '🌍', title: 'Diverse Talent Pool', desc: 'Access candidates from various technical backgrounds' },
    { icon: '🎓', title: 'Continuous Support', desc: 'Post-hiring support and training assistance available' },
  ];

  const talentPool = [
    { category: 'Full Stack Developers', count: '1,200+', skills: 'MERN, MEAN, Java Spring' },
    { category: 'Data Scientists', count: '800+', skills: 'Python, ML, AI, Analytics' },
    { category: 'Cloud Engineers', count: '650+', skills: 'AWS, Azure, GCP' },
    { category: 'DevOps Engineers', count: '500+', skills: 'Docker, Kubernetes, CI/CD' },
    { category: 'Mobile Developers', count: '450+', skills: 'React Native, Flutter, iOS, Android' },
    { category: 'QA Engineers', count: '600+', skills: 'Automation, Manual Testing' },
  ];

  const hiringProcess = [
    { step: 1, title: 'Share Requirements', desc: 'Tell us about your open positions and skill requirements' },
    { step: 2, title: 'Candidate Matching', desc: 'We match you with pre-screened, qualified candidates' },
    { step: 3, title: 'Interview Process', desc: 'Conduct interviews at your convenience' },
    { step: 4, title: 'Selection & Onboarding', desc: 'Select the best fit and we assist with onboarding' },
  ];

  const industries = ['IT Services', 'Banking & Finance', 'Healthcare', 'E-commerce', 'Telecommunications', 'Manufacturing', 'Consulting', 'Startups'];

  const testimonials = [
    { text: 'Courser helped us find exceptional talent for our development team. The candidates were well-prepared and skilled.', name: 'Rajesh Kumar', role: 'HR Director, Tech Solutions Ltd' },
    { text: "The quality of graduates from Courser is outstanding. We've hired 15+ professionals and all have been excellent.", name: 'Priya Sharma', role: 'Talent Acquisition, Digital Innovations' },
    { text: 'Streamlined hiring process and access to pre-screened candidates saved us months of recruitment time.', name: 'Arun Patel', role: 'CTO, StartupHub Inc' },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const industryFilter = urlParams.get('industry');
    if (industryFilter) {
      setFormData((prev) => ({ ...prev, industry: industryFilter }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  useEffect(() => {
    const handleFilterHire = (e) => {
      setFormData((prev) => ({ ...prev, industry: e.detail }));
      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };
    window.addEventListener('filterHireFromUs', handleFilterHire);
    return () => window.removeEventListener('filterHireFromUs', handleFilterHire);
  }, []);

  const scrollToContact = () => document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTalent = () => document.querySelector('.talent-pool')?.scrollIntoView({ behavior: 'smooth' });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://courser-project.onrender.com/api/placement/hire-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ companyName: '', contactPerson: '', email: '', phone: '', industry: '', positions: '', message: '' });
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

  const handleDownloadBrochure = () => {
    const printWindow = window.open('/brochure.html', '_blank');
    if (printWindow) {
      printWindow.onload = () => setTimeout(() => printWindow.print(), 250);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f7] text-gray-800 font-sans animate-[pageLoad_0.6s_ease-out_forwards]">
      <style>{`
        @keyframes pageLoad { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
        @keyframes successPop { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-glow { animation: glowPulse 4s ease-in-out infinite; }
        .animate-success-pop { animation: successPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; } .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-slate-900 to-green-950 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-green-500/20 blur-3xl animate-glow" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-glow delay-200" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-green-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Partnership Opportunities
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Hire Top Tech Talent
            <br />
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              From Courser
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            Access our pool of 6,200+ industry-ready professionals trained in cutting-edge technologies. Find the perfect fit for your organization.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={scrollToContact} className="group relative overflow-hidden rounded-xl bg-green-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-2xl active:scale-95">
              <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative">Post a Job Opening →</span>
            </button>
            <button onClick={scrollToTalent} className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 active:scale-95">
              View Talent Pool
            </button>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up rounded-xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-xl">{stat.icon}</div>
                <div className="mt-1 text-lg font-black text-white sm:text-xl">{stat.number}</div>
                <div className="mt-0.5 text-[10px] text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER ===== */}
      <section className="bg-[#f0f0f0] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Why Partner With Us?" subtitle="We connect you with pre-vetted, job-ready professionals" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="group rounded-xl border border-gray-200 bg-[#ffffff] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-100">{benefit.icon}</div>
                <h3 className="mt-4 text-sm font-black text-gray-900">{benefit.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TALENT POOL ===== */}
      <section className="talent-pool px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Our Talent Pool" subtitle="Skilled professionals across multiple domains" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talentPool.map((talent, index) => (
              <div key={index} className="group rounded-xl border border-gray-200 bg-[#ffffff] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-black text-gray-900 transition-colors group-hover:text-green-700">{talent.category}</h3>
                  <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">{talent.count}</span>
                </div>
                <div className="mt-3 h-px bg-gray-100 transition-colors group-hover:bg-green-100" />
                <p className="mt-3 text-xs text-gray-500">{talent.skills}</p>
                <div className="mt-4 flex items-center text-[10px] font-black text-green-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Explore Talent <span className="ml-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIRING PROCESS ===== */}
      <section className="bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader dark title="Simple Hiring Process" subtitle="From requirement to onboarding in 4 easy steps" />
          <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-green-100 lg:block" />
            {hiringProcess.map((item, index) => (
              <div key={item.step} className="group relative z-10 rounded-xl border border-gray-200 bg-[#ffffff] p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-xs font-black text-white shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="mt-4 text-sm font-black text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="bg-[#f0f0f0] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">Industries</span>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">Industries We Serve</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, industry }));
                  scrollToContact();
                }}
                className="group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-[#ffffff] px-4 py-2.5 text-xs font-bold text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:text-green-700 hover:shadow-md animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">✓</span>
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="What Our Partners Say" subtitle="Success stories from our hiring partners" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={index} className="group relative rounded-xl border border-gray-200 bg-[#ffffff] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute right-4 top-3 text-3xl font-black text-green-100 transition-colors group-hover:text-green-200">"</div>
                <div className="relative">
                  <div className="mb-3 flex gap-1 text-xs text-amber-400">★ ★ ★ ★ ★</div>
                  <p className="text-xs leading-6 text-gray-600">"{item.text}"</p>
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="text-xs font-black text-gray-900">{item.name}</p>
                    <p className="mt-1 text-[10px] text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="contact-form-section px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-xl text-center animate-fade-in-up">
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">Get Started</span>
            <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">Partner With Us</h2>
            <p className="mt-2 text-sm leading-5 text-gray-500">Fill out the form and our team will get back to you within 24 hours.</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#ffffff] p-5 shadow-xl shadow-gray-900/5 sm:p-8 animate-scale-in">
            {success ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl font-black text-green-600 shadow-lg shadow-green-500/20 animate-success-pop">✓</div>
                <h3 className="mt-4 text-xl font-black text-gray-900">Thank You!</h3>
                <p className="mt-2 max-w-md text-sm leading-5 text-gray-500">Our partnership team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter company name" />
                  <FormInput label="Contact Person *" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="Your full name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput label="Email Address *" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="company@email.com" />
                  <FormInput label="Phone Number *" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-gray-600">Industry *</label>
                    <select name="industry" value={formData.industry} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 bg-[#f7f7f7] px-3.5 py-2.5 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10">
                      <option value="">Select your industry</option>
                      {industries.map((ind, idx) => <option key={idx} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <FormInput label="Number of Positions" type="number" name="positions" value={formData.positions} onChange={handleChange} placeholder="e.g., 5" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Additional Requirements</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about the skills you're looking for..." className="w-full resize-none rounded-lg border border-gray-200 bg-[#f7f7f7] px-3.5 py-2.5 text-sm leading-5 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                </div>
                <button type="submit" disabled={loading} className="group relative w-full overflow-hidden rounded-lg bg-green-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]">
                  {!loading && <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[110%]" />}
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Submitting...</>) : (<>Submit Hiring Request <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>)}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-green-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center animate-fade-in-up">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Ready to Build Your Dream Team?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-green-100">Join 200+ companies that trust Courser for their hiring needs</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={scrollToContact} className="rounded-lg bg-white px-6 py-3 text-sm font-black text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">Start Hiring Now →</button>
            <button onClick={handleDownloadBrochure} className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-95">📄 Download Talent Brochure</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   REUSABLE SECTION HEADER (Compact)
===================================================== */
function SectionHeader({ title, subtitle, dark = false }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center animate-fade-in-up">
      <span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${dark ? 'border border-green-400/20 bg-green-400/10 text-green-300' : 'bg-green-50 text-green-600'}`}>
        {dark ? 'Our Process' : 'Why Partner With Us'}
      </span>
      <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        {subtitle}
      </p>
    </div>
  );
}

/* =====================================================
   FORM INPUT (Compact)
===================================================== */
function FormInput({ label, type = 'text', name, value, onChange, required = false, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-[#f7f7f7] px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10"
      />
    </div>
  );
}

export default HireFromUsPage;
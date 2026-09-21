import React, { useState, useEffect } from 'react';

function CorporateTrainingPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employees: '',
    trainingType: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // =====================================================
  // URL TRAINING FILTER
  // =====================================================
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trainingFilter = urlParams.get('training');

    if (trainingFilter) {
      setFormData((prev) => ({
        ...prev,
        trainingType: trainingFilter,
      }));

      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 500);
    }
  }, []);

  // =====================================================
  // NAVBAR TRAINING FILTER EVENT
  // =====================================================
  useEffect(() => {
    const handleFilterTraining = (e) => {
      setFormData((prev) => ({
        ...prev,
        trainingType: e.detail,
      }));

      setTimeout(() => {
        document.querySelector('.contact-form-section')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 500);
    };

    window.addEventListener('filterCorporateTraining', handleFilterTraining);
    return () => {
      window.removeEventListener('filterCorporateTraining', handleFilterTraining);
    };
  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://courser-project.onrender.com/api/placement/corporate-training-request',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          employees: '',
          trainingType: '',
          message: '',
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

  // =====================================================
  // SCROLL TO FORM
  // =====================================================
  const scrollToForm = () => {
    document.querySelector('.contact-form-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // =====================================================
  // GET QUOTE
  // =====================================================
  const handleGetQuote = (packageType) => {
    scrollToForm();
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'm interested in the ${packageType} corporate training package. Please provide more details about pricing, schedule, and customization options.`,
      }));
    }, 800);
  };

  // =====================================================
  // DATA
  // =====================================================
  const trainingPrograms = [
    {
      icon: '💻',
      title: 'Technical Skills',
      duration: '4-12 Weeks',
      description: 'Full Stack Development, Data Science, Cloud Computing, DevOps, AI/ML',
      features: ['Hands-on Projects', 'Expert Trainers', 'Certification', 'Post-training Support'],
    },
    {
      icon: '📊',
      title: 'Data & Analytics',
      duration: '6-8 Weeks',
      description: 'Data Analysis, Business Intelligence, Machine Learning, Big Data',
      features: ['Real Datasets', 'Industry Tools', 'Case Studies', 'Portfolio Building'],
    },
    {
      icon: '🎯',
      title: 'Digital Marketing',
      duration: '4-6 Weeks',
      description: 'SEO, SEM, Social Media Marketing, Content Strategy, Analytics',
      features: ['Live Campaigns', 'Tools Access', 'Strategy Development', 'ROI Tracking'],
    },
    {
      icon: '👔',
      title: 'Leadership & Management',
      duration: '3-6 Weeks',
      description: 'Team Management, Strategic Thinking, Decision Making, Communication',
      features: ['Executive Coaching', 'Peer Learning', 'Action Plans', '360 Feedback'],
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      duration: '8-12 Weeks',
      description: 'Network Security, Ethical Hacking, Cloud Security, Compliance',
      features: ['Security Labs', 'Certification Prep', 'Threat Simulation', 'Best Practices'],
    },
    {
      icon: '🤖',
      title: 'Emerging Technologies',
      duration: '6-10 Weeks',
      description: 'Blockchain, IoT, AR/VR, Quantum Computing, Edge Computing',
      features: ['Cutting-edge Tech', 'Innovation Projects', 'Expert Mentorship', 'Future Skills'],
    },
  ];

  const benefits = [
    { icon: '📈', title: 'Customized Curriculum', desc: "Training tailored to your company's specific needs and goals" },
    { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Industry veterans with 10+ years of experience' },
    { icon: '📍', title: 'Flexible Delivery', desc: 'On-site, online, or hybrid training options' },
    { icon: '📜', title: 'Certification', desc: 'Industry-recognized certificates upon completion' },
    { icon: '⏰', title: 'Flexible Timing', desc: 'Weekend, weekday, or after-hours sessions' },
    { icon: '💵', title: 'Cost Effective', desc: 'Bulk pricing and corporate discounts available' },
  ];

  const caseStudies = [
    {
      company: 'Tech Solutions Ltd',
      industry: 'IT Services',
      challenge: 'Needed to upskill 200 developers in cloud technologies',
      solution: 'Customized AWS & Azure training program over 8 weeks',
      result: '95% certification rate, 40% productivity improvement',
    },
    {
      company: 'Finance Corp',
      industry: 'Banking',
      challenge: 'Required data analytics skills for 150 analysts',
      solution: 'Data Science bootcamp with real financial datasets',
      result: '50% faster reporting, better decision-making',
    },
    {
      company: 'Retail Giants',
      industry: 'E-commerce',
      challenge: 'Digital transformation for 300 employees',
      solution: 'Digital marketing & e-commerce strategy training',
      result: '35% increase in online sales within 6 months',
    },
  ];

  const industries = [
    'IT & Software', 'Banking & Finance', 'Healthcare', 'Manufacturing',
    'Retail & E-commerce', 'Telecommunications', 'Consulting', 'Startups',
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-800 font-sans">
      {/* =========================================
          CUSTOM ANIMATIONS
      ========================================== */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glowPulse 4s ease-in-out infinite; }
        .animate-success-pop { animation: successPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-slate-900 to-green-950 px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        {/* Animated Glows */}
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-green-500/20 blur-3xl animate-glow" />
        <div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-green-400/10 blur-3xl animate-glow delay-200" />

        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:50px_50px]" />

        {/* Floating Dots */}
        <div className="absolute left-[12%] top-[30%] h-3 w-3 rounded-full bg-green-300/60 animate-float" />
        <div className="absolute right-[15%] top-[25%] h-4 w-4 rounded-full bg-green-300/50 animate-ping" />
        <div className="absolute bottom-[25%] left-[25%] h-2 w-2 rounded-full bg-green-300/60 animate-pulse" />

        <div className="relative z-10 mx-auto max-w-6xl text-center animate-fade-in-up">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-green-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Corporate Training Solutions
          </span>

          {/* Title */}
          <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Empower Your Workforce
            <br />
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              With Industry-Leading Training
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base lg:text-lg">
            Transform your team's skills with customized corporate training programs. 
            From technical skills to leadership development, we've got you covered.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={scrollToForm}
              className="group relative overflow-hidden rounded-xl bg-green-600 px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-2xl active:scale-95"
            >
              <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative">Request Training Proposal →</span>
            </button>

            <button
              onClick={() => document.querySelector('.training-programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 active:scale-95"
            >
              View Programs
            </button>
          </div>

          {/* Hero Stats */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['🏢', '500+', 'Corporate Clients'],
              ['👥', '50,000+', 'Professionals Trained'],
              ['📚', '100+', 'Training Programs'],
              ['⭐', '4.9/5', 'Client Satisfaction'],
            ].map(([icon, number, label], index) => (
              <div
                key={label}
                className="animate-fade-in-up rounded-2xl border border-white/10 bg-white/5 px-3 py-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-xl hover:shadow-green-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl">{icon}</div>
                <div className="mt-2 text-xl font-black text-white sm:text-2xl">{number}</div>
                <div className="mt-1 text-[10px] text-gray-400 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAINING PROGRAMS
      ====================================================== */}
      <section className="training-programs px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600">
              Our Programs
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              Our Corporate Training Programs
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Comprehensive training solutions for modern businesses
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainingPrograms.map((program, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl hover:shadow-green-100/50 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top Glow */}
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-green-100 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-100">
                    {program.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-black text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                    {program.title}
                  </h3>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-bold text-gray-600">
                    ⏱️ {program.duration}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-500">{program.description}</p>

                  <ul className="mt-5 space-y-2.5">
                    {program.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[10px] font-black text-green-600">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToForm}
                    className="mt-6 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-black text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white active:scale-95"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600 shadow-sm">
              Why Courser
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              Why Companies Choose Courser?
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Trusted by Fortune 500 and leading startups
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-100">
                  {benefit.icon}
                </div>
                <h3 className="mt-5 text-base font-black text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAINING METHODOLOGY
      ====================================================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="rounded-full bg-green-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              Our Training Methodology
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Proven approach to maximize learning outcomes
            </p>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-green-100 lg:block" />

            {[
              ['1', 'Needs Assessment', "Understand your team's skill gaps and business objectives"],
              ['2', 'Custom Curriculum', 'Design training program tailored to your requirements'],
              ['3', 'Expert Delivery', 'Industry experts deliver engaging, practical sessions'],
              ['4', 'Hands-on Practice', 'Real-world projects and case studies for practical learning'],
              ['5', 'Assessment & Feedback', 'Regular evaluations and personalized feedback'],
              ['6', 'Certification & Support', 'Industry-recognized certification and post-training support'],
            ].map(([number, title, desc], idx) => (
              <div
                key={number}
                className="group relative z-10 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-110">
                  {number}
                </div>
                <h3 className="mt-5 text-base font-black text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CASE STUDIES
      ====================================================== */}
      <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-300">
              Success Stories
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              Real Results From Real Partnerships
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Discover how organizations transformed their teams
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-400/30 hover:bg-white/10 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="border-b border-white/10 p-6">
                  <h3 className="text-lg font-black text-white">{study.company}</h3>
                  <span className="mt-2 inline-flex rounded-full bg-green-400/10 px-3 py-1 text-[10px] font-bold text-green-300">
                    {study.industry}
                  </span>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-green-400">Challenge</p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-green-400">Solution</p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">{study.solution}</p>
                  </div>
                  <div className="rounded-xl border border-green-400/20 bg-green-400/10 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-green-300">Result</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-green-100">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ====================================================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl text-center animate-fade-in-up">
          <span className="rounded-full bg-green-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600">
            Industries
          </span>
          <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-3 text-sm text-gray-500">Expertise across multiple sectors</p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-4 text-xs font-bold text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:text-green-700 hover:shadow-lg animate-scale-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-green-500 transition-transform duration-300 group-hover:scale-125">✓</span>
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ====================================================== */}
      <section className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600 shadow-sm">
              Flexible Pricing
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              Corporate Training Packages
            </h2>
            <p className="mt-3 text-sm text-gray-500">Flexible pricing to fit your budget</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Starter */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-black text-gray-900">Starter</h3>
              <div className="mt-4 text-3xl font-black text-green-600">
                ₹15,000 <span className="text-xs font-medium text-gray-400">/participant</span>
              </div>
              <ul className="mt-7 space-y-3">
                {['Up to 20 participants', '4-week program', 'Online training', 'Study materials', 'Certificate of completion', 'Email support'].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <span className="font-black text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetQuote('Starter')}
                className="mt-8 w-full rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-black text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white active:scale-95"
              >
                Get Quote
              </button>
            </div>

            {/* Professional */}
            <div className="group relative rounded-2xl border-2 border-green-500 bg-white p-7 shadow-xl shadow-green-500/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute right-5 top-5 rounded-full bg-green-500 px-3 py-1 text-[9px] font-black uppercase tracking-wide text-white animate-pulse">
                Most Popular
              </div>
              <h3 className="text-xl font-black text-gray-900">Professional</h3>
              <div className="mt-4 text-3xl font-black text-green-600">
                ₹12,000 <span className="text-xs font-medium text-gray-400">/participant</span>
              </div>
              <ul className="mt-7 space-y-3">
                {['21-50 participants', '6-8 week program', 'Hybrid (Online + On-site)', 'Premium study materials', 'Industry certification', 'Priority support', 'Post-training assessment'].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <span className="font-black text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetQuote('Professional')}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
              >
                Get Quote →
              </button>
            </div>

            {/* Enterprise */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-xl font-black text-gray-900">Enterprise</h3>
              <div className="mt-4 text-3xl font-black text-green-600">
                Custom <span className="text-xs font-medium text-gray-400">/pricing</span>
              </div>
              <ul className="mt-7 space-y-3">
                {['50+ participants', 'Customized duration', 'On-site training', 'Custom curriculum', 'Dedicated trainer', '24/7 support', 'ROI tracking'].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <span className="font-black text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetQuote('Enterprise')}
                className="mt-8 w-full rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-black text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white active:scale-95"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}
      <section className="contact-form-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="rounded-full bg-green-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-600">
              Get Started
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              Request Training Proposal
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Tell us about your training needs and we'll get back within 24 hours.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-900/5 sm:p-10 animate-scale-in">
            {success ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl font-black text-green-600 shadow-lg shadow-green-500/20 animate-success-pop">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl font-black text-gray-900">Thank You for Your Interest!</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                  Our corporate training team will contact you within 24 hours with a customized proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Company + Contact */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your company name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="company@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                {/* Employees + Training */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Number of Employees</label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
                      <option value="">Select range</option>
                      <option value="1-20">1-20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-100">51-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-600">Training Type</label>
                    <select
                      name="trainingType"
                      value={formData.trainingType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
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

                {/* Message */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">Training Requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about your training needs, preferred dates, and specific requirements..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-green-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                >
                  {!loading && (
                    <span className="absolute inset-y-0 -left-20 w-12 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[110%]" />
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Proposal
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to Upskill Your Team?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-green-100 sm:text-base">
            Join 500+ companies that have transformed their workforce with Courser
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={scrollToForm}
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-black text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => window.open('/brochure.html', '_blank')}
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-95"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CorporateTrainingPage;
import React, { useState, useEffect } from 'react';

function PlacementsPage() {
  const [stats, setStats] = useState({ studentsPlaced: 0, hiringPartners: 0, highestPackage: '0 LPA', averagePackage: '0 LPA' });
  const [hiringPartners, setHiringPartners] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [placementDrives, setPlacementDrives] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '', email: '', phone: '', course: '', location: '', experience: '', message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const [registrationModal, setRegistrationModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '', email: '', phone: '', course: ''
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
      setTimeout(() => {
        const element = document.querySelector(`.${section}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, []);

  useEffect(() => {
    const handleScrollToSection = (e) => {
      setTimeout(() => {
        const element = document.querySelector(`.${e.detail}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    };
    window.addEventListener('scrollToPlacementsSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToPlacementsSection', handleScrollToSection);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, partnersRes, studentsRes, storiesRes, drivesRes] = await Promise.all([
          fetch('http://localhost:5000/api/placement/stats'),
          fetch('http://localhost:5000/api/placement/hiring-partners'),
          fetch('http://localhost:5000/api/placement/placed-students'),
          fetch('http://localhost:5000/api/placement/success-stories'),
          fetch('http://localhost:5000/api/placement/placement-drives')
        ]);

        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.data);
        const partnersData = await partnersRes.json();
        if (partnersData.success) setHiringPartners(partnersData.data);
        const studentsData = await studentsRes.json();
        if (studentsData.success) setPlacedStudents(studentsData.data);
        const storiesData = await storiesRes.json();
        if (storiesData.success) setSuccessStories(storiesData.data);
        const drivesData = await drivesRes.json();
        if (drivesData.success) setPlacementDrives(drivesData.data);

        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching placement data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEnquiryChange = (e) => setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      const response = await fetch('http://localhost:5000/api/placement/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryForm),
      });
      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        setEnquiryForm({ fullName: '', email: '', phone: '', course: '', location: '', experience: '', message: '' });
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormError(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      setFormError('Server error. Please try again later.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDriveRegister = (drive) => {
    setSelectedDrive(drive);
    setRegistrationModal(true);
    setRegSuccess(false);
    setRegError('');
    setRegistrationForm({ fullName: '', email: '', phone: '', course: '' });
  };

  const handleRegistrationChange = (e) => setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError('');
    try {
      const payload = {
        driveId: selectedDrive._id,
        companyName: selectedDrive.company,
        jobRole: selectedDrive.role,
        driveDate: selectedDrive.date,
        fullName: registrationForm.fullName,
        email: registrationForm.email,
        phone: registrationForm.phone,
        course: registrationForm.course,
      };
      const response = await fetch('http://localhost:5000/api/placement/register-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        setRegSuccess(true);
        setTimeout(() => { setRegistrationModal(false); setRegSuccess(false); }, 3000);
      } else {
        setRegError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setRegError('Server error. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  const navigateToCourses = () => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'allCourses' }));
  const scrollToEnquiry = () => document.querySelector('.placement-enquiry-section')?.scrollIntoView({ behavior: 'smooth' });

  const placementProcess = [
    { step: 1, title: 'Choose Your Course', icon: '🎯', desc: 'Pick your career path' },
    { step: 2, title: 'Build Industry Skills', icon: '🛠️', desc: 'Learn in-demand tech' },
    { step: 3, title: 'Work on Real Projects', icon: '💼', desc: 'Build your portfolio' },
    { step: 4, title: 'Build Your Resume', icon: '📄', desc: 'Professional CV' },
    { step: 5, title: 'Mock Interviews', icon: '🗣️', desc: 'Practice with experts' },
    { step: 6, title: 'Interview Preparation', icon: '📝', desc: 'Aptitude & technical' },
    { step: 7, title: 'Attend Hiring Drives', icon: '🏢', desc: 'Meet top companies' },
    { step: 8, title: 'Get Hired', icon: '🎉', desc: 'Start your career' },
  ];

  const placementPrep = [
    { icon: '🧮', title: 'Aptitude Training', desc: 'Quantitative, logical & verbal' },
    { icon: '💻', title: 'Coding Practice', desc: 'DSA & problem-solving sessions' },
    { icon: '👨‍💻', title: 'Technical Interview', desc: 'Core subjects & coding rounds' },
    { icon: '👔', title: 'HR Interview', desc: 'Communication & behavioral prep' },
    { icon: '📄', title: 'Resume Building', desc: 'Professional resume creation' },
    { icon: '💼', title: 'LinkedIn Optimization', desc: 'Professional profile setup' },
    { icon: '🗣️', title: 'Communication Skills', desc: 'Spoken English & soft skills' },
    { icon: '🎤', title: 'Mock Interviews', desc: 'Real interview simulations' },
    { icon: '👥', title: 'Group Discussion', desc: 'GD practice & techniques' },
    { icon: '🤝', title: 'Soft Skills Training', desc: 'Teamwork & leadership skills' },
  ];

  const faqs = [
    { q: 'Does Courser provide placement assistance?', a: 'Yes, we provide comprehensive placement assistance including resume building, mock interviews, and connections with our 200+ hiring partners.' },
    { q: 'Which companies hire Courser students?', a: 'Our students are placed in top companies like TCS, Infosys, Wipro, HCL, Accenture, Cognizant, and 200+ other hiring partners.' },
    { q: 'Is placement assistance available for all courses?', a: 'Yes, all our courses include placement assistance. However, some specialized courses may have dedicated placement drives.' },
    { q: 'How does the placement process work?', a: 'After course completion, you will go through resume building, mock interviews, and then attend placement drives conducted by our hiring partners.' },
    { q: 'Do you provide mock interviews?', a: 'Yes, we conduct regular mock interviews with industry experts to prepare you for real interview scenarios.' },
    { q: 'Do online students receive placement support?', a: 'Yes, both online and offline students receive the same placement support and opportunities.' },
    { q: 'How can I participate in placement drives?', a: 'Once you complete your course and assessments, you will be notified about upcoming placement drives and can register for them.' },
    { q: "What happens if I don't get placed?", a: 'We provide continuous support until you get placed. You can attend multiple drives and get retrained if needed.' },
  ];

  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900 font-sans selection:bg-green-500 selection:text-white animate-[pageLoad_0.6s_ease-out_forwards]">
      <style>{`
        @keyframes pageLoad { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
        .animate-marquee-left { animation: marquee-left 25s linear infinite; }
        .animate-marquee-right { animation: marquee-right 25s linear infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-glow { animation: glowPulse 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-900 via-slate-900 to-green-950 px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-green-500/20 blur-3xl animate-glow" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-glow delay-200" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-green-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> CAREER SUCCESS
          </span>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Build Skills.<br />
            Get Hired.<br />
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Start Your Career.
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            Get industry-ready training, career guidance, interview preparation, and dedicated placement assistance to take the next step in your career.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={navigateToCourses} className="group relative overflow-hidden rounded-xl bg-green-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-2xl active:scale-95">
              <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative">Explore Courses →</span>
            </button>
            <button onClick={scrollToEnquiry} className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 active:scale-95">
              Get Placement Assistance
            </button>
          </div>

          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['🎓', `${stats.studentsPlaced.toLocaleString()}+`, 'Students Placed'],
              ['🏢', `${stats.hiringPartners}+`, 'Hiring Partners'],
              ['✅', '100%', 'Placement Assistance'],
              ['💰', stats.highestPackage, 'Highest Package']
            ].map(([icon, number, label], index) => (
              <div key={index} className="group relative overflow-hidden animate-fade-in-up rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10" style={{ animationDelay: `${index * 100}ms` }}>
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="text-xl">{icon}</div>
                <div className="mt-1 text-lg font-black text-white sm:text-xl">{number}</div>
                <div className="mt-0.5 text-[10px] text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT HIGHLIGHTS ===== */}
      <section className="py-10 px-4 bg-[#ffffff] sm:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: '🎓', label: 'Students Placed', value: `${stats.studentsPlaced.toLocaleString()}+`, color: 'text-green-600' },
            { icon: '🏢', label: 'Hiring Partners', value: `${stats.hiringPartners}+`, color: 'text-green-600' },
            { icon: '✅', label: 'Placement Assistance', value: '100%', color: 'text-green-600' },
            { icon: '💰', label: 'Highest Package', value: stats.highestPackage, color: 'text-green-600' },
            { icon: '📊', label: 'Average Package', value: stats.averagePackage, color: 'text-green-600' },
          ].map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden bg-[#f7f7f7] hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100">
              {/* ✅ UPDATED: Subtle Top Green Line */}
              <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
              
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className={`text-xl md:text-2xl font-bold mb-1 ${item.color}`}>{item.value}</h3>
              <p className="text-gray-500 text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HIRING PARTNERS ===== */}
      <section className="py-10 bg-[#f0f0f0] overflow-hidden sm:py-14">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Our Hiring Partners</h2>
          <p className="text-gray-500 text-sm">Top companies that trust our talent</p>
        </div>
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f0f0f0] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f0f0f0] to-transparent z-10"></div>
          <div className="flex flex-col gap-4">
            <div className="flex overflow-hidden">
              <div className="flex gap-4 animate-marquee-left whitespace-nowrap">
                {[...hiringPartners, ...hiringPartners, ...hiringPartners].map((partner, idx) => (
                  <div key={`row1-${idx}`} className="group relative overflow-hidden flex-shrink-0 bg-[#ffffff] border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3 hover:border-green-300 hover:shadow-md transition-all duration-300">
                    {/* ✅ UPDATED: Subtle Top Green Line */}
                    <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                    
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">
                      {partner.logo || partner.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <h4 className="font-semibold text-gray-700 text-sm">{partner.companyName}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex overflow-hidden">
              <div className="flex gap-4 animate-marquee-right whitespace-nowrap">
                {[...hiringPartners, ...hiringPartners, ...hiringPartners].map((partner, idx) => (
                  <div key={`row2-${idx}`} className="group relative overflow-hidden flex-shrink-0 bg-[#ffffff] border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3 hover:border-green-300 hover:shadow-md transition-all duration-300">
                    {/* ✅ UPDATED: Subtle Top Green Line */}
                    <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                    
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">
                      {partner.logo || partner.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <h4 className="font-semibold text-gray-700 text-sm">{partner.companyName}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT PROCESS ===== */}
      <section className="py-10 px-4 bg-[#ffffff] sm:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Your Journey From Learning to Getting Hired</h2>
            <p className="text-gray-500 text-sm">A step-by-step approach to your dream career</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {placementProcess.map((item) => (
              <div key={item.step} className="group relative overflow-hidden bg-[#f7f7f7] border border-gray-100 rounded-xl p-5 hover:bg-white hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="absolute -top-2.5 -left-2.5 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-green-500/30 z-10">
                  {item.step}
                </div>
                <div className="text-3xl mb-3 mt-1 group-hover:scale-110 transition-transform duration-300 z-10 relative">{item.icon}</div>
                <h4 className="text-base font-bold mb-1.5 text-gray-900 relative z-10">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT PREPARATION ===== */}
      <section className="py-10 px-4 bg-[#f0f0f0] sm:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Everything You Need to Crack Interviews</h2>
            <p className="text-gray-500 text-sm">Comprehensive preparation for your success</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {placementPrep.map((item, index) => (
              <div key={index} className="group relative overflow-hidden bg-[#ffffff] border border-gray-100 rounded-xl p-5 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">{item.icon}</div>
                <h4 className="font-bold text-sm mb-1.5 text-gray-900 relative z-10">{item.title}</h4>
                <p className="text-gray-500 text-xs relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACED STUDENTS ===== */}
      <section className="py-10 px-4 bg-[#ffffff] sm:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Our Students Are Getting Hired</h2>
              <p className="text-gray-500 text-sm">Real placements, real success stories</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {placedStudents.length > 0 ? placedStudents.map((student) => (
              <div key={student._id} className="group relative overflow-hidden bg-[#f7f7f7] border border-gray-100 rounded-xl p-5 hover:bg-white hover:border-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100/50">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-green-500/20">
                    {student.photo || student.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{student.studentName}</h4>
                    <p className="text-xs text-gray-500">{student.course}</p>
                  </div>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-gray-200 relative z-10">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span>🏢</span> <span className="font-medium">{student.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>💼</span> <span>{student.jobRole}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600 font-bold pt-1">
                    <span>💰</span> <span>₹{student.package}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-sm">
                {isDataLoaded ? 'No placements data available yet.' : 'Loading placements...'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="py-10 px-4 bg-[#f0f0f0] sm:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Real Students. Real Careers.</h2>
            <p className="text-gray-500 text-sm">Hear from our placed students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {successStories.length > 0 ? successStories.map((story) => (
              <div key={story._id} className="group relative overflow-hidden bg-[#ffffff] border border-gray-100 rounded-xl p-6 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="absolute -top-3 left-6 text-5xl text-green-100 font-serif z-0">"</div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20 text-xs">
                    {story.photo || story.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{story.studentName}</h4>
                    <p className="text-[10px] text-gray-500">{story.course}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 italic relative z-10">"{story.testimonial}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 relative z-10">
                  <span className="text-xs font-medium text-green-700">{story.company} - {story.jobRole}</span>
                  <span className="text-xs font-bold text-green-600">₹{story.package}</span>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-sm">
                {isDataLoaded ? 'No success stories available yet.' : 'Loading stories...'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING DRIVES ===== */}
      <section className="py-10 px-4 bg-[#ffffff] sm:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Upcoming Placement Drives</h2>
            <p className="text-gray-500 text-sm">Register now for your dream job</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {placementDrives.length > 0 ? placementDrives.map((drive) => (
              <div key={drive._id} className="group relative overflow-hidden bg-[#f7f7f7] border border-gray-100 rounded-xl hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 flex flex-col">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="p-5 border-b border-gray-200 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">🏢</div>
                    <div>
                      <h4 className="font-bold text-base text-gray-900">{drive.company}</h4>
                      <p className="text-green-600 font-medium text-xs">{drive.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-grow relative z-10">
                  <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-gray-400">📍</span><span>{drive.location}</span></div>
                  <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-gray-400">📅</span><span>{new Date(drive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                  <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-gray-400">👥</span><span>{drive.openings} Openings</span></div>
                  <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-gray-400">✓</span><span>{drive.eligibility}</span></div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between relative z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${drive.status.toLowerCase() === 'open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {drive.status}
                  </span>
                  <button onClick={() => handleDriveRegister(drive)} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
                    Register Now
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-sm">
                {isDataLoaded ? 'No upcoming drives scheduled.' : 'Loading drives...'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT ELIGIBILITY ===== */}
      <section className="py-10 px-4 bg-[#f0f0f0] sm:py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Who Can Participate?</h2>
          <p className="text-gray-500 text-sm mb-8">Simple eligibility criteria</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {['Course completion', 'Required attendance', 'Project completion', 'Assessment completion', 'Resume ready', 'Interview preparation completed'].map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden flex items-center gap-3 bg-[#ffffff] border border-gray-100 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all duration-300">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0 font-bold relative z-10">✓</div>
                <span className="text-gray-700 text-sm font-medium relative z-10">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-10 px-4 bg-[#ffffff] sm:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Get answers to common questions</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="group relative overflow-hidden bg-[#f7f7f7] border border-gray-100 rounded-xl transition-all duration-300 hover:border-green-200">
                {/* ✅ UPDATED: Subtle Top Green Line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-in-out group-hover:h-1.5 group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]" />
                
                <button className="w-full flex items-center justify-between p-4 text-left relative z-10" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                  <span className="font-semibold text-gray-900 pr-4 text-sm">{faq.q}</span>
                  <span className={`text-xl text-green-600 transition-transform duration-300 flex-shrink-0 ${faqOpen === index ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${faqOpen === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 pt-0 text-gray-600 leading-relaxed border-t border-gray-200 mt-2 text-sm">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-10 px-4 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden text-white sm:py-14">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-sm md:text-base text-green-100 mb-8 max-w-2xl mx-auto">
            Build the skills employers are looking for and take the next step toward your dream career.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={navigateToCourses} className="px-7 py-3 bg-white text-green-700 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95">
              Explore Courses
            </button>
            <button onClick={scrollToEnquiry} className="px-7 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 active:scale-95">
              Talk to a Career Advisor
            </button>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT ENQUIRY FORM ===== */}
      <section className="placement-enquiry-section py-10 px-4 bg-[#f0f0f0] sm:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Get Placement Assistance</h2>
            <p className="text-gray-500 text-sm">Fill the form and our team will contact you</p>
          </div>
          
          {formSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">✓</div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-gray-600 text-sm">Our placement team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="bg-[#ffffff] border border-gray-200 rounded-2xl p-5 md:p-8 space-y-4 animate-fade-in-up shadow-xl shadow-gray-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Full Name *</label>
                  <input type="text" name="fullName" value={enquiryForm.fullName} onChange={handleEnquiryChange} required placeholder="Enter your full name" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Email *</label>
                  <input type="email" name="email" value={enquiryForm.email} onChange={handleEnquiryChange} required placeholder="Enter your email" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Phone Number *</label>
                  <input type="tel" name="phone" value={enquiryForm.phone} onChange={handleEnquiryChange} required placeholder="Enter your phone number" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Course Interested In</label>
                  <select name="course" value={enquiryForm.course} onChange={handleEnquiryChange} className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10">
                    <option value="">Select a course</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Data Science">Data Science</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Preferred Location</label>
                  <input type="text" name="location" value={enquiryForm.location} onChange={handleEnquiryChange} placeholder="Enter preferred location" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-600">Experience Level</label>
                  <select name="experience" value={enquiryForm.experience} onChange={handleEnquiryChange} className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all duration-300 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10">
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-600">Message</label>
                <textarea name="message" value={enquiryForm.message} onChange={handleEnquiryChange} rows="4" placeholder="Tell us about your career goals..." className="w-full resize-none bg-[#f7f7f7] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm leading-5 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
              </div>
              {formError && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{formError}</div>}
              <button type="submit" disabled={formLoading} className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-green-500/25 active:scale-[0.98]">
                {formLoading ? (<span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Submitting...</span>) : 'Get Placement Assistance'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== REGISTRATION MODAL ===== */}
      {registrationModal && selectedDrive && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]" onClick={() => setRegistrationModal(false)}>
          <div className="bg-[#ffffff] border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl animate-scale-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {regSuccess ? (
              <div className="p-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 text-sm mb-1">You have registered for</p>
                <p className="text-lg font-bold text-green-600 mb-1">{selectedDrive.company}</p>
                <p className="text-gray-500 text-xs mb-3">{selectedDrive.role}</p>
                <p className="text-gray-500 text-xs">We will contact you soon with further details.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Register for Drive</h3>
                  <button onClick={() => setRegistrationModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">✕</button>
                </div>
                <div className="p-5 bg-[#f7f7f7] border-b border-gray-100">
                  <h4 className="font-bold text-green-700 text-sm">{selectedDrive.company}</h4>
                  <p className="text-gray-700 text-xs mb-1.5">{selectedDrive.role}</p>
                  <p className="text-gray-500 text-[10px] flex items-center gap-2">
                    <span>📍 {selectedDrive.location}</span><span>|</span><span>📅 {new Date(selectedDrive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </p>
                </div>
                <form onSubmit={handleRegistrationSubmit} className="p-5 space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Full Name *</label>
                    <input type="text" name="fullName" value={registrationForm.fullName} onChange={handleRegistrationChange} required placeholder="Enter your full name" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Email *</label>
                    <input type="email" name="email" value={registrationForm.email} onChange={handleRegistrationChange} required placeholder="Enter your email" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Phone Number *</label>
                    <input type="tel" name="phone" value={registrationForm.phone} onChange={handleRegistrationChange} required placeholder="Enter your phone number" className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Course</label>
                    <select name="course" value={registrationForm.course} onChange={handleRegistrationChange} className="w-full bg-[#f7f7f7] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-300 focus:border-green-500 focus:bg-[#ffffff] focus:ring-4 focus:ring-green-500/10">
                      <option value="">Select your course</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="Data Science">Data Science</option>
                      <option value="MERN Stack">MERN Stack</option>
                      <option value="Java Full Stack">Java Full Stack</option>
                    </select>
                  </div>
                  {regError && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">{regError}</div>}
                  <button type="submit" disabled={regLoading} className="w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-green-500/20 active:scale-[0.98] mt-2">
                    {regLoading ? (<span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Registering...</span>) : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementsPage;
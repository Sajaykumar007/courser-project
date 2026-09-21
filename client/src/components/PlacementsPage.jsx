import React, { useState, useEffect } from 'react';

function PlacementsPage() {
  // Loading States
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [stats, setStats] = useState({ studentsPlaced: 0, hiringPartners: 0, highestPackage: '0 LPA', averagePackage: '0 LPA' });
  const [hiringPartners, setHiringPartners] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [placementDrives, setPlacementDrives] = useState([]);

  // Enquiry Form States
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '', email: '', phone: '', course: '', location: '', experience: '', message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Registration Modal States
  const [registrationModal, setRegistrationModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '', email: '', phone: '', course: ''
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  // ✅ Check URL for section scroll on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
      setTimeout(() => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // ✅ Listen for scrollToPlacementsSection event from Navbar
  useEffect(() => {
    const handleScrollToSection = (e) => {
      setTimeout(() => {
        const element = document.querySelector(`.${e.detail}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    };
    window.addEventListener('scrollToPlacementsSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToPlacementsSection', handleScrollToSection);
  }, []);

  // Fetch All Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, partnersRes, studentsRes, storiesRes, drivesRes] = await Promise.all([
          fetch('https://courser-project.onrender.com/api/placement/stats'),
          fetch('https://courser-project.onrender.com/api/placement/hiring-partners'),
          fetch('https://courser-project.onrender.com/api/placement/placed-students'),
          fetch('https://courser-project.onrender.com/api/placement/success-stories'),
          fetch('https://courser-project.onrender.com/api/placement/placement-drives')
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

      } catch (error) {
        console.error('Error fetching placement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enquiry Form Handlers
  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('https://courser-project.onrender.com/api/placement/enquiry', {
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

  // Registration Handlers
  const handleDriveRegister = (drive) => {
    setSelectedDrive(drive);
    setRegistrationModal(true);
    setRegSuccess(false);
    setRegError('');
    setRegistrationForm({ fullName: '', email: '', phone: '', course: '' });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
  };

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

      const response = await fetch('https://courser-project.onrender.com/api/placement/register-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setRegSuccess(true);
        setTimeout(() => {
          setRegistrationModal(false);
          setRegSuccess(false);
        }, 3000);
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

  // Navigation & Scroll Helpers
  const navigateToCourses = () => {
    window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'allCourses' }));
  };

  const scrollToEnquiry = () => {
    document.querySelector('.placement-enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Static Data
  const placementProcess = [
    { step: 1, title: 'Choose Your Course', icon: '📚', desc: 'Pick your career path' },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-gray-700 animate-pulse">Loading Placement Data... ⏳</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-500 selection:text-white">
      {/* Custom Animations Styles */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-marquee-left { animation: marquee-left 25s linear infinite; }
        .animate-marquee-right { animation: marquee-right 25s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 2s infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>

      {/* ===== HERO SECTION (Logo Green Background) ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden px-4 py-20 text-white">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 border border-white/30 backdrop-blur-sm">
              🎯 CAREER SUCCESS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Build Skills.<br />
              Get Hired.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200">Start Your Career.</span>
            </h1>
            <p className="text-lg text-green-50 mb-8 max-w-lg leading-relaxed">
              Get industry-ready training, career guidance, interview preparation, and dedicated placement assistance to take the next step in your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={navigateToCourses}
                className="px-8 py-3.5 bg-white text-green-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-95"
              >
                Explore Courses
              </button>
              <button 
                onClick={scrollToEnquiry}
                className="px-8 py-3.5 bg-transparent border-2 border-white/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                Get Placement Assistance
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full h-[400px]">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 flex flex-col items-center justify-center text-center shadow-2xl animate-float z-20">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-white">Career Ready</h3>
                <p className="text-green-100 text-sm mt-2">Industry-trained professionals</p>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md rounded-xl border border-green-200 p-4 shadow-xl animate-float-delayed z-30">
                <span className="block text-2xl font-bold text-green-600">{stats.studentsPlaced.toLocaleString()}+</span>
                <span className="text-xs text-gray-600">Students Placed</span>
              </div>
              
              <div className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-md rounded-xl border border-green-200 p-4 shadow-xl animate-float z-30">
                <span className="block text-2xl font-bold text-green-600">{stats.hiringPartners}+</span>
                <span className="text-xs text-gray-600">Hiring Partners</span>
              </div>
              
              <div className="absolute top-1/2 -right-4 bg-white/90 backdrop-blur-md rounded-xl border border-green-200 p-4 shadow-xl animate-float-delayed z-30">
                <span className="block text-xl font-bold text-green-600">{stats.highestPackage}</span>
                <span className="text-xs text-gray-600">Highest Package</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT HIGHLIGHTS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: '🎓', label: 'Students Placed', value: `${stats.studentsPlaced.toLocaleString()}+`, color: 'text-green-600' },
            { icon: '🏢', label: 'Hiring Partners', value: `${stats.hiringPartners}+`, color: 'text-green-600' },
            { icon: '✅', label: 'Placement Assistance', value: '100%', color: 'text-green-600' },
            { icon: '💰', label: 'Highest Package', value: stats.highestPackage, color: 'text-green-600' },
            { icon: '📊', label: 'Average Package', value: stats.averagePackage, color: 'text-green-600' },
          ].map((item, idx) => (
            <div key={idx} className="group bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-100">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${item.color}`}>{item.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HIRING PARTNERS ===== */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Our Hiring Partners</h2>
          <p className="text-gray-500">Top companies that trust our talent</p>
        </div>
        
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          <div className="flex flex-col gap-6">
            <div className="flex overflow-hidden">
              <div className="flex gap-6 animate-marquee-left whitespace-nowrap">
                {[...hiringPartners, ...hiringPartners, ...hiringPartners].map((partner, idx) => (
                  <div key={`row1-${idx}`} className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-3 hover:border-green-300 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                      {partner.logo || partner.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <h4 className="font-semibold text-gray-700">{partner.companyName}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex overflow-hidden">
              <div className="flex gap-6 animate-marquee-right whitespace-nowrap">
                {[...hiringPartners, ...hiringPartners, ...hiringPartners].map((partner, idx) => (
                  <div key={`row2-${idx}`} className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-3 hover:border-green-300 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                      {partner.logo || partner.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <h4 className="font-semibold text-gray-700">{partner.companyName}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT PROCESS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Your Journey From Learning to Getting Hired</h2>
            <p className="text-gray-500">A step-by-step approach to your dream career</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementProcess.map((item) => (
              <div key={item.step} className="relative group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:bg-white hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-green-500/30">
                  {item.step}
                </div>
                <div className="text-4xl mb-4 mt-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT PREPARATION ===== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Everything You Need to Crack Interviews</h2>
            <p className="text-gray-500">Comprehensive preparation for your success</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placementPrep.map((item, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACED STUDENTS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Our Students Are Getting Hired</h2>
              <p className="text-gray-500">Real placements, real success stories</p>
            </div>
            <button className="px-6 py-2.5 bg-gray-100 hover:bg-green-50 text-green-700 font-semibold rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-300 w-fit">
              View All Placements →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placedStudents.map((student) => (
              <div key={student._id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:bg-white hover:border-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-100/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-green-500/20">
                    {student.photo || student.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{student.studentName}</h4>
                    <p className="text-sm text-gray-500">{student.course}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>🏢</span>
                    <span className="font-medium">{student.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>💼</span>
                    <span>{student.jobRole}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-bold pt-2">
                    <span>💰</span>
                    <span>₹{student.package}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Real Students. Real Careers.</h2>
            <p className="text-gray-500">Hear from our placed students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story._id} className="bg-white border border-gray-100 rounded-2xl p-8 relative hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300">
                <div className="absolute -top-4 left-8 text-6xl text-green-200 font-serif">"</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
                    {story.photo || story.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{story.studentName}</h4>
                    <p className="text-xs text-gray-500">{story.course}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{story.testimonial}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-green-700">{story.company} - {story.jobRole}</span>
                  <span className="text-sm font-bold text-green-600">₹{story.package}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING DRIVES ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Upcoming Placement Drives</h2>
            <p className="text-gray-500">Register now for your dream job</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementDrives.map((drive) => (
              <div key={drive._id} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🏢
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{drive.company}</h4>
                      <p className="text-green-600 font-medium text-sm">{drive.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-3 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-gray-400">📍</span>
                    <span>{drive.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-gray-400">📅</span>
                    <span>{new Date(drive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-gray-400">👥</span>
                    <span>{drive.openings} Openings</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-gray-400">✓</span>
                    <span>{drive.eligibility}</span>
                  </div>
                </div>
                
                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    drive.status.toLowerCase() === 'open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {drive.status}
                  </span>
                  <button 
                    onClick={() => handleDriveRegister(drive)}
                    className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT ELIGIBILITY ===== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Who Can Participate?</h2>
          <p className="text-gray-500 mb-12">Simple eligibility criteria</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Course completion', 'Required attendance', 'Project completion', 'Assessment completion', 'Resume ready', 'Interview preparation completed'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all duration-300">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm flex-shrink-0 font-bold">✓</div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500">Get answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-200">
                <button 
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <span className={`text-2xl text-green-600 transition-transform duration-300 flex-shrink-0 ${faqOpen === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    faqOpen === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-200 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Career?</h2>
          <p className="text-lg text-green-100 mb-10 max-w-2xl mx-auto">
            Build the skills employers are looking for and take the next step toward your dream career.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={navigateToCourses}
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Explore Courses
            </button>
            <button 
              onClick={scrollToEnquiry}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Talk to a Career Advisor
            </button>
          </div>
        </div>
      </section>

      {/* ===== PLACEMENT ENQUIRY FORM ===== */}
      <section className="placement-enquiry-section py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Get Placement Assistance</h2>
            <p className="text-gray-500">Fill the form and our team will contact you</p>
          </div>
          
          {formSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-gray-600">Our placement team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 animate-fade-in-up shadow-xl shadow-gray-100">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={enquiryForm.fullName} 
                    onChange={handleEnquiryChange} 
                    required 
                    placeholder="Enter your full name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={enquiryForm.email} 
                    onChange={handleEnquiryChange} 
                    required 
                    placeholder="Enter your email" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={enquiryForm.phone} 
                    onChange={handleEnquiryChange} 
                    required 
                    placeholder="Enter your phone number" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Course Interested In</label>
                  <select 
                    name="course" 
                    value={enquiryForm.course} 
                    onChange={handleEnquiryChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  >
                    <option value="">Select a course</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Data Science">Data Science</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={enquiryForm.location} 
                    onChange={handleEnquiryChange} 
                    placeholder="Enter preferred location" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Experience Level</label>
                  <select 
                    name="experience" 
                    value={enquiryForm.experience} 
                    onChange={handleEnquiryChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  name="message" 
                  value={enquiryForm.message} 
                  onChange={handleEnquiryChange} 
                  rows="4" 
                  placeholder="Tell us about your career goals..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none"
                />
              </div>
              
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {formError}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full md:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25"
              >
                {formLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </span>
                ) : 'Get Placement Assistance'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== REGISTRATION MODAL ===== */}
      {registrationModal && selectedDrive && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setRegistrationModal(false)}
        >
          <div 
            className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {regSuccess ? (
              <div className="p-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-1">You have registered for</p>
                <p className="text-xl font-bold text-green-600 mb-1">{selectedDrive.company}</p>
                <p className="text-gray-500 text-sm mb-4">{selectedDrive.role}</p>
                <p className="text-gray-500 text-sm">We will contact you soon with further details.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">Register for Drive</h3>
                  <button 
                    onClick={() => setRegistrationModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <h4 className="font-bold text-green-700">{selectedDrive.company}</h4>
                  <p className="text-gray-700 text-sm mb-2">{selectedDrive.role}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-2">
                    <span>📍 {selectedDrive.location}</span>
                    <span>|</span>
                    <span>📅 {new Date(selectedDrive.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </p>
                </div>
                
                <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={registrationForm.fullName} 
                      onChange={handleRegistrationChange} 
                      required 
                      placeholder="Enter your full name" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={registrationForm.email} 
                      onChange={handleRegistrationChange} 
                      required 
                      placeholder="Enter your email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={registrationForm.phone} 
                      onChange={handleRegistrationChange} 
                      required 
                      placeholder="Enter your phone number" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Course</label>
                    <select 
                      name="course" 
                      value={registrationForm.course} 
                      onChange={handleRegistrationChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    >
                      <option value="">Select your course</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="Data Science">Data Science</option>
                      <option value="MERN Stack">MERN Stack</option>
                      <option value="Java Full Stack">Java Full Stack</option>
                    </select>
                  </div>
                  
                  {regError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
                      {regError}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={regLoading}
                    className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-lg shadow-green-500/20"
                  >
                    {regLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Registering...
                      </span>
                    ) : 'Confirm Registration'}
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
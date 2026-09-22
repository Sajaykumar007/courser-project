import React from "react";

function HeroSection() {
  const handleExploreCourses = () => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: "allCourses",
      })
    );
  };

  const handleBookDemo = () => {
    window.dispatchEvent(
      new CustomEvent("navigateToJoinNow")
    );
  };

  const features = [
    { icon: "👨‍🏫", label: "Expert Trainers" },
    { icon: "💼", label: "Placement Support" },
    { icon: "💻", label: "Online & Offline" },
    { icon: "", label: "Certification" },
  ];

  return (
    // ✅ UPDATED: Further reduced top padding (pt-6, sm:pt-10, lg:pt-12) to bring content even more UP
    <section className="relative overflow-hidden bg-[#022d23] bg-gradient-to-br from-[#022d23] via-[#07533b] to-[#087a4d] px-4 pt-6 pb-12 sm:px-6 sm:pt-10 sm:pb-14 md:px-10 md:pt-12 md:pb-16 lg:px-16 lg:pt-12 lg:pb-20 xl:px-24">
      
      {/* =========================================
          SUBTLE DOT BACKGROUND PATTERN
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(167,243,208,0.4)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Animated Glow 1 (Top Left) */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-pulse rounded-full bg-emerald-400/10 blur-3xl" />

      {/* Animated Glow 2 (Bottom Right) */}
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-cyan-400/10 blur-3xl [animation-delay:1.5s]" />

      {/* =========================================
          MAIN CONTAINER
      ========================================== */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        
        {/* =======================================
            LEFT CONTENT
        ======================================== */}
        <div className="text-center lg:text-left">
          
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-semibold text-emerald-100 shadow-lg backdrop-blur-md opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] hover:scale-105 hover:border-emerald-400/50 transition-transform duration-300">
            <span>🎓</span>
            <span>#1 Learning Platform in Courser</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px] opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            Upgrade Your Skills
            <br />
            <span className="inline-block bg-gradient-to-r from-emerald-200 to-green-100 bg-clip-text text-transparent">
              For a Brighter Tomorrow
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-emerald-100/80 sm:text-lg lg:mx-0 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            Industry-focused courses, expert mentors, hands-on projects, and 100% placement support to kickstart your career.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
            <button
              type="button"
              onClick={handleExploreCourses}
              className="group w-full rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-emerald-500/30 sm:w-auto"
            >
              Explore Courses
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={handleBookDemo}
              className="w-full rounded-xl border border-emerald-400/40 bg-emerald-950/30 px-8 py-3.5 text-sm font-bold text-white shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400/10 hover:border-emerald-400/60 sm:w-auto"
            >
              📅 Book a Free Demo
            </button>
          </div>

          {/* Feature Cards (2x2 on mobile, 4x1 on desktop) */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-400/10 bg-emerald-900/20 px-3 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-900/40 hover:shadow-lg"
              >
                <span className="text-xl transition-transform duration-300 hover:scale-110">{feature.icon}</span>
                <span className="text-[11px] font-semibold text-emerald-100 sm:text-xs text-center leading-tight">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================
            RIGHT SIDE PREMIUM VISUAL
        ======================================== */}
        <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[520px] opacity-0 animate-[fadeInRight_0.8s_ease-out_0.4s_forwards]">
          
          {/* Main Image Container with Glassmorphism Border */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-950/30 p-2 shadow-2xl backdrop-blur-md">
            
            {/* Premium Student Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students learning" 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Top Right */}
            <div className="absolute right-4 top-4 z-20 flex animate-[float_4s_ease-in-out_infinite] items-center gap-3 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#10b981" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-extrabold text-gray-900">10K+</div>
                <div className="text-[10px] font-medium text-gray-500">Students Enrolled</div>
              </div>
            </div>

            {/* Floating Card 2: Bottom Left */}
            <div className="absolute bottom-6 left-4 z-20 flex animate-[float_4.5s_ease-in-out_infinite] items-center gap-3 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md [animation-delay:0.5s]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 20V4" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 20v-6" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-extrabold text-gray-900">95%</div>
                <div className="text-[10px] font-medium text-gray-500">Placement Rate</div>
              </div>
            </div>

            {/* Floating Card 3: Bottom Right */}
            <div className="absolute bottom-6 right-4 z-20 flex animate-[float_5s_ease-in-out_infinite] items-center gap-3 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md [animation-delay:1s]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-extrabold text-gray-900">Industry</div>
                <div className="text-[10px] font-medium text-gray-500">Recognized</div>
              </div>
            </div>

            {/* Decorative Floating Dots */}
            <div className="absolute left-8 top-1/2 h-3 w-3 animate-ping rounded-full bg-emerald-300/60" />
            <div className="absolute right-12 top-1/4 h-2 w-2 animate-ping rounded-full bg-white/60 [animation-delay:1s]" />
            <div className="absolute bottom-16 right-1/3 h-2 w-2 animate-ping rounded-full bg-emerald-200/60 [animation-delay:2s]" />
          </div>
          
          {/* Subtle glow behind the entire visual block */}
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-emerald-500/20 blur-2xl" />
        </div>
      </div>

      {/* =========================================
          TAILWIND CUSTOM ANIMATIONS
      ========================================== */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
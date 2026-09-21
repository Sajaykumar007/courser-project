import React from 'react';

function LearningPathsPage() {
  const paths = [
    {
      title: 'Full Stack Developer',
      duration: '6 Months',
      courses: 5,
      icon: '💻',
      desc: 'Master MERN stack, databases, and deployment to build complete web applications.',
    },
    {
      title: 'Data Scientist',
      duration: '8 Months',
      courses: 6,
      icon: '📊',
      desc: 'Learn Python, Machine Learning, Deep Learning, and Data Visualization.',
    },
    {
      title: 'Cloud Architect',
      duration: '5 Months',
      courses: 4,
      icon: '☁️',
      desc: 'Become proficient in AWS, Azure, Docker, and Cloud Security.',
    },
    {
      title: 'UI/UX Designer',
      duration: '4 Months',
      courses: 4,
      icon: '🎨',
      desc: 'Master Figma, user research, wireframing, and interactive prototyping.',
    },
  ];

  const navigateToCourses = () => {
    window.dispatchEvent(
      new CustomEvent('navigateToPage', {
        detail: 'onlineCourses',
      })
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-12 text-center text-white sm:py-14">
        {/* Background Glow */}
        <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />

        <div
          className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-green-500/15 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:42px_42px]" />

        {/* Floating Circles */}
        <div className="absolute left-[15%] top-[30%] h-2 w-2 rounded-full bg-emerald-400 animate-ping" />

        <div
          className="absolute right-[18%] top-[25%] h-1.5 w-1.5 rounded-full bg-green-300 animate-ping"
          style={{ animationDelay: '1s' }}
        />

        <div className="relative mx-auto max-w-3xl animate-[heroIn_.7s_ease-out]">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            🚀 CAREER ROADMAPS
          </span>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Structured{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300 bg-clip-text text-transparent">
              Learning Paths
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
            Achieve your career goals with our expert-curated course bundles
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={navigateToCourses}
            className="group relative mt-6 overflow-hidden rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative">
              Browse All Courses
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          PATHS SECTION
      ===================================================== */}
      <section className="relative px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-green-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-8 max-w-2xl text-center animate-[fadeUp_.6s_ease-out]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Choose Your Direction
            </span>

            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Choose Your Career Path
            </h2>

            <div className="mx-auto mt-3 h-1 w-12 overflow-hidden rounded-full bg-emerald-500">
              <div className="h-full w-1/2 bg-emerald-200 animate-[lineMove_2s_ease-in-out_infinite]" />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-sm">
              Step-by-step guidance from beginner to job-ready professional
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path, index) => (
              <div
                key={index}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/60"
                style={{
                  animation: `cardIn .55s ease-out ${
                    index * 100
                  }ms both`,
                }}
              >
                {/* Hover Glow */}
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-100/40 blur-2xl transition-all duration-500 group-hover:scale-150" />

                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-50/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Number */}
                <span className="absolute right-3 top-2 text-4xl font-black text-slate-50 transition-colors duration-300 group-hover:text-emerald-50">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 text-2xl shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:from-emerald-500 group-hover:to-green-500">
                  <span className="transition-transform duration-500 group-hover:scale-110">
                    {path.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative mt-4 text-base font-extrabold text-slate-800 transition-colors duration-300 group-hover:text-emerald-600">
                  {path.title}
                </h3>

                {/* Description */}
                <p className="relative mt-2 min-h-[60px] text-[11px] leading-5 text-slate-500">
                  {path.desc}
                </p>

                {/* Meta */}
                <div className="relative mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-50 px-2 py-2 text-center transition-colors duration-300 group-hover:bg-emerald-50">
                    <span className="block text-[9px] text-slate-400">
                      Duration
                    </span>

                    <span className="mt-0.5 block text-[10px] font-bold text-slate-700">
                      ⏱️ {path.duration}
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-2 py-2 text-center transition-colors duration-300 group-hover:bg-emerald-50">
                    <span className="block text-[9px] text-slate-400">
                      Courses
                    </span>

                    <span className="mt-0.5 block text-[10px] font-bold text-slate-700">
                      📚 {path.courses}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={navigateToCourses}
                  className="relative mt-4 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[10px] font-bold text-emerald-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200/50"
                >
                  Start Learning Path
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-emerald-500 transition-all duration-500 group-hover:w-2/3" />
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-500 shadow-sm">
              <span className="text-emerald-500">✓</span>
              Beginner Friendly
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-500 shadow-sm">
              <span className="text-emerald-500">✓</span>
              Industry Skills
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-500 shadow-sm">
              <span className="text-emerald-500">✓</span>
              Career Focused
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-9 text-center text-white">
        <div className="absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-xl animate-[fadeUp_.7s_ease-out]">
          <div className="text-2xl">🎯</div>

          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
            Ready to Start Your Journey?
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Choose a learning path and start building your career today.
          </p>

          <button
            type="button"
            onClick={navigateToCourses}
            className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-xl"
          >
            Explore Courses →
          </button>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

export default LearningPathsPage;
import React from 'react';

function GovtJobSection() {
  const categories = [
    'BANKING',
    'TNPSC',
    'INSURANCE',
    'RAILWAYS',
    'CAT',
    'GATE',
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f7f7] py-10 sm:py-12">
      {/* Background Effects - Logo Green Match */}
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-green-200/30 blur-3xl animate-pulse" />

      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-green-100/30 blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Grid Pattern - Exact Logo Green (#22c55e) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(34,197,94,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,.8)_1px,transparent_1px)] [background-size:45px_45px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center animate-[fadeUp_.6s_ease-out]">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-bold tracking-wider text-green-600 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            GOVERNMENT EXAM PREPARATION
          </span>

          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Get Your{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Permanent Government Job
            </span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-14 overflow-hidden rounded-full bg-green-500">
            <div className="h-full w-1/2 rounded-full bg-green-300 animate-[lineMove_2s_ease-in-out_infinite]" />
          </div>

          <p className="mt-4 text-xs leading-6 text-gray-500 sm:text-sm">
            Courser provides Offline Classes for Competitive Examinations
            <br className="hidden sm:block" />
            in Bangalore and Coimbatore.
          </p>
        </div>

        {/* Content */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_.95fr]">
          {/* Image */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#ffffff] p-2 shadow-lg shadow-gray-200/60 animate-[slideLeft_.7s_ease-out]">
            {/* Glow - Logo Green Match */}
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-300/20 blur-xl" />

            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                alt="Student with laptop"
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-60 lg:h-64"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-[#ffffff]/90 px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-green-600">
                  Career Preparation
                </p>

                <p className="mt-0.5 text-xs font-bold text-gray-800">
                  Learn • Practice • Succeed
                </p>
              </div>

              {/* Floating Dot - Logo Green Match */}
              <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-ping" />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4 animate-[slideRight_.7s_ease-out]">
            {categories.map((cat, index) => (
              <div
                key={cat}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-[#ffffff] px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/70"
                style={{
                  animation: `categoryIn .5s ease-out ${index * 80}ms both`,
                }}
              >
                {/* ✅ UPDATED: Very thin initially (h-0.5), grows BIG (h-3) on hover with smooth animation */}
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-0.5
                    rounded-tl-xl
                    rounded-tr-xl
                    bg-gradient-to-r
                    from-green-400
                    via-green-500
                    to-green-600
                    transition-all
                    duration-500
                    ease-in-out
                    group-hover:h-1.5
                    group-hover:shadow-[0_8px_25px_rgba(34,197,94,0.8)]
                  "
                />

                {/* Hover Shine - Logo Green Match */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-50/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Number */}
                <span className="absolute right-2 top-1 text-3xl font-black text-gray-100 transition-colors duration-300 group-hover:text-green-50">
                  0{index + 1}
                </span>

                {/* Icon - Logo Green Match */}
                <div className="relative mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                  {index === 0 && '🏦'}
                  {index === 1 && '📚'}
                  {index === 2 && '🛡️'}
                  {index === 3 && '🚆'}
                  {index === 4 && '🎓'}
                  {index === 5 && '💻'}
                </div>

                <span className="relative text-[11px] font-extrabold tracking-wide text-gray-700 transition-colors duration-300 group-hover:text-green-600 sm:text-xs">
                  {cat}
                </span>

                {/* Bottom Line - Logo Green Match */}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-300 group-hover:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info - Logo Green Match */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[10px] text-gray-500 sm:text-xs">
          <div className="flex items-center gap-1.5 rounded-full bg-[#ffffff] px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Expert Faculty
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[#ffffff] px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Offline Classes
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[#ffffff] px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-green-500 font-bold">✓</span>
            Exam-Focused Training
          </div>
        </div>
      </div>

      <style>{`
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

        @keyframes categoryIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(.96);
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
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

export default GovtJobSection;
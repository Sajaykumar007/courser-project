import React from "react";

function ScrollingBanner() {
  const items = [
    "📄 Resume Building Support",
    "🌐 100% Online Live Classes",
    "🎯 100% Placement Assistance",
    "💰 12 Months No Cost EMI",
    "👨‍🏫 Industry Expert Trainers",
    "🚀 Live Real-time Projects",
    "🏆 Internationally Recognized Certification",
    "🎤 Interview Preparation",
    "⏰ Flexible Class Timings",
    "♾️ Lifetime Access to Course Material",
  ];

  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        border-y
        border-emerald-100
        bg-white
        py-3
        shadow-sm
      "
    >
      {/* Left fade */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-10
          h-full
          w-16
          bg-gradient-to-r
          from-white
          to-transparent
        "
      />

      {/* Right fade */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-10
          h-full
          w-16
          bg-gradient-to-l
          from-white
          to-transparent
        "
      />

      {/* Scrolling Content */}
      <div
        className="
          flex
          w-max
          items-center
          animate-[bannerScroll_35s_linear_infinite]
          hover:[animation-play-state:paused]
        "
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="
              flex
              shrink-0
              items-center
              whitespace-nowrap
              px-5
              text-sm
              font-semibold
              text-slate-700
              sm:px-7
              sm:text-[15px]
            "
          >
            <span
              className="
                transition-colors
                duration-200
                hover:text-emerald-600
              "
            >
              {item}
            </span>

            {/* Separator */}
            <span
              className="
                ml-5
                text-emerald-500
                sm:ml-7
              "
            >
              •
            </span>
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes bannerScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </div>
  );
}

export default ScrollingBanner;
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
    {
      icon: "‍🏫",
      label: "Expert Trainers",
      bg: "#ffffff",
    },
    {
      icon: "💼",
      label: "Placement Support",
      bg: "#ffffff",
    },
    {
      icon: "💻",
      label: "Online & Offline",
      bg: "#ffffff",
    },
    {
      icon: "🏆",
      label: "Certification",
      bg: "#ffffff",
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-green-500
        via-green-600
        to-green-700
        px-4
        py-12
        sm:px-6
        sm:py-14
        md:px-10
        lg:px-14
        lg:py-16
        xl:px-20
      "
    >
      {/* =========================================
          ANIMATED DOT BACKGROUND
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-20
          animate-pulse
          [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)]
          [background-size:22px_22px]
        "
      />

      {/* Animated Glow 1 */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-64
          w-64
          animate-pulse
          rounded-full
          bg-white/20
          blur-3xl
        "
      />

      {/* Animated Glow 2 */}
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-72
          w-72
          animate-pulse
          rounded-full
          bg-green-300/20
          blur-3xl
        "
      />

      {/* =========================================
          MAIN CONTAINER
      ========================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-6xl
          items-center
          gap-10
          lg:grid-cols-[1.1fr_0.9fr]
          lg:gap-8
        "
      >
        {/* =======================================
            LEFT CONTENT
        ======================================== */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/30
              bg-white/20
              px-3.5
              py-1.5
              text-xs
              font-medium
              text-white
              shadow-lg
              backdrop-blur-md
              transition
              duration-300
              hover:scale-105
            "
          >
            <span>🎓</span>

            <span>
              #1 Learning Platform in Courser
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl
              lg:text-[48px]
              xl:text-[54px]
            "
          >
            Upgrade Your Skills
            <br />

            <span
              className="
                inline-block
                bg-gradient-to-r
                from-white
                to-green-100
                bg-clip-text
                text-transparent
              "
            >
              For a Brighter Tomorrow
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-6
              text-green-50
              sm:text-base
              lg:mx-0
            "
          >
            Industry-focused courses, expert mentors,
            hands-on projects and 100% placement support
            to kickstart your career.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-7
              flex
              flex-col
              items-center
              gap-3
              sm:flex-row
              sm:justify-center
              lg:justify-start
            "
          >
            <button
              type="button"
              onClick={handleExploreCourses}
              className="
                group
                w-full
                rounded-lg
                bg-white
                px-6
                py-3
                text-sm
                font-bold
                text-green-600
                shadow-lg
                shadow-black/10
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-green-900/20
                sm:w-auto
              "
            >
              Explore Courses

              <span
                className="
                  ml-2
                  inline-block
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>

            <button
              type="button"
              onClick={handleBookDemo}
              className="
                w-full
                rounded-lg
                border
                border-white/40
                bg-white/10
                px-6
                py-3
                text-sm
                font-bold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/20
                sm:w-auto
              "
            >
              📅 Book a Free Demo
            </button>
          </div>

          {/* =====================================
              FEATURES
          ====================================== */}
          <div
            className="
              mt-8
              grid
              grid-cols-2
              gap-2.5
              sm:grid-cols-4
            "
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: feature.bg,
                }}
                className="
                  flex
                  min-h-[66px]
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-lg
                  px-2
                  py-2
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-105
                  hover:shadow-xl
                "
              >
                <span className="text-lg">
                  {feature.icon}
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-green-700
                    sm:text-[11px]
                  "
                >
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================
            RIGHT SIDE VISUAL
        ======================================== */}
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[430px]
            lg:max-w-[400px]
            xl:max-w-[420px]
          "
        >
          {/* Main Box */}
          <div
            className="
              relative
              min-h-[390px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/20
              bg-white/10
              p-5
              shadow-2xl
              backdrop-blur-md
              sm:min-h-[420px]
            "
          >
            {/* Inner glow */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-48
                w-48
                -translate-x-1/2
                -translate-y-1/2
                animate-pulse
                rounded-full
                bg-white/20
                blur-3xl
              "
            />

            {/* =================================
                TOP LEFT TEXT
            ================================== */}
            <div
              className="
                absolute
                left-4
                top-5
                z-20
                hidden
                animate-bounce
                flex-col
                text-xs
                font-semibold
                italic
                text-white/90
                [animation-duration:3s]
                sm:flex
              "
            >
              <span>Learn</span>
              <span>Grow</span>
              <span>Get Placed</span>
            </div>

            {/* =================================
                STUDENT CIRCLE
            ================================== */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                flex
                h-52
                w-52
                -translate-x-1/2
                -translate-y-1/2
                animate-[float_4s_ease-in-out_infinite]
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-gradient-to-br
                from-white/30
                to-green-100/20
                shadow-2xl
                shadow-black/10
                sm:h-56
                sm:w-56
              "
            >
              <div
                className="
                  absolute
                  inset-3
                  rounded-full
                  border
                  border-dashed
                  border-white/40
                  animate-spin
                  [animation-duration:12s]
                "
              />

              <span
                className="
                  relative
                  z-10
                  text-[78px]
                  drop-shadow-2xl
                  transition-transform
                  duration-500
                  hover:scale-110
                "
              >
                👨‍💻
              </span>
            </div>

            {/* =================================
                TOP RIGHT CARD
            ================================== */}
            <div
              className="
                absolute
                right-2
                top-5
                z-30
                flex
                animate-[float_3s_ease-in-out_infinite]
                items-center
                gap-2
                rounded-xl
                border
                border-white/30
                bg-white/95
                px-2.5
                py-2
                shadow-xl
                sm:right-3
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-green-100
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {/* Exact Logo Green Hex Code: #22c55e */}
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  10K+
                </div>

                <div className="text-[9px] font-medium text-gray-500">
                  Students
                </div>
              </div>
            </div>

            {/* =================================
                BOTTOM LEFT CARD
            ================================== */}
            <div
              className="
                absolute
                bottom-5
                left-2
                z-30
                flex
                animate-[float_3.5s_ease-in-out_infinite]
                items-center
                gap-2
                rounded-xl
                border
                border-white/30
                bg-white/95
                px-2.5
                py-2
                shadow-xl
                sm:left-3
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-green-100
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 20V10"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 20V4"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 20v-6"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  95%
                </div>

                <div className="text-[9px] font-medium text-gray-500">
                  Placement
                </div>
              </div>
            </div>

            {/* =================================
                BOTTOM RIGHT CARD
            ================================== */}
            <div
              className="
                absolute
                bottom-3
                right-2
                z-30
                flex
                animate-[float_4s_ease-in-out_infinite]
                items-center
                gap-2
                rounded-xl
                border
                border-white/30
                bg-white/95
                px-2.5
                py-2
                shadow-xl
                sm:bottom-5
                sm:right-3
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-amber-100
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 10v6M2 10l10-5 10 5-10 5z"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 12v5c3 3 9 3 12 0v-5"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <div className="text-xs font-extrabold text-gray-900">
                  Industry
                </div>

                <div className="text-[9px] font-medium text-gray-500">
                  Recognized
                </div>
              </div>
            </div>

            {/* =================================
                RIGHT TEXT
            ================================== */}
            <div
              className="
                absolute
                bottom-24
                right-3
                z-20
                hidden
                animate-pulse
                flex-col
                text-xs
                font-semibold
                italic
                text-white/90
                sm:flex
              "
            >
              <span>Your</span>
              <span>Future</span>
              <span>Starts Here</span>
            </div>

            {/* Decorative circles */}
            <div
              className="
                absolute
                left-6
                top-1/2
                h-3
                w-3
                animate-ping
                rounded-full
                bg-white
              "
            />

            <div
              className="
                absolute
                right-10
                top-1/3
                h-2
                w-2
                animate-ping
                rounded-full
                bg-green-200
                [animation-delay:1s]
              "
            />

            <div
              className="
                absolute
                bottom-20
                right-1/3
                h-2
                w-2
                animate-ping
                rounded-full
                bg-white
                [animation-delay:2s]
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================
          TAILWIND CUSTOM ANIMATION
      ========================================== */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
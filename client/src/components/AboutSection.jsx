import React from 'react';

function AboutSection() {
  const handleEnquiry = () => {
    window.dispatchEvent(new CustomEvent('navigateToJoinNow'));
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-10">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-pulse rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-pulse rounded-full bg-blue-100/30 blur-3xl [animation-delay:1.5s]" />

      {/* Small Floating Circles */}
      <div className="absolute right-[12%] top-16 h-4 w-4 animate-bounce rounded-full bg-emerald-300/60 [animation-duration:3s]" />

      <div className="absolute bottom-20 left-[10%] h-3 w-3 animate-ping rounded-full bg-emerald-400/40 [animation-duration:3s]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ================= LEFT CONTENT ================= */}
          <div className="animate-[aboutFadeLeft_0.9s_ease-out]">

            {/* Badge */}
            <span
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-5
                py-2
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-emerald-600
              "
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              About Courser
            </span>

            {/* Heading */}
            <h2
              className="
                text-3xl
                font-bold
                leading-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Creating{' '}
              <span className="text-emerald-600">
                Technical Leaders
              </span>{' '}
              and offering students a{' '}
              <span className="relative inline-block">
                Holistic Learning Experience.
                
                {/* Animated Underline */}
                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-1
                    w-full
                    origin-left
                    animate-[aboutLine_1s_ease-out]
                    rounded-full
                    bg-emerald-400
                  "
                />
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-7
                max-w-2xl
                text-sm
                leading-7
                text-gray-500
                sm:text-base
              "
            >
              Settling as the No.1 IT Training Institute is not a pride for us.
              Sowing thorough and deep IT learning to our Aspirants and cherish
              ourselves by their Master Growth.
            </p>

            {/* CTA */}
            <button
              onClick={handleEnquiry}
              className="
                group
                relative
                mt-8
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-xl
                bg-emerald-500
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-emerald-500/25
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-emerald-600
                hover:shadow-xl
                hover:shadow-emerald-500/30
              "
            >
              {/* Button Shine */}
              <span
                className="
                  absolute
                  -left-10
                  top-0
                  h-full
                  w-8
                  rotate-12
                  bg-white/30
                  transition-all
                  duration-700
                  group-hover:left-[110%]
                "
              />

              <span className="relative z-10">
                Enquiry Now
              </span>

              <span
                className="
                  relative
                  z-10
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>

          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[450px]">

            {/* Main Glow */}
            <div
              className="
                absolute
                h-72
                w-72
                animate-pulse
                rounded-full
                bg-emerald-300/20
                blur-3xl
              "
            />

            {/* Rotating Outer Ring */}
            <div
              className="
                absolute
                h-72
                w-72
                animate-[aboutSpin_18s_linear_infinite]
                rounded-full
                border
                border-dashed
                border-emerald-200
                sm:h-80
                sm:w-80
              "
            />

            {/* Main Circle */}
            <div
              className="
                relative
                flex
                h-60
                w-60
                animate-[aboutFloat_4s_ease-in-out_infinite]
                items-center
                justify-center
                rounded-full
                border-8
                border-white
                bg-gradient-to-br
                from-emerald-400
                to-emerald-600
                shadow-2xl
                shadow-emerald-500/25
                sm:h-72
                sm:w-72
              "
            >

              {/* Inner Circle */}
              <div
                className="
                  flex
                  h-44
                  w-44
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-inner
                  sm:h-52
                  sm:w-52
                "
              >
                <span className="text-5xl">🎓</span>

                <span className="mt-3 text-sm font-bold text-gray-800">
                  Learn
                </span>

                <span className="text-xs text-emerald-600">
                  Grow • Build • Lead
                </span>
              </div>

              {/* Orbit Dot */}
              <span
                className="
                  absolute
                  -right-2
                  top-12
                  h-5
                  w-5
                  animate-ping
                  rounded-full
                  bg-emerald-300
                "
              />

            </div>

            {/* Floating Card 1 */}
            <div
              className="
                absolute
                left-0
                top-12
                flex
                animate-[aboutCardFloat_4s_ease-in-out_infinite]
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-100
                bg-white
                px-4
                py-3
                shadow-xl
                sm:left-4
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                💻
              </div>

              <div>
                <p className="text-xs font-bold text-gray-800">
                  Practical Learning
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Real-world skills
                </p>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div
              className="
                absolute
                bottom-10
                right-0
                flex
                animate-[aboutCardFloat_5s_ease-in-out_infinite_reverse]
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-100
                bg-white
                px-4
                py-3
                shadow-xl
                sm:right-2
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                🚀
              </div>

              <div>
                <p className="text-xs font-bold text-gray-800">
                  Career Growth
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Industry ready
                </p>
              </div>
            </div>

            {/* Small Floating Badge */}
            <div
              className="
                absolute
                right-5
                top-2
                flex
                h-14
                w-14
                animate-bounce
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-2xl
                shadow-xl
                [animation-duration:4s]
              "
            >
              🏆
            </div>

          </div>

        </div>

      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes aboutFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes aboutLine {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }

        @keyframes aboutFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes aboutCardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes aboutSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
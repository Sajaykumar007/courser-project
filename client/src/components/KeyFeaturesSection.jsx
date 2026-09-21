import React from 'react';

function KeyFeaturesSection() {
  const features = [
    'Choose ur favourite course either Online or Offline',
    'Land a job within 6 months of graduation',
    'Assured Job placements from top Tech and internet companies',
    'Get Interactive classes from the industry experts',
    'Get 100% hands-on training on all Live Tools',
    '24/7 Mentor Support from Industry Experts',
    'Access to cloud labs for real-time projects',
    'Industry recognized certification',
    'Access to Cutting Edge Tools Real Time Applications',
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 lg:px-10">

      {/* Background Decoration - Logo Green Match */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-green-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-green-50/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">

          <span className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-green-600">
            Why Choose Us
          </span>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Key Features
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Everything you need to learn, practice and build your career
            with industry-ready skills.
          </p>

          {/* Underline - Logo Green Match */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-1.5 w-14 rounded-full bg-green-500" />
            <div className="h-1.5 w-4 rounded-full bg-green-300" />
          </div>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, idx) => (
            <div
              key={idx}
              className="
                group
                relative
                flex
                min-h-[125px]
                items-center
                gap-5
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                px-6
                py-6
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-green-200
                hover:shadow-xl
              "
            >

              {/* Top Animation Line - Logo Green Match */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-1
                  w-0
                  bg-green-500
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

              {/* Number */}
              <div
                className="
                  absolute
                  right-4
                  top-3
                  text-4xl
                  font-black
                  text-gray-100
                  transition-all
                  duration-300
                  group-hover:text-green-50
                "
              >
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Icon Box - Logo Green Match */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-50
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                  group-hover:bg-green-100
                "
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Exact Logo Green Hex Code: #22c55e */}
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <p
                className="
                  relative
                  z-10
                  flex-1
                  text-sm
                  font-semibold
                  leading-6
                  text-gray-700
                  transition-colors
                  duration-300
                  group-hover:text-gray-900
                  sm:text-base
                "
              >
                {feature}
              </p>

              {/* Arrow - Logo Green Match */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-50
                  text-sm
                  text-gray-400
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:bg-green-500
                  group-hover:text-white
                "
              >
                →
              </div>

              {/* Glow Effect - Logo Green Match */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-12
                  -right-12
                  h-28
                  w-28
                  rounded-full
                  bg-green-200/40
                  blur-2xl
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default KeyFeaturesSection;
import React from 'react';

function PlacementSection() {
  const companiesRow1 = [
    'TATA',
    'Microsoft',
    'Flipkart',
    'Standard Chartered',
    'Amazon',
    'Mahindra',
    'Airtel',
    'Paytm',
  ];

  const companiesRow2 = [
    'Google',
    'MasterCard',
    'Myntra',
    'PayPal',
    'Toshiba',
    'BOSCH',
    'SONY',
    'Intel',
  ];

  // Duplicate for seamless infinite animation
  const row1 = [...companiesRow1, ...companiesRow1];
  const row2 = [...companiesRow2, ...companiesRow2];

  return (
    <>
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-10">

        {/* Background Animation - Logo Green Match */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 animate-pulse rounded-full bg-green-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 animate-pulse rounded-full bg-green-50/30 blur-3xl [animation-delay:1.5s]" />

        <div className="relative mx-auto max-w-7xl">

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">

            <span className="mb-4 inline-flex animate-[fadeDown_0.8s_ease-out] rounded-full border border-green-200 bg-green-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-green-600">
              Placement Support
            </span>

            <h2 className="animate-[fadeUp_0.8s_ease-out] text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Get your{' '}
              <span className="text-green-600">
                Dream Job
              </span>
            </h2>

            {/* Animated Underline - Logo Green Match */}
            <div className="mx-auto mt-5 flex items-center justify-center gap-2">
              <div className="h-1.5 w-14 animate-[lineExpand_1s_ease-out] rounded-full bg-green-500" />
              <div className="h-1.5 w-4 animate-pulse rounded-full bg-green-300" />
            </div>

            <p className="mx-auto mt-6 max-w-3xl animate-[fadeUp_1s_ease-out] text-sm leading-7 text-gray-500 sm:text-base">
              Courser program guarantees successful placement performance
              based on the average salary packages offered, the hiring
              companies participating, and speed of offer roll-out. If you
              couldn't get the placement within 180 days of graduation,
              50% of your course fees will be Refunded back to you,
              No Questions Asked.
            </p>

          </div>

          {/* Companies */}
          <div className="mt-16">

            <h3 className="mb-10 text-center text-xl font-bold text-gray-800 sm:text-2xl">
              Our Alumni work in{' '}
              <span className="text-green-600">
                Top Companies
              </span>
            </h3>

            {/* ================= ROW 1 ================= */}
            <div className="relative mb-7 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/80 py-6 shadow-sm">

              {/* Left Gradient */}
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent" />

              {/* Right Gradient */}
              <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent" />

              <div className="marquee-track flex w-max gap-6">

                {row1.map((company, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="
                      company-card
                      group
                      relative
                      flex
                      h-24
                      w-48
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:scale-105
                      hover:border-green-300
                      hover:shadow-xl
                    "
                  >

                    {/* Moving Shine */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -left-20
                        top-0
                        h-full
                        w-16
                        rotate-12
                        bg-gradient-to-r
                        from-transparent
                        via-white/70
                        to-transparent
                        opacity-0
                        transition-all
                        duration-700
                        group-hover:left-[120%]
                        group-hover:opacity-100
                      "
                    />

                    {/* Green Glow - Logo Green Match */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-2xl
                        bg-green-400/10
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <span
                      className="
                        relative
                        z-10
                        text-lg
                        font-extrabold
                        tracking-wide
                        text-gray-600
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:text-green-600
                      "
                    >
                      {company}
                    </span>

                  </div>
                ))}

              </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/80 py-6 shadow-sm">

              {/* Left Gradient */}
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent" />

              {/* Right Gradient */}
              <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent" />

              <div className="marquee-track-reverse flex w-max gap-6">

                {row2.map((company, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="
                      company-card
                      group
                      relative
                      flex
                      h-24
                      w-48
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:scale-105
                      hover:border-green-300
                      hover:shadow-xl
                    "
                  >

                    {/* Moving Shine */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -left-20
                        top-0
                        h-full
                        w-16
                        rotate-12
                        bg-gradient-to-r
                        from-transparent
                        via-white/70
                        to-transparent
                        opacity-0
                        transition-all
                        duration-700
                        group-hover:left-[120%]
                        group-hover:opacity-100
                      "
                    />

                    {/* Glow - Logo Green Match */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-2xl
                        bg-green-400/10
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <span
                      className="
                        relative
                        z-10
                        text-lg
                        font-extrabold
                        tracking-wide
                        text-gray-600
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:text-green-600
                      "
                    >
                      {company}
                    </span>

                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Custom Animations */}
      <style>{`

        /* Row 1 - Left */
        @keyframes marqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        /* Row 2 - Right */
        @keyframes marqueeRight {
          from {
            transform: translateX(calc(-50% - 12px));
          }

          to {
            transform: translateX(0);
          }
        }

        /* Header */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineExpand {
          from {
            width: 0;
          }

          to {
            width: 56px;
          }
        }

        .marquee-track {
          animation: marqueeLeft 25s linear infinite;
        }

        .marquee-track-reverse {
          animation: marqueeRight 28s linear infinite;
        }

        /* Pause when mouse enters */
        .marquee-track:hover,
        .marquee-track-reverse:hover {
          animation-play-state: paused;
        }

        /* Slight floating effect */
        .company-card:nth-child(3n) {
          animation: floatingCard 4s ease-in-out infinite;
        }

        .company-card:nth-child(4n) {
          animation: floatingCard 5s ease-in-out infinite reverse;
        }

        @keyframes floatingCard {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        /* Disable animation for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track,
          .marquee-track-reverse,
          .company-card {
            animation: none !important;
          }
        }

      `}</style>
    </>
  );
}

export default PlacementSection;
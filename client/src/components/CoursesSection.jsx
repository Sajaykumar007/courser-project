import React from "react";

function CoursesSection() {
  const courses = [
    {
      name: "Web Developer",
      learners: "18,456",
      icon: "💻",
      route: "allCourses",
    },
    {
      name: "Cloud Architect",
      learners: "33,442",
      icon: "☁️",
      route: "onlineCourses",
    },
    {
      name: "Business Analyst",
      learners: "14,668",
      icon: "📊",
      route: "allCourses",
    },
    {
      name: "Java Developer",
      learners: "14,111",
      icon: "☕",
      route: "allCourses",
    },
    {
      name: "Digital Marketing",
      learners: "17,557",
      icon: "📱",
      route: "onlineCourses",
    },
    {
      name: "Cyber Security",
      learners: "11,432",
      icon: "🔒",
      route: "allCourses",
    },
    {
      name: "Data Analyst",
      learners: "12,456",
      icon: "📈",
      route: "onlineCourses",
    },
    {
      name: "DevOps Engineer",
      learners: "24,487",
      icon: "⚙️",
      route: "allCourses",
    },
    {
      name: "Big Data",
      learners: "14,889",
      icon: "💾",
      route: "onlineCourses",
    },
  ];

  const handleCourseClick = (route) => {
    window.dispatchEvent(
      new CustomEvent("navigateToPage", {
        detail: route || "allCourses",
      })
    );
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f7f7]
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-10
        lg:px-14
        lg:py-20
        xl:px-20
      "
    >
      {/* =========================================
          BACKGROUND DECORATION
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-64
          w-64
          animate-pulse
          rounded-full
          bg-green-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-72
          w-72
          animate-pulse
          rounded-full
          bg-green-50/50
          blur-3xl
        "
      />

      {/* =========================================
          CONTAINER
      ========================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* =======================================
            SECTION HEADER
        ======================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-200
              bg-green-50
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-green-700
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <span className="animate-pulse">✨</span>
            Explore Our Courses
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-gray-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Choose from{" "}
            <span
              className="
                bg-gradient-to-r
                from-green-600
                to-green-500
                bg-clip-text
                text-transparent
              "
            >
              Offline & Online
            </span>{" "}
            Courses
          </h2>

          <p
            className="
              mt-5
              text-sm
              leading-7
              text-gray-600
              sm:text-base
            "
          >
            Courser provides a Range of Courses Masters
            Program, Post Graduate Program. You can choose
            both Offline and Online classes at your preferred
            location at your desired pricing. Contact us for
            course details, location and pricing.
          </p>
        </div>

        {/* =======================================
            SUB SECTION TITLE
        ======================================== */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-200" />
          <h3
            className="
              rounded-full
              bg-[#ffffff]
              px-5
              py-2
              text-lg
              font-bold
              text-gray-800
              shadow-sm
              ring-1
              ring-gray-100
              sm:text-xl
            "
          >
            Master's Program
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-200" />
        </div>

        {/* =======================================
            COURSES GRID
        ======================================== */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => handleCourseClick(course.route)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-[#ffffff]
                p-5
                shadow-sm
                transition-all
                duration-500
                cursor-pointer
                hover:-translate-y-2
                hover:border-green-300
                hover:shadow-xl
                hover:shadow-green-100/70
                active:scale-[0.98]
              "
              style={{
                animation: "courseCardFloat 4s ease-in-out infinite",
                animationDelay: `${idx * 0.15}s`,
              }}
            >
              {/* Top animated line */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-1
                  w-0
                  bg-gradient-to-r
                  from-green-500
                  to-green-400
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

              {/* Background glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-green-50
                  opacity-0
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              {/* Icon & Number */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-50
                    to-green-50
                    text-3xl
                    shadow-sm
                    transition-all
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                    group-hover:shadow-md
                  "
                >
                  {course.icon}
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    text-gray-300
                    transition-colors
                    duration-300
                    group-hover:text-green-500
                  "
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title & Description */}
              <h4
                className="
                  relative
                  z-10
                  mt-5
                  text-lg
                  font-bold
                  text-gray-800
                  transition-colors
                  duration-300
                  group-hover:text-green-700
                "
              >
                {course.name}
              </h4>

              <p className="relative z-10 mt-2 text-xs leading-5 text-gray-500">
                {course.route === "onlineCourses"
                  ? "100% Online Class"
                  : "Offline & Online Class"}
              </p>

              {/* Learners & Action */}
              <div className="relative z-10 mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      text-green-600
                    "
                  >
                    👥
                  </span>
                  {course.learners} Learners
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-50
                    text-gray-400
                    transition-all
                    duration-300
                    group-hover:bg-green-500
                    group-hover:text-white
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </div>

              {/* Bottom shine */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-10
                  left-1/2
                  h-20
                  w-20
                  -translate-x-1/2
                  rounded-full
                  bg-green-400/10
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>

        {/* =======================================
            BOTTOM INFO
        ======================================== */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <p className="text-sm font-medium text-gray-500">
            Learn from industry experts and build job-ready skills.
          </p>
        </div>
      </div>

      {/* =========================================
          CARD FLOAT ANIMATION
      ========================================== */}
      <style>{`
        @keyframes courseCardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}

export default CoursesSection;
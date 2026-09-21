import React, { useState, useEffect } from 'react';

function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [enquiredCourses, setEnquiredCourses] = useState([]);

  // =====================================================
  // URL COURSE FILTER
  // =====================================================
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');

    if (courseFilter) {
      setSearchTerm(courseFilter);
    }
  }, []);

  // =====================================================
  // NAVBAR FILTER EVENT
  // =====================================================
  useEffect(() => {
    const handleFilterCourse = (e) => {
      setSearchTerm(e.detail);
    };

    window.addEventListener('filterCourse', handleFilterCourse);

    return () => {
      window.removeEventListener(
        'filterCourse',
        handleFilterCourse
      );
    };
  }, []);

  // =====================================================
  // FETCH COURSES
  // =====================================================
  useEffect(() => {
    fetchData();
  }, []);

  // =====================================================
  // APPLY FILTERS
  // =====================================================
  useEffect(() => {
    applyFilters();
  }, [
    courses,
    selectedCategory,
    selectedLevel,
    searchTerm,
    sortBy,
  ]);

  // =====================================================
  // FETCH DATA
  // =====================================================
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        'https://courser-project.onrender.com/api/courses'
      );

      const data = await res.json();

      if (data.success) {
        setCourses(data.data);
        setFilteredCourses(data.data);

        const uniqueCats = [
          ...new Set(data.data.map((c) => c.category)),
        ];

        setCategories(['All', ...uniqueCats]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FILTER + SORT
  // =====================================================
  const applyFilters = () => {
    let filtered = [...courses];

    // Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Level
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(
        (course) => course.level === selectedLevel
      );
    }

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(term) ||
          course.instructor?.toLowerCase().includes(term) ||
          course.category?.toLowerCase().includes(term)
      );
    }

    // Sorting
    if (sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCourses(filtered);
  };

  // =====================================================
  // COURSE ENQUIRY
  // =====================================================
  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert(
        '✅ You have already submitted an enquiry for this course!'
      );
      return;
    }

    const studentName = prompt(
      `📚 Course Enquiry: ${course.title}\n\nEnter your full name:`
    );

    if (!studentName) return;

    const phone = prompt('Enter your phone number:');

    if (!phone) return;

    if (phone.length < 10) {
      alert(
        '❌ Please enter a valid phone number (minimum 10 digits)!'
      );
      return;
    }

    try {
      const res = await fetch(
        'https://courser-project.onrender.com/api/courses/enquiry',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseTitle: course.title,
            courseId: course._id,
            studentName,
            phone,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setEnquiredCourses([
          ...enquiredCourses,
          course._id,
        ]);

        alert(
          '✅ Thank you! Your enquiry has been submitted.\n\nOur team will contact you within 24 hours.'
        );
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      alert('❌ Server error. Please try again.');
    }
  };

  // =====================================================
  // LEVEL BADGE
  // =====================================================
  const getLevelClasses = (level) => {
    if (level === 'Beginner') {
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }

    if (level === 'Intermediate') {
      return 'bg-amber-100 text-amber-700 border-amber-200';
    }

    if (level === 'Advanced') {
      return 'bg-red-100 text-red-700 border-red-200';
    }

    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  // =====================================================
  // DISCOUNT
  // =====================================================
  const getDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) {
      return 0;
    }

    return Math.round(
      (1 - price / originalPrice) * 100
    );
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('newest');
    setSearchTerm('');
  };

  // =====================================================
  // CTA EVENTS
  // =====================================================
  const handleContactUs = () => {
    window.dispatchEvent(
      new CustomEvent('navigateToPage', {
        detail: 'contactUs',
      })
    );
  };

  const handleOnlineCourses = () => {
    window.dispatchEvent(
      new CustomEvent('navigateToPage', {
        detail: 'onlineCourses',
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ===================================================
          HERO SECTION
      ==================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-slate-950
          via-emerald-950
          to-green-900
          px-4
          py-20
          sm:px-6
          lg:px-8
        "
      >

        {/* Background Glow */}
        <div
          className="
            absolute
            -left-32
            -top-32
            h-80
            w-80
            animate-pulse
            rounded-full
            bg-emerald-500/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-20
            h-96
            w-96
            rounded-full
            bg-green-400/10
            blur-3xl
          "
        />

        {/* Grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.06]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            text-center
          "
        >

          {/* Badge */}
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              rounded-full
              border
              border-emerald-400/30
              bg-emerald-400/10
              px-4
              py-2
              text-xs
              font-bold
              tracking-widest
              text-emerald-300
              backdrop-blur-sm
              animate-[fadeDown_0.7s_ease-out]
            "
          >
            📚 COMPLETE CATALOG
          </div>

          {/* Heading */}
          <h1
            className="
              animate-[fadeUp_0.8s_ease-out]
              text-4xl
              font-black
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Explore Our{' '}
            <span
              className="
                bg-gradient-to-r
                from-emerald-300
                via-green-300
                to-lime-300
                bg-clip-text
                text-transparent
              "
            >
              All Courses
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              animate-[fadeUp_1s_ease-out]
              text-sm
              leading-7
              text-slate-300
              sm:text-base
              lg:text-lg
            "
          >
            Choose from {courses.length}+ industry-leading
            courses across multiple domains. Start your
            learning journey today!
          </p>

          {/* Hero Stats */}
          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-4xl
              grid-cols-2
              gap-3
              sm:grid-cols-4
              sm:gap-5
            "
          >

            {[
              [courses.length + '+', 'Courses'],
              [categories.length - 1 + '+', 'Categories'],
              ['50+', 'Expert Instructors'],
              ['50k+', 'Students'],
            ].map(([value, label], index) => (
              <div
                key={label}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className="
                  animate-[fadeUp_0.8s_ease-out_both]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-5
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >
                <div className="text-2xl font-black text-white sm:text-3xl">
                  {value}
                </div>

                <div className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {label}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===================================================
          FILTER SECTION
      ==================================================== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8">

        <div
          className="
            mx-auto
            -mt-8
            max-w-7xl
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-xl
            transition-all
            duration-500
            hover:shadow-2xl
            sm:p-5
          "
        >

          {/* ================= SEARCH ================= */}
          <div className="flex justify-center">

            <div
              className="
                group
                relative
                w-full
                max-w-3xl
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
            >

              {/* Animated Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-0.5
                  rounded-[12px]
                  bg-gradient-to-r
                  from-emerald-400
                  via-green-400
                  to-emerald-500
                  opacity-0
                  blur
                  transition
                  duration-500
                  group-focus-within:opacity-30
                "
              />

              {/* Search Container */}
              <div
                className="
                  relative
                  flex
                  h-[46px]
                  items-center
                  overflow-hidden
                  rounded-[10px]
                  border
                  border-slate-200
                  bg-slate-50
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:border-emerald-200
                  group-hover:bg-white
                  group-focus-within:border-emerald-400
                  group-focus-within:bg-white
                  group-focus-within:shadow-lg
                  group-focus-within:shadow-emerald-500/10
                "
              >

                {/* Search Icon */}
                <div
                  className="
                    ml-3
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-50
                    text-sm
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-focus-within:rotate-6
                    group-focus-within:bg-emerald-100
                  "
                >
                  <span
                    className="
                      inline-block
                      transition-transform
                      duration-500
                      group-focus-within:scale-110
                    "
                  >
                    🔍
                  </span>
                </div>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                    sm:text-sm
                  "
                />

                {/* Search Result Count */}
                {searchTerm && (
                  <span
                    className="
                      hidden
                      whitespace-nowrap
                      rounded-md
                      bg-emerald-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-emerald-600
                      sm:block
                      animate-[fadeIn_0.3s_ease-out]
                    "
                  >
                    {filteredCourses.length} found
                  </span>
                )}

                {/* Clear */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                    className="
                      mr-2
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-100
                      text-[11px]
                      font-bold
                      text-slate-500
                      transition-all
                      duration-300
                      hover:rotate-90
                      hover:scale-110
                      hover:bg-red-50
                      hover:text-red-500
                      active:scale-90
                      animate-[scaleIn_0.2s_ease-out]
                    "
                  >
                    ✕
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* ================= CONTROLS ================= */}
          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                📂 Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="
                  w-full
                  rounded-[10px]
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-2.5
                  text-xs
                  font-medium
                  text-slate-700
                  outline-none
                  transition-all
                  duration-200
                  hover:border-emerald-200
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-emerald-100
                "
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                📊 Level
              </label>

              <select
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(e.target.value)
                }
                className="
                  w-full
                  rounded-[10px]
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-2.5
                  text-xs
                  font-medium
                  text-slate-700
                  outline-none
                  transition-all
                  duration-200
                  hover:border-emerald-200
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-emerald-100
                "
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">
                  Intermediate
                </option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                🔃 Sort By
              </label>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  w-full
                  rounded-[10px]
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-2.5
                  text-xs
                  font-medium
                  text-slate-700
                  outline-none
                  transition-all
                  duration-200
                  hover:border-emerald-200
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-emerald-100
                "
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="rating">
                  Highest Rated
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="
                  w-full
                  rounded-[10px]
                  border
                  border-slate-200
                  bg-slate-100
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-slate-600
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:bg-slate-200
                  hover:shadow-md
                  active:scale-95
                "
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">

            <span className="font-medium text-slate-500">
              Showing{' '}
              <strong className="text-emerald-600">
                {filteredCourses.length}
              </strong>{' '}
              {filteredCourses.length === 1
                ? 'course'
                : 'courses'}
            </span>

            {searchTerm && (
              <span
                className="
                  rounded-full
                  bg-emerald-50
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-emerald-700
                  animate-[scaleIn_0.3s_ease-out]
                "
              >
                Search: "{searchTerm}"
              </span>
            )}

          </div>
        </div>
      </section>

      {/* ===================================================
          COURSES GRID
      ==================================================== */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Loading */}
          {loading ? (
            <div
              className="
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
              "
            >
              <div
                className="
                  h-14
                  w-14
                  animate-spin
                  rounded-full
                  border-4
                  border-emerald-100
                  border-t-emerald-600
                "
              />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading courses...
              </p>
            </div>
          ) : filteredCourses.length === 0 ? (

            /* No Courses */
            <div
              className="
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                text-center
                animate-[fadeUp_0.5s_ease-out]
              "
            >
              <div className="text-6xl">📭</div>

              <h3 className="mt-5 text-2xl font-black text-slate-800">
                No courses found
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Try adjusting your filters or search criteria
              </p>

              <button
                onClick={resetFilters}
                className="
                  mt-6
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-600
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-emerald-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  active:scale-95
                "
              >
                Clear All Filters
              </button>
            </div>

          ) : (

            /* Courses */
            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {filteredCourses.map((course, idx) => {

                const discount = getDiscount(
                  course.price,
                  course.originalPrice
                );

                const alreadyEnquired =
                  enquiredCourses.includes(course._id);

                return (
                  <div
                    key={course._id}
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                    }}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-emerald-200
                      hover:shadow-2xl
                      hover:shadow-emerald-900/10
                      animate-[cardAppear_0.5s_ease-out_both]
                    "
                  >

                    {/* Course Image */}
                    <div
                      className="
                        relative
                        flex
                        h-48
                        items-center
                        justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        from-emerald-600
                        via-green-600
                        to-emerald-800
                      "
                    >

                      {/* Glow */}
                      <div
                        className="
                          absolute
                          -right-10
                          -top-10
                          h-32
                          w-32
                          rounded-full
                          bg-white/10
                          blur-2xl
                          transition-transform
                          duration-700
                          group-hover:scale-150
                        "
                      />

                      <div
                        className="
                          absolute
                          -bottom-16
                          -left-10
                          h-40
                          w-40
                          rounded-full
                          bg-lime-300/10
                          blur-3xl
                        "
                      />

                      {/* Icon */}
                      <div
                        className="
                          relative
                          z-10
                          text-7xl
                          drop-shadow-2xl
                          transition-all
                          duration-500
                          group-hover:scale-110
                          group-hover:-rotate-3
                        "
                      >
                        {course.image || '💻'}
                      </div>

                      {/* Level */}
                      <span
                        className={`
                          absolute
                          left-4
                          top-4
                          rounded-full
                          border
                          px-3
                          py-1
                          text-[10px]
                          font-bold
                          shadow-sm
                          ${getLevelClasses(course.level)}
                        `}
                      >
                        {course.level}
                      </span>

                      {/* Discount */}
                      {discount > 0 && (
                        <span
                          className="
                            absolute
                            right-4
                            top-4
                            rounded-full
                            bg-red-500
                            px-3
                            py-1
                            text-[10px]
                            font-black
                            text-white
                            shadow-lg
                          "
                        >
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">

                      {/* Category */}
                      <div
                        className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-emerald-600
                        "
                      >
                        {course.category}
                      </div>

                      {/* Title */}
                      <h3
                        className="
                          mt-2
                          min-h-[52px]
                          line-clamp-2
                          text-xl
                          font-black
                          leading-6
                          text-slate-800
                          transition-colors
                          duration-300
                          group-hover:text-emerald-700
                        "
                      >
                        {course.title}
                      </h3>

                      {/* Instructor */}
                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-slate-500
                        "
                      >
                        <span
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                          "
                        >
                          👨‍🏫
                        </span>

                        <span className="truncate">
                          {course.instructor}
                        </span>
                      </div>

                      {/* Rating */}
                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            rounded-lg
                            bg-amber-50
                            px-2
                            py-1
                            text-xs
                            font-bold
                            text-amber-700
                          "
                        >
                          ⭐ {course.rating}
                        </span>

                        <span className="text-xs text-slate-400">
                          ({course.reviews} reviews)
                        </span>
                      </div>

                      {/* Meta */}
                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-2
                          gap-2
                        "
                      >
                        <div
                          className="
                            rounded-lg
                            bg-slate-50
                            px-3
                            py-2
                            text-[11px]
                            font-medium
                            text-slate-600
                          "
                        >
                          ⏱️ {course.duration}
                        </div>

                        <div
                          className="
                            rounded-lg
                            bg-slate-50
                            px-3
                            py-2
                            text-[11px]
                            font-medium
                            text-slate-600
                          "
                        >
                          📚 {course.lectures} lectures
                        </div>
                      </div>

                      {/* Features */}
                      {course.features &&
                        course.features.length > 0 && (
                          <ul className="mt-4 space-y-2">

                            {course.features
                              .slice(0, 3)
                              .map((feature, fidx) => (
                                <li
                                  key={fidx}
                                  className="
                                    flex
                                    items-start
                                    gap-2
                                    text-xs
                                    leading-5
                                    text-slate-600
                                  "
                                >
                                  <span className="mt-0.5 text-emerald-500">
                                    ✓
                                  </span>

                                  <span>{feature}</span>
                                </li>
                              ))}

                          </ul>
                        )}

                      {/* Footer */}
                      <div
                        className="
                          mt-5
                          flex
                          items-end
                          justify-between
                          gap-3
                          border-t
                          border-slate-100
                          pt-5
                        "
                      >

                        {/* Price */}
                        <div>

                          <div
                            className="
                              text-2xl
                              font-black
                              text-slate-900
                            "
                          >
                            ₹
                            {course.price?.toLocaleString()}
                          </div>

                          {course.originalPrice && (
                            <div
                              className="
                                text-xs
                                text-slate-400
                                line-through
                              "
                            >
                              ₹
                              {course.originalPrice?.toLocaleString()}
                            </div>
                          )}

                        </div>

                        {/* Enquiry */}
                        <button
                          onClick={() =>
                            handleEnquiry(course)
                          }
                          disabled={alreadyEnquired}
                          className={`
                            rounded-xl
                            px-4
                            py-3
                            text-xs
                            font-bold
                            transition-all
                            duration-300

                            ${
                              alreadyEnquired
                                ? `
                                  cursor-not-allowed
                                  bg-emerald-100
                                  text-emerald-700
                                `
                                : `
                                  bg-gradient-to-r
                                  from-emerald-500
                                  to-green-600
                                  text-white
                                  shadow-md
                                  shadow-emerald-500/20
                                  hover:-translate-y-1
                                  hover:shadow-lg
                                  active:scale-95
                                `
                            }
                          `}
                        >
                          {alreadyEnquired
                            ? '✓ Enquired'
                            : 'Enquire Now'}
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          CTA SECTION
      ==================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-emerald-700
          via-green-700
          to-emerald-800
          px-4
          py-16
          sm:px-6
          lg:px-8
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            -left-20
            top-0
            h-60
            w-60
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -right-10
            h-72
            w-72
            rounded-full
            bg-lime-300/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-4xl
            text-center
          "
        >

          <h2
            className="
              text-3xl
              font-black
              text-white
              sm:text-4xl
            "
          >
            Can't Find What You're Looking For?
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-emerald-100
              sm:text-base
            "
          >
            Get personalized course recommendations
            from our experts
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              justify-center
              gap-3
              sm:flex-row
            "
          >

            <button
              onClick={handleContactUs}
              className="
                rounded-xl
                bg-white
                px-7
                py-3.5
                text-sm
                font-black
                text-emerald-700
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                active:scale-95
              "
            >
              Contact Us
            </button>

            <button
              onClick={handleOnlineCourses}
              className="
                rounded-xl
                border
                border-white/30
                bg-white/10
                px-7
                py-3.5
                text-sm
                font-black
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/20
                active:scale-95
              "
            >
              View Online Courses
            </button>

          </div>
        </div>
      </section>

      {/* ===================================================
          ANIMATIONS
      ==================================================== */}
      <style>{`

        @keyframes cardAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          0% {
            opacity: 0;
            transform: translateY(-12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

      `}</style>
    </div>
  );
}

export default AllCoursesPage;
import React, { useEffect, useMemo, useState } from 'react';

function OnlineCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiredCourses, setEnquiredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [
    'All',
    'Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Cloud',
  ];

  // =========================================================
  // FALLBACK COURSES
  // =========================================================

  const hardcodedCourses = [
    {
      _id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'John Smith',
      category: 'Development',
      rating: 4.8,
      reviews: 2547,
      duration: '52 hours',
      lectures: 142,
      level: 'Beginner',
      image: '💻',
      features: [
        'HTML, CSS, JavaScript',
        'React & Node.js',
        'MongoDB & Express',
        'Real Projects',
      ],
    },
    {
      _id: '2',
      title: 'Data Science & Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      category: 'Data Science',
      rating: 4.9,
      reviews: 1893,
      duration: '64 hours',
      lectures: 178,
      level: 'Intermediate',
      image: '📊',
      features: [
        'Python Programming',
        'Machine Learning',
        'Deep Learning',
        'TensorFlow & Keras',
      ],
    },
    {
      _id: '3',
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Chen',
      category: 'Design',
      rating: 4.7,
      reviews: 1256,
      duration: '38 hours',
      lectures: 96,
      level: 'Beginner',
      image: '🎨',
      features: [
        'Figma & Adobe XD',
        'User Research',
        'Prototyping',
        'Design Systems',
      ],
    },
    {
      _id: '4',
      title: 'Digital Marketing Strategy',
      instructor: 'Michael Brown',
      category: 'Marketing',
      rating: 4.6,
      reviews: 987,
      duration: '28 hours',
      lectures: 74,
      level: 'Beginner',
      image: '📱',
      features: [
        'SEO & SEM',
        'Social Media Marketing',
        'Google Analytics',
        'Content Strategy',
      ],
    },
    {
      _id: '5',
      title: 'AWS Cloud Practitioner',
      instructor: 'David Wilson',
      category: 'Cloud',
      rating: 4.8,
      reviews: 1543,
      duration: '42 hours',
      lectures: 112,
      level: 'Intermediate',
      image: '☁️',
      features: [
        'AWS Fundamentals',
        'EC2 & S3',
        'Lambda Functions',
        'Cloud Security',
      ],
    },
    {
      _id: '6',
      title: 'Business Analytics with Excel',
      instructor: 'Lisa Anderson',
      category: 'Business',
      rating: 4.7,
      reviews: 876,
      duration: '24 hours',
      lectures: 68,
      level: 'Beginner',
      image: '📈',
      features: [
        'Advanced Excel',
        'Data Visualization',
        'Pivot Tables',
        'Business Intelligence',
      ],
    },
  ];

  // =========================================================
  // INITIAL URL FILTER
  // =========================================================

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');

    if (courseFilter) {
      setSearchTerm(courseFilter);
    }
  }, []);

  // =========================================================
  // COURSE FILTER EVENT
  // CoursesSection -> OnlineCoursesPage
  // =========================================================

  useEffect(() => {
    const handleFilterCourse = (event) => {
      const value = event.detail;

      if (!value) return;

      setSelectedCategory('All');
      setSearchTerm(value);

      // Scroll to courses
      setTimeout(() => {
        document
          .getElementById('online-courses-grid')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }, 200);
    };

    window.addEventListener(
      'filterOnlineCourse',
      handleFilterCourse
    );

    return () => {
      window.removeEventListener(
        'filterOnlineCourse',
        handleFilterCourse
      );
    };
  }, []);

  // =========================================================
  // FETCH COURSES
  // =========================================================

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          'https://courser-project.onrender.com/api/online-courses'
        );

        const data = await response.json();

        if (
          data.success &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setCourses(data.data);
        } else {
          setCourses(hardcodedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(hardcodedCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // =========================================================
  // FILTER COURSES
  // =========================================================

  const filteredCourses = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return courses.filter((course) => {
      const title = course.title?.toLowerCase() || '';
      const instructor = course.instructor?.toLowerCase() || '';
      const category = course.category?.toLowerCase() || '';

      const matchesCategory =
        selectedCategory === 'All' ||
        category === selectedCategory.toLowerCase();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        instructor.includes(search) ||
        category.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm]);

  // =========================================================
  // ENQUIRY
  // =========================================================

  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert(
        '✅ You have already submitted an enquiry for this course!'
      );
      return;
    }

    const studentName = prompt(
      `📚 Course Enquiry\n\n${course.title}\n\nEnter your full name:`
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
      const response = await fetch(
        'https://courser-project.onrender.com/api/online-courses/enquiry',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: course._id,
            courseTitle: course.title,
            studentName,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEnquiredCourses((prev) => [
          ...prev,
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

  // =========================================================
  // CLEAR FILTER
  // =========================================================

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-4 py-12 text-white sm:py-14">

        {/* Glow */}
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

        <div
          className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:42px_42px]" />

        {/* Floating Dots */}
        <div className="absolute left-[15%] top-[30%] h-2 w-2 rounded-full bg-emerald-400 animate-ping" />

        <div
          className="absolute right-[18%] top-[25%] h-1.5 w-1.5 rounded-full bg-green-300 animate-ping"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="relative mx-auto max-w-4xl text-center"
          style={{
            animation: 'heroIn .7s ease-out both',
          }}
        >

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            🎓 ONLINE LEARNING
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Learn From Anywhere
            <br />

            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300 bg-clip-text text-transparent">
              At Your Own Pace
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm">
            Access industry-leading courses taught by expert instructors.
            Learn new skills and advance your career with flexible online
            learning.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-2">

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="text-lg font-black text-emerald-400">
                {courses.length}+
              </div>
              <div className="mt-0.5 text-[9px] text-slate-400">
                Courses
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="text-lg font-black text-emerald-400">
                50+
              </div>
              <div className="mt-0.5 text-[9px] text-slate-400">
                Expert Instructors
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="text-lg font-black text-emerald-400">
                50k+
              </div>
              <div className="mt-0.5 text-[9px] text-slate-400">
                Students
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-6xl">

          {/* Search */}
          <div className="relative mx-auto max-w-2xl">

            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm">
              🔍
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses or instructors..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-xs text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-[10px] text-slate-500 transition-all hover:bg-emerald-500 hover:text-white"
              >
                ✕
              </button>
            )}

          </div>

          {/* Categories */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {category}
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          COURSES
      ===================================================== */}

      <section
        id="online-courses-grid"
        className="relative px-4 py-10 sm:px-6 lg:px-8"
      >

        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div
            className="mb-7 text-center"
            style={{
              animation: 'fadeUp .6s ease-out both',
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Professional Training
            </span>

            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Featured Courses
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Choose from our wide range of professional courses
            </p>

            <div className="mx-auto mt-3 h-1 w-12 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-1/2 bg-emerald-500 animate-[lineMove_2s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">

              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

                <p className="mt-4 text-xs font-semibold text-slate-500">
                  Loading courses...
                </p>
              </div>

            </div>
          ) : (
            <>
              {/* Course Grid */}
              {filteredCourses.length > 0 ? (

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {filteredCourses.map((course, index) => {

                    const isSelected =
                      selectedCourse?._id === course._id;

                    const isEnquired =
                      enquiredCourses.includes(course._id);

                    return (
                      <div
                        key={course._id}
                        className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                          isSelected
                            ? 'border-emerald-400 ring-2 ring-emerald-100'
                            : 'border-slate-200 hover:border-emerald-200'
                        }`}
                        style={{
                          animation: `cardIn .55s ease-out ${
                            index * 80
                          }ms both`,
                        }}
                      >

                        {/* Glow */}
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl transition-transform duration-500 group-hover:scale-150" />

                        {/* Shine */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                        {/* Image */}
                        <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">

                          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(16,185,129,.5),transparent_55%)]" />

                          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-5xl shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                            {course.image || '💻'}
                          </div>

                          {/* Level */}
                          <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-md">
                            {course.level || 'Beginner'}
                          </span>

                          {/* Category */}
                          <span className="absolute bottom-3 left-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[9px] font-bold text-white shadow-lg">
                            {course.category}
                          </span>

                        </div>

                        {/* Content */}
                        <div className="relative p-4">

                          <h3 className="min-h-[42px] text-base font-extrabold leading-5 text-slate-800 transition-colors duration-300 group-hover:text-emerald-600">
                            {course.title}
                          </h3>

                          {/* Instructor */}
                          <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
                              👨‍🏫
                            </span>

                            <span className="truncate">
                              {course.instructor}
                            </span>
                          </div>

                          {/* Rating */}
                          <div className="mt-3 flex items-center gap-2">

                            <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                              ⭐ {course.rating}
                            </span>

                            <span className="text-[9px] text-slate-400">
                              ({course.reviews} reviews)
                            </span>

                          </div>

                          {/* Meta */}
                          <div className="mt-3 grid grid-cols-2 gap-2">

                            <div className="rounded-lg bg-slate-50 px-2 py-2 text-center transition-colors group-hover:bg-emerald-50">
                              <div className="text-[9px] text-slate-400">
                                Duration
                              </div>

                              <div className="mt-0.5 text-[10px] font-bold text-slate-700">
                                ⏱️ {course.duration}
                              </div>
                            </div>

                            <div className="rounded-lg bg-slate-50 px-2 py-2 text-center transition-colors group-hover:bg-emerald-50">
                              <div className="text-[9px] text-slate-400">
                                Lectures
                              </div>

                              <div className="mt-0.5 text-[10px] font-bold text-slate-700">
                                📚 {course.lectures}
                              </div>
                            </div>

                          </div>

                          {/* Features */}
                          <div className="mt-3 space-y-1">

                            {course.features
                              ?.slice(0, 4)
                              .map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-center gap-2 text-[10px] text-slate-500"
                                >
                                  <span className="text-emerald-500">
                                    ✓
                                  </span>

                                  <span className="truncate">
                                    {feature}
                                  </span>
                                </div>
                              ))}

                          </div>

                          {/* Buttons */}
                          <div className="mt-4 flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedCourse(course)
                              }
                              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                            >
                              View Details
                            </button>

                            <button
                              type="button"
                              disabled={isEnquired}
                              onClick={() =>
                                handleEnquiry(course)
                              }
                              className={`flex-1 rounded-xl px-3 py-2.5 text-[10px] font-bold transition-all duration-300 ${
                                isEnquired
                                  ? 'cursor-not-allowed bg-emerald-100 text-emerald-600'
                                  : 'bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg'
                              }`}
                            >
                              {isEnquired
                                ? '✓ Enquired'
                                : 'Enquire Now'}
                            </button>

                          </div>

                        </div>

                        {/* Bottom Line */}
                        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-emerald-500 transition-all duration-500 group-hover:w-2/3" />

                      </div>
                    );
                  })}

                </div>

              ) : (

                /* =================================================
                   NO COURSES
                ================================================= */

                <div
                  className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
                  style={{
                    animation: 'fadeUp .5s ease-out both',
                  }}
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
                    📭
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold text-slate-800">
                    No courses found
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Try adjusting your search or filter criteria.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-lg"
                  >
                    Clear All Filters
                  </button>

                </div>

              )}

            </>
          )}

        </div>
      </section>

      {/* =====================================================
          WHY ONLINE LEARNING
      ===================================================== */}

      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8 text-center">

            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Learn Better
            </span>

            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Why Choose Online Learning?
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Flexible, affordable, and effective learning
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: '⏰',
                title: 'Learn at Your Pace',
                text: 'Access course materials anytime, anywhere.',
              },
              {
                icon: '💰',
                title: 'Affordable Pricing',
                text: 'High-quality education at an affordable cost.',
              },
              {
                icon: '👨‍🏫',
                title: 'Expert Instructors',
                text: 'Learn from industry professionals.',
              },
              {
                icon: '📜',
                title: 'Certification',
                text: 'Earn industry-recognized certificates.',
              },
              {
                icon: '💬',
                title: '24/7 Support',
                text: 'Get help whenever you need it.',
              },
              {
                icon: '🔄',
                title: 'Lifetime Access',
                text: 'Access course materials and updates.',
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
                style={{
                  animation: `cardIn .5s ease-out ${
                    index * 70
                  }ms both`,
                }}
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-emerald-500">
                    {benefit.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-emerald-600">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {benefit.text}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-4 py-10 text-center text-white">

        <div className="absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">

          <div className="text-3xl animate-bounce">
            🚀
          </div>

          <h2 className="mt-3 text-2xl font-black">
            Ready to Start Learning?
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Join thousands of students already learning with Courser.
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById('online-courses-grid')
                ?.scrollIntoView({
                  behavior: 'smooth',
                })
            }
            className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-xl"
          >
            Browse All Courses →
          </button>

        </div>
      </section>

      {/* =====================================================
          COURSE DETAILS MODAL
      ===================================================== */}

      {selectedCourse && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCourse(null)}
          style={{
            animation: 'modalFade .25s ease-out both',
          }}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            style={{
              animation: 'modalIn .35s ease-out both',
            }}
          >

            {/* Modal Header */}
            <div className="relative overflow-hidden bg-slate-950 px-6 py-7 text-white">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm transition-all hover:bg-white/20"
              >
                ✕
              </button>

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-sm">
                  {selectedCourse.image || '💻'}
                </div>

                <span className="mt-4 inline-block rounded-full bg-emerald-500 px-2.5 py-1 text-[9px] font-bold">
                  {selectedCourse.category}
                </span>

                <h2 className="mt-3 pr-8 text-xl font-black">
                  {selectedCourse.title}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  👨‍🏫 {selectedCourse.instructor}
                </p>

              </div>

            </div>

            {/* Modal Content */}
            <div className="p-6">

              <div className="grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-sm">⭐</div>
                  <div className="mt-1 text-xs font-bold">
                    {selectedCourse.rating}
                  </div>
                  <div className="text-[8px] text-slate-400">
                    Rating
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-sm">⏱️</div>
                  <div className="mt-1 text-xs font-bold">
                    {selectedCourse.duration}
                  </div>
                  <div className="text-[8px] text-slate-400">
                    Duration
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-sm">📚</div>
                  <div className="mt-1 text-xs font-bold">
                    {selectedCourse.lectures}
                  </div>
                  <div className="text-[8px] text-slate-400">
                    Lectures
                  </div>
                </div>

              </div>

              {/* Features */}
              <div className="mt-6">

                <h3 className="text-sm font-extrabold text-slate-800">
                  What You'll Learn
                </h3>

                <div className="mt-3 space-y-2">

                  {selectedCourse.features?.map(
                    (feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] text-slate-600"
                      >
                        <span className="font-bold text-emerald-500">
                          ✓
                        </span>

                        {feature}
                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Modal Buttons */}
              <div className="mt-6 flex gap-2">

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-slate-100"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={enquiredCourses.includes(
                    selectedCourse._id
                  )}
                  onClick={() =>
                    handleEnquiry(selectedCourse)
                  }
                  className={`flex-1 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                    enquiredCourses.includes(
                      selectedCourse._id
                    )
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-400'
                  }`}
                >
                  {enquiredCourses.includes(
                    selectedCourse._id
                  )
                    ? '✓ Enquired'
                    : 'Enquire Now'}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(-25px);
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

        @keyframes modalFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes lineMove {
          0% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(200%);
          }

          100% {
            transform: translateX(-100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}

export default OnlineCoursesPage;
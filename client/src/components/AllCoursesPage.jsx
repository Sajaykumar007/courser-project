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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseFilter = urlParams.get('course');
    if (courseFilter) setSearchTerm(courseFilter);
  }, []);

  useEffect(() => {
    const handleFilterCourse = (e) => {
      setSearchTerm(e.detail);
    };
    window.addEventListener('filterCourse', handleFilterCourse);
    return () => window.removeEventListener('filterCourse', handleFilterCourse);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [courses, selectedCategory, selectedLevel, searchTerm, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        setFilteredCourses(data.data);
        const uniqueCats = [...new Set(data.data.map((c) => c.category))];
        setCategories(['All', ...uniqueCats]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }
    if (selectedLevel !== 'All') {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(term) ||
          course.instructor?.toLowerCase().includes(term) ||
          course.category?.toLowerCase().includes(term)
      );
    }
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    setFilteredCourses(filtered);
  };

  const handleEnquiry = async (course) => {
    if (enquiredCourses.includes(course._id)) {
      alert('✅ You have already submitted an enquiry for this course!');
      return;
    }
    const studentName = prompt(`📚 Course Enquiry: ${course.title}\n\nEnter your full name:`);
    if (!studentName) return;
    const phone = prompt('Enter your phone number:');
    if (!phone) return;
    if (phone.length < 10) {
      alert('❌ Please enter a valid phone number (minimum 10 digits)!');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/courses/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTitle: course.title, courseId: course._id, studentName, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiredCourses([...enquiredCourses, course._id]);
        alert('✅ Thank you! Your enquiry has been submitted.\n\nOur team will contact you within 24 hours.');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      alert('❌ Server error. Please try again.');
    }
  };

  const getLevelClasses = (level) => {
    if (level === 'Beginner') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (level === 'Intermediate') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (level === 'Advanced') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round((1 - price / originalPrice) * 100);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('newest');
    setSearchTerm('');
  };

  const handleContactUs = () => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'contactUs' }));
  const handleOnlineCourses = () => window.dispatchEvent(new CustomEvent('navigateToPage', { detail: 'onlineCourses' }));

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-800 font-sans animate-[pageLoad_0.6s_ease-out_forwards]">
      <style>{`
        @keyframes pageLoad { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cardAppear { 0% { opacity: 0; transform: translateY(20px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { 0% { opacity: 0; transform: translateY(-12px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes lineMove { 0% { transform: translateX(-100%); } 50% { transform: translateX(200%); } 100% { transform: translateX(-100%); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
        .animate-fade-in-up { animation: fadeUp 0.6s ease-out forwards; }
        .animate-glow { animation: glowPulse 4s ease-in-out infinite; }
        .delay-200 { animation-delay: 200ms; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
      `}</style>

      {/* ===== HERO SECTION (Premium Dark Green) ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-slate-900 to-green-950 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-green-500/20 blur-3xl animate-glow" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-glow delay-200" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-green-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> COMPLETE CATALOG
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-emerald-200 bg-clip-text text-transparent">
              All Courses
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            Choose from {courses.length}+ industry-leading courses across multiple domains. Start your learning journey today!
          </p>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [courses.length + '+', 'Courses'],
              [categories.length - 1 + '+', 'Categories'],
              ['50+', 'Expert Instructors'],
              ['50k+', 'Students'],
            ].map(([value, label], index) => (
              <div key={label} className="animate-fade-in-up rounded-xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-xl font-black text-white sm:text-2xl">{value}</div>
                <div className="mt-0.5 text-[10px] text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTER SECTION ===== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-[#ffffff] p-4 shadow-xl sm:p-5">
          <div className="flex justify-center">
            <div className="group relative w-full max-w-3xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="pointer-events-none absolute -inset-0.5 rounded-[12px] bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 opacity-0 blur transition duration-500 group-focus-within:opacity-30" />
              <div className="relative flex h-[46px] items-center overflow-hidden rounded-[10px] border border-gray-200 bg-[#f7f7f7] shadow-sm transition-all duration-300 group-hover:border-green-200 group-hover:bg-[#ffffff] group-focus-within:border-green-400 group-focus-within:bg-[#ffffff] group-focus-within:shadow-lg group-focus-within:shadow-green-500/10">
                <div className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-sm transition-all duration-300 group-hover:scale-105 group-focus-within:rotate-6 group-focus-within:bg-green-100">
                  <span className="inline-block transition-transform duration-500 group-focus-within:scale-110">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] font-medium text-slate-700 outline-none placeholder:text-gray-400 sm:text-sm"
                />
                {searchTerm && (
                  <span className="hidden whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600 sm:block animate-[fadeIn_0.3s_ease-out]">
                    {filteredCourses.length} found
                  </span>
                )}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                    className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-500 transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-red-50 hover:text-red-500 active:scale-90 animate-[scaleIn_0.2s_ease-out]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">📂 Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-[10px] border border-gray-200 bg-[#f7f7f7] px-3 py-2.5 text-xs font-medium text-slate-700 outline-none transition-all duration-200 hover:border-green-200 focus:border-green-400 focus:bg-[#ffffff] focus:ring-2 focus:ring-green-100"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">📊 Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full rounded-[10px] border border-gray-200 bg-[#f7f7f7] px-3 py-2.5 text-xs font-medium text-slate-700 outline-none transition-all duration-200 hover:border-green-200 focus:border-green-400 focus:bg-[#ffffff] focus:ring-2 focus:ring-green-100"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">🔃 Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-[10px] border border-gray-200 bg-[#f7f7f7] px-3 py-2.5 text-xs font-medium text-slate-700 outline-none transition-all duration-200 hover:border-green-200 focus:border-green-400 focus:bg-[#ffffff] focus:ring-2 focus:ring-green-100"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full rounded-[10px] border border-gray-200 bg-gray-100 px-4 py-2.5 text-xs font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-gray-500">
              Showing <strong className="text-green-600">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
            </span>
            {searchTerm && (
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700 animate-[scaleIn_0.3s_ease-out]">
                Search: "{searchTerm}"
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== COURSES GRID ===== */}
      <section className="px-4 py-10 bg-[#ffffff] sm:px-6 lg:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
              <p className="mt-4 text-sm font-medium text-gray-500">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-[#ffffff] px-6 text-center animate-[fadeUp_0.5s_ease-out]">
              <div className="text-6xl">📭</div>
              <h3 className="mt-5 text-2xl font-black text-slate-800">No courses found</h3>
              <p className="mt-2 max-w-md text-sm text-gray-500">Try adjusting your filters or search criteria</p>
              <button onClick={resetFilters} className="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course, idx) => {
                const discount = getDiscount(course.price, course.originalPrice);
                const alreadyEnquired = enquiredCourses.includes(course._id);
                return (
                  <div
                    key={course._id}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-[#f7f7f7] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:bg-[#ffffff] hover:border-green-200 hover:shadow-lg animate-[cardAppear_0.5s_ease-out_both]"
                  >
                    {/* ✅ UPDATED: Very thin initially (h-0.5), grows slightly (h-1.5) on hover for a subtle, elegant look */}
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-0
                        h-0.5
                        rounded-tl-2xl
                        rounded-tr-2xl
                        bg-gradient-to-r
                        from-green-400
                        via-green-500
                        to-green-600
                        transition-all
                        duration-500
                        ease-in-out
                        group-hover:h-1.5
                        group-hover:shadow-[0_4px_12px_rgba(34,197,94,0.6)]
                      "
                    />

                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-green-950">
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                      <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />
                      <div className="relative z-10 text-6xl drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        {course.image || '💻'}
                      </div>
                      <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[9px] font-bold shadow-sm ${getLevelClasses(course.level)}`}>
                        {course.level}
                      </span>
                      {discount > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[9px] font-black text-white shadow-lg">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-green-600">{course.category}</div>
                      <h3 className="mt-1.5 min-h-[42px] line-clamp-2 text-base font-black leading-5 text-slate-800 transition-colors duration-300 group-hover:text-green-700">
                        {course.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50">👨‍🏫</span>
                        <span className="truncate">{course.instructor}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">⭐ {course.rating}</span>
                        <span className="text-[9px] text-gray-400">({course.reviews} reviews)</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-[#f7f7f7] px-2.5 py-2 text-center transition-colors group-hover:bg-green-50">
                          <div className="text-[9px] text-gray-400">Duration</div>
                          <div className="mt-0.5 text-[10px] font-bold text-slate-700">⏱️ {course.duration}</div>
                        </div>
                        <div className="rounded-lg bg-[#f7f7f7] px-2.5 py-2 text-center transition-colors group-hover:bg-green-50">
                          <div className="text-[9px] text-gray-400">Lectures</div>
                          <div className="mt-0.5 text-[10px] font-bold text-slate-700">📚 {course.lectures}</div>
                        </div>
                      </div>
                      {course.features && course.features.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {course.features.slice(0, 3).map((feature, fidx) => (
                            <li key={fidx} className="flex items-start gap-2 text-[10px] leading-4 text-gray-600">
                              <span className="mt-0.5 text-green-500">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                        <div>
                          <div className="text-xl font-black text-slate-900">₹{course.price?.toLocaleString()}</div>
                          {course.originalPrice && (
                            <div className="text-[10px] text-gray-400 line-through">₹{course.originalPrice?.toLocaleString()}</div>
                          )}
                        </div>
                        <button
                          onClick={() => handleEnquiry(course)}
                          disabled={alreadyEnquired}
                          className={`rounded-xl px-4 py-2.5 text-[10px] font-bold transition-all duration-300 ${
                            alreadyEnquired
                              ? 'cursor-not-allowed bg-green-100 text-green-700'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20 hover:-translate-y-0.5 hover:shadow-lg active:scale-95'
                          }`}
                        >
                          {alreadyEnquired ? '✓ Enquired' : 'Enquire Now'}
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

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-800 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Can't Find What You're Looking For?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-green-100 sm:text-base">
            Get personalized course recommendations from our experts
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={handleContactUs} className="rounded-xl bg-white px-6 py-3 text-sm font-black text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">
              Contact Us
            </button>
            <button onClick={handleOnlineCourses} className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-95">
              View Online Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllCoursesPage;
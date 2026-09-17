import React from 'react';
import '../styles/CoursesSection.css';

function CoursesSection() {
  const courses = [
    { name: 'Web Developer', learners: '18,456', icon: '💻' },
    { name: 'Cloud Architect', learners: '33,442', icon: '☁️' },
    { name: 'Business Analyst', learners: '14,668', icon: '📊' },
    { name: 'Java Developer', learners: '14,111', icon: '☕' },
    { name: 'Digital Marketing', learners: '17,557', icon: '📱' },
    { name: 'Cyber Security', learners: '11,432', icon: '🔒' },
    { name: 'Data Analyst', learners: '12,456', icon: '📈' },
    { name: 'DevOps Engineer', learners: '24,487', icon: '⚙️' },
    { name: 'Big Data', learners: '14,889', icon: '💾' },
  ];

  return (
    <section className="courses-section">
      <div className="courses-container">
        <div className="section-header">
          <h2>Choose from Offline & Online Courses</h2>
          <p>
            Courser provides a Range of Courses Masters Program, Post Graduate Program. 
            You can choose both Offline and Online classes at your preferred location at your desired pricing. 
            Contact us for course details, location and pricing.
          </p>
        </div>

        <h3 className="sub-section-title">Master's Program</h3>
        
        <div className="courses-grid">
          {courses.map((course, idx) => (
            <div key={idx} className="course-card">
              <span className="card-icon">{course.icon}</span>
              <h4 className="card-title">{course.name}</h4>
              <p className="card-description">
                Offline & Online Class | {course.learners} Learners
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
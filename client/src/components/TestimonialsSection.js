import React from 'react';
import '../styles/TestimonialsSection.css';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Vaishnavi',
      role: 'UPSC Aspirant',
      college: 'PSG Krishnammal College',
      image: 'https://i.pravatar.cc/150?img=1', // Replace with actual image URL
      testimonial: 'Joined Courser, Coimbatore Institute for UPSC Training. Trainers from Courser have helped me to gain deep knowledge on Preliminary and Main Papers. They helped us with the Previous Year Question papers and to crack them'
    },
    {
      name: 'Aravinth kumaravelu',
      role: 'Cloud Architect',
      college: 'Muthayammal Engineering College',
      image: 'https://i.pravatar.cc/150?img=11', // Replace with actual image URL
      testimonial: 'Joined Courser for Cloud Architect Course. Learnt Cloud Infrastructure from scratch. Worked on Tier Account of AWS and had a clear understanding of Compute, Storage and Security Services.'
    },
    {
      name: 'Pravin Murugesan',
      role: 'Full Stack Developer',
      college: 'Bharathiyar University',
      image: 'https://i.pravatar.cc/150?img=13', // Replace with actual image URL
      testimonial: 'Studying Full Stack Developer with Placement Assistance from Courser. I am from Non IT Background. Learning Website Development from Scratch, working on JavaScript and PHP. Building my own website and implementing all the Front End and Back End Frameworks'
    },
    {
      name: 'Harish TS',
      role: 'Diploma in Computer Applications',
      college: 'Bangalore',
      image: 'https://i.pravatar.cc/150?img=8', // Replace with actual image URL
      testimonial: 'Joined Courser for DCA Course and started to improvise on all Microsoft Apps. Started developing Professional Presentations. It gave us more confidence to pursue My Post Graduate degree'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">Hear from our Learners</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Our Learners who have taken our Masters Program with Placement Assistance
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-header">
                <div className="image-wrapper">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-image"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.src = 'https://ui-avatars.com/api/?name=' + testimonial.name + '&background=10b981&color=fff&size=150';
                    }}
                  />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-college">{testimonial.college}</p>
                </div>
              </div>
              <div className="testimonial-divider"></div>
              <div className="testimonial-content">
                <p>{testimonial.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courses = [
  {
    title: "Web Developer",
    instructor: "John Smith",
    category: "Development",
    rating: 4.8,
    reviews: 456,
    price: 0,
    originalPrice: 0,
    duration: "6 Months",
    lectures: 142,
    level: "Beginner",
    image: "💻",
    features: ["HTML, CSS, JavaScript", "React & Node.js", "MongoDB & Express", "Real Projects"],
    description: "Master full stack web development from scratch",
    learners: 18456
  },
  {
    title: "Cloud Architect",
    instructor: "David Wilson",
    category: "Cloud",
    rating: 4.9,
    reviews: 442,
    price: 0,
    originalPrice: 0,
    duration: "8 Months",
    lectures: 180,
    level: "Advanced",
    image: "☁️",
    features: ["AWS & Azure", "Cloud Security", "Architecture Design", "DevOps"],
    description: "Design and deploy enterprise cloud solutions",
    learners: 33442
  },
  {
    title: "Business Analyst",
    instructor: "Lisa Anderson",
    category: "Business",
    rating: 4.7,
    reviews: 668,
    price: 0,
    originalPrice: 0,
    duration: "5 Months",
    lectures: 95,
    level: "Beginner",
    image: "📊",
    features: ["Data Analysis", "Excel & SQL", "Power BI", "Business Strategy"],
    description: "Become a data-driven business analyst",
    learners: 14668
  },
  {
    title: "Java Developer",
    instructor: "Robert Johnson",
    category: "Development",
    rating: 4.8,
    reviews: 111,
    price: 0,
    originalPrice: 0,
    duration: "7 Months",
    lectures: 155,
    level: "Intermediate",
    image: "☕",
    features: ["Java Core & Advanced", "Spring Boot", "Hibernate", "Microservices"],
    description: "Master Java programming and enterprise development",
    learners: 14111
  },
  {
    title: "Digital Marketing",
    instructor: "Michael Brown",
    category: "Marketing",
    rating: 4.6,
    reviews: 557,
    price: 0,
    originalPrice: 0,
    duration: "4 Months",
    lectures: 88,
    level: "Beginner",
    image: "📱",
    features: ["SEO & SEM", "Social Media Marketing", "Google Ads", "Content Strategy"],
    description: "Master modern digital marketing strategies",
    learners: 17557
  },
  {
    title: "Cyber Security",
    instructor: "Emily Chen",
    category: "Security",
    rating: 4.9,
    reviews: 432,
    price: 0,
    originalPrice: 0,
    duration: "8 Months",
    lectures: 165,
    level: "Advanced",
    image: "🔒",
    features: ["Network Security", "Ethical Hacking", "Penetration Testing", "Security Tools"],
    description: "Protect systems and networks from cyber threats",
    learners: 11432
  },
  {
    title: "Data Analyst",
    instructor: "Dr. Sarah Johnson",
    category: "Data Science",
    rating: 4.8,
    reviews: 456,
    price: 0,
    originalPrice: 0,
    duration: "6 Months",
    lectures: 130,
    level: "Intermediate",
    image: "📈",
    features: ["Python & SQL", "Data Visualization", "Statistical Analysis", "Tableau"],
    description: "Analyze data and drive business decisions",
    learners: 12456
  },
  {
    title: "DevOps Engineer",
    instructor: "James Wilson",
    category: "Development",
    rating: 4.9,
    reviews: 487,
    price: 0,
    originalPrice: 0,
    duration: "7 Months",
    lectures: 148,
    level: "Advanced",
    image: "🔄",
    features: ["Docker & Kubernetes", "CI/CD", "Jenkins", "Cloud Infrastructure"],
    description: "Master DevOps practices and tools",
    learners: 24487
  },
  {
    title: "Big Data",
    instructor: "Dr. Michael Lee",
    category: "Data Science",
    rating: 4.7,
    reviews: 889,
    price: 0,
    originalPrice: 0,
    duration: "7 Months",
    lectures: 140,
    level: "Advanced",
    image: "🗄️",
    features: ["Hadoop & Spark", "Big Data Analytics", "NoSQL Databases", "Real-time Processing"],
    description: "Process and analyze large-scale datasets",
    learners: 14889
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for Seeding...');

    await Course.deleteMany({});
    console.log('️ Old courses cleared!');

    await Course.insertMany(courses);
    console.log(`🎉 Successfully added ${courses.length} courses to the database!`);

    mongoose.disconnect();
    console.log(' Database disconnected.');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
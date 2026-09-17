require('dotenv').config();
const mongoose = require('mongoose');
const PlacementStats = require('../models/PlacementStats');
const HiringPartner = require('../models/HiringPartner');
const PlacedStudent = require('../models/PlacedStudent');
const SuccessStory = require('../models/SuccessStory');
const PlacementDrive = require('../models/PlacementDrive');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for seeding...');

    // 1. Create Default Stats
    await PlacementStats.deleteMany({});
    await PlacementStats.create({
      studentsPlaced: 6200,
      hiringPartners: 200,
      highestPackage: '12 LPA',
      averagePackage: '4.5 LPA',
      updatedAt: new Date()
    });
    console.log('✅ Stats seeded!');

    // 2. Create Hiring Partners
    await HiringPartner.deleteMany({});
    await HiringPartner.insertMany([
      { companyName: 'TCS', logo: 'TCS', website: 'https://tcs.com', isActive: true },
      { companyName: 'Infosys', logo: 'INFOSYS', website: 'https://infosys.com', isActive: true },
      { companyName: 'Wipro', logo: 'WIPRO', website: 'https://wipro.com', isActive: true },
      { companyName: 'HCL', logo: 'HCL', website: 'https://hcl.com', isActive: true },
      { companyName: 'Accenture', logo: 'ACCENTURE', website: 'https://accenture.com', isActive: true },
      { companyName: 'Cognizant', logo: 'COGNIZANT', website: 'https://cognizant.com', isActive: true },
      { companyName: 'Capgemini', logo: 'CAPGEMINI', website: 'https://capgemini.com', isActive: true },
      { companyName: 'Tech Mahindra', logo: 'TECH M', website: 'https://techmahindra.com', isActive: true }
    ]);
    console.log('✅ Hiring Partners seeded!');

    // 3. Create Placed Students
    await PlacedStudent.deleteMany({});
    await PlacedStudent.insertMany([
      {
        studentName: 'Arjun K',
        photo: 'AK',
        course: 'Python Full Stack',
        company: 'TCS',
        jobRole: 'Software Developer',
        package: '4.5 LPA',
        year: 2024,
        location: 'Chennai'
      },
      {
        studentName: 'Priya S',
        photo: 'PS',
        course: 'Data Science',
        company: 'Infosys',
        jobRole: 'Data Analyst',
        package: '5.2 LPA',
        year: 2024,
        location: 'Bangalore'
      },
      {
        studentName: 'Rahul M',
        photo: 'RM',
        course: 'Java Full Stack',
        company: 'Wipro',
        jobRole: 'Java Developer',
        package: '4.0 LPA',
        year: 2024,
        location: 'Pune'
      },
      {
        studentName: 'Divya R',
        photo: 'DR',
        course: 'AI & ML',
        company: 'HCL',
        jobRole: 'ML Engineer',
        package: '6.0 LPA',
        year: 2024,
        location: 'Hyderabad'
      }
    ]);
    console.log('✅ Placed Students seeded!');

    // 4. Create Success Stories
    await SuccessStory.deleteMany({});
    await SuccessStory.insertMany([
      {
        studentName: 'Karthik R',
        photo: 'KR',
        course: 'Full Stack',
        company: 'Tech Corp',
        jobRole: 'Software Engineer',
        package: '6 LPA',
        testimonial: 'The training was practical and placement support excellent!'
      },
      {
        studentName: 'Sneha M',
        photo: 'SM',
        course: 'Data Analyst',
        company: 'Analytics Inc',
        jobRole: 'Data Analyst',
        package: '4.8 LPA',
        testimonial: 'Mock interviews boosted my confidence. Got placed in 2 months!'
      },
      {
        studentName: 'Vignesh K',
        photo: 'VK',
        course: 'QA Engineer',
        company: 'Quality Systems',
        jobRole: 'QA Engineer',
        package: '4.9 LPA',
        testimonial: 'Hands-on experience helped me get placed quickly!'
      }
    ]);
    console.log('✅ Success Stories seeded!');

    // 5. Create Placement Drives
    await PlacementDrive.deleteMany({});
    await PlacementDrive.insertMany([
      {
        company: 'Tech Solutions Ltd',
        logo: 'TSL',
        role: 'Junior Software Developer',
        location: 'Chennai',
        date: new Date('2026-09-25'),
        openings: 25,
        eligibility: 'Any Graduate',
        status: 'Open'
      },
      {
        company: 'Digital Innovations',
        logo: 'DI',
        role: 'Data Analyst',
        location: 'Bangalore',
        date: new Date('2026-09-28'),
        openings: 15,
        eligibility: 'BCA/MCA/BTech',
        status: 'Open'
      }
    ]);
    console.log('✅ Placement Drives seeded!');

    console.log('\n🎉 All placement data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
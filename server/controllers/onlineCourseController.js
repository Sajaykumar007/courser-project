const OnlineCourse = require('../models/OnlineCourse');
const CourseEnrollment = require('../models/CourseEnrollment');
const OnlineCourseEnquiry = require('../models/OnlineCourseEnquiry');

// ==========================================
// ===== GET ALL ONLINE COURSES ============
// ==========================================
exports.getOnlineCourses = async (req, res) => {
  try {
    const courses = await OnlineCourse.find().sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== ENROLL IN COURSE ==================
// ==========================================
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId, courseTitle, studentName, email, phone } = req.body;

    // Check if already enrolled with this email
    const existing = await CourseEnrollment.findOne({ courseId, email });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'You are already enrolled in this course with this email!' 
      });
    }

    const enrollment = new CourseEnrollment({
      courseId,
      courseTitle,
      studentName,
      email,
      phone
    });

    await enrollment.save();
    
    res.json({ 
      success: true, 
      message: 'Successfully enrolled in the course!',
      data: enrollment 
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== CREATE COURSE (Admin) =============
// ==========================================
exports.createOnlineCourse = async (req, res) => {
  try {
    const course = new OnlineCourse(req.body);
    await course.save();
    res.json({ 
      success: true, 
      message: 'Course created successfully!', 
      data: course 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== GET ALL ENROLLMENTS (Admin) =======
// ==========================================
exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find().sort({ enrolledAt: -1 });
    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== DELETE ENROLLMENT (Admin) =========
// ==========================================
exports.deleteEnrollment = async (req, res) => {
  try {
    await CourseEnrollment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== SUBMIT ONLINE COURSE ENQUIRY ======
// ==========================================
exports.submitOnlineCourseEnquiry = async (req, res) => {
  try {
    const { courseId, courseTitle, studentName, phone } = req.body;

    if (!courseId || !studentName || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Course ID, Name, and Phone are required' 
      });
    }

    const newEnquiry = new OnlineCourseEnquiry({
      courseId,
      courseTitle,
      studentName,
      phone,
      status: 'New' // ✅ CHANGED TO 'New' FOR ADMIN DASHBOARD BADGE
    });

    await newEnquiry.save();

    res.status(201).json({ 
      success: true, 
      message: 'Enquiry submitted successfully! Our team will contact you soon.' 
    });
  } catch (error) {
    console.error('Enquiry Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while submitting enquiry' 
    });
  }
};

// ==========================================
// ===== GET ALL ENQUIRIES (Admin) =========
// ==========================================
exports.getOnlineCourseEnquiries = async (req, res) => {
  try {
    const enquiries = await OnlineCourseEnquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== DELETE ENQUIRY (Admin) ============
// ==========================================
exports.deleteOnlineCourseEnquiry = async (req, res) => {
  try {
    await OnlineCourseEnquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const Course = require('../models/Course');
const CourseEnquiry = require('../models/CourseEnquiry');

// ===== GET ALL COURSES =====
exports.getAllCourses = async (req, res) => {
  try {
    const { category, search, level } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }
    
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: courses, count: courses.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GET SINGLE COURSE =====
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CREATE COURSE (Admin) =====
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ success: true, message: 'Course created successfully!', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== UPDATE COURSE (Admin) =====
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course updated successfully!', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== DELETE COURSE (Admin) =====
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GET CATEGORIES =====
exports.getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category', { isActive: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== SUBMIT COURSE ENQUIRY =====
exports.submitCourseEnquiry = async (req, res) => {
  try {
    const { courseTitle, courseId, studentName, phone } = req.body;
    
    if (!studentName || !phone || !courseTitle) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const enquiry = new CourseEnquiry({
      courseTitle,
      courseId,
      studentName,
      phone
    });
    
    await enquiry.save();
    res.json({ 
      success: true, 
      message: 'Enquiry submitted successfully! We will contact you within 24 hours.' 
    });
  } catch (error) {
    console.error('Enquiry error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GET ALL COURSE ENQUIRIES (Admin) =====
exports.getCourseEnquiries = async (req, res) => {
  try {
    const enquiries = await CourseEnquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== DELETE COURSE ENQUIRY (Admin) =====
exports.deleteCourseEnquiry = async (req, res) => {
  try {
    await CourseEnquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
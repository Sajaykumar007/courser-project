const express = require('express');
const router = express.Router();
const onlineCourseController = require('../controllers/onlineCourseController');

// ==========================================
// ===== PUBLIC ROUTES =====================
// ==========================================
router.get('/', onlineCourseController.getOnlineCourses);
router.post('/enroll', onlineCourseController.enrollInCourse);

// ✅ NEW: Online Course Enquiry Route
router.post('/enquiry', onlineCourseController.submitOnlineCourseEnquiry);

// ==========================================
// ===== ADMIN ROUTES ======================
// ==========================================
router.post('/admin/create', onlineCourseController.createOnlineCourse);
router.get('/enrollments', onlineCourseController.getEnrollments);
router.delete('/enrollments/:id', onlineCourseController.deleteEnrollment);

module.exports = router;
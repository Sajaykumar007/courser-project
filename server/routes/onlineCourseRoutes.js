const express = require('express');
const router = express.Router();
const onlineCourseController = require('../controllers/onlineCourseController');

// ==========================================
// ===== PUBLIC ROUTES =====================
// ==========================================
router.get('/', onlineCourseController.getOnlineCourses);
router.post('/enroll', onlineCourseController.enrollInCourse);
router.post('/enquiry', onlineCourseController.submitOnlineCourseEnquiry);

// ==========================================
// ===== ADMIN ROUTES ======================
// ==========================================
router.post('/admin/create', onlineCourseController.createOnlineCourse);
router.get('/enrollments', onlineCourseController.getEnrollments);
router.delete('/enrollments/:id', onlineCourseController.deleteEnrollment);

// ✅ NEW: Admin Routes for Online Course Enquiries
router.get('/enquiries', onlineCourseController.getOnlineCourseEnquiries);
router.delete('/enquiries/:id', onlineCourseController.deleteOnlineCourseEnquiry);

module.exports = router;
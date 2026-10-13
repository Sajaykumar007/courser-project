
const express = require('express');
const router = express.Router();
const onlineCourseController = require('../controllers/onlineCourseController');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/', onlineCourseController.getOnlineCourses);
router.post('/enroll', onlineCourseController.enrollInCourse);
router.post('/enquiry', onlineCourseController.submitOnlineCourseEnquiry);

// ==========================================
// ADMIN ONLY - CREATE COURSE
// ==========================================
router.post(
  '/admin/create',
  adminAuth,
  onlineCourseController.createOnlineCourse
);

// ==========================================
// ADMIN ONLY - ENROLLMENTS
// ==========================================
router.get(
  '/enrollments',
  adminAuth,
  onlineCourseController.getEnrollments
);

router.delete(
  '/enrollments/:id',
  adminAuth,
  onlineCourseController.deleteEnrollment
);

// ==========================================
// ADMIN ONLY - ONLINE COURSE ENQUIRIES
// ==========================================
router.get(
  '/enquiries',
  adminAuth,
  onlineCourseController.getOnlineCourseEnquiries
);

router.delete(
  '/enquiries/:id',
  adminAuth,
  onlineCourseController.deleteOnlineCourseEnquiry
);

module.exports = router;

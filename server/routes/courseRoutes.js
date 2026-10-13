
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/', courseController.getAllCourses);
router.get('/categories', courseController.getCategories);

// ==========================================
// ADMIN ONLY - COURSE ENQUIRIES
// ==========================================
router.post('/enquiry', courseController.submitCourseEnquiry);
router.get(
  '/enquiries',
  adminAuth,
  courseController.getCourseEnquiries
);
router.delete(
  '/enquiries/:id',
  adminAuth,
  courseController.deleteCourseEnquiry
);

// ==========================================
// ADMIN ONLY - COURSE MANAGEMENT
// ==========================================
router.post(
  '/admin/create',
  adminAuth,
  courseController.createCourse
);
router.put(
  '/admin/update/:id',
  adminAuth,
  courseController.updateCourse
);
router.delete(
  '/admin/delete/:id',
  adminAuth,
  courseController.deleteCourse
);

// ==========================================
// PUBLIC - DYNAMIC ROUTE (MUST BE LAST)
// ==========================================
router.get('/:id', courseController.getCourseById);

module.exports = router;

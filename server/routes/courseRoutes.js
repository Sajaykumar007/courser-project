const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// ==========================================
// ===== PUBLIC ROUTES =====================
// ==========================================
router.get('/', courseController.getAllCourses);
router.get('/categories', courseController.getCategories);

// ==========================================
// ===== COURSE ENQUIRY ROUTES =============
// (Specific routes MUST come before /:id)
// ==========================================
router.post('/enquiry', courseController.submitCourseEnquiry);
router.get('/enquiries', courseController.getCourseEnquiries);
router.delete('/enquiries/:id', courseController.deleteCourseEnquiry);

// ==========================================
// ===== ADMIN ROUTES ======================
// ==========================================
router.post('/admin/create', courseController.createCourse);
router.put('/admin/update/:id', courseController.updateCourse);
router.delete('/admin/delete/:id', courseController.deleteCourse);

// ==========================================
// ===== DYNAMIC ROUTE (MUST BE LAST) ======
// ==========================================
router.get('/:id', courseController.getCourseById);

module.exports = router;
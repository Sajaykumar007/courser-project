const express = require('express');
const router = express.Router();
const placementController = require('../controllers/placementController');

// ==========================================
// ===== PUBLIC ROUTES (Frontend) =========
// ==========================================
router.get('/stats', placementController.getStats);
router.get('/hiring-partners', placementController.getHiringPartners);
router.get('/placed-students', placementController.getPlacedStudents);
router.get('/success-stories', placementController.getSuccessStories);
router.get('/placement-drives', placementController.getPlacementDrives);

// Form Submissions
router.post('/enquiry', placementController.submitEnquiry);
router.post('/hire-request', placementController.submitHireRequest);
router.post('/corporate-training-request', placementController.submitCorporateTrainingRequest); // ✅ NEW

// ==========================================
// ===== DRIVE REGISTRATION ================
// ==========================================
router.post('/register-drive', placementController.registerForDrive);

// ==========================================
// ===== ADMIN READ ROUTES =================
// ==========================================
router.get('/enquiries', placementController.getPlacementEnquiries);
router.get('/drive-registrations', placementController.getDriveRegistrations);
router.get('/hire-requests', placementController.getHireRequests);
router.get('/corporate-training-requests', placementController.getCorporateTrainingRequests); // ✅ NEW

// ==========================================
// ===== ADMIN DELETE ROUTES ===============
// ==========================================
router.delete('/drive-registrations/:id', placementController.deleteDriveRegistration);

// ==========================================
// ===== ADMIN CREATE ROUTES ===============
// ==========================================
router.post('/admin/hiring-partner', placementController.createHiringPartner);
router.post('/admin/placed-student', placementController.createPlacedStudent);
router.post('/admin/success-story', placementController.createSuccessStory);
router.post('/admin/placement-drive', placementController.createPlacementDrive);

// ==========================================
module.exports = router;
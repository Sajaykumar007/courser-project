
const express = require('express');
const router = express.Router();
const placementController = require('../controllers/placementController');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// PUBLIC ROUTES - Frontend
// ==========================================
router.get('/stats', placementController.getStats);
router.get('/hiring-partners', placementController.getHiringPartners);
router.get('/placed-students', placementController.getPlacedStudents);
router.get('/success-stories', placementController.getSuccessStories);
router.get('/placement-drives', placementController.getPlacementDrives);

// PUBLIC FORM SUBMISSIONS
router.post('/enquiry', placementController.submitEnquiry);
router.post('/hire-request', placementController.submitHireRequest);
router.post(
  '/corporate-training-request',
  placementController.submitCorporateTrainingRequest
);

// PUBLIC DRIVE REGISTRATION
router.post('/register-drive', placementController.registerForDrive);

// ==========================================
// ADMIN ONLY - READ ROUTES
// ==========================================
router.get('/enquiries', adminAuth, placementController.getPlacementEnquiries);
router.get('/drive-registrations', adminAuth, placementController.getDriveRegistrations);
router.get('/hire-requests', adminAuth, placementController.getHireRequests);
router.get(
  '/corporate-training-requests',
  adminAuth,
  placementController.getCorporateTrainingRequests
);

// ==========================================
// ADMIN ONLY - DELETE ROUTES
// ==========================================
router.delete(
  '/drive-registrations/:id',
  adminAuth,
  placementController.deleteDriveRegistration
);

// ==========================================
// ADMIN ONLY - CREATE ROUTES
// ==========================================
router.post(
  '/admin/hiring-partner',
  adminAuth,
  placementController.createHiringPartner
);
router.post(
  '/admin/placed-student',
  adminAuth,
  placementController.createPlacedStudent
);
router.post(
  '/admin/success-story',
  adminAuth,
  placementController.createSuccessStory
);
router.post(
  '/admin/placement-drive',
  adminAuth,
  placementController.createPlacementDrive
);

module.exports = router;

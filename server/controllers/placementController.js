// ==========================================
// ===== ALL MODELS IMPORTS (TOP) =========
// ==========================================
const PlacementStats = require('../models/PlacementStats');
const HiringPartner = require('../models/HiringPartner');
const PlacedStudent = require('../models/PlacedStudent');
const SuccessStory = require('../models/SuccessStory');
const PlacementDrive = require('../models/PlacementDrive');
const PlacementEnquiry = require('../models/PlacementEnquiry');
const DriveRegistration = require('../models/DriveRegistration');
const HireRequest = require('../models/HireRequest');
const CorporateTrainingRequest = require('../models/CorporateTrainingRequest'); // ✅ NEW

// ==========================================
// ===== PUBLIC READ ROUTES ================
// ==========================================
exports.getStats = async (req, res) => {
  try {
    const stats = await PlacementStats.findOne();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHiringPartners = async (req, res) => {
  try {
    const partners = await HiringPartner.find({ isActive: true });
    res.json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlacedStudents = async (req, res) => {
  try {
    const students = await PlacedStudent.find().sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().limit(6);
    res.json({ success: true, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlacementDrives = async (req, res) => {
  try {
    const drives = await PlacementDrive.find({ status: 'Open' }).sort({ date: 1 });
    res.json({ success: true, data: drives });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== PUBLIC SUBMIT ROUTES ==============
// ==========================================
exports.submitEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, course, location, experience, message } = req.body;
    const enquiry = new PlacementEnquiry({ fullName, email, phone, course, location, experience, message });
    await enquiry.save();
    res.json({ success: true, message: 'Enquiry submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitHireRequest = async (req, res) => {
  try {
    const hireRequest = new HireRequest(req.body);
    await hireRequest.save();
    res.json({ success: true, message: 'Hire request submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitCorporateTrainingRequest = async (req, res) => { // ✅ NEW
  try {
    const request = new CorporateTrainingRequest(req.body);
    await request.save();
    res.json({ success: true, message: 'Training request submitted successfully!' });
  } catch (error) {
    console.error('Corporate Training Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== DRIVE REGISTRATION ================
// ==========================================
exports.registerForDrive = async (req, res) => {
  try {
    const { driveId, companyName, jobRole, driveDate, fullName, email, phone, course } = req.body;

    const existing = await DriveRegistration.findOne({ driveId, email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already registered for this drive with this email!' });
    }

    const registration = new DriveRegistration({ driveId, companyName, jobRole, driveDate, fullName, email, phone, course });
    await registration.save();

    res.json({ success: true, message: 'Successfully registered for the placement drive!', data: registration });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== ADMIN READ ROUTES =================
// ==========================================
exports.getPlacementEnquiries = async (req, res) => {
  try {
    const enquiries = await PlacementEnquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDriveRegistrations = async (req, res) => {
  try {
    const registrations = await DriveRegistration.find().sort({ registeredAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHireRequests = async (req, res) => {
  try {
    const requests = await HireRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCorporateTrainingRequests = async (req, res) => { // ✅ NEW
  try {
    const requests = await CorporateTrainingRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== ADMIN DELETE ROUTES ===============
// ==========================================
exports.deleteDriveRegistration = async (req, res) => {
  try {
    await DriveRegistration.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== ADMIN CREATE ROUTES ===============
// ==========================================
exports.createHiringPartner = async (req, res) => {
  try {
    const partner = new HiringPartner(req.body);
    await partner.save();
    res.json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPlacedStudent = async (req, res) => {
  try {
    const student = new PlacedStudent(req.body);
    await student.save();
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSuccessStory = async (req, res) => {
  try {
    const story = new SuccessStory(req.body);
    await story.save();
    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPlacementDrive = async (req, res) => {
  try {
    const drive = new PlacementDrive(req.body);
    await drive.save();
    res.json({ success: true, data: drive });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const Lead = require('../models/Lead'); 
const { sendJoinNowEmail } = require('../utils/emailService'); 

// ==========================================
// ===== GET ALL LEADS (Admin) =============
// ==========================================
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== SUBMIT JOIN NOW (Lead) ============
// ==========================================
exports.submitJoinNow = async (req, res) => {
  try {
    console.log('📥 Join Now Request Received:', req.body); 

    // Frontend அனுப்பும் exact fields
    const { fullName, mobile, email, course, learningMode, preferredCenter, type } = req.body;

    // ✅ திருத்தம்: 'phone'க்கு பதிலாக 'mobile' என்று அப்படியே பயன்படுத்தவும்
    const newLead = new Lead({
      fullName,
      mobile,       // ✅ இது தான் முக்கியமான மாற்றம் (Model-ல் mobile required ஆக இருப்பதால்)
      email,
      course,
      learningMode,
      preferredCenter,
      type: type || 'join_now'
    });

    await newLead.save();
    console.log('✅ Lead saved to database successfully');

    // 📧 Email அனுப்புவது (Email template-ல் 'Phone Number' என்று காட்ட mobile-ஐ phone ஆக அனுப்புகிறோம்)
    sendJoinNowEmail({ 
      fullName, 
      email, 
      phone: mobile, 
      course 
    }).catch(err => {
      console.error("❌ Email failed in background:", err);
    });

    // Frontend-க்கு Success Response
    res.json({ 
      success: true, 
      message: 'Submitted successfully! Our team will contact you soon.' 
    });
    
  } catch (error) {
    console.error('❌ Error in submitJoinNow:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ===== DELETE LEAD (Admin) ===============
// ==========================================
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
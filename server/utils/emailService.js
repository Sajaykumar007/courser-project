const nodemailer = require('nodemailer');

const sendJoinNowEmail = async (userData) => {
  // ✅ DEBUGGING: இந்த function call ஆகுதா இல்லையா என்று பார்க்க
  console.log('📧 Email அனுப்ப முயற்சி... Data:', userData);

  try {
    // 1. Gmail Transporter Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email Content (அழகான HTML Design)
    const mailOptions = {
      from: `"Courser Admin" <${process.env.EMAIL_USER}>`,
      to: 'kumar207504@gmail.com', // 🎯 உங்களுக்கு Email வர வேண்டிய முகவரி
      subject: '🎓 New "Join Now" Submission Received!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">🎓 New Join Request!</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Someone submitted the Join Now form on your website.</p>
          </div>
          
          <div style="background: #f9fafb; padding: 25px;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #059669;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Full Name</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${userData.fullName || 'N/A'}</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #059669;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Email Address</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${userData.email || 'N/A'}</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #059669;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Phone Number</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${userData.phone || 'N/A'}</p>
            </div>

            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #059669;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Interested Course</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${userData.course || 'N/A'}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px;">
              <p style="margin: 0; color: #059669; font-size: 13px;">
                📅 Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // 3. Send Email
    console.log('🚀 Sending email via Nodemailer...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to kumar207504@gmail.com:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendJoinNowEmail };
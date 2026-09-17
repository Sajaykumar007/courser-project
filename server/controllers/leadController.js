// When student enrolls with referral code
const createReferral = async (referralCode, studentData, courseData) => {
  if (!referralCode) return;
  
  // Find who owns this referral code
  const referrer = await User.findOne({ referralCode });
  
  if (referrer) {
    // Create referral record
    const referral = new Referral({
      referrerName: referrer.name,
      referrerEmail: referrer.email,
      referrerPhone: referrer.phone,
      referralCode: referralCode,
      
      referredName: studentData.name,
      referredEmail: studentData.email,
      referredPhone: studentData.phone,
      
      courseName: courseData.title,
      courseFees: courseData.fees,
      
      commissionAmount: 2000,
      status: 'Pending'
    });
    
    await referral.save();
  }
};
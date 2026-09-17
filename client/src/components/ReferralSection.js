import React, { useState } from 'react';
import '../styles/ReferralSection.css';

function ReferralSection() {
  const [showModal, setShowModal] = useState(false);
  const [referralCode] = useState('COURSER' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const referralLink = `https://courser.com/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('✅ Referral link copied to clipboard!');
  };

  return (
    <section className="referral-section">
      <div className="referral-container">
        <h2 className="referral-title">Refer your Friends & Get Rewards | Get Paid</h2>
        <h3 className="referral-subtitle">1 Friend Referred = Rs. 2000</h3>
        <button className="referral-btn" onClick={() => setShowModal(true)}>
          Start Earning
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            <div className="modal-header">
              <h2>🎉 Start Earning Now!</h2>
              <p>Share your referral link and earn ₹2000 per friend</p>
            </div>

            <div className="modal-body">
              <div className="referral-code-box">
                <label>Your Referral Code:</label>
                <div className="code-display">
                  <span className="code">{referralCode}</span>
                  <button className="copy-btn" onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    alert('✅ Code copied!');
                  }}>
                    Copy
                  </button>
                </div>
              </div>

              <div className="referral-link-box">
                <label>Your Referral Link:</label>
                <div className="link-display">
                  <input type="text" value={referralLink} readOnly />
                  <button className="copy-btn" onClick={copyToClipboard}>
                    Copy Link
                  </button>
                </div>
              </div>

              <div className="how-it-works">
                <h3>📋 How It Works:</h3>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <strong>Share Your Link</strong>
                      <p>Share your unique referral link with friends</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <strong>Friend Enrolls</strong>
                      <p>Your friend joins any course using your link</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <strong>Get Paid</strong>
                      <p>Receive ₹2000 in your account within 7 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="share-options">
                <h3>📤 Share Via:</h3>
                <div className="share-buttons">
                  <button className="share-btn whatsapp" onClick={() => {
                    const text = `Join Courser with my referral code ${referralCode} and get ₹2000 discount! Use link: ${referralLink}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}>
                    WhatsApp
                  </button>
                  <button className="share-btn facebook" onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`, '_blank');
                  }}>
                    Facebook
                  </button>
                  <button className="share-btn twitter" onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?text=Join%20Courser%20with%20my%20referral%20code&url=${referralLink}`, '_blank');
                  }}>
                    Twitter
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <p className="terms">💡 Terms: Earn ₹2000 for each successful enrollment. No limit on referrals!</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReferralSection;
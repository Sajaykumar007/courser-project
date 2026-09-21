import React, { useState } from 'react';

function ReferralSection() {
  const [showModal, setShowModal] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null); // 'code' or 'link'
  const [referralCode] = useState('COURSER' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const referralLink = `https://courser.com/ref/${referralCode}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000); // Reset after 2 seconds
  };

  return (
    <>
      {/* Custom Animations Styles */}
      <style>{`
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>

      {/* ===== MAIN REFERRAL BANNER ===== */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-900 via-slate-900 to-green-950 relative overflow-hidden">
        {/* Decorative Background Elements - Logo Green Match */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold mb-6 border border-green-500/30 animate-pulse">
            💰 Earn Money
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Refer your Friends & Get Rewards
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300 mb-8">
            1 Friend Referred = ₹2000
          </h3>
          <button 
            onClick={() => setShowModal(true)}
            className="group relative px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Earning Now 
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* ===== REFERRAL MODAL ===== */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-800/50">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  🎉 Start Earning Now!
                </h2>
                <p className="text-slate-400 text-sm mt-1">Share your referral link and earn ₹2000 per friend</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-300 hover:rotate-90"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Body (Scrollable if needed) */}
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* Referral Code Box */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Your Referral Code:</label>
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <div className="flex-grow px-4 py-2 bg-slate-900/50 rounded-lg font-mono text-lg font-bold text-green-400 tracking-wider">
                    {referralCode}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(referralCode, 'code')}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                      copiedItem === 'code' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-green-600 hover:bg-green-500 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {copiedItem === 'code' ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Referral Link Box */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Your Referral Link:</label>
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <input 
                    type="text" 
                    value={referralLink} 
                    readOnly 
                    className="flex-grow bg-slate-900/50 text-slate-300 text-sm px-4 py-2.5 rounded-lg outline-none font-mono truncate"
                  />
                  <button 
                    onClick={() => copyToClipboard(referralLink, 'link')}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                      copiedItem === 'link' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-green-600 hover:bg-green-500 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {copiedItem === 'link' ? '✓ Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  📋 How It Works:
                </h3>
                <div className="space-y-4">
                  {[
                    { num: '1', title: 'Share Your Link', desc: 'Share your unique referral link with friends' },
                    { num: '2', title: 'Friend Enrolls', desc: 'Your friend joins any course using your link' },
                    { num: '3', title: 'Get Paid', desc: 'Receive ₹2000 in your account within 7 days' }
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                        {step.num}
                      </div>
                      <div>
                        <strong className="text-slate-200 block">{step.title}</strong>
                        <p className="text-slate-400 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Options */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  📤 Share Via:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => {
                      const text = `Join Courser with my referral code ${referralCode} and get ₹2000 discount! Use link: ${referralLink}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-600/10 border border-green-600/30 text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="text-2xl">💬</span>
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`, '_blank');
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-600/10 border border-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="text-2xl">📘</span>
                    <span className="text-sm font-semibold">Facebook</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=Join%20Courser%20with%20my%20referral%20code&url=${referralLink}`, '_blank');
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="text-2xl">🐦</span>
                    <span className="text-sm font-semibold">Twitter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <span className="text-green-400">💡</span> 
                Terms: Earn ₹2000 for each successful enrollment. No limit on referrals!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReferralSection;
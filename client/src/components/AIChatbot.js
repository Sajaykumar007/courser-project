import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIChatbot.css';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I\'m Courser AI Assistant. Ask me anything about our courses, placements, fees, or anything else!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dynamicCourses, setDynamicCourses] = useState([]); // ✅ NEW: Dynamic Courses State
  const messagesEndRef = useRef(null);

  // ✅ NEW: Fetch courses from backend automatically on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        if (data.success) {
          setDynamicCourses(data.data);
          console.log('AI loaded', data.data.length, 'courses from database!');
        }
      } catch (error) {
        console.error('AI could not fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ NEW: Dynamic Response Finder
  const findResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // 1. Check if user is asking about a specific course from the database
    const matchedCourse = dynamicCourses.find(course => 
      msg.includes(course.title.toLowerCase()) || 
      (course.category && msg.includes(course.category.toLowerCase()))
    );

    if (matchedCourse) {
      return `🎓 *${matchedCourse.title}*\n\n⏱️ Duration: ${matchedCourse.duration}\n📚 Lectures: ${matchedCourse.lectures}\n⭐ Rating: ${matchedCourse.rating}/5\n👥 Learners: ${matchedCourse.learners || 'Many'}\n\nFeatures:\n${matchedCourse.features ? matchedCourse.features.map(f => '✓ ' + f).join('\n') : 'Industry Standard Curriculum'}\n\nWant to know more or enroll?`;
    }

    // 2. Static Knowledge Base for general queries
    const staticKnowledgeBase = [
      {
        keywords: ['hi', 'hello', 'hey', 'hii', 'helo'],
        response: 'Hello! 😊 How can I help you today? You can ask me about courses, fees, placements, or contact details.'
      },
      {
        keywords: ['course', 'courses', 'what do you teach', 'what courses', 'list'],
        response: `We currently offer ${dynamicCourses.length}+ professional courses:\n\n${dynamicCourses.map(c => '• ' + c.title).join('\n')}\n\nWhich course interests you?`
      },
      {
        keywords: ['fee', 'fees', 'price', 'cost', 'how much', 'charges'],
        response: ' Our courses are affordably priced with flexible payment options!\n\nFor detailed fee structure, please:\n Call: +91 77060 37060\n📧 Email: hi@courser.in\n\nOr click "Enquire Now" on any course for personalized pricing!'
      },
      {
        keywords: ['placement', 'job', 'jobs', 'hire', 'recruit'],
        response: '🎯 Placement Guarantee:\n\n✅ 94% Placement Success Rate\n💰 Minimum Salary: ₹3,00,000\n💰 Maximum Salary: ₹24,00,000\n⏰ Placement within 180 days\n💸 50% Fee Refund if not placed\n\nOur alumni work at: TATA, Microsoft, Amazon, Google, Flipkart & more!'
      },
      {
        keywords: ['contact', 'phone', 'call', 'number', 'reach'],
        response: '📞 Contact Us:\n\nPhone: +91 77060 37060\nEmail: hi@courser.in\n\n📍 Locations:\n• Bangalore\n• Coimbatore\n• Peelamedu\n• Karumathampatti'
      },
      {
        keywords: ['location', 'address', 'where', 'office', 'center'],
        response: '📍 Our Centers:\n\n🏢 Bangalore\n🏢 Coimbatore\n🏢 Peelamedu\n Karumathampatti\n\nVisit any center for a free demo class!'
      },
      {
        keywords: ['enroll', 'join', 'admission', 'register', 'signup', 'sign up'],
        response: '🎓 To Enroll:\n\n1️⃣ Browse our courses\n2️⃣ Click "Enquire Now"\n3️⃣ Fill your details\n4️⃣ Our team will contact you within 24 hours\n\nOr call directly: +91 77060 37060'
      },
      {
        keywords: ['demo', 'trial', 'free class'],
        response: '🎁 Free Demo Class Available!\n\nExperience our teaching quality before enrolling. Click "FREE DEMO CLASS" button on any course page or call us at +91 77060 37060 to schedule.'
      },
      {
        keywords: ['certificate', 'certification'],
        response: '📜 Certification:\n\n✓ Industry-recognized certificates\n✓ Upon course completion\n✓ Helps in job interviews\n\nAll our courses come with certification!'
      },
      {
        keywords: ['online', 'offline', 'mode', 'class mode'],
        response: '📚 Class Modes:\n\n Online Classes - Live interactive sessions\n🏫 Offline Classes - In-person training\n🔄 Both modes available for all courses\n\nChoose what works best for you!'
      },
      {
        keywords: ['duration', 'how long', 'months', 'weeks'],
        response: `⏱️ Course Durations:\n\n${dynamicCourses.map(c => '• ' + c.title + ': ' + c.duration).join('\n')}`
      },
      {
        keywords: ['corporate', 'company training', 'bulk'],
        response: '🏢 Corporate Training:\n\nWe offer customized training for companies:\n✓ Technical Training\n✓ Soft Skills\n✓ Leadership Development\n\nContact: hi@courser.in for corporate packages!'
      },
      {
        keywords: ['refer', 'referral', 'earn', 'money', '2000'],
        response: '💰 Referral Program:\n\n🎁 Refer a friend = Earn ₹2000!\n✅ No limit on referrals\n✅ Paid within 7 days\n\nClick "Start Earning" to get your referral link!'
      },
      {
        keywords: ['thanks', 'thank you', 'thx', 'ok', 'great', 'awesome'],
        response: 'You\'re welcome!  Is there anything else I can help you with?'
      },
      {
        keywords: ['bye', 'goodbye', 'see you'],
        response: 'Goodbye! 👋 Have a great day! Visit us anytime!'
      }
    ];

    for (const item of staticKnowledgeBase) {
      for (const keyword of item.keywords) {
        if (msg.includes(keyword)) {
          return item.response;
        }
      }
    }
    
    return '🤔 I\'m not sure about that. Try asking about:\n\n• Courses we offer\n• Course fees\n• Placement details\n• Contact information\n\nOr call us at +91 77060 37060!';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(userMessage);
      setMessages(prev => [...prev, { from: 'bot', text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What courses do you offer?',
    'Tell me about placements',
    'How much is the fee?',
    'How to enroll?'
  ];

  return (
    <>
      <button 
        className={`ai-chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Chat"
      >
        {isOpen ? '✕' : '🤖'}
        {!isOpen && <span className="chat-pulse"></span>}
      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar"></div>
              <div>
                <h3>Courser AI</h3>
                <span className="chat-status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.from === 'bot' && <div className="message-avatar"></div>}
                <div className="message-bubble">
                  <p>{msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="quick-questions">
              <p className="quick-label">Quick questions:</p>
              <div className="quick-list">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    className="quick-btn"
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        const userMessage = q;
                        setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
                        setIsTyping(true);
                        setTimeout(() => {
                          const response = findResponse(userMessage);
                          setMessages(prev => [...prev, { from: 'bot', text: response }]);
                          setIsTyping(false);
                        }, 800);
                      }, 100);
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chat-send"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;
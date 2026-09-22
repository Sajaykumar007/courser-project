import React, { useState, useRef, useEffect } from 'react';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! 👋 I'm Courser AI Assistant. Ask me anything about our courses, placements, fees, or anything else!",
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dynamicCourses, setDynamicCourses] = useState([]);

  const messagesEndRef = useRef(null);

  // =====================================================
  // FETCH COURSES
  // =====================================================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          'https://courser-project.onrender.com/api/courses'
        );

        const data = await res.json();

        if (data.success) {
          setDynamicCourses(data.data);
        }
      } catch (error) {
        console.error('AI could not fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // =====================================================
  // AUTO SCROLL
  // =====================================================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // =====================================================
  // FIND RESPONSE
  // =====================================================
  const findResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Specific course search
    const matchedCourse = dynamicCourses.find(
      (course) =>
        msg.includes(course.title.toLowerCase()) ||
        (course.category &&
          msg.includes(course.category.toLowerCase()))
    );

    if (matchedCourse) {
      return `🎓 ${matchedCourse.title}

⏱️ Duration: ${matchedCourse.duration}
📚 Lectures: ${matchedCourse.lectures}
⭐ Rating: ${matchedCourse.rating}/5
👥 Learners: ${matchedCourse.learners || 'Many'}

Features:
${
  matchedCourse.features
    ? matchedCourse.features.map((f) => '✓ ' + f).join('\n')
    : 'Industry Standard Curriculum'
}

Want to know more or enroll?`;
    }

    // Static knowledge base
    const staticKnowledgeBase = [
      {
        keywords: ['hi', 'hello', 'hey', 'hii', 'helo'],
        response:
          'Hello! 😊 How can I help you today? You can ask me about courses, fees, placements, or contact details.',
      },
      {
        keywords: [
          'course',
          'courses',
          'what do you teach',
          'what courses',
          'list',
        ],
        response: `We currently offer ${dynamicCourses.length}+ professional courses:

${dynamicCourses.map((c) => '• ' + c.title).join('\n')}

Which course interests you?`,
      },
      {
        keywords: [
          'fee',
          'fees',
          'price',
          'cost',
          'how much',
          'charges',
        ],
        response: `💰 Our courses are affordably priced with flexible payment options!

For detailed fee structure:

📞 Call: +91 77060 37060
📧 Email: hi@courser.in

Or click "Enquire Now" on any course for personalized pricing!`,
      },
      {
        keywords: [
          'placement',
          'job',
          'jobs',
          'hire',
          'recruit',
        ],
        response: `🎯 Placement Guarantee:

✅ 94% Placement Success Rate
💰 Minimum Salary: ₹3,00,000
💰 Maximum Salary: ₹24,00,000
⏰ Placement within 180 days
💸 50% Fee Refund if not placed

Our alumni work at:
TATA, Microsoft, Amazon, Google, Flipkart & more!`,
      },
      {
        keywords: [
          'contact',
          'phone',
          'call',
          'number',
          'reach',
        ],
        response: `📞 Contact Us:

Phone: +91 77060 37060
Email: hi@courser.in

📍 Locations:
• Bangalore
• Coimbatore
• Peelamedu
• Karumathampatti`,
      },
      {
        keywords: [
          'location',
          'address',
          'where',
          'office',
          'center',
        ],
        response: `📍 Our Centers:

🏢 Bangalore
🏢 Coimbatore
🏢 Peelamedu
🏢 Karumathampatti

Visit any center for a free demo class!`,
      },
      {
        keywords: [
          'enroll',
          'join',
          'admission',
          'register',
          'signup',
          'sign up',
        ],
        response: `🎓 To Enroll:

1️⃣ Browse our courses
2️⃣ Click "Enquire Now"
3️⃣ Fill your details
4️⃣ Our team will contact you within 24 hours

Or call directly:
+91 77060 37060`,
      },
      {
        keywords: ['demo', 'trial', 'free class'],
        response: `🎁 Free Demo Class Available!

Experience our teaching quality before enrolling.

Click "FREE DEMO CLASS" button on any course page or call us at +91 77060 37060 to schedule.`,
      },
      {
        keywords: ['certificate', 'certification'],
        response: `📜 Certification:

✓ Industry-recognized certificates
✓ Upon course completion
✓ Helps in job interviews

All our courses come with certification!`,
      },
      {
        keywords: ['online', 'offline', 'mode', 'class mode'],
        response: `📚 Class Modes:

💻 Online Classes - Live interactive sessions
🏫 Offline Classes - In-person training
🔄 Both modes available for all courses

Choose what works best for you!`,
      },
      {
        keywords: ['duration', 'how long', 'months', 'weeks'],
        response: `⏱️ Course Durations:

${dynamicCourses
  .map((c) => `• ${c.title}: ${c.duration}`)
  .join('\n')}`,
      },
      {
        keywords: ['corporate', 'company training', 'bulk'],
        response: `🏢 Corporate Training:

We offer customized training for companies:

✓ Technical Training
✓ Soft Skills
✓ Leadership Development

Contact: hi@courser.in for corporate packages!`,
      },
      {
        keywords: ['refer', 'referral', 'earn', 'money', '2000'],
        response: `💰 Referral Program:

🎁 Refer a friend = Earn ₹2000!
✅ No limit on referrals
✅ Paid within 7 days

Click "Start Earning" to get your referral link!`,
      },
      {
        keywords: [
          'thanks',
          'thank you',
          'thx',
          'ok',
          'great',
          'awesome',
        ],
        response:
          "You're welcome! 😊 Is there anything else I can help you with?",
      },
      {
        keywords: ['bye', 'goodbye', 'see you'],
        response:
          'Goodbye! 👋 Have a great day! Visit us anytime!',
      },
    ];

    for (const item of staticKnowledgeBase) {
      for (const keyword of item.keywords) {
        if (msg.includes(keyword)) {
          return item.response;
        }
      }
    }

    return `🤔 I'm not sure about that.

Try asking about:

• Courses we offer
• Course fees
• Placement details
• Contact information

Or call us at +91 77060 37060!`;
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        from: 'user',
        text: userMessage,
      },
    ]);

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: response,
        },
      ]);

      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  // =====================================================
  // ENTER KEY
  // =====================================================
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // =====================================================
  // QUICK QUESTIONS
  // =====================================================
  const quickQuestions = [
    'What courses do you offer?',
    'Tell me about placements',
    'How much is the fee?',
    'How to enroll?',
  ];

  const handleQuickQuestion = (question) => {
    setMessages((prev) => [
      ...prev,
      {
        from: 'user',
        text: question,
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(question);

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: response,
        },
      ]);

      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* ==================================================
          AI CHATBOT FLOATING BUTTON
          (Moved Higher: bottom-[140px] / sm:bottom-[160px])
      ================================================== */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Courser AI"
          className="
            fixed
            bottom-[100px]
            sm:bottom-[110px]
            right-5
            sm:right-6
            z-[9998]

            flex
            h-14
            w-14
            sm:h-16
            sm:w-16

            items-center
            justify-center

            rounded-full

            border-2
            border-white/30

            bg-gradient-to-br
            from-emerald-500
            via-green-500
            to-emerald-700

            text-2xl
            sm:text-3xl

            text-white

            shadow-[0_10px_40px_rgba(16,185,129,0.45)]

            transition-all
            duration-300

            hover:scale-110
            hover:shadow-[0_15px_50px_rgba(16,185,129,0.65)]

            active:scale-95
          "
        >
          🤖

          {/* Pulse */}
          <span
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border-2
              border-emerald-400/60
              animate-ping
            "
          />

          {/* Online dot */}
          <span
            className="
              absolute
              right-0
              top-0
              h-4
              w-4
              rounded-full
              border-2
              border-white
              bg-lime-400
            "
          />
        </button>
      )}

      {/* ==================================================
          CHAT WINDOW
          (Moved Higher to match button: bottom-20 / sm:bottom-24)
      ================================================== */}
      {isOpen && (
        <div
          className="
            fixed
            bottom-20
            sm:bottom-24
            right-4
            sm:right-6
            z-[9999]

            flex
            w-[calc(100vw-32px)]
            max-w-[400px]

            flex-col

            overflow-hidden

            rounded-2xl

            border
            border-emerald-500/20

            bg-white

            shadow-[0_20px_70px_rgba(0,0,0,0.30)]

            animate-[chatWindowIn_0.3s_ease-out]
          "
        >
          {/* ==================================================
              HEADER
          ================================================== */}
          <div
            className="
              relative
              flex
              items-center
              justify-between

              overflow-hidden

              bg-gradient-to-r
              from-emerald-600
              via-green-600
              to-emerald-700

              px-4
              py-4

              text-white
            "
          >
            <div
              className="
                absolute
                -right-10
                -top-10
                h-32
                w-32
                rounded-full
                bg-white/10
                blur-2xl
              "
            />

            <div className="relative flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-white/30

                  bg-white/20

                  text-xl

                  shadow-lg

                  backdrop-blur-sm
                "
              >
                🤖
              </div>

              <div>
                <h3 className="text-base font-bold">
                  Courser AI
                </h3>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-lime-300
                      shadow-[0_0_8px_rgba(190,242,100,0.9)]
                      animate-pulse
                    "
                  />

                  <span className="text-xs text-white/90">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="
                relative
                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-full

                bg-white/10

                text-lg

                transition-all
                duration-200

                hover:bg-white/20
                hover:rotate-90
              "
            >
              ✕
            </button>
          </div>

          {/* ==================================================
              MESSAGES
          ================================================== */}
          <div
            className="
              h-[400px]

              overflow-y-auto

              bg-gradient-to-b
              from-slate-50
              to-white

              px-3
              py-4
            "
          >
            {messages.map((msg, idx) => {
              const lines = msg.text.split('\n');

              return (
                <div
                  key={idx}
                  className={`
                    mb-4
                    flex
                    items-end
                    gap-2

                    ${
                      msg.from === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }
                  `}
                >
                  {/* Bot Avatar */}
                  {msg.from === 'bot' && (
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center

                        rounded-full

                        bg-gradient-to-br
                        from-emerald-500
                        to-green-700

                        text-sm
                        text-white

                        shadow-md
                      "
                    >
                      🤖
                    </div>
                  )}

                  {/* Message */}
                  <div
                    className={`
                      max-w-[80%]

                      rounded-2xl

                      px-3.5
                      py-2.5

                      text-[13px]
                      leading-relaxed

                      shadow-sm

                      ${
                        msg.from === 'user'
                          ? `
                            rounded-br-md
                            bg-gradient-to-r
                            from-emerald-500
                            to-green-600
                            text-white
                          `
                          : `
                            rounded-bl-md
                            border
                            border-slate-200
                            bg-white
                            text-slate-700
                          `
                      }
                    `}
                  >
                    <p className="break-words whitespace-pre-line">
                      {lines.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < lines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* ==================================================
                TYPING
            ================================================== */}
            {isTyping && (
              <div className="mb-3 flex items-end gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-gradient-to-br
                    from-emerald-500
                    to-green-700

                    text-sm
                    text-white
                  "
                >
                  🤖
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1

                    rounded-2xl
                    rounded-bl-md

                    border
                    border-slate-200

                    bg-white

                    px-4
                    py-3

                    shadow-sm
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                      animate-bounce
                    "
                  />

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                      animate-bounce
                      [animation-delay:150ms]
                    "
                  />

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                      animate-bounce
                      [animation-delay:300ms]
                    "
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ==================================================
              QUICK QUESTIONS
          ================================================== */}
          {messages.length <= 1 && (
            <div
              className="
                border-t
                border-slate-100
                bg-white
                px-3
                py-3
              "
            >
              <p
                className="
                  mb-2
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Quick Questions
              </p>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleQuickQuestion(question)
                    }
                    className="
                      rounded-full

                      border
                      border-emerald-200

                      bg-emerald-50

                      px-3
                      py-1.5

                      text-[11px]
                      font-medium

                      text-emerald-700

                      transition-all
                      duration-200

                      hover:-translate-y-0.5
                      hover:border-emerald-400
                      hover:bg-emerald-100
                      hover:shadow-sm

                      active:scale-95
                    "
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              INPUT
          ================================================== */}
          <div
            className="
              flex
              items-center
              gap-2

              border-t
              border-slate-200

              bg-white

              p-3
            "
          >
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="
                min-w-0
                flex-1

                rounded-xl

                border
                border-slate-200

                bg-slate-50

                px-3.5
                py-2.5

                text-sm
                text-slate-700

                outline-none

                transition-all
                duration-200

                placeholder:text-slate-400

                focus:border-emerald-400
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-100
              "
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
              className="
                flex
                h-10
                w-10
                shrink-0

                items-center
                justify-center

                rounded-xl

                bg-gradient-to-r
                from-emerald-500
                to-green-600

                text-lg
                text-white

                shadow-md

                transition-all
                duration-200

                hover:scale-105
                hover:shadow-lg

                active:scale-95

                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:scale-100
              "
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          ANIMATION
      ================================================== */}
      <style>{`
        @keyframes chatWindowIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          @keyframes chatWindowIn {
            0% {
              opacity: 0;
              transform: translateY(15px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `}</style>
    </>
  );
}

export default AIChatbot;
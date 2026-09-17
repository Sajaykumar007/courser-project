import React from 'react';

function WhatsAppButton() {
  return (
    <>
      <style>{`
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          right: 25px;
          bottom: 25px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          z-index: 9999;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
        }

        .whatsapp-icon {
          width: 38px;
          height: 38px;
          display: block;
        }

        .whatsapp-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            width: 52px;
            height: 52px;
            right: 18px;
            bottom: 18px;
          }

          .whatsapp-icon {
            width: 33px;
            height: 33px;
          }
        }
      `}</style>

      <a
        href="https://wa.me/917706037060?text=Hi!%20I'm%20interested"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="whatsapp-icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green WhatsApp Circle */}
          <circle
            cx="16"
            cy="16"
            r="16"
            fill="#25D366"
          />

          {/* White WhatsApp Phone */}
          <path
            fill="#ffffff"
            d="M21.6 18.8c-.3-.15-1.8-.88-2.08-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.5.08-.76.38-.26.3-1 1-1 2.45s1.03 2.84 1.18 3.03c.15.2 2.02 3.09 4.9 4.33.68.3 1.21.48 1.62.62.68.22 1.3.19 1.79.12.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.56-.34z"
          />

          {/* White WhatsApp Ring */}
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      </a>
    </>
  );
}

export default WhatsAppButton;
import React from 'react';

function WhatsAppButton() {
  return (
    <>
      <a
        href="https://wa.me/917706037060?text=Hi!%20I'm%20interested"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="
          group
          fixed
          bottom-5
          right-5
          z-[9999]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          shadow-[0_6px_25px_rgba(37,211,102,0.45)]
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-[0_8px_35px_rgba(37,211,102,0.6)]
          sm:bottom-6
          sm:right-6
          sm:h-16
          sm:w-16
        "
      >
        {/* Outer Pulse */}
        <span
          className="
            absolute
            inset-0
            rounded-full
            border-2
            border-[#25D366]
            animate-ping
            opacity-50
          "
        />

        {/* Second Glow Ring */}
        <span
          className="
            absolute
            -inset-1
            rounded-full
            border
            border-[#25D366]/40
            animate-pulse
          "
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="
            relative
            z-10
            h-9
            w-9
            transition-all
            duration-300
            group-hover:rotate-12
            group-hover:scale-110
            sm:h-10
            sm:w-10
          "
        >
          {/* Green Circle */}
          <circle
            cx="16"
            cy="16"
            r="16"
            fill="#25D366"
          />

          {/* White Phone */}
          <path
            fill="#ffffff"
            d="M21.6 18.8c-.3-.15-1.8-.88-2.08-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.5.08-.76.38-.26.3-1 1-1 2.45s1.03 2.84 1.18 3.03c.15.2 2.02 3.09 4.9 4.33.68.3 1.21.48 1.62.62.68.22 1.3.19 1.79.12.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.56-.34z"
          />

          {/* White Ring */}
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>

        {/* Tooltip */}
        <span
          className="
            pointer-events-none
            absolute
            right-full
            mr-3
            hidden
            whitespace-nowrap
            rounded-lg
            bg-gray-900
            px-3
            py-2
            text-xs
            font-medium
            text-white
            opacity-0
            shadow-lg
            transition-all
            duration-300
            group-hover:translate-x-0
            group-hover:opacity-100
            sm:block
          "
        >
          Chat with us on WhatsApp
        </span>

      </a>
    </>
  );
}

export default WhatsAppButton;
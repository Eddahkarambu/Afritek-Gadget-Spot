import React from "react";

const Logo = ({ size = 40, showText = true }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className="relative group">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg transition-transform group-hover:scale-110"
        >
          {/* Phone Body - Outer Frame */}
          <rect
            x="15"
            y="8"
            width="70"
            height="84"
            rx="10"
            fill="url(#phoneBg)"
            stroke="url(#phoneStroke)"
            strokeWidth="2.5"
          />

          {/* Phone Screen Background */}
          <rect
            x="20"
            y="12"
            width="60"
            height="60"
            rx="6"
            fill="#0a0c10"
            stroke="#06b6d4"
            strokeWidth="1"
          />

          {/* Notch */}
          <rect x="36" y="12" width="28" height="7" rx="3" fill="#14b8a6" />

          {/* Circuit Pattern Lines - Horizontal */}
          <line
            x1="25"
            y1="25"
            x2="75"
            y2="25"
            stroke="#06b6d4"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <line
            x1="25"
            y1="35"
            x2="75"
            y2="35"
            stroke="#14b8a6"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <line
            x1="25"
            y1="45"
            x2="75"
            y2="45"
            stroke="#06b6d4"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <line
            x1="25"
            y1="55"
            x2="75"
            y2="55"
            stroke="#14b8a6"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Circuit Pattern Lines - Vertical */}
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="62"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="62"
            stroke="#14b8a6"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="70"
            y1="20"
            x2="70"
            y2="62"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Circuit Nodes - Dots */}
          <circle cx="30" cy="25" r="1.5" fill="#06b6d4" />
          <circle cx="50" cy="25" r="1.5" fill="#14b8a6" />
          <circle cx="70" cy="25" r="1.5" fill="#06b6d4" />

          <circle cx="30" cy="35" r="1.5" fill="#14b8a6" />
          <circle cx="50" cy="35" r="1.5" fill="#06b6d4" />
          <circle cx="70" cy="35" r="1.5" fill="#14b8a6" />

          <circle cx="30" cy="45" r="1.5" fill="#06b6d4" />
          <circle cx="50" cy="45" r="1.5" fill="#14b8a6" />
          <circle cx="70" cy="45" r="1.5" fill="#06b6d4" />

          <circle cx="30" cy="55" r="1.5" fill="#14b8a6" />
          <circle cx="50" cy="55" r="1.5" fill="#06b6d4" />
          <circle cx="70" cy="55" r="1.5" fill="#14b8a6" />

          {/* Diagonal Circuit Lines */}
          <line
            x1="35"
            y1="30"
            x2="65"
            y2="50"
            stroke="#06b6d4"
            strokeWidth="0.8"
            opacity="0.4"
            strokeDasharray="2,2"
          />
          <line
            x1="65"
            y1="30"
            x2="35"
            y2="50"
            stroke="#14b8a6"
            strokeWidth="0.8"
            opacity="0.4"
            strokeDasharray="2,2"
          />

          {/* Phone Bottom Section */}
          <rect
            x="20"
            y="72"
            width="60"
            height="12"
            rx="4"
            fill="url(#bottomGradient)"
            opacity="0.6"
          />

          {/* Home Button */}
          <circle
            cx="50"
            cy="78"
            r="3.5"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.2"
          />

          {/* Gradients */}
          <defs>
            {/* Phone Background Gradient */}
            <linearGradient id="phoneBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1f2e" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>

            {/* Phone Stroke Gradient */}
            <linearGradient
              id="phoneStroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>

            {/* Bottom Section Gradient */}
            <linearGradient
              id="bottomGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow Effect - Only on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="font-bold">
          <span className="text-white text-sm md:text-base">AFRITEK</span>
          <span className="text-cyan-400 ml-1 text-sm md:text-base">
            GADGET
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

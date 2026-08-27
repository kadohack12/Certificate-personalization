import React from 'react';

interface InstituteLogoProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const InstituteLogo: React.FC<InstituteLogoProps> = ({
  className = '',
  title = "ACADÉMIE D'EXCELLENCE",
  subtitle = "Institut Supérieur des Savoirs",
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Intricate Classical Academic Crest / Laurel Emblem */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="acadGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7d070" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#aa771c" />
              <stop offset="100%" stopColor="#dfba48" />
            </linearGradient>
            <linearGradient id="acadNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Academic Shield Base */}
          <path
            d="M 50 8 C 72 8, 88 16, 88 38 C 88 68, 62 86, 50 94 C 38 86, 12 68, 12 38 C 12 16, 28 8, 50 8 Z"
            fill="url(#acadNavy)"
            stroke="url(#acadGold)"
            strokeWidth="2.2"
          />

          {/* Inner Golden Inset Border */}
          <path
            d="M 50 14 C 68 14, 82 21, 82 39 C 82 64, 60 79, 50 86 C 40 79, 18 64, 18 39 C 18 21, 32 14, 50 14 Z"
            fill="none"
            stroke="url(#acadGold)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
          />

          {/* Open Book of Knowledge in Shield */}
          <path
            d="M 32 58 C 38 55, 46 55, 50 58 C 54 55, 62 55, 68 58 L 68 40 C 62 37, 54 37, 50 40 C 46 37, 38 37, 32 40 Z"
            fill="url(#acadGold)"
          />
          <line x1="50" y1="40" x2="50" y2="58" stroke="#0f172a" strokeWidth="1" />

          {/* Torch of Wisdom / Star of Enlightenment above */}
          <polygon
            points="50,22 53,28 60,29 55,34 56,40 50,37 44,40 45,34 40,29 47,28"
            fill="url(#acadGold)"
          />

          {/* Laurel Branch Left */}
          <path
            d="M 26 52 C 24 45, 26 38, 30 32"
            stroke="url(#acadGold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Laurel Branch Right */}
          <path
            d="M 74 52 C 76 45, 74 38, 70 32"
            stroke="url(#acadGold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <span className="font-cinzel text-[13px] tracking-[0.14em] font-bold text-amber-950 leading-tight">
          {title}
        </span>
        <span className="font-garamond text-[10px] tracking-[0.12em] uppercase text-amber-800/90 font-medium">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

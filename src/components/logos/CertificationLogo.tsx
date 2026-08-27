import React from 'react';

interface CertificationLogoProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const CertificationLogo: React.FC<CertificationLogoProps> = ({
  className = '',
  title = 'QUALITAS GLOBAL',
  subtitle = "Organisme d'Accréditation",
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Typography on the Left */}
      <div className="flex flex-col text-right">
        <span className="font-montserrat text-[13px] font-extrabold tracking-tight text-slate-900 leading-tight">
          {title}
        </span>
        <span className="font-montserrat text-[9px] tracking-[0.12em] uppercase text-slate-600 font-semibold">
          {subtitle}
        </span>
      </div>

      {/* Vector Certification Emblem */}
      <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="certBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="certGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Precision Certification Octagon / Badge */}
          <polygon
            points="30,8 70,8 92,30 92,70 70,92 30,92 8,70 8,30"
            fill="url(#certBlue)"
            stroke="url(#certGold)"
            strokeWidth="2"
          />

          {/* Inner Golden Circle */}
          <circle cx="50" cy="50" r="30" stroke="url(#certGold)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

          {/* Verified Checkmark Ribbon & Star */}
          <path
            d="M 38 51 L 46 59 L 64 41"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Five Stars of Excellence Arc */}
          <circle cx="50" cy="22" r="2.5" fill="url(#certGold)" />
          <circle cx="38" cy="25" r="2" fill="url(#certGold)" />
          <circle cx="62" cy="25" r="2" fill="url(#certGold)" />
        </svg>
      </div>
    </div>
  );
};

import React from 'react';
import { Signatory } from '../types';

interface SignatureDisplayProps {
  signatory: Signatory;
  className?: string;
}

export const SignatureDisplay: React.FC<SignatureDisplayProps> = ({ signatory, className = '' }) => {
  // If user drew or uploaded a signature
  if (signatory.signatureType === 'drawn' && signatory.drawnDataUrl) {
    return (
      <div className={`h-14 flex items-center justify-center ${className}`}>
        <img
          src={signatory.drawnDataUrl}
          alt={`Signature de ${signatory.name}`}
          className="max-h-14 max-w-[170px] object-contain"
        />
      </div>
    );
  }

  if (signatory.signatureType === 'uploaded' && signatory.uploadedUrl) {
    return (
      <div className={`h-14 flex items-center justify-center ${className}`}>
        <img
          src={signatory.uploadedUrl}
          alt={`Signature de ${signatory.name}`}
          className="max-h-14 max-w-[170px] object-contain mix-blend-multiply"
        />
      </div>
    );
  }

  if (signatory.signatureType === 'text') {
    return (
      <div className={`h-14 flex items-center justify-center ${className}`}>
        <span className="font-greatvibes text-3xl text-slate-800 tracking-wide select-none drop-shadow-sm">
          {signatory.name.replace(/^(M\.|Mme|Dr\.|Prof\.)\s*/, '')}
        </span>
      </div>
    );
  }

  // Presets (Vector Realistic SVG Signatures)
  switch (signatory.presetStyle) {
    case 'style1':
      return (
        <div className={`h-14 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 65" className="h-full w-40 overflow-visible stroke-slate-900" fill="none">
            {/* Elegant fluid French cursive signature with loop & underline */}
            <path
              d="M 20 40 C 25 15, 35 12, 42 35 C 46 48, 55 22, 65 38 C 72 45, 82 25, 90 32 C 100 40, 110 20, 118 35 C 125 45, 135 15, 142 30 C 148 42, 160 38, 175 42"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Extended flourish loop */}
            <path
              d="M 30 25 C 60 5, 120 8, 165 20 C 185 26, 190 45, 160 52 C 120 60, 40 58, 15 50 C 5 47, 45 42, 95 44"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case 'style2':
      return (
        <div className={`h-14 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 65" className="h-full w-40 overflow-visible stroke-slate-900" fill="none">
            {/* Executive / Doctor dynamic flourish */}
            <path
              d="M 18 20 Q 32 60 40 18 Q 48 55 60 28 Q 72 45 88 30 T 115 35 T 145 28"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 25 48 C 65 52, 115 50, 178 38 C 188 36, 175 58, 140 56"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <circle cx="152" cy="22" r="2" fill="#1e293b" />
          </svg>
        </div>
      );

    case 'style3':
      return (
        <div className={`h-14 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 65" className="h-full w-40 overflow-visible stroke-slate-900" fill="none">
            {/* Classical Ornate Loop Signature */}
            <path
              d="M 25 50 C 15 30, 28 10, 45 15 C 60 20, 50 55, 38 45 C 30 38, 55 35, 75 38 C 95 40, 105 28, 120 32 C 135 36, 145 25, 160 30"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 20 48 Q 95 62 185 45"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path d="M 155 30 L 175 22" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'style4':
    default:
      return (
        <div className={`h-14 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 65" className="h-full w-40 overflow-visible stroke-slate-900" fill="none">
            {/* Swift Modern Signature with sharp strokes */}
            <path
              d="M 20 35 L 35 15 L 45 45 L 60 25 L 75 40 L 95 28 L 125 35 L 155 22 L 180 30"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 30 52 C 70 54, 130 50, 185 42"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
  }
};

import React from 'react';

interface CertificateSealProps {
  type?: 'gold-rosette' | 'classic-round' | 'modern-shield' | 'red-wax';
  textTop?: string;
  textBottom?: string;
  centerText?: string;
  size?: number; // e.g. 100
  className?: string;
}

export const CertificateSeal: React.FC<CertificateSealProps> = ({
  type = 'gold-rosette',
  textTop = 'OFFICIEL & CERTIFIÉ',
  textBottom = 'PROMOTION 2026',
  centerText = 'EXCELLENCE',
  size = 110,
  className = '',
}) => {
  if (type === 'red-wax') {
    return (
      <div className={`relative flex flex-col items-center justify-center select-none ${className}`} style={{ width: size, height: size * 1.25 }}>
        {/* Wax Seal Body */}
        <div
          className="relative rounded-full shadow-lg flex items-center justify-center border-4 border-red-950/40"
          style={{
            width: size,
            height: size,
            background: 'radial-gradient(circle at 35% 35%, #b91c1c, #7f1d1d, #450a0a)',
            boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(0,0,0,0.35)',
          }}
        >
          {/* Inner ring */}
          <div className="w-[82%] h-[82%] rounded-full border border-dashed border-red-300/40 flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[7px] font-cinzel font-bold text-red-200 tracking-wider uppercase leading-none mb-1">
              {textTop}
            </span>
            <div className="text-[10px] font-cinzel font-black tracking-widest text-amber-200/90 drop-shadow">
              {centerText}
            </div>
            <span className="text-[7px] font-montserrat font-semibold text-red-200/90 tracking-wider uppercase leading-none mt-1">
              {textBottom}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Gold Rosette / Classic Seal
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: type === 'gold-rosette' ? size * 1.32 : size }}
    >
      {/* Ribbons hanging behind rosette */}
      {type === 'gold-rosette' && (
        <div className="absolute bottom-0 flex justify-center w-full pointer-events-none -z-0">
          {/* Left Ribbon */}
          <div
            className="w-5 h-12 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 -rotate-12 transform origin-top -mr-1 shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
          />
          {/* Right Ribbon */}
          <div
            className="w-5 h-12 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rotate-12 transform origin-top -ml-1 shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
          />
        </div>
      )}

      {/* Main Medal / Coin */}
      <div
        className="relative rounded-full flex items-center justify-center z-10"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 35% 30%, #fff7d6 0%, #d4af37 35%, #996515 70%, #5d3a00 100%)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,0,0,0.5)',
          border: '2px solid #dfba48',
        }}
      >
        {/* Scalloped / Star Teeth Border Ring */}
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-amber-200/80 flex items-center justify-center" />

        {/* Center Inner Coin */}
        <div
          className="w-[84%] h-[84%] rounded-full flex flex-col items-center justify-center p-1 text-center shadow-inner relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f7d070 0%, #d4af37 40%, #b38728 75%, #fbf5b7 100%)',
            border: '1px solid #784904',
          }}
        >
          {/* Star Top */}
          <div className="flex items-center gap-0.5 text-amber-950 text-[8px] mb-0.5">
            <span>★</span>
            <span className="text-[10px]">★</span>
            <span>★</span>
          </div>

          {/* Top Arc Text */}
          <span className="text-[7.5px] font-cinzel font-bold text-amber-950 tracking-[0.14em] uppercase leading-none max-w-[85%] truncate">
            {textTop}
          </span>

          {/* Center Main Badge Text */}
          <div className="my-0.5 py-0.5 px-2 bg-amber-950/10 rounded border border-amber-950/20 w-[90%]">
            <span className="text-[9.5px] font-cinzel font-black tracking-widest text-amber-950 uppercase block drop-shadow-sm truncate">
              {centerText}
            </span>
          </div>

          {/* Bottom Arc Text */}
          <span className="text-[7px] font-montserrat font-bold text-amber-950/90 tracking-wider uppercase leading-none max-w-[85%] truncate">
            {textBottom}
          </span>

          {/* Laurel icon bottom */}
          <div className="flex items-center text-amber-950 text-[8px] mt-0.5 opacity-80">
            <span>⚜</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CertificateData } from '../types';
import { ArtDeMailleLogo } from './logos/ArtDeMailleLogo';
import { ServeNowLogo } from './logos/ServeNowLogo';
import { CertificateSeal } from './CertificateSeal';
import { SignatureDisplay } from './SignatureDisplay';

interface CertificatePreviewProps {
  data: CertificateData;
  scale?: number;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  data,
  scale = 1,
}) => {
  // Recipient Font Class
  const getRecipientFontClass = () => {
    switch (data.recipientFont) {
      case 'alex':
        return 'font-alex font-normal';
      case 'greatvibes':
        return 'font-greatvibes font-normal';
      case 'pinyon':
        return 'font-pinyon font-normal';
      case 'cinzel':
        return 'font-cinzel font-bold tracking-widest';
      case 'playfair':
        return 'font-playfair font-bold italic';
      case 'garamond':
        return 'font-garamond font-bold italic';
      case 'montserrat':
      default:
        return 'font-montserrat font-bold tracking-tight';
    }
  };

  // Border & Color Themes
  const getThemeStyles = () => {
    switch (data.theme) {
      case 'royal-navy':
        return {
          bg: 'bg-slate-50',
          pattern: 'bg-guilloche-navy',
          outerBorder: 'border-slate-800',
          innerBorder: 'border-amber-600/70',
          accentText: 'text-sky-900',
          subAccentText: 'text-amber-800',
          goldAccent: '#d4af37',
          frameBg: 'from-slate-900 via-sky-950 to-slate-900',
          dividerColor: 'border-amber-700/40',
        };
      case 'emerald-prestige':
        return {
          bg: 'bg-emerald-50/20',
          pattern: 'bg-guilloche-gold',
          outerBorder: 'border-emerald-950',
          innerBorder: 'border-amber-600/70',
          accentText: 'text-emerald-950',
          subAccentText: 'text-amber-800',
          goldAccent: '#d4af37',
          frameBg: 'from-emerald-950 via-teal-950 to-emerald-950',
          dividerColor: 'border-emerald-800/40',
        };
      case 'burgundy-couture':
        return {
          bg: 'bg-stone-50',
          pattern: 'bg-guilloche-gold',
          outerBorder: 'border-red-950',
          innerBorder: 'border-amber-600/80',
          accentText: 'text-red-950',
          subAccentText: 'text-amber-900',
          goldAccent: '#d4af37',
          frameBg: 'from-red-950 via-rose-950 to-red-950',
          dividerColor: 'border-red-900/40',
        };
      case 'minimal-modern':
        return {
          bg: 'bg-white',
          pattern: 'bg-clean',
          outerBorder: 'border-slate-900',
          innerBorder: 'border-slate-300',
          accentText: 'text-slate-900',
          subAccentText: 'text-slate-600',
          goldAccent: '#0f172a',
          frameBg: 'from-slate-900 to-slate-800',
          dividerColor: 'border-slate-200',
        };
      case 'gold-classic':
      default:
        return {
          bg: 'bg-[#fcfbf7]',
          pattern: 'bg-guilloche-gold',
          outerBorder: 'border-[#784904]',
          innerBorder: 'border-[#b4882e]',
          accentText: 'text-[#451a03]',
          subAccentText: 'text-[#854d0e]',
          goldAccent: '#d4af37',
          frameBg: 'from-[#451a03] via-[#78350f] to-[#451a03]',
          dividerColor: 'border-amber-700/30',
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      className="transition-transform duration-200"
    >
      {/* 
        Certificate Canvas 
        Fixed Standard A4 Landscape Dimensions: 1050px × 742px (~1.414 ratio)
      */}
      <div
        id="certificateContainer"
        className={`relative w-[1050px] h-[742px] mx-auto text-slate-900 select-none shadow-2xl overflow-hidden ${themeStyle.bg} ${themeStyle.pattern}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Background Watermark if enabled */}
        {data.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] -rotate-25 z-0 select-none">
            <span className="font-cinzel text-8xl font-black tracking-widest text-slate-900 uppercase">
              {data.watermarkText || "OFFICIEL & VÉRIFIÉ"}
            </span>
          </div>
        )}

        {/* ===================== ORNATE BORDERS & FRAMES ===================== */}
        {/* Outermost Frame Layer */}
        <div className="absolute inset-3 pointer-events-none z-10">
          {/* External Thick Border */}
          <div className={`w-full h-full border-[3.5px] ${themeStyle.outerBorder} relative`}>
            {/* Secondary Inset Fine Border */}
            <div className={`absolute inset-[7px] border-[1.5px] ${themeStyle.innerBorder} border-dashed`} />

            {/* Third Inner Solid Border */}
            <div className={`absolute inset-[13px] border-[0.8px] ${themeStyle.innerBorder}`} />

            {/* Corner Rosettes & Ornaments */}
            {/* Top-Left Corner */}
            <div className="absolute -top-[14px] -left-[14px] w-9 h-9 flex items-center justify-center text-amber-600 bg-white rounded-full border border-amber-500 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-700">
                <path d="M12 2L14.4 7.6L20 9.2L16 13.4L17 19.2L12 16.2L7 19.2L8 13.4L4 9.2L9.6 7.6L12 2Z" />
              </svg>
            </div>

            {/* Top-Right Corner */}
            <div className="absolute -top-[14px] -right-[14px] w-9 h-9 flex items-center justify-center text-amber-600 bg-white rounded-full border border-amber-500 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-700">
                <path d="M12 2L14.4 7.6L20 9.2L16 13.4L17 19.2L12 16.2L7 19.2L8 13.4L4 9.2L9.6 7.6L12 2Z" />
              </svg>
            </div>

            {/* Bottom-Left Corner */}
            <div className="absolute -bottom-[14px] -left-[14px] w-9 h-9 flex items-center justify-center text-amber-600 bg-white rounded-full border border-amber-500 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-700">
                <path d="M12 2L14.4 7.6L20 9.2L16 13.4L17 19.2L12 16.2L7 19.2L8 13.4L4 9.2L9.6 7.6L12 2Z" />
              </svg>
            </div>

            {/* Bottom-Right Corner */}
            <div className="absolute -bottom-[14px] -right-[14px] w-9 h-9 flex items-center justify-center text-amber-600 bg-white rounded-full border border-amber-500 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-700">
                <path d="M12 2L14.4 7.6L20 9.2L16 13.4L17 19.2L12 16.2L7 19.2L8 13.4L4 9.2L9.6 7.6L12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===================== INNER CONTENT WRAPPER ===================== */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between px-12 py-7">
          {/* 1. TOP SECTION: LOGOS & ORGANIZATION HEADER */}
          <div className="relative z-10 flex justify-between items-center px-4 pt-1">
            {/* Logo 1: L'ART DE MAILLE */}
            <div className="w-52 h-18 flex items-center justify-start">
              {data.showLogo1 && (
                data.logo1Type === 'upload' && data.logo1CustomUrl ? (
                  <img
                    id="previewLogo1"
                    src={data.logo1CustomUrl}
                    className="max-h-16 max-w-full object-contain drop-shadow-sm"
                    alt={data.logo1Title}
                  />
                ) : (
                  <div id="placeholderLogo1">
                    <ArtDeMailleLogo
                      title={data.logo1Title}
                      subtitle={data.logo1Subtitle}
                    />
                  </div>
                )
              )}
            </div>

            {/* Center Header: Institutions & Republic */}
            <div className="flex-1 text-center px-2 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-6 h-[1px] bg-amber-600/60" />
                <span className="text-[9px] font-cinzel font-bold tracking-[0.25em] text-amber-800 uppercase">
                  {data.organizationHeader}
                </span>
                <div className="w-6 h-[1px] bg-amber-600/60" />
              </div>
              <span className="text-[8px] font-montserrat font-medium tracking-[0.14em] text-slate-500 uppercase">
                {data.organizationSubheader}
              </span>
            </div>

            {/* Logo 2: ServeNow */}
            <div className="w-52 h-18 flex items-center justify-end">
              {data.showLogo2 && (
                data.logo2Type === 'upload' && data.logo2CustomUrl ? (
                  <img
                    id="previewLogo2"
                    src={data.logo2CustomUrl}
                    className="max-h-16 max-w-full object-contain drop-shadow-sm"
                    alt={data.logo2Title}
                  />
                ) : (
                  <div id="placeholderLogo2">
                    <ServeNowLogo
                      title={data.logo2Title}
                      subtitle={data.logo2Subtitle}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* 2. CERTIFICATE IDENTITY & TITLE */}
          <div className="text-center mt-1 mb-1">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-amber-600 to-amber-700" />
              <h1 className="font-cinzel text-[26px] font-black tracking-[0.18em] text-amber-950 uppercase drop-shadow-sm">
                {data.certificateTitle}
              </h1>
              <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent via-amber-600 to-amber-700" />
            </div>

            {data.certificateSubtitle && (
              <p className="font-cinzel text-[10.5px] font-semibold tracking-[0.22em] text-amber-800 uppercase mt-0.5">
                {data.certificateSubtitle}
              </p>
            )}

            <p className="font-garamond italic text-[14px] text-slate-600 mt-1">
              {data.awardText}
            </p>
          </div>

          {/* 3. RECIPIENT NAME (CENTERPIECE) */}
          <div className="text-center my-0.5 relative py-1">
            <div
              className={`text-slate-900 transition-all ${getRecipientFontClass()} text-center`}
              style={{
                fontSize: `${data.recipientFontSize || 46}px`,
                lineHeight: '1.2',
                color: '#1e1b18',
                textShadow: '0 1px 1px rgba(0,0,0,0.08)',
              }}
            >
              {data.recipientName || 'Nom et Prénom du Récipiendaire'}
            </div>

            {/* Ornate Underline for Name */}
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="w-28 h-[1px] bg-gradient-to-r from-transparent to-amber-700/60" />
              <span className="text-amber-700 text-xs">◆</span>
              <div className="w-28 h-[1px] bg-gradient-to-l from-transparent to-amber-700/60" />
            </div>
          </div>

          {/* 4. COURSE DESCRIPTION & SPECIAL HONORS */}
          <div className="text-center px-12 max-w-4xl mx-auto my-0.5">
            <p className="font-garamond text-[13.5px] leading-relaxed text-slate-700 font-normal text-justify-center">
              {data.description}
            </p>

            {/* Course Title Badge */}
            <div className="my-1.5 py-1 px-4 bg-amber-50/80 rounded border border-amber-200/80 inline-block shadow-xs">
              <span className="font-cinzel text-[13px] font-bold tracking-wide text-amber-950 uppercase">
                « {data.courseTitle} »
              </span>
            </div>

            {data.courseDetails && (
              <p className="font-garamond italic text-[11.5px] text-slate-600 mt-0.5">
                {data.courseDetails}
              </p>
            )}

            {/* Honors & Duration Pills */}
            <div className="flex items-center justify-center gap-3 mt-1.5 text-[10.5px]">
              {data.honorsMention && (
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/90 text-amber-900 font-montserrat font-bold border border-amber-300 shadow-2xs">
                  <span className="text-amber-600">★</span>
                  <span>{data.honorsMention}</span>
                </div>
              )}
              {data.durationHours && (
                <div className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-montserrat font-medium border border-slate-200">
                  {data.durationHours}
                </div>
              )}
            </div>
          </div>

          {/* 5. BOTTOM SECTION: SIGNATORIES, SEAL & VERIFICATION */}
          <div className="relative z-10 flex items-end justify-between px-6 pt-2 pb-1 border-t border-amber-700/20">
            {/* Signatory 1 (Left) */}
            <div className="w-56 text-center flex flex-col items-center">
              <SignatureDisplay signatory={data.signatories[0]} />
              <div className="w-44 h-[1px] bg-slate-800/80 my-1" />
              <span className="font-cinzel text-[11px] font-bold text-slate-900 tracking-wide uppercase">
                {data.signatories[0].name}
              </span>
              <span className="font-garamond text-[10.5px] text-slate-600 leading-tight">
                {data.signatories[0].role}
              </span>
              <span className="font-montserrat text-[9px] text-amber-800 font-semibold uppercase">
                {data.signatories[0].organization}
              </span>
            </div>

            {/* Center: Official Seal & Verification Meta */}
            <div className="flex-1 flex flex-col items-center justify-end px-2 -mb-2">
              {data.showSeal && (
                <div className="mb-1 transform hover:scale-105 transition-transform">
                  <CertificateSeal
                    type={data.sealType}
                    textTop={data.sealTextTop}
                    textBottom={data.sealTextBottom}
                    centerText={data.sealCenterText}
                    size={88}
                  />
                </div>
              )}

              {/* Date, Location & Reference ID */}
              <div className="text-center text-[10px] text-slate-600 font-garamond mt-0.5">
                <p>
                  Fait à <span className="font-semibold text-slate-800">{data.issuePlace}</span>, le{' '}
                  <span className="font-semibold text-slate-800">{data.issueDate}</span>
                </p>
                <div className="flex items-center justify-center gap-1 text-[8.5px] font-montserrat text-slate-500 uppercase tracking-widest mt-0.5">
                  <span>N° Ref :</span>
                  <span className="font-mono font-bold text-slate-700">{data.certificateId}</span>
                </div>
              </div>
            </div>

            {/* Signatory 2 (Right) & Optional QR Code */}
            <div className="w-56 text-center flex flex-col items-center">
              <SignatureDisplay signatory={data.signatories[1]} />
              <div className="w-44 h-[1px] bg-slate-800/80 my-1" />
              <span className="font-cinzel text-[11px] font-bold text-slate-900 tracking-wide uppercase">
                {data.signatories[1].name}
              </span>
              <span className="font-garamond text-[10.5px] text-slate-600 leading-tight">
                {data.signatories[1].role}
              </span>
              <span className="font-montserrat text-[9px] text-amber-800 font-semibold uppercase">
                {data.signatories[1].organization}
              </span>
            </div>
          </div>

          {/* Absolute Minimal QR Authenticity Badge in Bottom Right Corner */}
          {data.showQrCode && (
            <div className="absolute bottom-4 right-5 flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity bg-white/70 backdrop-blur-xs p-1 rounded border border-slate-200 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-800 fill-current">
                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v3h-3v-3zm-5 0h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v4h-2v-4zm4 0h3v4h-3v-4z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[6.5px] font-montserrat font-bold text-slate-800 uppercase tracking-tighter">
                  Vérification
                </span>
                <span className="text-[6px] font-mono text-slate-500">
                  {data.certificateId.slice(-6)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

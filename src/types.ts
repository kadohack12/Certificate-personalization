export type CertificateTheme = 'gold-classic' | 'royal-navy' | 'emerald-prestige' | 'burgundy-couture' | 'minimal-modern';

export type FontStyleOption = 'greatvibes' | 'pinyon' | 'alex' | 'cinzel' | 'garamond' | 'playfair' | 'montserrat';

export interface Signatory {
  id: string;
  name: string;
  role: string;
  organization: string;
  signatureType: 'preset' | 'drawn' | 'uploaded' | 'text';
  presetStyle: 'style1' | 'style2' | 'style3' | 'style4';
  drawnDataUrl?: string;
  uploadedUrl?: string;
}

export interface CertificateData {
  // Top Header & Organizations
  organizationHeader: string;
  organizationSubheader: string;
  showLogo1: boolean;
  logo1Type: 'vector' | 'upload';
  logo1CustomUrl?: string;
  logo1Title: string;
  logo1Subtitle: string;
  
  showLogo2: boolean;
  logo2Type: 'vector' | 'upload';
  logo2CustomUrl?: string;
  logo2Title: string;
  logo2Subtitle: string;

  // Certificate Identity
  certificateTitle: string;
  certificateSubtitle: string;
  awardText: string;

  // Recipient
  recipientName: string;
  recipientFont: FontStyleOption;
  recipientFontSize: number; // in px or rem multiplier

  // Body content
  description: string;
  courseTitle: string;
  courseDetails: string;
  honorsMention: string;
  durationHours: string;

  // Dates & Verification
  issueDate: string;
  issuePlace: string;
  certificateId: string;
  verificationUrl: string;
  showQrCode: boolean;
  showWatermark: boolean;
  watermarkText: string;

  // Seal & Security
  showSeal: boolean;
  sealType: 'gold-rosette' | 'classic-round' | 'modern-shield' | 'red-wax';
  sealTextTop: string;
  sealTextBottom: string;
  sealCenterText: string;

  // Signatures
  signatories: [Signatory, Signatory];

  // Visual Theme & Styling
  theme: CertificateTheme;
  borderStyle: 'ornate-double' | 'guilloche-luxury' | 'modern-geometric' | 'classic-frame' | 'minimalist';
  accentColor: string;
  fontHeader: 'cinzel' | 'playfair' | 'garamond' | 'montserrat';
  fontBody: 'garamond' | 'playfair' | 'montserrat';
  backgroundPattern: 'guilloche' | 'parchment' | 'clean' | 'dots';
}

export interface CertificatePreset {
  id: string;
  name: string;
  description: string;
  category: string;
  data: Partial<CertificateData>;
}

import { CertificateData, CertificatePreset } from '../types';

export const initialCertificateData: CertificateData = {
  // Top Header & Organizations
  organizationHeader: "ACADÉMIE EUROPÉENNE D'EXCELLENCE & D'ENSEIGNEMENT SUPÉRIEUR",
  organizationSubheader: "PROGRAMME CONJOINT D'ACCRÉDITATION & DE CERTIFICATION PROFESSIONNELLE",
  showLogo1: true,
  logo1Type: 'vector',
  logo1Title: "ACADÉMIE D'EXCELLENCE",
  logo1Subtitle: "Institut Supérieur des Savoirs",

  showLogo2: true,
  logo2Type: 'vector',
  logo2Title: "QUALITAS GLOBAL",
  logo2Subtitle: "Organisme d'Accréditation",

  // Certificate Identity
  certificateTitle: "CERTIFICAT DE FORMATION PROFESSIONNELLE",
  certificateSubtitle: "ATTESTATION OFFICIELLE DE VALIDATION DES COMPÉTENCES",
  awardText: "Le présent certificat d'excellence est décerné avec les honneurs à :",

  // Recipient
  recipientName: "Éléonore de La Tour",
  recipientFont: 'alex',
  recipientFontSize: 46,

  // Body content
  description: "Pour avoir suivi avec assiduité, rigueur et excellence l'ensemble du cursus de perfectionnement théorique et pratique, et avoir soutenu avec succès son projet final devant la commission d'évaluation.",
  courseTitle: "Management Stratégique, Innovation & Conduite de Projets d'Excellence",
  courseDetails: "Maîtrise des standards de qualité, pilotage opérationnel, leadership d'équipe et méthodologies avancées",
  honorsMention: "Mention Très Bien — Félicitations unanimes du Jury",
  durationHours: "Volume horaire validé : 160 Heures",

  // Dates & Verification
  issueDate: "27 Août 2026",
  issuePlace: "Paris",
  certificateId: "CERT-2026-0842",
  verificationUrl: "https://cert.academie-excellence.org/verify/CERT-2026-0842",
  showQrCode: true,
  showWatermark: true,
  watermarkText: "OFFICIEL ET CERTIFIÉ",

  // Seal & Security
  showSeal: true,
  sealType: 'gold-rosette',
  sealTextTop: "RÉPUBLIQUE DE L'EXCELLENCE",
  sealTextBottom: "PARIS • SESSION 2026",
  sealCenterText: "EXCELLENCE",

  // Signatures
  signatories: [
    {
      id: 'sig-1',
      name: "Pr. Hélène De Montmirail",
      role: "Présidente du Conseil Pédagogique",
      organization: "Académie d'Excellence",
      signatureType: 'preset',
      presetStyle: 'style1',
    },
    {
      id: 'sig-2',
      name: "Dr. Alexandre Vaneck",
      role: "Directeur de l'Accréditation Internationale",
      organization: "Qualitas Certification Global",
      signatureType: 'preset',
      presetStyle: 'style2',
    },
  ],

  // Visual Theme & Styling
  theme: 'gold-classic',
  borderStyle: 'ornate-double',
  accentColor: '#92400e',
  fontHeader: 'cinzel',
  fontBody: 'garamond',
  backgroundPattern: 'guilloche',
};

export const CERTIFICATE_PRESETS: CertificatePreset[] = [
  {
    id: 'academie-management',
    name: "Académie - Management & Stratégie",
    description: "Certificat de prestige pour programmes d'excellence en gestion et leadership",
    category: "Management & Stratégie",
    data: {
      certificateTitle: "CERTIFICAT D'EXCELLENCE EN MANAGEMENT",
      certificateSubtitle: "PROGRAMME SUPÉRIEUR DE LEADERSHIP & GOUVERNANCE",
      courseTitle: "Management Stratégique, Innovation & Conduite du Changement",
      courseDetails: "Pilotage de la transformation, prise de décision stratégique et négociation complexe",
      honorsMention: "Mention Très Bien — Félicitations du Conseil",
      theme: 'gold-classic',
      borderStyle: 'ornate-double',
      sealType: 'gold-rosette',
    },
  },
  {
    id: 'qualitas-leadership',
    name: "Qualitas - Leadership & Innovation",
    description: "Certification de compétences en gestion de projets, innovation et gouvernance",
    category: "Leadership & Impact",
    data: {
      certificateTitle: "CERTIFICAT DE LEADERSHIP ET D'INNOVATION",
      certificateSubtitle: "CYCLE CERTIFIANT DE HAUTE ACCRÉDITATION",
      courseTitle: "Gestion de Projets d'Impact, Synergie d'Équipe & Gouvernance",
      courseDetails: "Coordination opérationnelle, gestion budgétaire éthique et performance durable",
      honorsMention: "Mention Spéciale : Excellence Opérationnelle",
      theme: 'royal-navy',
      borderStyle: 'guilloche-luxury',
      sealType: 'classic-round',
    },
  },
  {
    id: 'formation-professionnelle-continue',
    name: "Attestation de Formation Continue",
    description: "Attestation officielle reconnue pour valorisation de compétences professionnelles",
    category: "Formation Continue",
    data: {
      certificateTitle: "ATTESTATION DE FORMATION PROFESSIONNELLE",
      certificateSubtitle: "VALIDATION OFFICIELLE DES ACQUIS ET SAVOIR-FAIRE",
      courseTitle: "Perfectionnement Technique et Conduite Opérationnelle",
      courseDetails: "Normes de qualité, sécurité en production et optimisation des processus",
      honorsMention: "Cycle Certifiant Agréé - Mention Très Bien",
      theme: 'emerald-prestige',
      borderStyle: 'ornate-double',
      sealType: 'gold-rosette',
    },
  },
  {
    id: 'couture-bordeaux-prestige',
    name: "Prestige Bordeaux & Dorure",
    description: "Thème somptueux velours bordeaux et ornements dorés d'époque",
    category: "Luxe & Distinction",
    data: {
      certificateTitle: "BREVET D'EXCELLENCE & DE MAÎTRISE ARTISTIQUE",
      certificateSubtitle: "DÉCERNÉ PAR LE COLLÈGE TECHNIQUE SUPÉRIEUR",
      courseTitle: "Hautes Études Artistiques, Design & Création d'Exception",
      courseDetails: "Recherche esthétique, perfection formelle et maîtrise des techniques traditionnelles",
      theme: 'burgundy-couture',
      borderStyle: 'guilloche-luxury',
      sealType: 'red-wax',
    },
  },
];

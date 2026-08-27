import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Calendar,
  User,
  Award,
  Building2,
  X,
  Lock,
} from 'lucide-react';
import { CertificateData } from '../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CertificateData;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const verificationUrl = `${window.location.origin}${window.location.pathname}#verify=${data.certificateId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                Registre Public d'Authenticité
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Certifié
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                ID : {data.certificateId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Status card */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-200 text-sm">
                Document Officiel Valide & Enregistré
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ce titre de compétences est vérifiable publiquement et a été émis conjointement par <strong>{data.logo1Title || "l'Institution Principale"}</strong> et <strong>{data.logo2Title || "l'Organisme Certificateur"}</strong>.
              </p>
            </div>
          </div>

          {/* Details summary */}
          <div className="space-y-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <span className="text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Bénéficiaire
              </span>
              <span className="font-bold text-slate-100 text-sm">{data.recipientName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Intitulé du Titre
              </span>
              <span className="font-semibold text-amber-200 text-right max-w-[240px] truncate">
                {data.courseTitle}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Date & Lieu
              </span>
              <span className="text-slate-300 font-medium">{data.issuePlace}, le {data.issueDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Organismes Émetteurs
              </span>
              <span className="text-slate-300 font-medium truncate max-w-[240px]">{data.logo1Title} & {data.logo2Title}</span>
            </div>
          </div>

          {/* Verification link box */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Lien direct de vérification sécurisé
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={verificationUrl}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 select-all focus:outline-hidden"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  copied
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-slate-400" />
            Vérification conforme aux standards académiques
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

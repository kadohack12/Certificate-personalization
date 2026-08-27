import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Calendar,
  PenTool,
  Palette,
  Sparkles,
  RefreshCw,
  Award,
  Dice5,
  Stamp,
  Bookmark,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CertificateData, FontStyleOption, CertificateTheme } from '../types';
import { generateRandomCertificateId } from '../utils/exportUtils';
import { CERTIFICATE_PRESETS } from '../data/presets';

interface SimpleEditorProps {
  data: CertificateData;
  onChange: (updated: Partial<CertificateData>) => void;
}

const SAMPLE_NAMES = [
  'Éléonore de La Tour',
  'Alexandre Martin',
  'Sophie De Saint-Germain',
  'Thomas Lefebvre',
  'Camille Bernard',
  'Guillaume Moreau',
  'Inès Belkacem',
  'Julien Rostand',
];

export const SimpleEditor: React.FC<SimpleEditorProps> = ({ data, onChange }) => {
  const [showInstitutions, setShowInstitutions] = useState(false);

  const fontStyles: { id: FontStyleOption; label: string }[] = [
    { id: 'alex', label: 'Calligraphie' },
    { id: 'pinyon', label: 'Plume Fine' },
    { id: 'playfair', label: 'Élégant Romain' },
    { id: 'montserrat', label: 'Moderne' },
  ];

  const themes: { id: CertificateTheme; label: string; color: string }[] = [
    { id: 'gold-classic', label: 'Or & Ivoire', color: 'bg-amber-600' },
    { id: 'royal-navy', label: 'Bleu Royal', color: 'bg-sky-700' },
    { id: 'burgundy-couture', label: 'Bordeaux', color: 'bg-red-800' },
    { id: 'emerald-prestige', label: 'Émeraude', color: 'bg-emerald-700' },
  ];

  const handleRandomName = () => {
    const random = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    onChange({ recipientName: random });
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = CERTIFICATE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange({ ...preset.data });
    }
  };

  return (
    <div className="w-full bg-slate-900 border-r border-slate-800 p-5 space-y-5 text-slate-200 overflow-y-auto h-full">
      {/* Quick Presets selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Bookmark className="w-4 h-4" />
          Modèles Prêts à l'Emploi
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {CERTIFICATE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleApplyPreset(p.id)}
              className="px-2.5 py-1.5 text-left rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition group"
            >
              <div className="font-semibold text-amber-300/90 group-hover:text-amber-300 truncate">
                {p.name.split(' - ')[0]}
              </div>
              <div className="text-[10px] text-slate-500 truncate">{p.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Recipient Name & Style */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <User className="w-4 h-4" />
            Nom du Récipiendaire
          </label>
          <button
            type="button"
            onClick={handleRandomName}
            className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition"
            title="Générer un exemple de nom"
          >
            <Dice5 className="w-3.5 h-3.5" />
            Exemple
          </button>
        </div>
        <input
          id="inputRecipient"
          type="text"
          value={data.recipientName}
          onChange={(e) => onChange({ recipientName: e.target.value })}
          placeholder="Ex : Éléonore de La Tour"
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-semibold text-sm focus:outline-hidden focus:border-amber-400 transition"
        />

        {/* Font Style Selection Pills */}
        <div className="pt-1">
          <label className="text-[11px] text-slate-400 block mb-1.5">Style d'écriture du nom</label>
          <div className="grid grid-cols-2 gap-1.5">
            {fontStyles.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ recipientFont: f.id })}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border transition text-center ${
                  data.recipientFont === f.id
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Course & Details */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          Formation & Titre
        </label>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Intitulé du certificat / Diplôme</label>
          <input
            type="text"
            value={data.certificateTitle}
            onChange={(e) => onChange({ certificateTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Nom de la Formation</label>
          <input
            type="text"
            value={data.courseTitle}
            onChange={(e) => onChange({ courseTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-200 font-semibold focus:outline-hidden focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Mention / Honneurs</label>
          <input
            type="text"
            value={data.honorsMention}
            onChange={(e) => onChange({ honorsMention: e.target.value })}
            placeholder="Ex : Mention Très Bien"
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-hidden focus:border-amber-400"
          />
        </div>
      </div>

      {/* 3. Organismes Émetteurs (Collapsible) */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setShowInstitutions(!showInstitutions)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Organismes Émetteurs
          </span>
          {showInstitutions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showInstitutions && (
          <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Institution 1 (Gauche)</label>
              <input
                type="text"
                value={data.logo1Title}
                onChange={(e) => {
                  const val = e.target.value;
                  const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                  newSigs[0] = { ...newSigs[0], organization: val };
                  onChange({ logo1Title: val, signatories: newSigs });
                }}
                className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Organisme 2 (Droite)</label>
              <input
                type="text"
                value={data.logo2Title}
                onChange={(e) => {
                  const val = e.target.value;
                  const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                  newSigs[1] = { ...newSigs[1], organization: val };
                  onChange({ logo2Title: val, signatories: newSigs });
                }}
                className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Signatures */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <PenTool className="w-4 h-4" />
          Signataires Officiels
        </label>

        {/* Signatory 1 */}
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-amber-300">
            <span>Signataire 1 ({data.logo1Title || "Institution 1"})</span>
          </div>
          <input
            type="text"
            value={data.signatories[0].name}
            onChange={(e) => {
              const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
              newSigs[0] = { ...newSigs[0], name: e.target.value };
              onChange({ signatories: newSigs });
            }}
            placeholder="Nom complet"
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
          />
          <input
            type="text"
            value={data.signatories[0].role}
            onChange={(e) => {
              const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
              newSigs[0] = { ...newSigs[0], role: e.target.value };
              onChange({ signatories: newSigs });
            }}
            placeholder="Titre / Fonction"
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
          />
        </div>

        {/* Signatory 2 */}
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-sky-300">
            <span>Signataire 2 ({data.logo2Title || "Organisme 2"})</span>
          </div>
          <input
            type="text"
            value={data.signatories[1].name}
            onChange={(e) => {
              const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
              newSigs[1] = { ...newSigs[1], name: e.target.value };
              onChange({ signatories: newSigs });
            }}
            placeholder="Nom complet"
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
          />
          <input
            type="text"
            value={data.signatories[1].role}
            onChange={(e) => {
              const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
              newSigs[1] = { ...newSigs[1], role: e.target.value };
              onChange({ signatories: newSigs });
            }}
            placeholder="Titre / Fonction"
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
          />
        </div>
      </div>

      {/* 5. Date & Lieu */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          Date & Délivrance
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Lieu</label>
            <input
              type="text"
              value={data.issuePlace}
              onChange={(e) => onChange({ issuePlace: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Date</label>
            <input
              type="text"
              value={data.issueDate}
              onChange={(e) => onChange({ issueDate: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
            />
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">N° {data.certificateId}</span>
          <button
            type="button"
            onClick={() => onChange({ certificateId: generateRandomCertificateId() })}
            className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Nouveau N°
          </button>
        </div>
      </div>

      {/* 6. Theme & Seal Selection */}
      <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Palette className="w-4 h-4" />
          Couleur du Certificat
        </label>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ theme: t.id })}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs transition ${
                data.theme === t.id
                  ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                  : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
              <span className="truncate">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Sceau & Filigrane quick toggles */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.showSeal}
              onChange={(e) => onChange({ showSeal: e.target.checked })}
              className="rounded accent-amber-400"
            />
            <span>Sceau de Sécurité</span>
          </label>
          <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.showWatermark}
              onChange={(e) => onChange({ showWatermark: e.target.checked })}
              className="rounded accent-amber-400"
            />
            <span>Filigrane</span>
          </label>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Type,
  Image as ImageIcon,
  Shield,
  FileCheck,
  Palette,
  Upload,
  PenTool,
  RefreshCw,
  Sliders,
  Check,
} from 'lucide-react';
import { CertificateData, FontStyleOption, CertificateTheme } from '../types';
import { CERTIFICATE_PRESETS } from '../data/presets';
import { generateRandomCertificateId } from '../utils/exportUtils';

interface EditorPanelProps {
  data: CertificateData;
  onChange: (updated: Partial<CertificateData>) => void;
  onOpenSignatureModal: (signatoryIndex: 0 | 1) => void;
  onOpenBatchModal: () => void;
}

type TabType = 'content' | 'logos' | 'signatures' | 'theme';

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  onOpenSignatureModal,
  onOpenBatchModal,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('content');

  const handleLogoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    logoKey: 'logo1CustomUrl' | 'logo2CustomUrl',
    typeKey: 'logo1Type' | 'logo2Type'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          [logoKey]: reader.result as string,
          [typeKey]: 'upload',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = CERTIFICATE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange(preset.data);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Top Presets Quick Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Modèles Préconfigurés
          </label>
          <button
            onClick={onOpenBatchModal}
            className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 underline flex items-center gap-1"
          >
            Mode Multi-Récipiendaires
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {CERTIFICATE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700/70 hover:border-amber-500/50 text-[11px] transition truncate"
              title={preset.description}
            >
              <div className="font-semibold text-slate-100 truncate">{preset.name}</div>
              <div className="text-[9.5px] text-slate-400 truncate">{preset.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/30 px-3 pt-2 gap-1">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'content'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Texte & Élève
        </button>

        <button
          onClick={() => setActiveTab('logos')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'logos'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Logos
        </button>

        <button
          onClick={() => setActiveTab('signatures')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'signatures'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Signatures & Sceau
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'theme'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Design
        </button>
      </div>

      {/* Tab Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ================= TAB 1: TEXTE & RÉCIPIENDAIRE ================= */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Recipient Card */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Récipiendaire (Bénéficiaire)
                </label>
                <span className="text-[10px] text-slate-400">Nom central</span>
              </div>

              <div>
                <input
                  id="inputRecipient"
                  type="text"
                  value={data.recipientName}
                  onChange={(e) => onChange({ recipientName: e.target.value })}
                  placeholder="Ex : Éléonore de La Tour"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-semibold text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Font Selection */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Style Calligraphique</label>
                  <select
                    value={data.recipientFont}
                    onChange={(e) => onChange({ recipientFont: e.target.value as FontStyleOption })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="alex">Alex Brush (Calligraphie Royale)</option>
                    <option value="greatvibes">Great Vibes (Cursive Fluide)</option>
                    <option value="pinyon">Pinyon Script (Vintage Plume)</option>
                    <option value="cinzel">Cinzel (Romain Majuscule)</option>
                    <option value="playfair">Playfair Display (Élégant)</option>
                    <option value="garamond">Cormorant Garamond (Classique)</option>
                    <option value="montserrat">Montserrat (Moderne)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                    <span>Taille</span>
                    <span className="text-amber-400 font-mono">{data.recipientFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={32}
                    max={64}
                    value={data.recipientFontSize}
                    onChange={(e) => onChange({ recipientFontSize: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Certificate Titles */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Titres & Attribution
              </label>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Titre Principal</label>
                <input
                  type="text"
                  value={data.certificateTitle}
                  onChange={(e) => onChange({ certificateTitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-medium focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sous-titre / Section</label>
                <input
                  type="text"
                  value={data.certificateSubtitle}
                  onChange={(e) => onChange({ certificateSubtitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Texte d'attribution</label>
                <input
                  type="text"
                  value={data.awardText}
                  onChange={(e) => onChange({ awardText: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            {/* Course & Content */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Détails du Programme & Mention
              </label>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Intitulé de la Formation / Stage</label>
                <input
                  type="text"
                  value={data.courseTitle}
                  onChange={(e) => onChange({ courseTitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-300 font-semibold focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Texte d'Attestation / Description</label>
                <textarea
                  rows={3}
                  value={data.description}
                  onChange={(e) => onChange({ description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Modules / Compétences acquises</label>
                <input
                  type="text"
                  value={data.courseDetails}
                  onChange={(e) => onChange({ courseDetails: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mention / Honneurs</label>
                  <input
                    type="text"
                    value={data.honorsMention}
                    onChange={(e) => onChange({ honorsMention: e.target.value })}
                    placeholder="Ex: Mention Très Bien"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Volume Horaire / Session</label>
                  <input
                    type="text"
                    value={data.durationHours}
                    onChange={(e) => onChange({ durationHours: e.target.value })}
                    placeholder="Ex: 160 Heures"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LOGOS & ORGANISATIONS ================= */}
        {activeTab === 'logos' && (
          <div className="space-y-4">
            {/* Header Text */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                En-tête Institutionnel
              </label>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Ligne Principale</label>
                <input
                  type="text"
                  value={data.organizationHeader}
                  onChange={(e) => onChange({ organizationHeader: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sous-ligne</label>
                <input
                  type="text"
                  value={data.organizationSubheader}
                  onChange={(e) => onChange({ organizationSubheader: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            {/* Logo 1: Institution Principale */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Logo 1 : Institution Principale (Gauche)
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showLogo1}
                    onChange={(e) => onChange({ showLogo1: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  Afficher
                </label>
              </div>

              {data.showLogo1 && (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onChange({ logo1Type: 'vector' })}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        data.logo1Type === 'vector'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      Vectoriel Authentique
                    </button>
                    <label
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border text-center cursor-pointer transition ${
                        data.logo1Type === 'upload'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <Upload className="w-3 h-3 inline mr-1" />
                      Uploader Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'logo1CustomUrl', 'logo1Type')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Nom Institution</label>
                      <input
                        type="text"
                        value={data.logo1Title}
                        onChange={(e) => onChange({ logo1Title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Sous-titre / Branche</label>
                      <input
                        type="text"
                        value={data.logo1Subtitle}
                        onChange={(e) => onChange({ logo1Subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Logo 2: Organisme Certificateur */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Logo 2 : Organisme Certificateur (Droite)
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showLogo2}
                    onChange={(e) => onChange({ showLogo2: e.target.checked })}
                    className="accent-sky-500 rounded"
                  />
                  Afficher
                </label>
              </div>

              {data.showLogo2 && (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onChange({ logo2Type: 'vector' })}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        data.logo2Type === 'vector'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      Vectoriel Authentique
                    </button>
                    <label
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border text-center cursor-pointer transition ${
                        data.logo2Type === 'upload'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <Upload className="w-3 h-3 inline mr-1" />
                      Uploader Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'logo2CustomUrl', 'logo2Type')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Nom Organisme</label>
                      <input
                        type="text"
                        value={data.logo2Title}
                        onChange={(e) => onChange({ logo2Title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Sous-titre / Accréditation</label>
                      <input
                        type="text"
                        value={data.logo2Subtitle}
                        onChange={(e) => onChange({ logo2Subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SIGNATURES & SCEAU ================= */}
        {activeTab === 'signatures' && (
          <div className="space-y-4">
            {/* Signatory 1 */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Signataire 1 (Gauche)
                </label>
                <button
                  onClick={() => onOpenSignatureModal(0)}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition"
                >
                  <PenTool className="w-3 h-3" />
                  Tracer Signature
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={data.signatories[0].name}
                  onChange={(e) => {
                    const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                    newSigs[0] = { ...newSigs[0], name: e.target.value };
                    onChange({ signatories: newSigs });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Fonction / Rôle</label>
                  <input
                    type="text"
                    value={data.signatories[0].role}
                    onChange={(e) => {
                      const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                      newSigs[0] = { ...newSigs[0], role: e.target.value };
                      onChange({ signatories: newSigs });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Organisation</label>
                  <input
                    type="text"
                    value={data.signatories[0].organization}
                    onChange={(e) => {
                      const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                      newSigs[0] = { ...newSigs[0], organization: e.target.value };
                      onChange({ signatories: newSigs });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Style de Signature Prédéfinie</label>
                <select
                  value={data.signatories[0].signatureType === 'preset' ? data.signatories[0].presetStyle : 'custom'}
                  onChange={(e) => {
                    const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                    if (e.target.value.startsWith('style')) {
                      newSigs[0] = {
                        ...newSigs[0],
                        signatureType: 'preset',
                        presetStyle: e.target.value as any,
                      };
                    } else if (e.target.value === 'text') {
                      newSigs[0] = { ...newSigs[0], signatureType: 'text' };
                    }
                    onChange({ signatories: newSigs });
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="style1">Cursive Française avec arabesque</option>
                  <option value="style2">Signature Cadre Dirigeant / Docteur</option>
                  <option value="style3">Calligraphie Ornée & Boucles</option>
                  <option value="style4">Signature Moderne Végétale</option>
                  <option value="text">Texte Cursif Automatique</option>
                </select>
              </div>
            </div>

            {/* Signatory 2 */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Signataire 2 (Droite)
                </label>
                <button
                  onClick={() => onOpenSignatureModal(1)}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-md transition"
                >
                  <PenTool className="w-3 h-3" />
                  Tracer Signature
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={data.signatories[1].name}
                  onChange={(e) => {
                    const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                    newSigs[1] = { ...newSigs[1], name: e.target.value };
                    onChange({ signatories: newSigs });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Fonction / Rôle</label>
                  <input
                    type="text"
                    value={data.signatories[1].role}
                    onChange={(e) => {
                      const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                      newSigs[1] = { ...newSigs[1], role: e.target.value };
                      onChange({ signatories: newSigs });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Organisation</label>
                  <input
                    type="text"
                    value={data.signatories[1].organization}
                    onChange={(e) => {
                      const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                      newSigs[1] = { ...newSigs[1], organization: e.target.value };
                      onChange({ signatories: newSigs });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Style de Signature</label>
                <select
                  value={data.signatories[1].signatureType === 'preset' ? data.signatories[1].presetStyle : 'custom'}
                  onChange={(e) => {
                    const newSigs = [...data.signatories] as [typeof data.signatories[0], typeof data.signatories[1]];
                    if (e.target.value.startsWith('style')) {
                      newSigs[1] = {
                        ...newSigs[1],
                        signatureType: 'preset',
                        presetStyle: e.target.value as any,
                      };
                    } else if (e.target.value === 'text') {
                      newSigs[1] = { ...newSigs[1], signatureType: 'text' };
                    }
                    onChange({ signatories: newSigs });
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="style2">Signature Cadre Dirigeant / Docteur</option>
                  <option value="style1">Cursive Française avec arabesque</option>
                  <option value="style3">Calligraphie Ornée & Boucles</option>
                  <option value="style4">Signature Moderne Végétale</option>
                  <option value="text">Texte Cursif Automatique</option>
                </select>
              </div>
            </div>

            {/* Official Seal */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Sceau Officiel d'Excellence
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showSeal}
                    onChange={(e) => onChange({ showSeal: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  Afficher
                </label>
              </div>

              {data.showSeal && (
                <>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Type de Sceau</label>
                    <select
                      value={data.sealType}
                      onChange={(e) => onChange({ sealType: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200"
                    >
                      <option value="gold-rosette">Rosace Dorée avec Rubans (Prestige)</option>
                      <option value="classic-round">Cachet Circulaire Officiel</option>
                      <option value="red-wax">Sceau de Cire Rouge Carmin</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Texte Haut</label>
                      <input
                        type="text"
                        value={data.sealTextTop}
                        onChange={(e) => onChange({ sealTextTop: e.target.value })}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Texte Centre</label>
                      <input
                        type="text"
                        value={data.sealCenterText}
                        onChange={(e) => onChange({ sealCenterText: e.target.value })}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Texte Bas</label>
                      <input
                        type="text"
                        value={data.sealTextBottom}
                        onChange={(e) => onChange({ sealTextBottom: e.target.value })}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: DESIGN & THÈME ================= */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Color Themes */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Thème Visuel & Palette
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChange({ theme: 'gold-classic' })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    data.theme === 'gold-classic'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                      : 'border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 border border-amber-200" />
                  <span className="text-xs">Or Baroque (Maille)</span>
                </button>

                <button
                  onClick={() => onChange({ theme: 'royal-navy' })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    data.theme === 'royal-navy'
                      ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-semibold'
                      : 'border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-400 to-slate-900 border border-sky-300" />
                  <span className="text-xs">Bleu Royal (ServeNow)</span>
                </button>

                <button
                  onClick={() => onChange({ theme: 'emerald-prestige' })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    data.theme === 'emerald-prestige'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold'
                      : 'border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-950 border border-emerald-300" />
                  <span className="text-xs">Émeraude Prestige</span>
                </button>

                <button
                  onClick={() => onChange({ theme: 'burgundy-couture' })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    data.theme === 'burgundy-couture'
                      ? 'border-red-500 bg-red-500/10 text-red-300 font-semibold'
                      : 'border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-red-950 border border-rose-300" />
                  <span className="text-xs">Velours Bordeaux</span>
                </button>
              </div>
            </div>

            {/* Verification, Dates & Watermark */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Authenticité, Dates & Sécurité
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Lieu de Délivrance</label>
                  <input
                    type="text"
                    value={data.issuePlace}
                    onChange={(e) => onChange({ issuePlace: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Date de Délivrance</label>
                  <input
                    type="text"
                    value={data.issueDate}
                    onChange={(e) => onChange({ issueDate: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-400">Numéro de Référence Unique</label>
                  <button
                    onClick={() => onChange({ certificateId: generateRandomCertificateId() })}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Régénérer
                  </button>
                </div>
                <input
                  type="text"
                  value={data.certificateId}
                  onChange={(e) => onChange({ certificateId: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-amber-300"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showQrCode}
                    onChange={(e) => onChange({ showQrCode: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  Afficher QR Code d'Authenticité
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showWatermark}
                    onChange={(e) => onChange({ showWatermark: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  Filigrane de Sécurité
                </label>
              </div>

              {data.showWatermark && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Texte du Filigrane</label>
                  <input
                    type="text"
                    value={data.watermarkText}
                    onChange={(e) => onChange({ watermarkText: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

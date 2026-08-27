import React, { useState } from 'react';
import { X, Users, Download, Eye, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { CertificateData } from '../types';
import { exportCertificateToPDF } from '../utils/exportUtils';

interface BatchGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseData: CertificateData;
  onSelectRecipient: (name: string, mention?: string) => void;
}

interface BatchRecipient {
  name: string;
  mention?: string;
  id: string;
}

export const BatchGeneratorModal: React.FC<BatchGeneratorModalProps> = ({
  isOpen,
  onClose,
  baseData,
  onSelectRecipient,
}) => {
  const [inputText, setInputText] = useState<string>(
    `Éléonore de La Tour\nJean-Baptiste Mounier; Félicitations du Jury\nSophie Vandevelde; Mention Très Bien\nKarim Benali\nClaire Duchêne; Mention Bien`
  );
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  if (!isOpen) return null;

  const recipients: BatchRecipient[] = inputText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => {
      const parts = line.split(/[;,|]/);
      return {
        name: parts[0]?.trim() || '',
        mention: parts[1]?.trim(),
        id: `batch-${idx + 1}`,
      };
    })
    .filter((r) => r.name.length > 0);

  const handleExportAll = async () => {
    if (recipients.length === 0) return;
    setIsExportingAll(true);
    setProgress({ current: 0, total: recipients.length });

    for (let i = 0; i < recipients.length; i++) {
      const r = recipients[i];
      setProgress({ current: i + 1, total: recipients.length });
      onSelectRecipient(r.name, r.mention);

      // Brief delay to allow DOM to re-render with new recipient name
      await new Promise((resolve) => setTimeout(resolve, 600));

      const fileName = `Certificat_${r.name.replace(/\s+/g, '_')}_${baseData.certificateId}.pdf`;
      await exportCertificateToPDF('certificateContainer', fileName);
    }

    setIsExportingAll(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-amber-400">
                Génération en Lot (Multi-Récipiendaires)
              </h3>
              <p className="text-xs text-slate-400">
                Générez des dizaines de certificats personnalisés en un seul clic
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Instruction */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Entrez un nom par ligne. Vous pouvez ajouter une mention personnalisée après un point-virgule (ex : <span className="font-mono text-amber-300">Marie Martin; Mention Très Bien</span>).
            </span>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Liste des Récipiendaires ({recipients.length} détecté{recipients.length > 1 ? 's' : ''})
              </label>
              <button
                onClick={() =>
                  setInputText(
                    `Alexandre Dumont; Félicitations du Jury\nCéline Renaud; Mention Très Bien\nMarc Kaboré\nIsabelle Fontaine; Mention Spéciale\nLucas Mercier`
                  )
                }
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Charger un exemple
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs focus:outline-hidden focus:border-amber-500 resize-none"
              placeholder="Prénom Nom&#10;Prénom Nom; Mention optionnelle"
            />
          </div>

          {/* Preview list */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Aperçu & Sélection Immédiate
            </h4>
            <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/50 divide-y divide-slate-800/60">
              {recipients.map((r, i) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-800/40 text-xs transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-slate-500 font-mono text-[11px]">{i + 1}.</span>
                    <span className="font-semibold text-slate-200">{r.name}</span>
                    {r.mention && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                        {r.mention}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onSelectRecipient(r.name, r.mention);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                  >
                    <Eye className="w-3 h-3 text-amber-400" />
                    Appliquer sur l'Aperçu
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Export progress */}
          {isExportingAll && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1.5">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 animate-spin" />
                  Génération en cours... ({progress.current}/{progress.total})
                </span>
                <span>{Math.round((progress.current / progress.total) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/40">
          <span className="text-xs text-slate-400">
            Format de sortie : PDF Haute Résolution (A4 Paysage)
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition"
            >
              Fermer
            </button>
            <button
              onClick={handleExportAll}
              disabled={isExportingAll || recipients.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 rounded-xl shadow-lg transition"
            >
              <Download className="w-4 h-4" />
              {isExportingAll ? 'Téléchargement...' : `Télécharger tous les PDF (${recipients.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

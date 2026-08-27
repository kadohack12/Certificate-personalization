import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Printer,
  FileImage,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { CertificateData } from './types';
import { initialCertificateData } from './data/presets';
import { CertificatePreview } from './components/CertificatePreview';
import { SimpleEditor } from './components/SimpleEditor';
import { EditorPanel } from './components/EditorPanel';
import { SignaturePadModal } from './components/SignaturePadModal';
import { BatchGeneratorModal } from './components/BatchGeneratorModal';
import { VerificationModal } from './components/VerificationModal';
import { exportCertificateToPDF, exportCertificateToPNG, printCertificate } from './utils/exportUtils';

const LOCAL_STORAGE_KEY = 'academie_certif_studio_data_v3';

export default function App() {
  // Load saved state or default
  const [certData, setCertData] = useState<CertificateData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialCertificateData;
  });

  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [isExportingPNG, setIsExportingPNG] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [signatureModalSignatoryIndex, setSignatureModalSignatoryIndex] = useState<0 | 1 | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);

  // Auto-fit scale on mount and window resize
  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Auto save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certData));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [certData]);

  useEffect(() => {
    // Intercept unhandled rejections gracefully
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('Caught unhandled rejection:', event.reason);
      if (event && event.preventDefault) {
        event.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Check if URL has #verify
    if (window.location.hash.includes('verify')) {
      setIsVerificationModalOpen(true);
    }

    const handleResize = () => {
      if (previewContainerRef.current) {
        const availableWidth = previewContainerRef.current.clientWidth - 48; // padding
        const certWidth = 1050;
        const newScale = Math.min(Math.max(availableWidth / certWidth, 0.4), 1.05);
        setZoomScale(Number(newScale.toFixed(2)));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDataChange = (updated: Partial<CertificateData>) => {
    setCertData((prev) => ({ ...prev, ...updated }));
  };

  const handleResetDefaults = () => {
    if (window.confirm('Voulez-vous réinitialiser le certificat aux valeurs par défaut ?')) {
      setCertData(initialCertificateData);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {}
      showToast('Certificat réinitialisé avec succès');
    }
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    const recipientClean = (certData.recipientName || 'Certificat').trim().replace(/\s+/g, '_');
    const fileName = `Certificat_${recipientClean}_${certData.certificateId}.pdf`;
    const success = await exportCertificateToPDF('certificateContainer', fileName);
    setIsExportingPDF(false);
    if (success) {
      showToast('PDF haute résolution généré et téléchargé !');
    }
  };

  const handleDownloadPNG = async () => {
    setIsExportingPNG(true);
    const recipientClean = (certData.recipientName || 'Certificat').trim().replace(/\s+/g, '_');
    const fileName = `Certificat_${recipientClean}.png`;
    const success = await exportCertificateToPNG('certificateContainer', fileName);
    setIsExportingPNG(false);
    if (success) {
      showToast('Image PNG exportée avec succès !');
    }
  };

  const handleSaveSignature = (dataUrl: string) => {
    if (signatureModalSignatoryIndex === null) return;
    const newSignatories = [...certData.signatories] as [typeof certData.signatories[0], typeof certData.signatories[1]];
    newSignatories[signatureModalSignatoryIndex] = {
      ...newSignatories[signatureModalSignatoryIndex],
      signatureType: 'drawn',
      drawnDataUrl: dataUrl,
    };
    handleDataChange({ signatories: newSignatories });
    showToast('Signature manuscrite appliquée !');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-montserrat relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= TOP NAVIGATION BAR (NO-PRINT) ================= */}
      <header className="no-print h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30 flex-shrink-0 shadow-md">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Afficher/Masquer les réglages"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-cinzel text-sm sm:text-base font-black tracking-wide text-slate-100 flex items-center gap-2">
                <span>ACADÉMIE</span>
                <span className="text-amber-500 font-normal">✕</span>
                <span className="text-sky-400">QUALITAS</span>
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Générateur de Certificat Officiel
              </p>
            </div>
          </div>
        </div>

        {/* Center: Simple / Advanced mode switch & Live Zoom */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setEditorMode('simple')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                editorMode === 'simple'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple</span>
            </button>
            <button
              onClick={() => setEditorMode('advanced')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                editorMode === 'advanced'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Avancé</span>
            </button>
          </div>

          {/* Verification modal button */}
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
            title="Consulter le registre public d'authenticité"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vérifier</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setZoomScale((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.4))}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Zoom Arrière"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-amber-400 px-1.5 min-w-[45px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.3))}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Zoom Avant"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomScale(0.85)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Réinitialiser le Zoom"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Actions: Export & Print */}
        <div className="flex items-center gap-2">
          {/* Reset button */}
          <button
            onClick={handleResetDefaults}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
            title="Réinitialiser les valeurs par défaut"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Multi-recipient batch button */}
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-xl transition"
          >
            <Users className="w-3.5 h-3.5" />
            <span>En Lot</span>
          </button>

          {/* PNG Export */}
          <button
            onClick={handleDownloadPNG}
            disabled={isExportingPNG}
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition flex items-center gap-1.5"
            title="Télécharger image PNG"
          >
            <FileImage className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">PNG</span>
          </button>

          {/* Direct Print */}
          <button
            onClick={printCertificate}
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition flex items-center gap-1.5"
            title="Imprimer directement"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>

          {/* PDF Download Button (Primary) */}
          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-lg hover:shadow-amber-500/20 transition transform active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPDF ? 'Exportation...' : 'Télécharger PDF'}</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN APPLICATION WORKSPACE ================= */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT SIDEBAR: LIVE EDITOR CONTROLS (NO-PRINT) */}
        <aside
          className={`no-print transition-all duration-300 ease-in-out h-full z-20 flex-shrink-0 ${
            sidebarOpen ? 'w-full sm:w-[380px] lg:w-[410px]' : 'w-0 overflow-hidden'
          }`}
        >
          {editorMode === 'simple' ? (
            <SimpleEditor data={certData} onChange={handleDataChange} />
          ) : (
            <EditorPanel
              data={certData}
              onChange={handleDataChange}
              onOpenSignatureModal={(idx) => setSignatureModalSignatoryIndex(idx)}
              onOpenBatchModal={() => setIsBatchModalOpen(true)}
            />
          )}
        </aside>

        {/* RIGHT AREA: LIVE CERTIFICATE STAGE & CANVAS */}
        <main
          ref={previewContainerRef}
          className="flex-1 h-full overflow-auto bg-slate-950/95 flex flex-col items-center justify-start p-4 sm:p-8 relative"
        >
          {/* Subtle Stage Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Certificate Live Render Node */}
          <div className="relative z-10 pb-16">
            <CertificatePreview data={certData} scale={zoomScale} />
          </div>
        </main>
      </div>

      {/* ================= MODALS ================= */}
      {/* Signature Pad Modal */}
      {signatureModalSignatoryIndex !== null && (
        <SignaturePadModal
          isOpen={signatureModalSignatoryIndex !== null}
          onClose={() => setSignatureModalSignatoryIndex(null)}
          onSave={handleSaveSignature}
          signatoryName={certData.signatories[signatureModalSignatoryIndex].name}
        />
      )}

      {/* Batch Multi-Recipient Generator Modal */}
      <BatchGeneratorModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        baseData={certData}
        onSelectRecipient={(name, mention) => {
          handleDataChange({
            recipientName: name,
            ...(mention ? { honorsMention: mention } : {}),
          });
          showToast(`Destinataire ${name} chargé`);
        }}
      />

      {/* Public Digital Verification Modal */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        data={certData}
      />
    </div>
  );
}

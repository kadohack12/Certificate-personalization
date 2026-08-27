import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, PenTool, Upload } from 'lucide-react';

interface SignaturePadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  signatoryName: string;
}

export const SignaturePadModal: React.FC<SignaturePadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  signatoryName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0f172a');
  const [activeTab, setActiveTab] = useState<'draw' | 'upload'>('draw');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = strokeColor;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setHasDrawn(false);
        }
      }
    }
  }, [isOpen, activeTab, strokeColor]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas && hasDrawn) {
        const dataUrl = canvas.toDataURL('image/png');
        onSave(dataUrl);
        onClose();
      }
    } else if (uploadedPreview) {
      onSave(uploadedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-amber-400">
              Signature Manuscrite
            </h3>
            <p className="text-xs text-slate-400">
              Pour : <span className="text-slate-200 font-semibold">{signatoryName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition ${
              activeTab === 'draw'
                ? 'border-amber-500 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Tracer à la main / Souris
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition ${
              activeTab === 'upload'
                ? 'border-amber-500 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Importer un fichier image
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'draw' ? (
            <div>
              {/* Canvas Board */}
              <div className="relative rounded-xl border-2 border-dashed border-slate-600 bg-[#fdfbf7] shadow-inner overflow-hidden flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 cursor-crosshair touch-none"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400/80">
                    <PenTool className="w-6 h-6 mb-1 text-slate-400" />
                    <span className="text-xs font-medium">
                      Tracez votre signature ici (souris ou doigt sur tactile)
                    </span>
                  </div>
                )}
                {/* Guide line */}
                <div className="absolute bottom-6 left-10 right-10 h-[1px] bg-slate-300 pointer-events-none" />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Encre :</span>
                  <button
                    onClick={() => setStrokeColor('#0f172a')}
                    className={`w-6 h-6 rounded-full bg-slate-900 border-2 transition ${
                      strokeColor === '#0f172a' ? 'border-amber-400 scale-110' : 'border-transparent'
                    }`}
                    title="Encre Noire"
                  />
                  <button
                    onClick={() => setStrokeColor('#1e3a8a')}
                    className={`w-6 h-6 rounded-full bg-blue-900 border-2 transition ${
                      strokeColor === '#1e3a8a' ? 'border-amber-400 scale-110' : 'border-transparent'
                    }`}
                    title="Encre Bleue Royale"
                  />
                </div>

                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Effacer
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/40">
              {uploadedPreview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={uploadedPreview}
                    alt="Aperçu signature"
                    className="max-h-28 max-w-full bg-white p-2 rounded border border-slate-600 object-contain"
                  />
                  <label className="text-xs text-amber-400 hover:underline cursor-pointer">
                    Changer l'image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-200">
                    Sélectionnez votre signature (PNG, JPG, SVG)
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Fond transparent recommandé
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/40">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={activeTab === 'draw' ? !hasDrawn : !uploadedPreview}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md transition"
          >
            <Check className="w-4 h-4" />
            Valider la Signature
          </button>
        </div>
      </div>
    </div>
  );
};

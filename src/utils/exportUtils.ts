import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export async function exportCertificateToPDF(
  elementId: string = 'certificateContainer',
  fileName: string = 'Certificat_Excellence.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Certificate element not found:', elementId);
    return false;
  }

  try {
    // High resolution canvas capture
    const canvas = await html2canvas(element, {
      scale: 3, // 3x retina scaling for crystal sharp text and vector graphics
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.boxShadow = 'none';
        }
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Create PDF in A4 landscape: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(fileName);

    // Celebrate with confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });

    return true;
  } catch (error) {
    console.warn('PDF export failed, triggering print dialog as fallback:', error);
    window.print();
    return false;
  }
}

export async function exportCertificateToPNG(
  elementId: string = 'certificateContainer',
  fileName: string = 'Certificat_Excellence.png'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.boxShadow = 'none';
        }
      },
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });

    return true;
  } catch (err) {
    console.error('PNG export failed:', err);
    return false;
  }
}

export function printCertificate(): void {
  window.print();
}

export function generateRandomCertificateId(prefix = 'ADM-SN'): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
}

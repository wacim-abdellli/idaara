export async function generatePDFFromElement(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id #${elementId} not found`);
  }

  const { default: html2canvas } = await import('html2canvas-pro');
  const { default: jsPDF } = await import('jspdf');

  // Capture element to canvas with high resolution
  const canvas = await html2canvas(element, {
    scale: 2, // 2x resolution for crisp text & borders
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 1200,
    onclone: (_clonedDoc, clonedElement) => {
      // Ensure cloned element is fully visible during render
      clonedElement.style.visibility = 'visible';
      clonedElement.style.opacity = '1';
      clonedElement.style.display = 'block';
    },
  });

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error('Canvas rendering failed: zero dimensions');
  }

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // Additional pages if content exceeds A4 height
  while (heightLeft > 5) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  pdf.save(safeFilename);
}

/**
 * Isolated high-fidelity printing for official documents and dossier kits.
 * Prints ONLY the target document container without polluting with website headers or dark UI.
 */
export function printElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element || typeof window === 'undefined') {
    if (typeof window !== 'undefined') window.print();
    return;
  }

  // Create an isolated hidden iframe for clean A4 printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  // Clone styles and document into iframe
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((style) => style.outerHTML)
    .join('\n');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Idaara.tn - Document Officiel</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap">
        ${styles}
        <style>
          @page { size: A4 portrait; margin: 8mm 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box !important; }
          html, body { background: #ffffff !important; color: #111827 !important; margin: 0 !important; padding: 0 !important; font-family: system-ui, -apple-system, sans-serif !important; }
          #${elementId} { width: 100% !important; max-width: 100% !important; margin: 0 auto !important; padding: 10mm !important; background: #ffffff !important; color: #111827 !important; border: none !important; box-shadow: none !important; }
        </style>
      </head>
      <body>
        <div id="${elementId}">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow?.focus();
  setTimeout(() => {
    try {
      iframe.contentWindow?.print();
    } catch (e) {
      console.error('Iframe print error:', e);
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }
  }, 350);
}

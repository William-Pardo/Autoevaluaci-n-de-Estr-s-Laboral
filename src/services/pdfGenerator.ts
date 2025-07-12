import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdfReport = async (elementId: string, fileName: string): Promise<void> => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id "${elementId}" not found.`);
    alert('No se pudo generar el PDF. Elemento no encontrado.');
    return;
  }

  const elementsToHide = input.querySelectorAll('.no-print');
  elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');
  
  try {
    const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true, 
    });

    elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pdfWidth;
    let imgHeight = imgWidth / ratio;
    
    if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * ratio;
    }
    
    const x = (pdfWidth - imgWidth) / 2;
    const y = 0;

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert('Ocurrió un error al generar el PDF.');
    elementsToHide.forEach(el => (el as HTMLElement).style.display = '');
  }
};

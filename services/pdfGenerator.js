import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdfReport = async (elementId, fileName) => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id "${elementId}" not found.`);
    alert('No se pudo generar el PDF. Elemento no encontrado.');
    return;
  }

  // Hide elements that should not be in the PDF, like the button itself
  const elementsToHide = input.querySelectorAll('.no-print');
  elementsToHide.forEach(el => (el).style.display = 'none');
  
  try {
    const canvas = await html2canvas(input, {
        scale: 2, // Improve resolution
        useCORS: true, 
    });

    // Show elements again after capture
    elementsToHide.forEach(el => (el).style.display = '');

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
    
    // If the image is too tall, fit it to height instead
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
    // Ensure elements are shown again even if there's an error
    elementsToHide.forEach(el => (el).style.display = '');
  }
};
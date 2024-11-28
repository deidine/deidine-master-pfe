import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (soumissions: SoumissionFormulaire[]) => {
  const doc = new jsPDF();
  let yPos = 20;

  // Add title
  doc.setFontSize(16);
  doc.text('Soumissions de Formulaires', 20, yPos);
  yPos += 10;

  doc.setFontSize(12);
  soumissions.forEach((soumission, index) => {
    // Check if we need a new page
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }

    doc.text(`Soumission #${soumission.id}`, 20, yPos);
    yPos += 7;

    Object.entries(soumission.submission_data).forEach(([key, value]) => {
      // Check if we need a new page
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }

      const valueStr = Array.isArray(value) ? value.join(', ') : value;
      const text = `${key}: ${valueStr}`;
      doc.text(text, 30, yPos);
      yPos += 7;
    });

    doc.text(`Date: ${new Date(soumission.created_at).toLocaleDateString('fr-FR')}`, 30, yPos);
    yPos += 10;
  });

  doc.save('soumissions.pdf');
};

export const exportToExcel = (soumissions: SoumissionFormulaire[]) => {
  // Transform data for Excel
  const excelData = soumissions.map(soumission => ({
    ID: soumission.id,
    ...soumission.submission_data,
    Date: new Date(soumission.created_at).toLocaleDateString('fr-FR'),
  }));

  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Soumissions');
  XLSX.writeFile(wb, 'soumissions.xlsx');
};

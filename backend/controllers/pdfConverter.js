const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function convertPDFToImages(pdfId, pdfFilename) {
  const inputPath = path.join(__dirname, '..', 'uploads', pdfFilename);
  const outputDir = path.join(__dirname, '..', 'pdf-images', pdfId);

  // تأكد أن المجلد موجود
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    // استخدم pdftoppm لتحويل كل صفحة إلى صورة PNG
    const outputPattern = path.join(outputDir, 'page');
    const command = `pdftoppm "${inputPath}" "${outputPattern}" -png`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ خطأ في التحويل:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { convertPDFToImages };

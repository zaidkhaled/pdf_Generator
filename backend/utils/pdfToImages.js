// ✅ المرحلة 1: باكند - تحويل كل صفحات PDF إلى صور

// 📁 المسار: backend/utils/pdfToImages.js
const fs = require('fs');
const path = require('path');
const { fromPath } = require('pdf2pic');

const convertPDFToImages = async (pdfPath, outputDir, pdfId) => {
  const storeDir = path.join(outputDir, pdfId);
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
  }

  const converter = fromPath(pdfPath, {
    density: 150,
    saveFilename: 'page',
    savePath: storeDir,
    format: 'png',
    width: 800,
    height: 1130,
  });

  const result = await converter.bulk(-1); // -1 = كل الصفحات

  return result.map((page) => page.path); // مسارات الصور
};

module.exports = convertPDFToImages;

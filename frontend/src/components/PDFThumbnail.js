// src/components/PDFThumbnail.js
import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

// ✅ تحديد الـ worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFThumbnail({ url, onClick }) {
  const canvasRef = useRef();

  useEffect(() => {
    const render = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const maxWidth = 220;
        const scale = maxWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (err) {
        console.error("❌ PDF Render Error:", err);
      }
    };

    render();
  }, [url]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto rounded shadow max-w-full cursor-pointer"
      onClick={onClick}
    />
  );
}


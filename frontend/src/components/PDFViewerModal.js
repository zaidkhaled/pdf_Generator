// // src/components/PDFViewerModal.js
// import { Document, Page, pdfjs } from 'react-pdf';
// import { useEffect, useRef, useState } from 'react';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function PDFViewerModal({ url, onClose }) {
//   const [numPages, setNumPages] = useState(null);
//   const modalRef = useRef(); // ✅ مرجع للكشف عن الضغط خارج المربع

//   // ✅ إغلاق عند النقر خارج النافذة
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//       <div
//         ref={modalRef}
//         className="bg-white rounded p-4 max-w-4xl w-full h-[90vh] overflow-y-auto relative"
//       >
//         {/* ✅ زر الإغلاق مثبت دائماً في الأعلى */}
//         <button
//           onClick={onClose}
//           className="fixed top-4 right-6 text-red-600 text-2xl font-bold z-50 bg-white p-1 rounded-full shadow"
//         >
//           ✕
//         </button>

//         <Document
//           file={url}
//           onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//           loading={<p className="text-center">جارٍ التحميل...</p>}
//           error={<p className="text-center text-red-600">❌ خطأ في تحميل الملف</p>}
//         >
//           {Array.from(new Array(numPages), (_, i) => (
//             <Page key={i} pageNumber={i + 1} className="mb-4" />
//           ))}
//         </Document>
//       </div>
//     </div>
//   );
// }



import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewerModal({ url, fileId, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded p-4 max-w-4xl w-full h-[90vh] overflow-y-auto relative"
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="fixed top-4 right-6 text-red-600 text-2xl font-bold z-50 bg-white p-1 rounded-full shadow"
        >
          ✕
        </button>

        {/* زر التعديل */}
        <button
          onClick={() => navigate(`/edit-konva/${fileId}`)}
          className="absolute top-4 left-6 text-blue-600 text-sm bg-white px-3 py-1 rounded shadow hover:underline z-50"
        >
          ✏️ تعديل الملف
        </button>

        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="text-center">جارٍ التحميل...</p>}
          error={<p className="text-center text-red-600">❌ خطأ في تحميل الملف</p>}
        >
          {Array.from(new Array(numPages), (_, i) => (
            <Page key={i} pageNumber={i + 1} className="mb-4" />
          ))}
        </Document>
      </div>
    </div>
  );
}

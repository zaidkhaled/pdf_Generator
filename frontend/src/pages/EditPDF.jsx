// import { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function EditPDF({ token }) {
//   const { id } = useParams();
//   const [fileUrl, setFileUrl] = useState(null);
//   const [annotations, setAnnotations] = useState([]);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [newComment, setNewComment] = useState('');
//   const [numPages, setNumPages] = useState(null);
//   const [selectedPage, setSelectedPage] = useState(null);
//   const pageRefs = useRef({});

//   useEffect(() => {
//     const fetchPDF = async () => {
//       const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setFileUrl(`https://pdf-02ix.onrender.com/uploads/${data.filename}`);
//     };

//     const fetchAnnotations = async () => {
//       const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/annotations`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) setAnnotations(data);
//     };

//     if (token) {
//       fetchPDF();
//       fetchAnnotations();
//     }
//   }, [id, token]);

//   const handlePageClick = (e, pageNumber) => {
//     const bounds = pageRefs.current[pageNumber]?.getBoundingClientRect();
//     if (!bounds) return;

//     const x = e.clientX - bounds.left;
//     const y = e.clientY - bounds.top;

//     setSelectedPosition({ x, y });
//     setSelectedPage(pageNumber);
//     setNewComment('');
//   };

//   const handleSaveComment = async () => {
//     if (!newComment.trim()) return;
//     const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/annotations`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         text: newComment,
//         x: selectedPosition.x,
//         y: selectedPosition.y,
//         page: selectedPage,
//       }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setAnnotations((prev) => [...prev, data]);
//       setSelectedPosition(null);
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">📝 تعديل الملف</h1>
//       {fileUrl && (
//         <Document
//           file={fileUrl}
//           onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//         >
//           {Array.from({ length: numPages }, (_, i) => {
//             const pageNumber = i + 1;
//             return (
//               <div
//                 key={pageNumber}
//                 className="relative my-8"
//                 onClick={(e) => handlePageClick(e, pageNumber)}
//               >
//                 <Page
//                   pageNumber={pageNumber}
//                   inputRef={(ref) => (pageRefs.current[pageNumber] = ref)}
//                 />

//                 {/* عرض التعليقات الخاصة بهذه الصفحة */}
//                 {annotations
//                   .filter((ann) => ann.page === pageNumber)
//                   .map((ann, idx) => (
//                     <div
//                       key={idx}
//                       className="absolute bg-yellow-300 text-xs p-1 rounded shadow cursor-pointer"
//                       style={{
//                         left: ann.x,
//                         top: ann.y,
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       title={`بواسطة: ${ann.author}`}
//                     >
//                       {ann.text}
//                     </div>
//                   ))}

//                 {/* واجهة إضافة تعليق */}
//                 {selectedPosition && selectedPage === pageNumber && (
//                   <div
//                     className="absolute bg-white border p-2 shadow rounded w-64"
//                     style={{
//                       left: selectedPosition.x,
//                       top: selectedPosition.y,
//                       transform: 'translate(-50%, -50%)',
//                     }}
//                   >
//                     <textarea
//                       className="w-full border rounded p-1 text-sm"
//                       rows={2}
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="أدخل ملاحظتك هنا"
//                     />
//                     <button
//                       onClick={handleSaveComment}
//                       className="mt-1 text-blue-600 text-sm hover:underline"
//                     >
//                       💾 حفظ الملاحظة
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </Document>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function EditPDF({ token }) {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageRef = useRef(null);

  useEffect(() => {
    const fetchPDF = async () => {
      const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFileUrl(`https://pdf-02ix.onrender.com/uploads/${data.filename}`);
    };

    const fetchAnnotations = async () => {
      const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/annotations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setAnnotations(data);
    };

    if (token) {
      fetchPDF();
      fetchAnnotations();
    }
  }, [id, token]);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageClick = (e) => {
    const bounds = pageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setSelectedPosition({ x, y, page: currentPage });
    setNewComment('');
  };

  const handleSaveComment = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/annotations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: newComment,
        x: selectedPosition.x,
        y: selectedPosition.y,
        page: currentPage,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setAnnotations((prev) => [...prev, data]);
      setSelectedPosition(null);
      setNewComment('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📝 تعديل الملف PDF</h1>

      {fileUrl && (
        <div>
          <div className="mb-4 flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ⬅️ السابق
            </button>
            <span className="text-sm font-medium">
              صفحة {currentPage} من {numPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(numPages, prev + 1))}
              disabled={currentPage === numPages}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              التالي ➡️
            </button>
          </div>

          <Document file={fileUrl} onLoadSuccess={handleDocumentLoadSuccess}>
            <div
              className="relative border shadow"
              onClick={handlePageClick}
            >
              <Page
                pageNumber={currentPage}
                inputRef={pageRef}
              />

              {annotations
                .filter((a) => a.page === currentPage)
                .map((ann, idx) => (
                  <div
                    key={idx}
                    className="absolute bg-yellow-200 text-xs p-1 rounded shadow"
                    style={{
                      left: ann.x,
                      top: ann.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                    title={`بواسطة: ${ann.author || 'غير معروف'}`}
                  >
                    {ann.text}
                  </div>
                ))}
            </div>
          </Document>

          {selectedPosition && (
            <div
              className="fixed bg-white border p-2 shadow rounded w-64 z-50"
              style={{
                left: selectedPosition.x + 50,
                top: selectedPosition.y + 120,
              }}
            >
              <textarea
                className="w-full border rounded p-1 text-sm"
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="أدخل ملاحظتك هنا"
              />
              <button
                onClick={handleSaveComment}
                className="mt-1 text-blue-600 text-sm hover:underline"
              >
                💾 حفظ الملاحظة
              </button>
              <button
                onClick={() => setSelectedPosition(null)}
                className="ml-2 text-red-500 text-sm hover:underline"
              >
                ❌ إلغاء
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

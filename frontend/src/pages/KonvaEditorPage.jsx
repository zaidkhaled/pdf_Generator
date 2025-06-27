// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PDFPage from '../components/PDFPage';

// export default function KonvaEditorPage() {
//   const { id } = useParams(); // ID الخاص بالملف
//   const [imageUrls, setImageUrls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPageImages = async () => {
//       try {
//         console.log('📦 بدء تحميل صور الصفحات...');
//         const res = await fetch(`http://localhost:5000/api/pdf/${id}/page-images`);
//         const data = await res.json();

//         if (res.ok && data.pages) {
//           console.log('✅ تم جلب الصور:', data.pages);
//           setImageUrls(data.pages);
//         } else {
//           console.error('❌ فشل في جلب الصور');
//         }
//       } catch (err) {
//         console.error('🚨 خطأ أثناء جلب الصور:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageImages();
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">✏️ تعديل ملف PDF باستخدام Konva.js</h1>

//       {loading ? (
//         <p>⏳ جاري تحميل الصفحات...</p>
//       ) : (
//         imageUrls.map((imgUrl, index) => (
//           <div key={index} className="mb-6">
//             <PDFPage imageUrl={imgUrl} pageIndex={index + 1} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// 4444444444444444444444444
// import jsPDF from 'jspdf';
// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import PDFPage from '../components/PDFPage';

// export default function KonvaEditorPage() {
//   const { id } = useParams(); // ID الخاص بالملف
//   const location = useLocation();
//   const originalFilename = location.state?.filename || 'edited99999.pdf'; // 👈 اسم الملف الديناميكي

//   const [imageUrls, setImageUrls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPageImages = async () => {
//       try {
//         console.log('📦 بدء تحميل صور الصفحات...');
//         const res = await fetch(`http://localhost:5000/api/pdf/${id}/page-images`);
//         const data = await res.json();

//         if (res.ok && data.pages) {
//           console.log('✅ تم جلب الصور:', data.pages);
//           setImageUrls(data.pages);
//         } else {
//           console.error('❌ فشل في جلب الصور');
//         }
//       } catch (err) {
//         console.error('🚨 خطأ أثناء جلب الصور:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageImages();
//   }, [id]);

//   // ✅ زر تحميل PDF بعد التعديلات
//   const handleDownloadPDF = () => {
//     const stages = document.querySelectorAll('canvas'); // جميع canvases في الصفحة
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'px',
//       format: [800, 1130],
//     });

//     stages.forEach((canvas, index) => {
//       const imgData = canvas.toDataURL('image/png');
//       if (index > 0) pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 0, 0, 800, 1130);
//     });

//     const safeName = originalFilename.toLowerCase().endsWith('.pdf')
//       ? originalFilename
//       : `${originalFilename.replace(/\.[^/.]+$/, '')}.pdf`;

//     pdf.save(safeName);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">✏️ {originalFilename}   تعديل ملف   </h1>

//       {/* ✅ زر تحميل PDF */}
//       <button
//         onClick={handleDownloadPDF}
//         className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
//       >
//         📥 تحميل كل الصفحات مع التعديلات      </button>

//       {loading ? (
//         <p>⏳ جاري تحميل الصفحات...</p>
//       ) : (
//         imageUrls.map((imgUrl, index) => (
//           <div key={index} className="mb-6">
//             <PDFPage imageUrl={imgUrl} pageIndex={index + 1} originalFilename={originalFilename} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// 444444444444444444444444






// // 44444444444444444

// import jsPDF from 'jspdf';
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import PDFPage from '../components/PDFPage';

// export default function KonvaEditorPage(token) {
//   const { id } = useParams(); // ID الخاص بالملف
//   const location = useLocation();
//   const originalFilename = location.state?.filename || 'edited99999.pdf'; // 👈 اسم الملف الديناميكي

//   const [imageUrls, setImageUrls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const pageRefs = useRef([]);
//   const [annotations, setAnnotations] = useState([]);
//   const [fileOwnerId, setFileOwnerId] = useState(null);



//   useEffect(() => {



//     const fetchData = async () => {
//     try {
//       const res1 = await fetch(`http://localhost:5000/api/pdf/${id}/page-images`);
//       const data1 = await res1.json();

//       const fileOwnerId = data1.userId;
//       setFileOwnerId(data1.userId);


//       const res2 = await fetch(`http://localhost:5000/api/pdf/${id}/annotations`, {
//         headers: {
//           Authorization: `Bearer ${token.token}`
//         }
//       });
//       const data2 = await res2.json();

//       if (res1.ok && res2.ok) {
//         console.log("0000000000000000")
//                 console.log(data1.pages)

        
//         console.log("0000000000000000")
//         setImageUrls(data1.pages);
//         setAnnotations(data2.annotations);
//       }
//     } catch (err) {
//       console.error("🚨 خطأ في جلب الصور أو التعديلات:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();





//     const fetchPageImages = async () => {
//       try {
//         console.log('📦 بدء تحميل صور الصفحات...');
//         const res = await fetch(`http://localhost:5000/api/pdf/${id}/page-images`);
//         const data = await res.json();

//         if (res.ok && data.pages) {
//           console.log('✅ تم جلب الصور:', data.pages);
//           setImageUrls(data.pages);
//         } else {
//           console.error('❌ فشل في جلب الصور');
//         }
//       } catch (err) {
//         console.error('🚨 خطأ أثناء جلب الصور:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageImages();
//   }, [id]);

//   // ✅ زر تحميل PDF بعد التعديلات
//   const handleDownloadPDF = () => {
//     const stages = document.querySelectorAll('canvas'); // جميع canvases في الصفحة
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'px',
//       format: [800, 1130],
//     });

//     stages.forEach((canvas, index) => {
//       const imgData = canvas.toDataURL('image/png');
//       if (index > 0) pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 0, 0, 800, 1130);
//     });

//     const safeName = originalFilename.toLowerCase().endsWith('.pdf')
//       ? originalFilename
//       : `${originalFilename.replace(/\.[^/.]+$/, '')}.pdf`;

//     pdf.save(safeName);
//   };


//   const handleSaveAnnotations = async () => {
//   const allElements = pageRefs.current.flatMap((pageRef, pageIndex) => {
//     if (pageRef && pageRef.getElements) {
//       const elements = pageRef.getElements();
//       return elements.map((el) => ({ ...el, pageIndex }));
//     }
//     return [];
//   });

//   try {
//     const res = await fetch(`http://localhost:5000/api/pdf/${id}/annotations`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token.token}`, // تأكد أن `token` متاح
//       },
//       body: JSON.stringify({ annotations: allElements }),
//     });

//     if (res.ok) {
//       alert('✅ تم حفظ التعديلات بنجاح!');
//     } else {
//       const err = await res.json();
//       alert('❌ فشل في الحفظ: ' + err.message);
//     }
//   } catch (error) {
//     alert('⚠️ حدث خطأ أثناء الحفظ');
//     console.error(error);
//   }
// };


//   return (
//     <div className="p-6">
//       <div>
//       <h1 className="text-xl font-bold mb-4">✏️ {originalFilename}   تعديل ملف   </h1>
//       <h1>
//               <button
//         onClick={handleSaveAnnotations}
//         className="bg-green-600 text-white px-4 py-2 rounded mb-4 ml-4"
//       >
//         💾 حفظ التعديلات
//       </button>
//       </h1>


//       {/* ✅ زر تحميل PDF */}
//       <button
//         onClick={handleDownloadPDF}
//         className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
//       >
        
//         📥 تحميل كل الصفحات مع التعديلات      </button></div>

//       {loading ? (
//         <p>⏳ جاري تحميل الصفحات...</p>
//       ) : (
//         imageUrls.map((imgUrl, index) => (
//           <div key={index} className="mb-6">
//             <PDFPage 
//             imageUrl={imgUrl} 
//             pageIndex={index} 
//             originalFilename={originalFilename} 
//             ref={(el) => (pageRefs.current[index] = el)}
//             initialElements={(annotations.find(a => a.pageIndex === index)?.elements) || []}
//             />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// 4444444444444444444444444444



import jsPDF from 'jspdf';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PDFPage from '../components/PDFPage';
import { jwtDecode } from 'jwt-decode'; 


export default function KonvaEditorPage(token) {
  const { id } = useParams(); // ID الخاص بالملف
  const location = useLocation();
  const originalFilename = location.state?.filename || 'edited99999.pdf'; // 👈 اسم الملف الديناميكي

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState([]);
  const [fileOwnerId, setFileOwnerId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const pageRefs = useRef([]);

useEffect(() => {
  const decoded = jwtDecode(token.token);
  setCurrentUserId(decoded.userId);

  const fetchData = async () => {
    try {
      const res1 = await fetch(`http://localhost:5000/api/pdf/${id}/page-images`);
      const data1 = await res1.json();

      setFileOwnerId(data1.userId); // 👈 هذه أيضا مهمة

      const res2 = await fetch(`http://localhost:5000/api/pdf/${id}/annotations`, {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      });
      const data2 = await res2.json();

      if (res1.ok && res2.ok) {
        setImageUrls(data1.pages);
        setAnnotations(data2.annotations);
      }
    } catch (err) {
      console.error("🚨 خطأ في جلب الصور أو التعديلات:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id, token]);





  const handleDownloadPDF = () => {
    const stages = document.querySelectorAll('canvas');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [800, 1130],
    });

    stages.forEach((canvas, index) => {
      const imgData = canvas.toDataURL('image/png');
      if (index > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 1130);
    });

    const safeName = originalFilename.toLowerCase().endsWith('.pdf')
      ? originalFilename
      : `${originalFilename.replace(/\.[^/.]+$/, '')}.pdf`;

    pdf.save(safeName);
  };

  const handleSaveAnnotations = async () => {
    const allElements = pageRefs.current.flatMap((pageRef, pageIndex) => {
      if (pageRef && pageRef.getElements) {
        const elements = pageRef.getElements();
        return elements.map((el) => ({ ...el, pageIndex }));
      }
      return [];
    });

    try {
      const res = await fetch(`http://localhost:5000/api/pdf/${id}/annotations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify({ annotations: allElements }),
      });

      if (res.ok) {
        alert('✅ تم حفظ التعديلات بنجاح!');
      } else {
        const err = await res.json();
        alert('❌ فشل في الحفظ: ' + err.message);
      }
    } catch (error) {
      alert('⚠️ حدث خطأ أثناء الحفظ');
      console.error(error);
    }
  };
  return (
    <div className="p-6">
      <div>
        <h1 className="text-xl font-bold mb-4">✏️ {originalFilename} تعديل ملف</h1>
        <h1>
          <button
            onClick={handleSaveAnnotations}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4 ml-4"
          >
            💾 حفظ التعديلات
          </button>
        </h1>

        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
        >
          📥 تحميل كل الصفحات مع التعديلات
        </button>
      </div>

      {loading ? (
        <p>⏳ جاري تحميل الصفحات...</p>
      ) : (
        imageUrls.map((imgUrl, index) => (
          <div key={index} className="mb-6">
            <PDFPage
              imageUrl={imgUrl}
              pageIndex={index}
              originalFilename={originalFilename}
              ref={(el) => (pageRefs.current[index] = el)}
              initialElements={(annotations.find(a => a.pageIndex === index)?.elements) || []}
              canReset={fileOwnerId === currentUserId}
              fileId={id}
              token={token.token}
            />
          </div>
        ))
      )}
    </div>
  );
}

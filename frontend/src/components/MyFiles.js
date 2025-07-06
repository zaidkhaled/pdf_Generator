// import { useEffect, useState } from 'react';
// import PDFThumbnail from './PDFThumbnail';
// import PDFViewerModal from './PDFViewerModal';
// import UploadForm from './UploadForm';

// export default function MyFiles({ token }) {
//   const [myFiles, setMyFiles] = useState([]);
//   const [publicFiles, setPublicFiles] = useState([]);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);

//   useEffect(() => {
//     const fetchMyFiles = async () => {
//       try {
//         const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/myfiles', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) setMyFiles(data);
//       } catch (err) {
//         console.error('❌ خطأ في جلب ملفاتي:', err);
//       }
//     };

//     const fetchPublicFiles = async () => {
//       try {
//         const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/public-files', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) setPublicFiles(data);
//       } catch (err) {
//         console.error('❌ خطأ في جلب الملفات العامة:', err);
//       }
//     };

//     if (token) {
//       fetchMyFiles();
//       fetchPublicFiles();
//     }
//   }, [token]);

//   // ✅ حذف ملفي فقط
//   const handleDelete = async (id) => {
//     if (!window.confirm('هل أنت متأكد من حذف الملف؟')) return;
//     try {
//       const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         setMyFiles((prev) => prev.filter((f) => f._id !== id)); // ← الحذف الفوري من الصفحة ✅
//       } else {
//         const data = await res.json();
//         alert(data.error || 'فشل في الحذف');
//       }
//     } catch {
//       alert('خطأ في الاتصال');
//     }
//   };

//   // ✅ عندما ينجح رفع ملف جديد
//   const handleUploadSuccess = (newFile) => {
//     setMyFiles((prevFiles) => [newFile, ...prevFiles]);
//   };

//   const renderCard = (file, canDelete = false) => (
//     <div
//       key={file._id}
//       className="bg-white shadow rounded p-3 border hover:shadow-md transition"
//     >
//       <PDFThumbnail
//         url={`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`}
//         onClick={() =>
//           setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
//         }
//       />
//       <h3 className="font-semibold truncate mt-2">{file.originalname}</h3>
//       <p className="text-sm text-gray-600">
//         🗓️ {new Date(file.createdAt).toLocaleString()}
//       </p>

//       {canDelete && (
//         <button
//           onClick={() => handleDelete(file._id)}
//           className="mt-2 text-red-600 text-sm hover:underline"
//         >
//           🗑️ حذف
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4 space-y-8">
//       {/* ✅ نموذج الرفع */}
//       <UploadForm token={token} onUploadSuccess={handleUploadSuccess} />

//       {/* ✅ ملفاتي الخاصة */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">📄 ملفاتي</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {myFiles.map((file) => renderCard(file, true))}
//         </div>
//       </div>

//       {/* ✅ ملفات الآخرين */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">🌍 ملفات الآخرين العامة</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {publicFiles.map((file) => renderCard(file))}
//         </div>
//       </div>

//       {/* ✅ عرض مودال PDF */}
//       {selectedFileUrl && (
//         <PDFViewerModal
//           url={selectedFileUrl}
//           onClose={() => setSelectedFileUrl(null)}
//         />
//       )}
//     </div>
//   );
// }






// import { useEffect, useState } from 'react';
// import PDFThumbnail from './PDFThumbnail';
// import PDFViewerModal from './PDFViewerModal';
// import UploadForm from './UploadForm';

// export default function MyFiles({ token }) {
//   const [myFiles, setMyFiles] = useState([]);
//   const [publicFiles, setPublicFiles] = useState([]);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchScope, setSearchScope] = useState('all');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const fetchMyFiles = async () => {
//       try {
//         const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/myfiles', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setMyFiles(data);
//       } catch (err) {
//         console.error('❌ خطأ في جلب ملفاتي:', err);
//       }
//     };

//     const fetchPublicFiles = async () => {
//       try {
//         const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/public-files', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setPublicFiles(data);
//       } catch (err) {
//         console.error('❌ خطأ في جلب الملفات العامة:', err);
//       }
//     };

//     if (token) {
//       fetchMyFiles();
//       fetchPublicFiles();
//     }
//   }, [token]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('هل أنت متأكد من حذف الملف؟')) return;
//     try {
//       const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         setMyFiles((prev) => prev.filter((f) => f._id !== id));
//       } else {
//         const data = await res.json();
//         alert(data.error || 'فشل في الحذف');
//       }
//     } catch {
//       alert('خطأ في الاتصال');
//     }
//   };

//   const handleUploadSuccess = (newFile) => {
//     setMyFiles((prevFiles) => [newFile, ...prevFiles]);
//   };

//   // 🔍 تحديث نتائج البحث
//   useEffect(() => {
//     const getFilesToSearch = () => {
//       if (searchScope === 'my') return myFiles;
//       if (searchScope === 'public') return publicFiles;
//       return [...myFiles, ...publicFiles];
//     };

//     const allFiles = getFilesToSearch();
//     const filtered = allFiles.filter((file) =>
//       file.originalname.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setSearchResults(filtered);
//   }, [searchQuery, searchScope, myFiles, publicFiles]);

//   const renderCard = (file, canDelete = false) => (
//     <div
//       key={file._id}
//       className="bg-white shadow rounded p-3 border hover:shadow-md transition relative"
//     >
//       <PDFThumbnail
//         url={`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`}
//         onClick={() =>
//           setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
//         }
//       />
//       <h3 className="font-semibold truncate mt-2">{file.originalname}</h3>
//       <p className="text-sm text-gray-600">
//         🗓️ {new Date(file.createdAt).toLocaleString()}
//       </p>
//       {canDelete && (
//         <button
//           onClick={() => handleDelete(file._id)}
//           className="absolute bottom-2 right-2 text-red-600 text-sm hover:underline"
//         >
//           🗑️ حذف
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4 space-y-8">
//       <UploadForm token={token} onUploadSuccess={handleUploadSuccess} />

//       {/* 🔍 مربع البحث */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="🔍 ابحث عن ملف بالاسم..."
//           className="border rounded px-3 py-2 w-full md:w-1/2"
//         />
//         <select
//           value={searchScope}
//           onChange={(e) => setSearchScope(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="all">📚 الكل</option>
//           <option value="my">📁 ملفاتي</option>
//           <option value="public">🌍 ملفات الآخرين</option>
//         </select>
//       </div>

//       {/* نتائج البحث في قائمة */}
//       {searchQuery && searchResults.length > 0 && (
//         <div className="bg-white shadow rounded p-4 border">
//           <h2 className="text-lg font-semibold mb-2">🔎 نتائج البحث:</h2>
//           <ul className="space-y-2">
//             {searchResults.map((file) => (
//               <li
//                 key={file._id}
//                 className="flex justify-between items-center border-b pb-1 hover:bg-gray-50 px-2 cursor-pointer"
//                 onClick={() =>
//                   setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
//                 }
//               >
//                 <span>{file.originalname}</span>
//                 {myFiles.find((f) => f._id === file._id) && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(file._id);
//                     }}
//                     className="text-red-600 text-sm hover:underline"
//                   >
//                     🗑 حذف
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* ✅ ملفاتي الخاصة */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">📄 ملفاتي</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {myFiles.map((file) => renderCard(file, true))}
//         </div>
//       </div>

//       {/* ✅ ملفات الآخرين العامة */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">🌍 ملفات الآخرين العامة</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {publicFiles.map((file) => renderCard(file))}
//         </div>
//       </div>

//       {/* ✅ عرض المودال */}
//       {selectedFileUrl && (
//         <PDFViewerModal
//           url={selectedFileUrl}
//           onClose={() => setSelectedFileUrl(null)}
//         />
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PDFThumbnail from './PDFThumbnail';
import PDFViewerModal from './PDFViewerModal';
import UploadForm from './UploadForm';

export default function MyFiles({ token }) {
  const [myFiles, setMyFiles] = useState([]);
  const [publicFiles, setPublicFiles] = useState([]);
  // const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyFiles = async () => {
      try {

        const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/myfiles', {
          headers: { Authorization: `Bearer ${token }` },
        });
        const data = await res.json();
        if (res.ok) setMyFiles(data);
      } catch (err) {
        console.error('❌ خطأ في جلب ملفاتي:', err);
      }
    };

    const fetchPublicFiles = async () => {
      try {
        const res = await fetch('https://pdf-generator-1-l8no.onrender.com/api/pdf/public-files', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setPublicFiles(data);
      } catch (err) {
        console.error('❌ خطأ في جلب الملفات العامة:', err);
      }
    };

    if (token) {
      fetchMyFiles();
      fetchPublicFiles();
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف الملف؟')) return;
    try {
      const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMyFiles((prev) => prev.filter((f) => f._id !== id));
        setSearchResults((prev) => prev.filter((f) => f._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'فشل في الحذف');
      }
    } catch {
      alert('خطأ في الاتصال');
    }
  };

  const handleUploadSuccess = (newFile) => {
    setMyFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  useEffect(() => {
    const getFilesToSearch = () => {
      if (searchScope === 'my') return myFiles;
      if (searchScope === 'public') return publicFiles;
      return [...myFiles, ...publicFiles];
    };

    const allFiles = getFilesToSearch();
    const filtered = allFiles.filter((file) =>
      file.originalname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, searchScope, myFiles, publicFiles]);

  // const renderCard = (file, canDelete = false) => (
  //   <div
  //     key={file._id}
  //     className="bg-white shadow rounded p-3 border hover:shadow-md transition relative"
  //   >
  //     <PDFThumbnail
  //       url={`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`}
  //       onClick={() =>
  //         setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
  //       }
  //     />
  //     <h3 className="font-semibold truncate mt-2">{file.originalname}</h3>
  //     <p className="text-sm text-gray-600">
  //       🗓️ {new Date(file.createdAt).toLocaleString()}
  //     </p>
  //     <p className="text-sm text-gray-600">
  //       👤 بواسطة: {file.owner?.username || 'غير معروف'}
  //     </p>
  //     <button
  //       onClick={() => navigate(`/edit/${file._id}`)}
  //       className="text-blue-600 text-sm hover:underline mt-1"
  //     >
  //       ✏️ تعديل الملف
  //     </button>
  //     {canDelete && (
  //       <button
  //         onClick={() => handleDelete(file._id)}
  //         className="absolute bottom-2 right-2 text-red-600 text-sm hover:underline"
  //       >
  //         🗑️ حذف
  //       </button>
  //     )}
  //   </div>
  // );


  const renderCard = (file, canDelete = false) => (
  <div
    key={file._id}
    className="bg-white shadow rounded p-3 border hover:shadow-md transition relative"
  >
    <PDFThumbnail
      url={`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`}
      // onClick={() =>
      //   setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
      // }

      onClick={() =>
  setSelectedFile(file)
}

    />
        {/* ✅ زر التعديل */}
    <h2>
    <button

      onClick={() =>  navigate(`/edit-konva/${file._id}`, { state: { filename: file.originalname } })}
      

      className=" bottom-2 right-2 text-blue-600 text-sm hover:underline"
    >
      ✏️ تعديل الملف
    </button></h2>
    <h3 className="font-semibold truncate mt-2">{file.originalname}</h3>
    <p className="text-sm text-gray-600">
      🗓️ {new Date(file.createdAt).toLocaleString()}
    </p>
    <p className="text-sm text-gray-600">
      👤 بواسطة: {file.owner?.username || 'غير معروف'}
    </p>



    {/* ✅ زر الحذف (إن كان صاحب الملف) */}
    {canDelete && (
      <button
        onClick={() => handleDelete(file._id)}
        className="absolute bottom-2 right-2 text-red-600 text-sm hover:underline"
      >
        🗑️ حذف
      </button>
    )}
    
  </div>
);

  return (
    <div className="p-4 space-y-8">
      <UploadForm token={token} onUploadSuccess={handleUploadSuccess} />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 ابحث عن ملف بالاسم..."
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <select
          value={searchScope}
          onChange={(e) => setSearchScope(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">📚 الكل</option>
          <option value="my">📁 ملفاتي</option>
          <option value="public">🌍 ملفات الآخرين</option>
        </select>
      </div>

      {searchQuery && searchResults.length > 0 && (
        <div className="bg-white shadow rounded p-4 border">
          <h2 className="text-lg font-semibold mb-2">🔎 نتائج البحث:</h2>
          <ul className="space-y-2">
            {searchResults.map((file) => (
              <li
                key={file._id}
                className="flex justify-between items-center border-b pb-1 hover:bg-gray-50 px-2 cursor-pointer"
                // onClick={() =>
                //   setSelectedFileUrl(`https://pdf-generator-1-l8no.onrender.com/uploads/${file.filename}`)
                // }

                onClick={() =>
  setSelectedFile(file)
}

              >
                <div>
                  <span className="block">{file.originalname}</span>
                  <span className="text-xs text-gray-600">
                    👤 {file.owner?.username || 'غير معروف'}
                  </span>
                </div>
                {myFiles.find((f) => f._id === file._id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file._id);
                    }}
                    className="text-red-600 text-sm hover:underline"
                  >
                    🗑 حذف
                  </button>
                )}

                
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">📄 ملفاتي</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myFiles.map((file) => renderCard(file, true))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">🌍 ملفات الآخرين العامة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {publicFiles.map((file) => renderCard(file))}
        </div>
      </div>

      {/* {selectedFileUrl && (
        <PDFViewerModal
          url={selectedFileUrl}
          onClose={() => setSelectedFileUrl(null)}
        />
      )} */}
      {selectedFile && (
  <PDFViewerModal
    url={`https://pdf-generator-1-l8no.onrender.com/uploads/${selectedFile.filename}`}
    fileId={selectedFile._id}
    onClose={() => setSelectedFile(null)}
  />
)}

    </div>
  );
}

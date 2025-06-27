// 📄 src/components/UploadForm.js
import React, { useState } from 'react';

export default function UploadForm({ token, onUploadSuccess }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [allowEdit, setAllowEdit] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      setMessage('Please select a PDF file');
      return;
    }

    setMessage('');
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('allowEditByOthers', allowEdit);

    try {
      const res = await fetch('http://localhost:5000/api/pdf/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ PDF uploaded successfully!');
        if (onUploadSuccess) {
          onUploadSuccess(data); // ✅ تمرير الملف الجديد للأب
        }
      } else {
        setMessage(data.error || 'Upload failed ❌');
      }
    } catch {
      setMessage('❌ Network error');
    }
  };

  return (
    <form onSubmit={handleUpload} className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center font-semibold">📤 رفع ملف PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
        required
        className="mb-3"
      />

      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={allowEdit}
          onChange={(e) => setAllowEdit(e.target.checked)}
          className="mr-2"
        />
        Allow others to edit this PDF
      </label>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Upload
      </button>

      {message && <p className="mt-3 text-green-700 text-center">{message}</p>}
    </form>
  );
}

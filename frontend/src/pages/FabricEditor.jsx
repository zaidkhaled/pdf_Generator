import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { fabric } from 'fabric';
import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';

export default function FabricEditor({ token }) {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ تحميل صورة الخلفية والتعديلات القديمة
  useEffect(() => {
    const initCanvas = async () => {
      const c = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 1130,
        backgroundColor: '#fff',
      });

      setCanvas(c);

      // تحميل صورة الخلفية من السيرفر (الصفحة الأولى من PDF كصورة)
      const resPDF = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pdfData = await resPDF.json();
      const pdfImageUrl = `https://pdf-02ix.onrender.com/uploads/${pdfData.filename}`;

      fabric.Image.fromURL(pdfImageUrl, (img) => {
        img.set({ selectable: false, evented: false });
        img.scaleToWidth(c.getWidth());
        c.setBackgroundImage(img, c.renderAll.bind(c));
        setBgImage(img);
        console.log(bgImage)
      });

      // تحميل التعديلات إن وجدت
      const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/fabric-annotations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.fabricData) {
        c.loadFromJSON(data.fabricData, c.renderAll.bind(c));
      }

      setLoading(false);
    };

    initCanvas();
  }, [id, token]);

  // ✅ أدوات التعديل
  const addText = () => {
    const textbox = new fabric.Textbox('ملاحظة', {
      left: 100,
      top: 100,
      fill: 'black',
      fontSize: 18,
    });
    canvas.add(textbox).setActiveObject(textbox);
  };

  const addRect = () => {
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      fill: 'rgba(255, 0, 0, 0.3)',
      width: 100,
      height: 60,
    });
    canvas.add(rect).setActiveObject(rect);
  };

  const enableDrawing = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const deleteSelected = () => {
    canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject().renderAll();
  };

  // ✅ حفظ التعديلات للسيرفر
  const saveChanges = async () => {
    const json = canvas.toJSON();
    const res = await fetch(`https://pdf-02ix.onrender.com/api/pdf/${id}/fabric-annotations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: json }),
    });

    if (res.ok) {
      alert('✅ تم حفظ التعديلات!');
    } else {
      alert('❌ فشل في الحفظ');
    }
  };

  // ✅ تحميل التعديل كصورة
  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited.pdf.png';
    a.click();
  };

  // ✅ تحميل نسخة PDF مع التعديل
  const downloadPDF = () => {
    const imgData = canvas.toDataURL({ format: 'jpeg', quality: 1 });
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.getWidth(), canvas.getHeight()],
    });
    doc.addImage(imgData, 'JPEG', 0, 0, canvas.getWidth(), canvas.getHeight());
    doc.save('edited.pdf');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🎨 محرر PDF باستخدام Fabric.js</h1>

      {loading ? (
        <p>⏳ جاري التحميل...</p>
      ) : (
        <>
          <div className="flex gap-3 mb-4 flex-wrap">
            <button onClick={addText} className="px-3 py-1 bg-blue-500 text-white rounded">نص</button>
            <button onClick={addRect} className="px-3 py-1 bg-green-500 text-white rounded">مستطيل</button>
            <button onClick={enableDrawing} className="px-3 py-1 bg-purple-500 text-white rounded">✍️ رسم حر</button>
            <button onClick={deleteSelected} className="px-3 py-1 bg-red-500 text-white rounded">🗑 حذف</button>
            <button onClick={saveChanges} className="px-3 py-1 bg-gray-700 text-white rounded">💾 حفظ</button>
            <button onClick={downloadImage} className="px-3 py-1 bg-yellow-500 text-white rounded">⬇️ تحميل صورة</button>
            <button onClick={downloadPDF} className="px-3 py-1 bg-orange-500 text-white rounded">⬇️ تحميل PDF</button>
          </div>

          <canvas ref={canvasRef} className="border shadow-md" />
        </>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';

export default function FabricEditor({ token }) {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [bgImages, setBgImages] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  console.log("🚀 بدء تهيئة الكانفاس");
  let c;

  const initCanvas = async () => {
    // ✅ تفريغ الكانفاس السابق إن وجد
    if (canvasRef.current && fabric.Canvas) {
      try {
        const existingCanvas = fabric.Canvas?.instances?.find(
          (c) => c.lowerCanvasEl === canvasRef.current
        );
        if (existingCanvas) {
          console.log("♻️ تفريغ الكانفاس السابق");
          existingCanvas.dispose();
        }
      } catch (e) {
        console.warn('⚠️ مشكلة في تفريغ الكانفاس:', e);
      }
    }

    // ✅ إنشاء الكانفاس الجديد
    c = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 1130,
      backgroundColor: '#fff',
    });
    console.log("🎨 تم إنشاء الكانفاس الجديد");
    setCanvas(c);

    // ✅ تحميل صور صفحات PDF
    console.log("📥 جاري تحميل صور الصفحات...");
    const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}/page-images`);
    const data = await res.json();
    if (res.ok && Array.isArray(data.pages)) {
      console.log("✅ تم استلام الصور:", data.pages);
      const firstImageUrl = data.pages[0];
      console.log("🖼️ أول صورة سيتم تحميلها:", firstImageUrl);

      console.log("📸 تحميل الصورة من:", firstImageUrl);

      fabric.Image.fromURL(
        firstImageUrl,
        (img) => {
          if (!img) {
            console.error("❌ فشل في تحميل الصورة من URL:", firstImageUrl);
            return;
          }

          console.log("✅ تم تحميل الصورة بنجاح:", img);

          img.set({ selectable: false, evented: false });
          img.scaleToWidth(c.getWidth());

          c.setBackgroundImage(img, () => {
            console.log("🖼️ تم تعيين الصورة كخلفية على الكانفاس");
            c.renderAll();
          });

          setBgImages(data.pages);
        },
        { crossOrigin: 'Anonymous' } // 💡 مهم لتفادي مشاكل CORS
      );
    } else {
      console.error("❌ لم يتم استلام صور من السيرفر أو ليست مصفوفة");
    }

    // ✅ تحميل التعديلات السابقة
    console.log("📦 تحميل تعديلات fabric-annotations...");
    const res2 = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}/fabric-annotations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const saved = await res2.json();
    if (saved.fabricData) {
      console.log("🔄 استعادة تعديلات سابقة");
      c.loadFromJSON(saved.fabricData, c.renderAll.bind(c));
    } else {
      console.log("ℹ️ لا توجد تعديلات سابقة");
    }

    setLoading(false);
    console.log("✅ تم الانتهاء من التحميل");
  };

  initCanvas();

  return () => {
    if (c) {
      console.log("🧹 تنظيف الكانفاس عند تفكيك المكون");
      c.dispose();
    }
  };
}, [id, token]);



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

  const saveChanges = async () => {
    const json = canvas.toJSON();
    const res = await fetch(`https://pdf-generator-1-l8no.onrender.com/api/pdf/${id}/fabric-annotations`, {
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

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited.png';
    a.click();
  };

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
        <p>⏳ جاري تحميل الملف...</p>
      ) : (
        <>
          <div className="flex gap-3 mb-4 flex-wrap">
            <button onClick={addText} className="px-3 py-1 bg-blue-500 text-white rounded">نص</button>
            <button onClick={addRect} className="px-3 py-1 bg-green-500 text-white rounded">مستطيل</button>
            <button onClick={enableDrawing} className="px-3 py-1 bg-purple-500 text-white rounded">✍️ رسم</button>
            <button onClick={deleteSelected} className="px-3 py-1 bg-red-500 text-white rounded">🗑 حذف</button>
            <button onClick={saveChanges} className="px-3 py-1 bg-gray-700 text-white rounded">💾 حفظ</button>
            <button onClick={downloadImage} className="px-3 py-1 bg-yellow-500 text-white rounded">⬇️ تحميل صورة</button>
            <button onClick={downloadPDF} className="px-3 py-1 bg-orange-500 text-white rounded">⬇️ تحميل PDF</button>
          </div>

          <canvas ref={canvasRef} width="800" height="1130" className="border shadow-md" />
        </>
      )}
    </div>
  );
}

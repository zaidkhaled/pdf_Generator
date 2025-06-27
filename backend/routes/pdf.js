// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const PDFFile = require('../models/PDFFile');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); 
// const fs = require('fs');
// const { convertPDFToImages } = require('../controllers/pdfConverter');
// // const authMiddleware = require('../middleware/auth');

// const path = require('path');



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

//     // ✅ تحويل اسم الملف الأصلي من latin1 إلى utf8
//     const originalNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8');

//     // ✅ خزّن الاسم العربي الصحيح في body حتى تحفظه في قاعدة البيانات
//     req.cleanedOriginalName = originalNameUtf8;

//     cb(null, uniqueName + ext);
//   }
// });

// const upload = multer({ storage });

// // 🛡️ middleware لفحص التوكن وإعطاء صلاحية الدخول
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: 'Token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: 'Invalid token' + "  " + err });
//   }
// };


// router.post('/upload', authMiddleware, upload.single('pdf'), async (req, res) => {
//   try {
//     const file = new PDFFile({
//       filename: req.file.filename,
//       originalname: req.cleanedOriginalName,
//       owner: req.userId,
//       allowEditByOthers: req.body.allowEditByOthers === 'true'
//     });

//     await file.save();
//     await convertPDFToImages(file._id.toString(), req.file.filename);

//     // ✅ أضف اسم المستخدم المرفوع بعد الحفظ (بشكل يدوي)
//     const user = await User.findById(req.userId).select('username');
//     const fileWithUser = {
//       ...file.toObject(),
//       owner: {
//         _id: req.userId,
//         username: user.username
//       }
//     };

//     res.status(200).json(fileWithUser);
//   } catch (err) {
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// // 📥 استرجاع ملفات المستخدم المسجل
// router.get('/myfiles', authMiddleware, async (req, res) => {
//   try {
//   const files = await PDFFile.find({ owner: req.userId })
//   .sort({ createdAt: -1 })
//   .populate('owner', 'username'); // ✅ جلب اسم المستخدم

//     res.json(files);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch files' });
//   }
// });

// //  استرجاع ملفات عامة للمستخدمين الآخرين
// router.get('/public-files', authMiddleware, async (req, res) => {
//   try {
//   const files = await PDFFile.find({ allowEditByOthers: true })
//   .sort({ createdAt: -1 })
//   .populate('owner', 'username'); // ✅ جلب اسم صاحب الملف


//     res.json(files);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch public files' });
//   }
// });

// // 🗑️ حذف ملف خاص بالمستخدم فقط
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const file = await PDFFile.findById(req.params.id);

//     if (!file) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // تحقق من الملكية
//     if (file.owner.toString() !== req.userId) {
//       return res.status(403).json({ error: 'Not authorized to delete this file' });
//     }

//     await file.deleteOne();
//     res.json({ message: 'File deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Deletion failed' });
//   }
// });


// router.get('/:id', authMiddleware, async (req, res) => {
//   try {
//     const file = await PDFFile.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: 'File not found' });
//     res.json(file);
//   } catch {
//     res.status(500).json({ error: 'Failed to fetch file' });
//   }
// });

// // 🧠 حفظ تعديلات Fabric.js
// router.post('/pdf/:id/fabric-annotations', authMiddleware, async (req, res) => {
//   try {
//     const pdf = await PDFFile.findById(req.params.id);
//     if (!pdf) return res.status(404).json({ error: 'PDF غير موجود' });

//     // فقط صاحب الملف أو من له صلاحية التعديل
//     if (pdf.owner.toString() !== req.userId && !pdf.allowEditByOthers) {
//       return res.status(403).json({ error: 'لا تملك صلاحية التعديل على هذا الملف' });
//     }

//     pdf.fabricData = req.body.data;
//     await pdf.save();
//     res.json({ message: 'تم حفظ التعديلات' });
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في حفظ التعديلات' });
//   }
// });

// // 🧠 جلب تعديلات Fabric.js
// router.get('/pdf/:id/fabric-annotations', authMiddleware, async (req, res) => {
//   try {
//     const pdf = await PDFFile.findById(req.params.id);
//     if (!pdf) return res.status(404).json({ error: 'PDF غير موجود' });

//     res.json({ fabricData: pdf.fabricData || null });
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في جلب التعديلات' });
//   }
// });



// router.get('/:id/page-images', async (req, res) => {
//   const { id } = req.params;
//   const dirPath = path.join(__dirname, '..', 'pdf-images', id);

//   try {
//     if (!fs.existsSync(dirPath)) {
//       return res.status(404).json({ error: 'صور PDF غير موجودة بعد' });
//     }

//     const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.png'));
//     const urls = files.map(file => `http://localhost:5000/pdf-images/${id}/${file}`);

//     res.json({ pages: urls });
//   } catch (err) {
//     res.status(500).json({ error: 'خطأ أثناء قراءة صور الصفحات' });
//   }
// });


// module.exports = router;



// 📁 routes/pdfAndAnnotations.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDFFile = require('../models/PDFFile');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const { convertPDFToImages } = require('../controllers/pdfConverter');
const path = require('path');
const Annotation = require('../models/Annotation');

// ✅ إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8');
    req.cleanedOriginalName = originalNameUtf8;
    cb(null, uniqueName + ext);
  }
});
const upload = multer({ storage });

// ✅ التحقق من التوكن
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// ✅ رفع ملف PDF
router.post('/upload', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    const file = new PDFFile({
      filename: req.file.filename,
      originalname: req.cleanedOriginalName,
      owner: req.userId,
      allowEditByOthers: req.body.allowEditByOthers === 'true'
    });

    await file.save();
    await convertPDFToImages(file._id.toString(), req.file.filename);

    const user = await User.findById(req.userId).select('username');
    const fileWithUser = {
      ...file.toObject(),
      owner: { _id: req.userId, username: user.username }
    };

    res.status(200).json(fileWithUser);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ استرجاع ملفات المستخدم
router.get('/myfiles', authMiddleware, async (req, res) => {
  try {
    const files = await PDFFile.find({ owner: req.userId }).sort({ createdAt: -1 }).populate('owner', 'username');
    res.json(files);
  } catch {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// ✅ استرجاع الملفات العامة
router.get('/public-files', authMiddleware, async (req, res) => {
  try {
    const files = await PDFFile.find({ allowEditByOthers: true }).sort({ createdAt: -1 }).populate('owner', 'username');
    res.json(files);
  } catch {
    res.status(500).json({ error: 'Failed to fetch public files' });
  }
});

// ✅ حذف ملف
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await PDFFile.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    if (file.owner.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });
    await file.deleteOne();
    res.json({ message: 'File deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// ✅ جلب معلومات ملف
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await PDFFile.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch {
    res.status(500).json({ error: 'Failed to fetch file' });
  }
});

// ✅ روابط صور صفحات PDF
router.get('/:id/page-images', async (req, res) => {
  const { id } = req.params;
  const dirPath = path.join(__dirname, '..', 'pdf-images', id);

  try {
    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: 'صور PDF غير موجودة بعد' });
    }

    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.png'));
    const urls = files.map(file => `https://pdf-02ix.onrender.com/pdf-images/${id}/${file}`);

    const file = await PDFFile.findById(id);
    if (!file) return res.status(404).json({ error: 'الملف غير موجود' });

    res.json({ pages: urls, userId: file.owner.toString() });
  } catch (err) {
    res.status(500).json({ error: 'خطأ أثناء قراءة صور الصفحات' });
  }
});

// ✅ حفظ التعديلات (annotations)
router.post('/:id/annotations', authMiddleware, async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.userId;
    const { annotations } = req.body;

    await Annotation.deleteMany({ fileId, userId });

    const grouped = {};
    annotations.forEach((ann) => {
      if (!grouped[ann.pageIndex]) grouped[ann.pageIndex] = [];
      grouped[ann.pageIndex].push(ann);
    });

    const docs = Object.entries(grouped).map(([pageIndex, elements]) => ({
      fileId,
      userId,
      pageIndex: parseInt(pageIndex),
      elements
    }));

    await Annotation.insertMany(docs);

    res.status(200).json({ message: 'تم حفظ التعديلات' });
  } catch (err) {
    console.error('❌ خطأ في حفظ التعديلات:', err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

// ✅ جلب التعديلات
router.get('/:id/annotations', authMiddleware, async (req, res) => {
  try {
    const pdfId = req.params.id;
    const annotations = await Annotation.find({ "fileId": pdfId });
    res.json({ annotations });
  } catch (err) {
    console.error('❌ خطأ في جلب التعديلات:', err);
    res.status(500).json({ error: 'فشل في جلب التعديلات' });
  }
});

// ✅ حذف التعديلات لصفحة واحدة
router.delete('/:fileId/annotations/:pageIndex', authMiddleware, async (req, res) => {
  const { fileId, pageIndex } = req.params;
  const userId = req.userId;

  try {
    const file = await PDFFile.findById(fileId);
    if (!file) return res.status(404).json({ message: 'File not found' });
    if (file.owner.toString() !== userId) return res.status(403).json({ message: 'Not authorized' });

    await Annotation.deleteMany({ fileId, pageIndex });
    res.json({ message: 'تمت إعادة الصفحة للوضع الأصلي بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

module.exports = router;



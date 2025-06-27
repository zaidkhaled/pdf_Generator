

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/Auth');
// const pdfRoutes = require('./routes/pdf');
// const path = require('path');

// const annotationRoutes = require('./routes/annotations');



// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// app.use('/pdf-images', express.static(path.join(__dirname, 'pdf-images')));


// //  تسجيل جميع الراوترات
// app.use('/api/auth', authRoutes);
// app.use('/api/pdf', pdfRoutes);
// app.use('/api/pdf', annotationRoutes);




// // app.use('/', annotationRoutes);


// // تقديم ملفات React من مجلد build
// app.use(express.static(path.join(__dirname, "..", 'frontend','build')));

// // أي طلب لم يتم التعامل معه (SPA routing) يرجع index.html

// app.get('/', (req, res) => {
//   const filePath = path.join(__dirname, ".." ,'frontend', 'build', 'index.html');
// res.sendFile(filePath, (err) => {
//   if (err) {
//     console.error('❌ Error sending index.html:', err);
//     res.status(500).send('Internal Server Error');
//   } else {
//     console.log('✅ index.html sent successfully');
//   }
// });
// });

// //  الاتصال بقاعدة البيانات ثم تشغيل السيرفر
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(' Connected to MongoDB');
//     app.listen(5000, () => {
//       console.log(' Server running at http://localhost:5000');
//     });
//   })
//   .catch(err => {
//     console.error(' Failed to connect:', err);
//   });




// 00000000000000000000000000000000000000000000

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/Auth');
// const pdfRoutes = require('./routes/pdf');
// const path = require('path');
// const annotationRoutes = require('./routes/annotations');


// 000000000000000000000000000000000
// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());

// app.use('/uploads', express.static('uploads'));
// app.use('/pdf-images', express.static(path.join(__dirname, 'pdf-images')));
// app.use('/api/pdf', annotationRoutes);

// 0000000000000000000000000
// //  تسجيل جميع الراوترات
// app.use('/api/auth', authRoutes);
// app.use('/api/pdf', pdfRoutes);
// // app.use('/api/annotations', require('./routes/annotations'));
// //  الاتصال بقاعدة البيانات ثم تشغيل السيرفر
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(' Connected to MongoDB');
//     app.listen(5000, () => {
//       console.log(' Server running at http://localhost:5000');
//     });
//   })
//   .catch(err => {
//     console.error(' Failed to connect:', err);
//   });

// //  نقطة اختبار
// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });
// 00000000000000000000000000000000000


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const listEndpoints = require('express-list-endpoints');
const path = require('path');

// استيراد الراوترات
const authRoutes = require('./routes/Auth');
const pdfRoutes = require('./routes/pdf');
const annotationRoutes = require('./routes/annotations');

const app = express();

// إعداد CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// إعداد الميدل وير
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/pdf-images', express.static(path.join(__dirname, 'pdf-images')));

// تسجيل الراوترات
app.use('/api/auth', authRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/pdf', annotationRoutes);

// طباعة جميع المسارات المسجلة
const endpoints = listEndpoints(app);
console.log('\n📋 Registered Endpoints:');
endpoints.forEach((endpoint) => {
  console.log(`🚦 ${endpoint.methods.join(', ')} ${endpoint.path}`);
});

// تقديم ملفات React من مجلد build
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// // ✅ توجيه أي مسار غير API إلى React index.html
// app.get('/', (req, res, next) => {
//   if (req.path.startsWith('/api') || req.path.includes('.')) {
//     return next(); // لا تعالج API ولا الملفات الثابتة
//   }

//   const filePath = path.join(__dirname, '..', 'frontend', 'build', 'index.html');
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('❌ Error sending index.html:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       console.log('✅ index.html sent successfully');
//     }
//   });
// });

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });

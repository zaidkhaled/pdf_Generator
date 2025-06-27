const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },      // اسم الملف المخزن
  originalname: { type: String, required: true },  // الاسم الأصلي الذي رفعه المستخدم
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // صاحب الملف
  allowEditByOthers: { type: Boolean, default: false }, // السماح بالتعديل من قبل مستخدمين آخرين
  createdAt: { type: Date, default: Date.now },
  fabricData: { type: mongoose.Schema.Types.Mixed, default: null }
},{ timestamps: true });


module.exports = mongoose.model('PDFFile', pdfFileSchema);


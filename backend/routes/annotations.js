const express = require('express');
const router = express.Router();
const Annotation = require('../models/Annotation');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token44444444444444' });
  }
};

// 📥 جلب كل التعليقات المرتبطة بملف معين
router.get('/:pdfId', authMiddleware, async (req, res) => {
  try {
    const annotations = await Annotation.find({ pdfFile: req.params.pdfId }).populate('user', 'username');
    res.json(annotations);
  } catch {
    res.status(500).json({ error: 'خطأ في جلب التعليقات' });
  }
});

module.exports = router;

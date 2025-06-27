const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PDF',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pageIndex: {
    type: Number,
    required: true
  },
  elements: [
    mongoose.Schema.Types.Mixed
  ]
});

module.exports = mongoose.model('Annotation', annotationSchema);

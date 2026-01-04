const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'postType'
  },
  postType: {
    type: String,
    required: true,
    enum: ['Blog', 'Discussion']
  }
}, {
  timestamps: true
});

// Ensure one bookmark per user per post
bookmarkSchema.index({ userId: 1, postId: 1, postType: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);


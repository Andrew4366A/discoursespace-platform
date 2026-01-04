const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'postType'
  },
  postType: {
    type: String,
    required: true,
    enum: ['Blog', 'Discussion']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Add virtual for formatted date
commentSchema.virtual('date').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Ensure virtuals are included in JSON
commentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', commentSchema);


const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Science', 'Art & Design', 'Education', 'Business', 'Gaming', 'Lifestyle', 'Other'],
    default: 'Other'
  },
  tags: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  },
  comments: {
    type: [{
      id: Number,
      author: String,
      content: String,
      date: String,
      createdAt: Date
    }],
    default: []
  },
  bookmarked: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Add virtual for formatted date
blogSchema.virtual('date').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Ensure virtuals are included in JSON
blogSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Blog', blogSchema);


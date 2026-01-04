// Comment Model
// This represents the structure for comments on posts

class Comment {
  constructor(data) {
    this.id = data.id || Date.now();
    this.postId = data.postId || null;
    this.postType = data.postType || 'blog'; // 'blog' or 'discussion'
    this.author = data.author || '';
    this.content = data.content || '';
    this.date = data.date || new Date().toLocaleDateString();
    this.likes = data.likes || 0;
    this.likedBy = data.likedBy || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate comment data
  static validate(data) {
    const errors = [];
    
    if (!data.postId) {
      errors.push('Post ID is required');
    }
    
    if (!data.content || data.content.trim().length === 0) {
      errors.push('Comment content is required');
    }
    
    if (!data.author || data.author.trim().length === 0) {
      errors.push('Author is required');
    }
    
    if (data.postType && !['blog', 'discussion'].includes(data.postType)) {
      errors.push('Post type must be either "blog" or "discussion"');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      postType: this.postType,
      author: this.author,
      content: this.content,
      date: this.date,
      likes: this.likes,
      likedBy: this.likedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Comment;


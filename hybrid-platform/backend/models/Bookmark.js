// Bookmark Model
// This represents the structure for bookmarked posts

class Bookmark {
  constructor(data) {
    this.id = data.id || Date.now();
    this.userId = data.userId || '';
    this.postId = data.postId || null;
    this.postType = data.postType || 'blog'; // 'blog' or 'discussion'
    this.createdAt = data.createdAt || new Date();
  }

  // Validate bookmark data
  static validate(data) {
    const errors = [];
    
    if (!data.userId || data.userId.trim().length === 0) {
      errors.push('User ID is required');
    }
    
    if (!data.postId) {
      errors.push('Post ID is required');
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
      userId: this.userId,
      postId: this.postId,
      postType: this.postType,
      createdAt: this.createdAt
    };
  }
}

module.exports = Bookmark;


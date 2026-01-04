// Blog Model
// This represents the structure for blog posts

class Blog {
  constructor(data) {
    this.id = data.id || Date.now();
    this.title = data.title || '';
    this.content = data.content || '';
    this.author = data.author || '';
    this.date = data.date || new Date().toLocaleDateString();
    this.category = data.category || 'Other';
    this.tags = data.tags || [];
    this.likes = data.likes || 0;
    this.likedBy = data.likedBy || [];
    this.comments = data.comments || [];
    this.bookmarked = data.bookmarked || false;
    this.views = data.views || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate blog data
  static validate(data) {
    const errors = [];
    
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (!data.content || data.content.trim().length === 0) {
      errors.push('Content is required');
    }
    
    if (!data.author || data.author.trim().length === 0) {
      errors.push('Author is required');
    }
    
    if (data.title && data.title.length > 200) {
      errors.push('Title must be less than 200 characters');
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
      title: this.title,
      content: this.content,
      author: this.author,
      date: this.date,
      category: this.category,
      tags: this.tags,
      likes: this.likes,
      likedBy: this.likedBy,
      comments: this.comments,
      bookmarked: this.bookmarked,
      views: this.views,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Blog;


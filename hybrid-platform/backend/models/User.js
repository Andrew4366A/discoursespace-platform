// User Model
// This represents the structure for users

class User {
  constructor(data) {
    this.id = data.id || Date.now();
    this.username = data.username || '';
    this.email = data.email || '';
    this.password = data.password || ''; // Should be hashed
    this.isAdmin = data.isAdmin || false;
    this.bio = data.bio || '';
    this.location = data.location || '';
    this.credibility = data.credibility || 0;
    this.followers = data.followers || [];
    this.following = data.following || [];
    this.communities = data.communities || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate user data
  static validate(data, isUpdate = false) {
    const errors = [];
    
    if (!isUpdate) {
      if (!data.username || data.username.trim().length === 0) {
        errors.push('Username is required');
      }
      
      if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
      }
      
      if (!data.password || data.password.length < 6) {
        errors.push('Password must be at least 6 characters');
      }
    } else {
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
      }
    }
    
    if (data.username && data.username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to JSON (exclude password)
  toJSON() {
    const { password, ...userData } = {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      bio: this.bio,
      location: this.location,
      credibility: this.credibility,
      followers: this.followers,
      following: this.following,
      communities: this.communities,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
    return userData;
  }

  // Get public profile (without sensitive data)
  toPublicJSON() {
    return {
      id: this.id,
      username: this.username,
      bio: this.bio,
      location: this.location,
      credibility: this.credibility,
      followersCount: this.followers.length,
      followingCount: this.following.length,
      communitiesCount: this.communities.length
    };
  }
}

module.exports = User;


const Blog = require('../models/BlogModel');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, search, sortBy } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category && category !== 'All Topics') {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Build sort
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'likes') {
      sort = { likes: -1 };
    } else if (sortBy === 'views') {
      sort = { views: -1 };
    }
    
    const blogs = await Blog.find(query).sort(sort);
    
    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

// Like/Unlike blog
exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    const isLiked = blog.likedBy.includes(userId);
    
    if (isLiked) {
      blog.likes = Math.max(0, blog.likes - 1);
      blog.likedBy = blog.likedBy.filter(u => u !== userId);
    } else {
      blog.likes += 1;
      blog.likedBy.push(userId);
    }
    
    await blog.save();
    
    res.json({
      success: true,
      message: isLiked ? 'Blog unliked' : 'Blog liked',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
    });
  }
};


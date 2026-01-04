const Discussion = require('../models/DiscussionModel');

// Get all discussions
exports.getAllDiscussions = async (req, res) => {
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
    
    const discussions = await Discussion.find(query).sort(sort);
    
    res.json({
      success: true,
      count: discussions.length,
      data: discussions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching discussions',
      error: error.message
    });
  }
};

// Get single discussion by ID
exports.getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findById(id);
    
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }
    
    // Increment views
    discussion.views = (discussion.views || 0) + 1;
    await discussion.save();
    
    res.json({
      success: true,
      data: discussion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching discussion',
      error: error.message
    });
  }
};

// Create new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Discussion created successfully',
      data: discussion
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
      message: 'Error creating discussion',
      error: error.message
    });
  }
};

// Update discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Discussion updated successfully',
      data: discussion
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
      message: 'Error updating discussion',
      error: error.message
    });
  }
};

// Delete discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findByIdAndDelete(id);
    
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Discussion deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting discussion',
      error: error.message
    });
  }
};

// Like/Unlike discussion
exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const discussion = await Discussion.findById(id);
    
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }
    
    const isLiked = discussion.likedBy.includes(userId);
    
    if (isLiked) {
      discussion.likes = Math.max(0, discussion.likes - 1);
      discussion.likedBy = discussion.likedBy.filter(u => u !== userId);
    } else {
      discussion.likes += 1;
      discussion.likedBy.push(userId);
    }
    
    await discussion.save();
    
    res.json({
      success: true,
      message: isLiked ? 'Discussion unliked' : 'Discussion liked',
      data: discussion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
    });
  }
};

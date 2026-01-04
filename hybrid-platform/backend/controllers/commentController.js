const Comment = require('../models/CommentModel');

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId, postType } = req.params;
    
    const comments = await Comment.find({
      postId: postId,
      postType: postType.charAt(0).toUpperCase() + postType.slice(1) // Capitalize first letter
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

// Create new comment
exports.createComment = async (req, res) => {
  try {
    const { postId, postType } = req.params;
    
    const commentData = {
      ...req.body,
      postId: postId,
      postType: postType.charAt(0).toUpperCase() + postType.slice(1)
    };
    
    const comment = await Comment.create(commentData);
    
    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment
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
      message: 'Error creating comment',
      error: error.message
    });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: comment
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
      message: 'Error updating comment',
      error: error.message
    });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
};

// Like/Unlike comment
exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    const isLiked = comment.likedBy.includes(userId);
    
    if (isLiked) {
      comment.likes = Math.max(0, comment.likes - 1);
      comment.likedBy = comment.likedBy.filter(u => u !== userId);
    } else {
      comment.likes += 1;
      comment.likedBy.push(userId);
    }
    
    await comment.save();
    
    res.json({
      success: true,
      message: isLiked ? 'Comment unliked' : 'Comment liked',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
    });
  }
};

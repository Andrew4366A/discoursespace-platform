const Bookmark = require('../models/BookmarkModel');

// Get all bookmarks for a user
exports.getUserBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const bookmarks = await Bookmark.find({ userId })
      .populate('postId')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookmarks',
      error: error.message
    });
  }
};

// Create bookmark (toggle)
exports.toggleBookmark = async (req, res) => {
  try {
    const { userId, postId, postType } = req.body;
    
    const postTypeCapitalized = postType.charAt(0).toUpperCase() + postType.slice(1);
    
    const existingBookmark = await Bookmark.findOne({
      userId,
      postId,
      postType: postTypeCapitalized
    });
    
    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      res.json({
        success: true,
        message: 'Bookmark removed',
        bookmarked: false
      });
    } else {
      // Add bookmark
      const bookmark = await Bookmark.create({
        userId,
        postId,
        postType: postTypeCapitalized
      });
      
      res.status(201).json({
        success: true,
        message: 'Bookmark added',
        bookmarked: true,
        data: bookmark
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Bookmark already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error toggling bookmark',
      error: error.message
    });
  }
};

// Check if post is bookmarked
exports.checkBookmark = async (req, res) => {
  try {
    const { userId, postId, postType } = req.query;
    
    const postTypeCapitalized = postType.charAt(0).toUpperCase() + postType.slice(1);
    
    const bookmark = await Bookmark.findOne({
      userId,
      postId,
      postType: postTypeCapitalized
    });
    
    res.json({
      success: true,
      bookmarked: !!bookmark
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking bookmark',
      error: error.message
    });
  }
};

// Delete bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findByIdAndDelete(id);
    
    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Bookmark deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting bookmark',
      error: error.message
    });
  }
};

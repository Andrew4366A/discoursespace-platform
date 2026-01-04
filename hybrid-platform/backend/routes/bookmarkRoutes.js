const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// Get all bookmarks for a user
router.get('/user/:userId', bookmarkController.getUserBookmarks);

// Toggle bookmark (add/remove)
router.post('/toggle', bookmarkController.toggleBookmark);

// Check if post is bookmarked
router.get('/check', bookmarkController.checkBookmark);

// Delete bookmark
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;


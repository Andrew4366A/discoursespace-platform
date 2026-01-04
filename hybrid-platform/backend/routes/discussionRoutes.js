const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

// Get all discussions
router.get('/', discussionController.getAllDiscussions);

// Get single discussion by ID
router.get('/:id', discussionController.getDiscussionById);

// Create new discussion
router.post('/', discussionController.createDiscussion);

// Update discussion
router.put('/:id', discussionController.updateDiscussion);

// Delete discussion
router.delete('/:id', discussionController.deleteDiscussion);

// Toggle like on discussion
router.post('/:id/like', discussionController.toggleLike);

module.exports = router;


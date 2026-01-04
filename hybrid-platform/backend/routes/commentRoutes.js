const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Get all comments for a post
router.get('/post/:postId/:postType', commentController.getCommentsByPost);

// Create new comment
router.post('/post/:postId/:postType', commentController.createComment);

// Update comment
router.put('/:id', commentController.updateComment);

// Delete comment
router.delete('/:id', commentController.deleteComment);

// Toggle like on comment
router.post('/:id/like', commentController.toggleLike);

module.exports = router;


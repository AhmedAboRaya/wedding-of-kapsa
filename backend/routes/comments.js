const express = require('express');
const router  = express.Router();
const Comment = require('../models/Comment');

// POST /api/comments — save a new comment
router.post('/', async (req, res) => {
  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone || !comment) {
      return res.status(400).json({ message: 'All fields (name, phone, comment) are required.' });
    }

    const newComment = await Comment.create({ name, phone, comment });

    res.status(201).json({
      message: 'Comment saved successfully!',
      comment: { name: newComment.name, comment: newComment.comment, createdAt: newComment.createdAt },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

// GET /api/comments — return all comments (phone is never exposed)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({})
      .select('name comment createdAt -_id')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

module.exports = router;

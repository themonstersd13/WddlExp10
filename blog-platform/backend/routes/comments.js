const express = require('express');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const router = express.Router();

// ADD COMMENT
router.post('/:postId', auth, async (req, res) =>
  res.json(await new Comment({
    text: req.body.text,
    author: req.user.id,
    post: req.params.postId
  }).save())
);

// GET COMMENTS
router.get('/:postId', async (req, res) =>
  res.json(await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ date: -1 }))
);

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const router = express.Router();

// CREATE
router.post('/', auth, async (req, res) =>
  res.json(await new Post({ ...req.body, author: req.user.id }).save())
);

// READ ALL
router.get('/', async (req, res) =>
  res.json(await Post.find().populate('author', 'username').sort({ date: -1 }))
);

// READ ONE
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  if (!post) return res.status(404).json({ msg: 'Not found' });
  res.json(post);
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id)
    return res.status(!post ? 404 : 401).json({ msg: !post ? 'Not found' : 'Unauthorized' });
  res.json(await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }));
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id)
    return res.status(!post ? 404 : 401).json({ msg: !post ? 'Not found' : 'Unauthorized' });
  await post.remove();
  res.json({ msg: 'Deleted' });
});

module.exports = router;

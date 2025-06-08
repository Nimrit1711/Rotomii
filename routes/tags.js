const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const tags = await Tag.getUserTags(req.user.user_id);
    res.json(tags);
  } catch (error) {
    console.error('Get user tags error:', error);
    res.status(500).json({ error: 'Failed to get user tags' });
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { tagName } = req.body;
    if (!tagName) {
      return res.status(400).json({ error: 'Tag name is required' });
    }

    const tagId = await Tag.createTag(req.user.user_id, tagName);
    res.json({ tagId, tagName: tagName.toLowerCase().trim() });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Create tag error:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.delete('/:tagName', isAuthenticated, async (req, res) => {
  try {
    const success = await Tag.deleteTag(req.user.user_id, req.params.tagName);
    if (success) {
      res.json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;

const express = require('express');
const { Bookmark } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// POST route to bookmark a job
router.post('/bookmarks', auth, async (req, res) => {
  const { jobId } = req.body;

  try {
    const bookmark = await Bookmark.create({
      userId: req.user.id,
      jobId
    });

    res.json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET route to fetch all bookmarks for the user
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: { userId: req.user.id }
    });

    res.json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

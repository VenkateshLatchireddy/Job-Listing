const { Bookmark, Job } = require('../models');

exports.addBookmark = async (req, res) => {
    try {
        const { jobId } = req.body;
        await Bookmark.create({ userId: req.user.id, jobId });
        res.json({ message: "Job bookmarked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.findAll({
            where: { userId: req.user.id },
            include: Job
        });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

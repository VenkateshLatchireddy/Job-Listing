const { Job } = require('../models');

exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, userId: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const { search, sort, filterLocation, filterJobType, page = 1, limit = 10 } = req.query;
        
        const whereClause = {};
        if (search) {
            whereClause.position = { [Op.like]: `%${search}%` };
        }
        if (filterLocation) {
            whereClause.location = filterLocation;
        }
        if (filterJobType) {
            whereClause.jobType = filterJobType;
        }

        const offset = (page - 1) * limit;
        const order = sort === "salary" ? [["salary", "DESC"]] : [["createdAt", "DESC"]];

        const jobs = await Job.findAndCountAll({
            where: whereClause,
            order,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            totalJobs: jobs.count,
            totalPages: Math.ceil(jobs.count / limit),
            jobs: jobs.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        await Job.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
        res.json({ message: "Job updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        await Job.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

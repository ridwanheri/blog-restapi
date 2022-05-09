const Article = require('../model/article');

const getArticles = async (req, res) => {
    try {
        const sortOptions = {
            createdAt: 1,
        };

        if (req.query.sortBy && req.query.orderBy) {
            sortOptions[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
        }

        const articles = await Article.aggregate([
            // { $match: { author: req.query.author } },
            { $sort: sortOptions },
            { $limit: parseInt(req.query.limit || 10) },
            { $skip: parseInt(req.query.skip || 0) },
        ]);
        res.status(200).json({
            data: articles,
            error: null,
            success: true,
            message: 'Successfully get articles',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const getArticlesByAuthor = async (req, res) => {
    try {
        const sortOptions = {
            createdAt: 1,
        };

        if (req.query.sortBy && req.query.orderBy) {
            sortOptions[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
        }

        const articles = await Article.aggregate([
            { $match: { author: req.params.author } },
            { $sort: sortOptions },
            { $limit: parseInt(req.query.limit || 10) },
            { $skip: parseInt(req.query.skip || 0) },
        ]);
        res.status(200).json({
            data: articles,
            error: null,
            success: true,
            message: 'Successfully get articles by author',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const createArticle = async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        });
        const created = await article.save();
        res.status(201).json({
            data: created,
            error: null,
            success: true,
            message: 'Successfully create an article',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const updateArticle = async (req, res) => {
    try {
        const updated = await Article.findOneAndUpdate(
            { _id: req.params.articleId },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                },
            },
            { new: true }
        );
        res.status(200).json({
            data: updated,
            error: null,
            success: true,
            message: 'Successfully update an article',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const deleteArticle = async (req, res) => {
    try {
        const deleted = await Article.deleteOne({ _id: req.params.articleId });
        res.status(204).json({
            error: null,
            success: true,
            message: 'Successfully delete an article',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

module.exports = {
    getArticles,
    getArticlesByAuthor,
    createArticle,
    updateArticle,
    deleteArticle,
};

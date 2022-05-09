// Article
const {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByAuthor,
} = require('../controllers/articles');

// comment
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/comments');

const router = require('express').Router();
const apiVer = '/api/v1';

router.get('/', (req, res) => {
    res.send('Blog API');
});

// article
router.get(`${apiVer}/articles`, getArticles);
router.get(`${apiVer}/articles/:author`, getArticlesByAuthor);
router.post(`${apiVer}/articles`, createArticle);
router.put(`${apiVer}/articles/:articleId`, updateArticle);
router.delete(`${apiVer}/articles/:articleId`, deleteArticle);

// comment
router.get(`${apiVer}/comments`, getComments);
router.post(`${apiVer}/comments`, createComment);
router.put(`${apiVer}/comments/:commentId`, updateComment);
router.delete(`${apiVer}/comments/:commentId`, deleteComment);

module.exports = router;

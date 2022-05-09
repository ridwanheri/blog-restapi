const Comment = require('../model/comment');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({
            data: comments,
            error: null,
            success: true,
            message: 'Successfully get comments',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const createComment = async (req, res) => {
    try {
        const comment = new Comment({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        });
        const created = await comment.save();
        res.status(201).json({
            data: created,
            error: null,
            success: true,
            message: 'Successfully create a comment',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const updateComment = async (req, res) => {
    try {
        const updated = await Comment.findOneAndUpdate(
            { _id: req.params.commentId },
            {
                $set: {
                    author: req.body.author,
                    content: req.body.content,
                },
            },
            { new: true }
        );
        res.status(200).json({
            data: updated,
            error: null,
            success: true,
            message: 'Successfully update a comment',
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false,
        });
        console.log('error', error);
    }
};

const deleteComment = async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.commentId });
        res.status(204).json({
            error: null,
            success: true,
            message: 'Successfully delete a comment',
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
    getComments,
    createComment,
    updateComment,
    deleteComment,
};

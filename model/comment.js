const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        articleId: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Comment', CommentSchema);

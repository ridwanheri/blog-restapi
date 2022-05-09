const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            default: 'Anonym',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Article', ArticleSchema);

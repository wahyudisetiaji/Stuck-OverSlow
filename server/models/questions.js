const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    questions: {
        type: String,
        required: [true, 'Questions is required']
    },
    upvote: [],
    downvote: [],
    answer: [{
        answer: String,
        name: String,
        upvote: [],
        downvote: [],
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions
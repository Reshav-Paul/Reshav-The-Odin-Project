const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

CommentSchema.virtual('url').get(function () {
    return '/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
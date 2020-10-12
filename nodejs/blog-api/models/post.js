const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    datePublished: { type: Date },
    editor: { type: Schema.Types.ObjectId, ref: 'Editor' , required: true }
});

PostSchema.virtual('url').get(function() {
    return '/post/' + this._id;
});

PostSchema.pre('save', function(next) {
    if (this.isPublished && !this.datePublished) {
        this.datePublished = Date.now();
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);
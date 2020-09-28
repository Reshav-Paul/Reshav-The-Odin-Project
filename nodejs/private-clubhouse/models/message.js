const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
});

MessageSchema.virtual('url').get(function() {
    return '/message/' + this._id;
});
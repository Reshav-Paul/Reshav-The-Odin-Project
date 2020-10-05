const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    isMember: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
});

UserSchema.virtual('url').get(function() {
    return '/user/' + this._id;
});

UserSchema.virtual('name').get(function() {
    return this.firstName + ' ' + (this.lastName || '');
});

module.exports = mongoose.model('User', UserSchema);
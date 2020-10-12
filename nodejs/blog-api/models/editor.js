const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let EditorSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

EditorSchema.virtual('url').get(function() {
    return '/editor/' + this._id;
});

EditorSchema.pre('save', function(next) {
    bcrypt.genSalt(parseInt(process.env.passwordHash), function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, function(err, hashedPassword) {
            if (err) return next(err);
            this.password = hashedPassword;
            next();
        });
    })    
});

module.exports = mongoose.model('Editor', EditorSchema);
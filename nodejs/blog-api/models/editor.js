const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let EditorSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

EditorSchema.virtual('url').get(function() {
    return '/editor/' + this._id;
});

EditorSchema.pre('save', function(next) {
    let doc = this;
    bcrypt.genSalt(parseInt(process.env.passwordHash), function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(doc.password, salt, function(err, hashedPassword) {
            if (err) return next(err);
            doc.password = hashedPassword;
            next();
        });
    })    
});

module.exports = mongoose.model('Editor', EditorSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    firstName: {type: String, required: true},
    lastName: String
});

UserSchema.virtual('url').get(function() {
    return '/user' + this._id;
});

UserSchema.pre('save', function(next) {
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

module.exports = mongoose.model('User', UserSchema);
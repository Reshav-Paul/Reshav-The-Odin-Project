let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CategorySchema = new Schema(
    {
        name: {type: String, required: true},
        abbreviation: String,
        description: {type: String, required: true},
        imageUrl: {type: String, default: '/images/default.jpg'},
    }
);
// https://image.flaticon.com/icons/png/512/94/94733.png
CategorySchema.virtual('url').get(function() {
    return '/category/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);
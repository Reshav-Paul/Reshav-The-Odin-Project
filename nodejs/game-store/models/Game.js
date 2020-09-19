let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        releaseDate: Date,
        price: Number,
        imageUrl: String,
        category: {type: Schema.Types.ObjectId}
    }
);

CategorySchema.virtual('url').get(function() {
    return '/game/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);
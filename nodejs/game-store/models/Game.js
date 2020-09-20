let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        releaseDate: Date,
        price: Number,
        imageUrl: {type: String, required: true, default: 'https://image.flaticon.com/icons/png/512/94/94733.png'},
        category: {type: [Schema.Types.ObjectId], required: true}
    }
);

GameSchema.virtual('url').get(function() {
    return '/game/' + this._id;
});

module.exports = mongoose.model('Game', GameSchema);
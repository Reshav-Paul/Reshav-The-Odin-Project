let mongoose = require('mongoose');
let moment = require('moment');

let Schema = mongoose.Schema;

let AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        family_name: { type: String, required: true, maxlength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

AuthorSchema.virtual('name').get(function () {
    let fullname = '';
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }
    if (!this.first_name || !this.family_name) {
        fullname = '';
    }
    return fullname;
});

AuthorSchema.virtual('lifespan').get(function () {
    let birth_date = this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : 'not available';
    let death_date = this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : 'current';

    return birth_date + ' - ' + death_date;
});

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return moment(this.date_of_death).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Author', AuthorSchema);
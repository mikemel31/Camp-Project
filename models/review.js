const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    comment: {
        type: String,
        maxlength: 1000
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },

    // date: { 
    //     type: Date, 
    //     default: Date.now 
    // }
})

ReviewSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Review', ReviewSchema)
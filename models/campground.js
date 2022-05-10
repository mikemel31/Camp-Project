const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Review = require('./review');

const CampgroundSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },

    title: {
        type: String,
        required: true,
        maxlength: 75
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    address: {
        type: String
    },

    state: {
        type: String,
        maxlength: 3
    },
    city: String,
    zip: {
        type: Number,
        maxlength: 5
    },

    image: {
        type: String
    },

    images: [{
        url: String,
        filename: String
    }],

    tel: String,
    email: String,
    website: String,

    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        autopopulate: true
        }
    ],

    updated: {
        type: Date,
        default: Date.now()
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

})

CampgroundSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Campground', CampgroundSchema);
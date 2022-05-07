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

    location: {
        state: {
            type: String,
            maxlength: 3
        },
        city: String,
        zip: {
            type: String,
            maxlength: 6
        }
    },

    image: {
        type: String
    },

    // images: [{
    //     url: String,
    //     filename: String
    // }],

    contacts: {
        tel: String,
        email: String,
        website: String
    },

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
    }

})

CampgroundSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Campground', CampgroundSchema);
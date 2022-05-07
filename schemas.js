const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        zip: Joi.number().positive().required(),
        image: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        description: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().required(),
        website: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5)
    }).required()
})
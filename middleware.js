const {ExpressError} = require('./utils')
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const flash = require('connect-flash');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "You need to be signed in");
      return res.redirect("/login");
    }
    next();
};

module.exports.existingCamp = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      req.flash('error', 'Campground not found')
      return res.redirect('/campgrounds')
    }
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
       req.flash('error', 'Campground not found')
       return res.redirect('/campgrounds')
    }
    next();
}

module.exports.existingReview = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.reviewId)) {
      req.flash('error', 'Review not found')
      return res.redirect(`/campgrounds/${req.params.id}`)
    }
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
       req.flash('error', 'Campground not found')
       return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    if (req.user.id !== campground.owner.id) {
        req.flash("error", "You don't have permission to do that");
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId)
    if (req.user.id !== review.owner.id) {
        req.flash("error", "You don't have permission to do that");
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}
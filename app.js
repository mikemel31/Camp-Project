if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

// requiring main paert
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');
const User = require('./models/user');
const Review = require('./models/review');
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');
const path = require('path');
const { isLoggedIn, existingCamp, isOwner, isReviewOwner, existingReview, validateCampground, validateReview } = require('./middleware');
const {catchAsync, ExpressError} = require('./utils')
const zips = require('./seeds/zips');
const {reviewSchema, campgroundSchema} = require('./schemas');
const Joi = require('joi');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});


// connecting mongoose
mongoose.connect("mongodb://0.0.0.0:27017/CampProject");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// making session

const sessionConfig = {
    secret: "itTime",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));

//using passport for user registration and auth

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//using locals for flash and userSession
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.returnTo = req.originalUrl;
    next();
})

//making setups
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//user routes

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.route('/login')
.get((req, res) => {
    res.render('users/login')
})
.post(passport.authenticate('local', {failureFlash:true, failureRedirect: '/login'}), 
    async (req, res) => {
        req.flash('success', `Welcome back, ${req.user.name}`);
        if (!req.session.returnTo) {res.redirect('/campgrounds')} else {
            res.redirect(req.session.returnTo)}
            delete req.session.returnTo;
})

app.route('/register')
.get((req, res) => {
    res.render('users/register')
})
.post(catchAsync (async (req, res) => {
    const {username, password, email, name} = req.body;
    const user = new User({email, username, name});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next();
        req.flash('success', 'Welcome to Camp');
        res.redirect('/home')
    })
}))

app.get('/home', (req, res) => {
    req.session.returnTo = req.originalUrl;
    res.render('home')
})

app.post('/logout', async (req, res) => {
    req.logout();
    req.flash('success', 'You was successfully logged out');
    res.redirect('/campgrounds');
})

app.get('/campgrounds/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new', {zips})
})


app.get('/campgrounds', catchAsync (async (req, res) => {
    const campgrounds = await Campground.find();
    const i = 0;
    res.render("campgrounds/index", { campgrounds, i })
}))

app.post('/campgrounds', validateCampground, upload.array('image'), catchAsync( async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: `${req.body.campground.address}, ${req.body.campground.city}, ${req.body.campground.state}, ${req.body.campground.zip}`,
        limit: 1
    }).send();
    const campground = new Campground(req.body.campground);
    campground.location = geoData.body.features[0].geometry;
    campground.owner = req.user._id;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await campground.save(function(err) {
      if (err) console.log(err)});
    req.flash('success', 'Your campground was added to system!')
    res.redirect(`/campgrounds/${campground.id}`)
}))


app.route('/campgrounds/:id')
.get(existingCamp, catchAsync (async (req, res) => {
    req.session.returnTo = req.originalUrl;
    const campground = await Campground.findById(req.params.id).populate({path: "reviews", populate: {path: 'owner'}}).populate('owner');
    res.render('campgrounds/show', {campground})
}))
.delete(existingCamp, isLoggedIn, isOwner, catchAsync (async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndRemove(id);
    req.flash('success', 'Your campground was deleted!')
    res.redirect("/campgrounds");
}))
.patch(
    existingCamp, 
    isLoggedIn, 
    isOwner,
    validateCampground,
    upload.array('image'),
    catchAsync( async (req, res) => {
        const { id } = req.params;
        console.log(req.files);
        const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        campground.images.push(...imgs);
        await campground.save(function(err) {
            if (err) console.log(err)});
        if (req.body.deleteImages && req.body.deleteImages.length !== 0) {
            await campground.updateOne({$pull: {images: { filename: { $in: req.body.deleteImages}}}})
        }
        req.flash('success', 'Your campground was updated!');
        res.redirect(`/campgrounds/${campground.id}`);
        console.log(campground)
}))

app.route('/campgrounds/:id/edit')
.get(existingCamp, isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground, zips });
}))

app.route('/campgrounds/:id/editImg')
.get(existingCamp, isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/editImg", { campground });
}))

app.post('/campgrounds/:id/reviews',
    isLoggedIn, validateReview,
    catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({path: "reviews", populate: {path: 'owner'}}).populate('owner')
    const review = new Review(req.body.review);
    review.owner = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save(function(err) {
        if (err) console.log(err)});
    req.flash('success', 'Your review added')
    res.redirect(`/campgrounds/${campground.id}`);
}))

app.route('/campgrounds/:id/reviews/:reviewId')
.delete(existingReview, isLoggedIn, isReviewOwner, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    Review.findByIdAndRemove(reviewId);
    req.flash('success', 'Your review was deleted');
    res.redirect(`/campgrounds/${id}`);
  }))


app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Oh No, Something Went Wrong!";
    }
    res.status(statusCode).render("error", { err });
});

// setting port for app
app.listen(3030, console.log("App is working at 3030 port"));
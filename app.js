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
const { catchAsync } = require('./middleware');
const zips = require('./zips')

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

app.route('/login')
.get((req, res) => {
    res.render('users/login')
})
.post(passport.authenticate('local', {failureFlash:true, failureRedirect: '/login'}), 
    async (req, res) => {
        req.flash('success', `Welcome back, ${req.user.name}`)
        if (!res.locals.returnTo || res.locals.returnTo !== '/login' || res.locals.returnTo !== '/logo.png') {
            res.redirect('/home')
        } else {
        res.redirect(res.locals.returnTo)
    }
        delete res.locals.returnTo;
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
    res.render('home')
})

app.post('/logout', async (req, res) => {
    req.logout();
    req.flash('success', 'You was successfully logged out');
    res.redirect('/campgrounds');
})

app.get('/new', (req, res) => {
    res.render('campgrounds/new', {zips})
})


app.route('/campgrounds')


app.route('/campgounds/:id')

app.route('/campgrounds/:id/edit')

app.all('*', (req, res) => {})
// setting port for app
app.listen(3030, console.log("App is working at 3030 port"));
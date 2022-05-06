module.exports.catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "You need to be signed in");
      return res.redirect("/login");
    }
    next();
  };
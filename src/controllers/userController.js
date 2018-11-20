const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    create(req, res, next){
             let newUser = {
               email: req.body.email,
               password: req.body.password,
               passwordConfirmation: req.body.passwordConfirmation
             };
             userQueries.createUser(newUser, (err, user) => {
               if(err){
                 req.flash("error", err);
                 res.redirect("/users/sign_up");
               } else {
    
                 passport.authenticate("local")(req, res, () => {
                   req.flash("notice", "You've successfully signed in!");
                   res.redirect("/");
                 })
               }
             });
           },

    signUp(req, res, next){
      res.render("users/sign_up");
    }
  }
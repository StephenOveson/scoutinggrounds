const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");
passport.use(
  new LocalStrategy((user, password, done) => {
      db.User.findOne({
          username: user
      }).then(dbUser => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;

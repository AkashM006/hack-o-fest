const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy({ usernameField: "email", passwordField: "password" }),
  (username, password, done) => {
    // todo: find the user and return the done function
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // todo: find the user using id and return the user object
});

const passport = require("passport");
const { User } = require("../models/models");
const { checkPassword } = require("../utilities/password");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      user = {
        username,
        password,
      };
      try {
        const user = await User.findOne({
          where: { email: username },
        });
        if (!user) return done(null, false);
        const match = await checkPassword(password, user.password);
        if (match) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  try {
    const user = User.findOne({
      where: { email },
    });
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

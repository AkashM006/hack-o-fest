const express = require("express");
const passport = require("passport");
const app = express.Router();
const { mustNotBeLogged } = require("../../services/middleware/authMiddleware");

app
  .route("/")
  .post(mustNotBeLogged, passport.authenticate("local"), async (req, res) => {
    const user = await req.user;
    res.json({
      msg: "Logged in",
    });
  });

module.exports = app;

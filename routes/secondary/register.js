const app = require("express").Router();
const { mustNotBeLogged } = require("../../services/middleware/authMiddleware");
const { User } = require("../../models/models");
const { genHash } = require("../../utilities/password");

app.route("/").post(mustNotBeLogged, async (req, res) => {
  let { email, name, password } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(400);
      return res.json({
        msg: "This email id already exists",
      });
    }
    password = await genHash(password);
    user = await User.create({ email, name, password });
    res.json({
      msg: "Successfully created the user",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err.errors[0].message || "Something went wrong please try again",
    });
  }
});

module.exports = app;

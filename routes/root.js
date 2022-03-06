const express = require("express");
const app = express.Router();
const registerRoute = require("./secondary/register");
const loginRoute = require("./secondary/login");

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.get("/", async (req, res) => {
  res.send("hello");
});

module.exports = app;

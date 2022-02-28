const express = require("express");
const app = express.Router();
const { testConnection } = require("../services/db");

app.get("/", async (req, res) => {
  try {
    const message = await testConnection();
    console.log(message);
    res.send("Hello");
  } catch (err) {
    console.log(err);
    res.send("Wrong");
  }
});

module.exports = app;

const https = require("https");
const fs = require("fs");
const session = require("express-session");
const redisClient = require("./config/redis");
const RedisStore = require("connect-redis")(session);

const express = require("express");
const passport = require("passport");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 30,
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

require("./config/passport");

app.use(require("./routes/root"));

const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const httpServer = https.createServer(httpsOptions, app);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening to PORT " + process.env.PORT || 4000);
});

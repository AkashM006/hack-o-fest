const https = require("https");
const fs = require("fs");
const session = require("express-session");
const Redis = require("ioredis");
const connectRedis = require("connect-redis");
const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();

const RedisStore = connectRedis(session);
const redis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const createRedisConnection = async function () {
//   const redisClient = await new Redis({
//     host: process.env.REDIS_HOST,
//     port: 15499,
//     password: process.env.REDIS_PASSWORD,
//   });

app.use(
  session({
    store: new RedisStore({ client: redis }),
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

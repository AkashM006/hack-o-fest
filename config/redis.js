const redis = require("redis");
// const redisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => {
  console.log("Redis Error: ", err);
});

module.exports = { redisClient };

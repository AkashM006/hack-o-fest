const redis = require("redis");
async () => {
  //   const redisClient = await redis.createClient({
  //     host: process.env.REDIS_HOST,
  //     password: process.env.REDIS_PASSWORD,
  //   });
  const redisClient = await redis.createClient();

  redisClient.on("error", (err) => {
    console.log("Redis Error: ", err);
  });

  module.exports = { redisClient };
};

const redis = require("redis");

const redisClient = redis.createClient({
  password: "pbNM472fAPdVnf6GcgA3HQN4W9XEPWjR",
  socket: {
    host: "redis-16313.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16313,
  },
});

redisClient.on("error", (err) => {
  return;
});

redisClient.connect();

module.exports = redisClient;

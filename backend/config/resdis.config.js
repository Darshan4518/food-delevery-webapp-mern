const redis = require("redis");

const createClient = require("redis");

const redisClient = createClient({
  password: "pbNM472fAPdVnf6GcgA3HQN4W9XEPWjR",
  socket: {
    host: "redis-16313.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16313,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.connect();

module.exports = redisClient;

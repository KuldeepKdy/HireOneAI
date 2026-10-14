import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connected", () => {
  console.log("Redis connected");
});

export default redis;

import { createClient } from "redis";
const redisDB = createClient({
  password: process.env.REDIS_DB_PASS,
  socket: {
    port: process.env.REDIS_DB_PORT,
    host: process.env.REDIS_DB_HOST,
  },
});
redisDB.on("error", (err) => {
  console.log(err);
});

export { redisDB };

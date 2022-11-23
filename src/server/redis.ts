import { Redis } from "@upstash/redis";

function createRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  if (!url) {
    throw "UPSTASH_REDIS_REST_URL is not set!";
  }
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!token) {
    throw "UPSTASH_REDIS_REST_TOKEN is not set!";
  }
  return new Redis({
    url,
    token,
  });
}

export const redis = createRedis();

import _ from "lodash";
import Redis from "ioredis";
import utils from "./index.js";

const redis = new Redis(process.env.REDIS_URI, {
  keyPrefix: process.env.REDIS_URI
});

async function getJSON(key, expire) {
  if (expire === 0) return null;
  try {
    const value = await redis.get(key);
    if (_.isEmpty(value)) return null;
    utils.debug.devLog('cache hit', key);
    return JSON.parse(value);
  } catch (e) {
    utils.debug.error(e);
    return null;
  }
}

async function setJSON(key, value, expire) {
  try {
    if (_.isEmpty(value)) return;
    utils.debug.devLog('cache set', key);
    await redis.set(key, JSON.stringify(value));
    if (_.isEmpty(expire)) return;
    await redis.expire(key, expire);
  } catch (e) {
    utils.debug.error(e);
  }
}

export default {
  getJSON,
  setJSON
};

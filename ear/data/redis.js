const redis = require('redis');
const config = require('../config');

const redisClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

module.exports = {
  publish(key, value) {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, (err, data) => {
        if (err) {
          reject(err);
        }
        redisClient.expire(key, config.REDIS_CERTIFICATE_EXPIRETIME);
        resolve(data);
      });
    });
  },

  subscribe(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  },
};

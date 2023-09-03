const redis = require('redis');
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Display errors to the console
    this.client.on('error', (err) => {
      console.error(`Redis Error: ${err}`);
    });
  }

  async isAlive() {
    return new Promise((resolve) => {
      this.client.ping('ping', (error, response) => {
        if (error) {
          resolve(false);
        } else {
          resolve(response === 'PONG');
        }
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response === 1);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

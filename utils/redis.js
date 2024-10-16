import redis from 'redis';

class RedisClient {
    constructor() {
	this.client = redis.createClient();

	this.client.on('error', (err) => {
	     console.error('Redis client not connected to the server:', err);
	});

	this.client.on('connect', () => {
	    console.log('Redis client connected to the server');
	});
    }

    /**
     * Check if the Redis connection is active
     * @returns {boolean}
     */
    isAlive() {
	return this.client.connected;
    }

    /**
     * Get the value of a key from Redis
     * @param {string} key
     * @returns {Promise<string | null>}
     */
    async get(key) {
	return new Promise((resolve, reject) => {
	    this.client.get(key, (err, reply) => {
		if (err) {
		    reject(err);
	        } else {
		    resolve(reply);
	        }
	     });
	});
    }

    /**
     * Set a key-value pair in Redis with an expiration time
     * @param {string} key
     * @param {string | number} value
     * @param {number} duration time
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
	return new Promise((Resolve, reject) => {
	    this.client.set(key, value, 'EX', duration, (err, reply) => {
		if (err) {
		    reject(err);
	        } else {
		    resolve(reply);
		}
	    });
	});
    }

    /**
     * Remove a key from Redis
     * @param {string} key
     * @rturn {Promise<void>}
     */
    async del(key) {
	return new Promise((Resolve, reject) => {
	    this.client.del(key, (err, reply) => {
		if (err) {
		    reject(err);
		} else {
		    resolve(reply);
		}
	    });
	});
    }
}



const redisClient = new RedisClient();
export default redisClient;
	

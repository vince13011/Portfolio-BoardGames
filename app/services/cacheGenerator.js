const { createClient } = require('redis');

const client = createClient();

const { promisify } = require('util');

const redis = {
    del: promisify(client.del).bind(client),
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    setex: promisify(client.setex).bind(client),
    exists: promisify(client.exists).bind(client)
};

const keysIndex = new Set();


const cacheGenerator = (options) => {
    return {
        cache: async (request, response, next) => {
           

            const theKey = "oblog:" + request.originalUrl;

            if (await redis.exists(theKey)) {
                
                const theValue = await redis.get(theKey).then(JSON.parse);

                
                response.json(theValue);

               
            } else {

                const originalResponseJson = response.json.bind(response);

                response.json = (theResponse) => {

                    
                    keysIndex.add(theKey);
                    
                    redis.setex(theKey, options.ttl, JSON.stringify(theResponse));

                    
                    originalResponseJson(theResponse);
                }

                next();
            }
        },
        flush: async (request, response, next) => {
            for (const key of keysIndex) {
                await redis.del(key);
                
                keysIndex.delete(key);
            }

            next();
        }
    }
};

module.exports = cacheGenerator;

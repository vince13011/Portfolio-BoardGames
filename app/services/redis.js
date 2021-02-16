const { createClient } = require('redis');

const client = createClient();

const { promisify } = require('util');

module.exports = {
    del: promisify(client.del).bind(client),
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    setex: promisify(client.setex).bind(client),
    exists: promisify(client.exists).bind(client)
};

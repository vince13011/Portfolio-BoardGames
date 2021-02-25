/*
ici on imagine que nos requêtes son très longues à nous faire un retour
et nous mettons donc en place un système de cache grâce à redis
que nous placerons dans nos routes comme 1er middleware
*/
const { createClient } = require('redis');

const client = createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

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

        //cache permet de mettre le résultat de notre requête en mémoire
        cache: async (request, response, next) => {
           

            const theKey = "boardgame:" + request.originalUrl;

            if (await redis.exists(theKey)) {
               // on la sort du registre 
                const theValue = await redis.get(theKey).then(JSON.parse);
               // et on répond directement à l'utilisateur
                
                response.json(theValue);

                // pas de next()
            } else {

                /* on n'a pas le contrôle sur les MW suivants mais on a une certitude : 
                le dernier MW de la chaîne appellera response.json et il lui 
                passera pile poil la ressource qui était attendue par le visiteur
                */
                const originalResponseJson = response.json.bind(response);

                response.json = (theResponse) => {

                    // on garde une trace des clés qu'on utilise
                    keysIndex.add(theKey);
                    // on stocke la réponse dans le cache
                    redis.setex(theKey, options.ttl, JSON.stringify(theResponse));

                    // puis on appelle la version originale de response.json
                    originalResponseJson(theResponse);
                }

                next();
            }
        },

        // la méthode flush permet de vider le cache après chaque évènement pouvant le modifier
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

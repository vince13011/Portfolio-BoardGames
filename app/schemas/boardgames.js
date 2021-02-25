const Joi = require('joi');

/* 
mise en place d'un schema correpondant au model boardgame afin que le payload soit filtrés par joi
enfontion de celui-ci
*/ 
const boardgameSchema = Joi.object({
    name: Joi.string().required(),
    minAge: Joi.number().integer().positive().required(),
    minPlayers: Joi.number().integer().positive().required(),
    maxPlayers: Joi.number().integer().positive(),
    type: Joi.string().required(),
    note: Joi.number().integer().positive().required(),
    duration: [
        Joi.number().integer().positive().required(), // en minutes
        Joi.object({
            hours: Joi.number().integer().positive().required(),
            minutes: Joi.number().integer().positive().required()
        })
    ],
    creator: Joi.string().required()
});

module.exports = boardgameSchema;
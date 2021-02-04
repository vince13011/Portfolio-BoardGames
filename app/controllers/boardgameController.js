const Boardgame = require('../models/boardgame');

const boardgameController = {
    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();

        response.json(games);
    },
    findOneBoardGame: async(request,response) =>{

        const id = request.params.id;

        
        const game = await Boardgame.findOne(id);
        
        
        response.json(game);
    }
};

module.exports = boardgameController;
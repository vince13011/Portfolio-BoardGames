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
        
    },

    newBoardgame: async (request, response) => {
        // les infos du jeu à ajouter
        const newGameData = request.body;

        // si duration contient par ex. 150, on le laisse comme ça : c'est 150 minutes
        // si c'est un objet exemples {hours:2 , minutes:15}
        if (typeof newGameData.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            newGameData.duration = 60 * newGameData.duration.hours + newGameData.duration.minutes;
        }

        // ici, duration est forcément un entier

        const newGame = new Boardgame(newGameData);

        await newGame.save();

        // sans await, il va me manquer
        // la certitude que tout s'est bien passé
        // l'id
        response.json(newGame);
    },

    updateOneBoardGame: async (request,response) =>{
        //je récupère l'id pour le mettre dans le Where de la requète SQL
        const id = request.params.id;

        // je récupère le body qui contient les modifications de notre enregistrement
        const data= request.body;

        if (typeof data.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            data.duration = 60 * data.duration.hours + data.duration.minutes;
        }
        //je passe en argument les deux constantes qui contiennent ce dont j'ai besoin pour ma requète
        const result = await Boardgame.updateById(id, data)
        
        response.json(result);
    },

    deleteOneBoardGame: async (request,response) =>{
         //je récupère l'id pour le mettre dans le Where de la requète SQL
         const id = request.params.id;

        await Boardgame.deleteById(id);
         
        response.json(`Le jeu avec l'id ${id} a bien était supprimé`);
        
    }

};

module.exports = boardgameController;
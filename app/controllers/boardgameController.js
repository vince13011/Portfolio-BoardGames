const Boardgame = require('../models/boardgame');

const boardgameController = {

    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();

        response.json(games);
    },

    findOneBoardGame: async(request,response) =>{

        const id = request.params.id;
        try{
        const game = await Boardgame.findOne(id);

        response.json(game);
        }
        catch(err){
            response.status(404).json(err.message);
        }
        
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
        response.json(newGame);
    },

    replaceOneBoardGame: async (request,response) =>{
        //je récupère l'id pour le mettre dans le Where de la requète SQL
        const {id} = request.params;
       

        // je récupère le body qui contient les modifications de notre enregistrement
        const data= request.body;

        if (typeof data.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            data.duration = 60 * data.duration.hours + data.duration.minutes;
        }

        try{

            const theBoardgame = await Boardgame.findOne(id);    
            
            const result = await theBoardgame.updateById(data);
        
            response.json(result);
        }
        catch(err){
            
            response.status(404).json(err.message);
        }
    },

    deleteOneBoardGame: async (request,response) =>{
         //je récupère l'id pour le mettre dans le Where de la requète SQL
         const {id} = request.params;
        try{
        const theBoardgame = await Boardgame.findOne(id);
        
        
        await theBoardgame.deleteById();
         
        response.json(`Le jeu avec l'id ${id} a bien était supprimé`);
        }
        catch(err){
            response.status(404).json(`Le jeu avec l'id ${id} n'existe pas ou a déjà était supprimé`);
        } 
    },

    updateOneBoardGame: async (request,response) =>{
        const { id } = request.params;
        const data = request.body;

        if (typeof data.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            data.duration = 60 * data.duration.hours + data.duration.minutes;
        }

        try{
            const theBoardgame = await Boardgame.findOne(id);
            
             if(data.id){
                delete(data.id)
            }
            const newdata = theBoardgame;
            for (const element in data) {
                if (typeof newdata[element] !== 'undefined') {
                    newdata[element] = data[element];
                }
            }
            if (typeof newdata.duration === "object") {
                // on fait un petit calcul pour retrouver le format entier en minutes
                newdata.duration = 60 * newdata.duration.hours + newdata.duration.minutes;
            }

            const result = await theBoardgame.updateById(newdata);
            response.json(result);
        }
        catch(err){
            response.status(404).json(`Le jeu avec l'id ${id} n'existe pas ou a déjà était supprimé`); 
        }
    }

};

module.exports = boardgameController;
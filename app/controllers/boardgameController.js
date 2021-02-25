const Boardgame = require('../models/boardgame');

const boardgameController = {

    /*Cette methode  envoie à la route correspondante dans notre router
    l'ensemble des jeux de plateau via la methode findall () de la classe Boardgame
    */
    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();

        response.json(games);
    },

     /*Cette methode  envoie à la route correspondante dans notre router un jeu précis
    via la methode findall () de la classe Boardgame
    */
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

    /*Cette methode permet d'enregistrer un nouveau jeu en base de données 
    grâce aux information récupérées par la méthode post
    */
    newBoardgame: async (request, response) => {
        // les infos du jeu à ajouter
        const newGameData = request.body;

        // si duration contient par ex. 150, on le laisse comme ça : c'est 150 minutes
        // si c'est un objet exemples {hours:2 , minutes:15}
        if (typeof newGameData.duration === "object") {
        // on fait un petit calcul pour retrouver le format entier en minutes pour notre requête SQL 
            newGameData.duration = 60 * newGameData.duration.hours + newGameData.duration.minutes;
        }

        const newGame = new Boardgame(newGameData);

        await newGame.save();

        /* sans await, il va me manquer
         la certitude que tout s'est bien passé
         car la réponse sera envoyé avant la fin de l'enregistrement du jeu en base de données
        */
        response.json(newGame);
    },

    // Cette méthode permet remplace l'ensemble des données du jeu choisi  
    replaceOneBoardGame: async (request,response) =>{

        //je récupère l'id pour vérifier que ce jeu existe bien grâce à la méthode findone()
        const {id} = request.params;
       
        // je récupère le body qui contient les modifications de notre enregistrement
        const data= request.body;

        if (typeof data.duration === "object") {
           
            data.duration = 60 * data.duration.hours + data.duration.minutes;
        }

        try{

            // je vérifie que le jeu existe bien pour pouvoir ensuite le modifier 
            const theBoardgame = await Boardgame.findOne(id);    
            
            // je procède à la modification de toutes les données concernant le jeu en question
            const result = await theBoardgame.updateById(data);
        
            response.json(result);
        }
        catch(err){
            
            response.status(404).json(err.message);
        }
    },

    deleteOneBoardGame: async (request,response) =>{

        //je récupère l'id pour vérifier que ce jeu existe bien grâce à la méthode findone()
        const {id} = request.params;
        try{
        
        // je vérifie que le jeu existe bien pour pouvoir ensuite le modifier 
        const theBoardgame = await Boardgame.findOne(id);
        
        
        await theBoardgame.deleteById();
         
        response.json(`Le jeu avec l'id ${id} a bien était supprimé`);
        }
        catch(err){
            response.status(404).json(`Le jeu avec l'id ${id} n'existe pas ou a déjà était supprimé`);
        } 
    },

    // Cette méthode remplace le nombre de  données choisis du jeu en question   
    updateOneBoardGame: async (request,response) =>{

         //je récupère l'id pour vérifier que ce jeu existe bien grâce à la méthode findone()
        const { id } = request.params;

        // je récupère le body qui contient les modifications de notre enregistrement
        const data = request.body;

        if (typeof data.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            data.duration = 60 * data.duration.hours + data.duration.minutes;
        }

        try{
             // je vérifie que le jeu existe bien pour pouvoir ensuite le modifier 
            const theBoardgame = await Boardgame.findOne(id);
            
            //par mesure de sécurité on supprime la possibilité de modifier l'id 
             if(data.id){
                delete(data.id)
            }

            const newdata = theBoardgame;

            //ici on compare les données du jeu avec les futurs modifications
             
            for (const element in data) {
                if (typeof newdata[element] !== 'undefined') {
                    //on modifie newdata qui contient les données actuelles du jeu
                    // pour chaque clé correspondante on passe à newdata les nouvelles valeurs
                    newdata[element] = data[element];
                }
            }
            if (typeof newdata.duration === "object") {
                // on fait un petit calcul pour retrouver le format entier en minutes
                newdata.duration = 60 * newdata.duration.hours + newdata.duration.minutes;
            }

            //je renvoie le jeu avec ses nouvelles informations en base de données
            const result = await theBoardgame.updateById(newdata);

            response.json(result);
        }
        catch(err){
            response.status(404).json(`Le jeu avec l'id ${id} n'existe pas ou a déjà était supprimé`); 
        }
    }

};

module.exports = boardgameController;
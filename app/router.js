const { Router } = require('express');

const boardgameController = require('./controllers/boardgameController');

/*permet de valider ou non le payload que l'on reçoit dans nos routes POST, UPDATE, PATCH
 en fonction d'un schéma qui définit le modèle valide
*/
const { validateBody } = require('./services/validator');

//schéma correspondant au model à valider, dans notre cas le modèle de la classe Boardgame
const boardgameSchema = require('./schemas/boardgames');

const cacheGenerator = require('./services/cacheGenerator');
//La méthode cache met le résultat de ma requête en mémoire
// La méthode flush permet de vider le cache à chaque évènement pouvant modifier sa valeur
const { cache, flush } = cacheGenerator({
    // option qui permet au cache de se vider toutes les 10 secondes
    ttl: 10
});

const router = Router();

// Retourne la liste complète des jeux de société
router.get('/boardgames',cache,boardgameController.allBoardgames);
// Permet d'ajouter un nouveau jeu de société à notre base de données
router.post('/boardgames',flush, validateBody(boardgameSchema), boardgameController.newBoardgame);

// retourne un jeu de société en fonction de son ID
router.get('/boardgames/:id',cache,boardgameController.findOneBoardGame);
// permet de modifier une ou plusieurs informations d'un jeu de société
router.patch('/boardgames/:id',flush,boardgameController.updateOneBoardGame)
// Remplace l'ensemble des informations d'un jeu de société
router.put('/boardgames/:id',flush, validateBody(boardgameSchema),boardgameController.replaceOneBoardGame);
// Supprime un jeu de société en fonction de son ID
router.delete('/boardgames/:id',flush, boardgameController.deleteOneBoardGame);

// ici, une 404 pour l'API
router.use((request, response) => {
    response.status(404).json('404 Not Found');
});

module.exports = router;
const { Router } = require('express');
const boardgameController = require('./controllers/boardgameController');

const { validateBody } = require('./services/validator');
const boardgameSchema = require('./schemas/boardgames');

const router = Router();

router.get('/boardgames', boardgameController.allBoardgames);
router.post('/boardgames', validateBody(boardgameSchema), boardgameController.newBoardgame);

router.get('/boardgames/:id',boardgameController.findOneBoardGame);
router.patch('/boardgames/:id',validateBody(boardgameSchema),boardgameController.updateOneBoardGame);
router.delete('/boardgames/:id',boardgameController.deleteOneBoardGame);

// ici, une 404 pour l'API
router.use((request, response) => {
    response.status(404).json('404 Not Found');
});

module.exports = router;
const { Router } = require('express');
const boardgameController = require('./controllers/boardgameController');

const { validateBody } = require('./services/validator');
const boardgameSchema = require('./schemas/boardgames');

const cacheGenerator = require('./services/cacheGenerator');
const { cache, flush } = cacheGenerator({
    ttl: 10000
});

const router = Router();

router.get('/boardgames',cache,boardgameController.allBoardgames);
router.post('/boardgames', flush, validateBody(boardgameSchema), boardgameController.newBoardgame);

router.get('/boardgames/:id',cache,boardgameController.findOneBoardGame);
router.put('/boardgames/:id',flush, validateBody(boardgameSchema),boardgameController.updateOneBoardGame);
router.delete('/boardgames/:id',flush, boardgameController.deleteOneBoardGame);

// ici, une 404 pour l'API
router.use((request, response) => {
    response.status(404).json('404 Not Found');
});

module.exports = router;
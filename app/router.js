const { Router } = require('express');
const boardgameController = require('./controllers/boardgameController');

const { validateBody } = require('./services/validator');
const boardgameSchema = require('./schemas/boardgames');

const router = Router();

router.get('/boardgames', boardgameController.allBoardgames);
router.get('/boardgames/:id',boardgameController.findOneBoardGame);
router.post('/boardgames', validateBody(boardgameSchema), boardgameController.newBoardgame);

module.exports = router;
import express from 'express';
import * as gameController from '../controllers/gameController';

const router = express.Router();

// Route d'inscription
router.post('/reset', gameController.resetGame);


export default router;

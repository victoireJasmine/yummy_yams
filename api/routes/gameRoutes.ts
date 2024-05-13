import express from 'express';
import * as gameController from '../controllers/gameController';
import { JwtFactoryUtils } from '../Utils/jwt.utils';
import { CustomRequest, CustomResponse } from '../type';
import * as pastryController from '../controllers/pastryController';

const router = express.Router();

function randomSort(a:any , b:any) {
    // Convertir les UUID en nombres pour les comparer
    const idA = parseInt(a.id.replace(/-/g, ''), 16);
    const idB = parseInt(b.id.replace(/-/g, ''), 16);
    return idA - idB;
}

// Route d'inscription
router.post('/play/:id', [JwtFactoryUtils.passeport, pastryController.checkAvailableStock, gameController.checkGame, async(req: CustomRequest, res: CustomResponse) => {

    const played = await gameController.playGame(req);
    if(!played){
       return res.status(404).send({message: 'Game not found'});
        
    }
    req.body.resultGame = played;

    const pastries = await pastryController.getAllPastriesInStock();
    if(pastries.length < played.nbGift){
        return res.status(400).send({message: 'Not enough pastries in stock', finished: true});
    }
    if(!played.isWin){
        
        return gameController.loseGame(req, res);
    }

    const pastriesToWin = pastries.sort(randomSort).slice(0, played.nbGift);
    const pastriesId = pastriesToWin.map(p => p._id);
    req.body.pastriesId = pastriesId;
    return gameController.winGame(req, res);
} ] );

router.post('/start', [JwtFactoryUtils.passeport , pastryController.checkAvailableStock, gameController.startGame] );

//Route Winners
router.get('/winners',  gameController.getWinnersGame);
router.get('/current', [JwtFactoryUtils.passeport , gameController.currentGame] );
router.delete('/reset', gameController.clearAll);




export default router;

import mongoose from 'mongoose';
import { CustomRequest, CustomResponse } from '../type';
import { Result, YamsGame } from '../Utils/modules/YamsGame';
import Game from '../models/gameModel';
import * as pastryController from '../controllers/pastryController';
import { finished } from 'stream';


//currentGame
export const currentGame = async(req: CustomRequest, res: CustomResponse) => {
  try{
    const userId = req.user?.id;
    const currentGame = await Game.findOne({ user: userId  }).exec();
    if(!currentGame){
      return res.status(404).send({message: 'No game started'});
    }
    res.status(200).send(currentGame);
  }catch(error){
    res.status(500).send({message: 'Error while getting the current game'});
  }
};
//startGame
export const startGame = async(req: CustomRequest, res: CustomResponse) => {
  try{
    const userId = req.user?.id;
    const checkGame = await Game.findOne({ user: userId , isWin:false }).exec();
    if(checkGame){
      return res.status(400).send({message: 'Game already started'});
    }

    const newGame = new Game({ user: userId });
    await newGame.save();
    
    res.status(200).send({message: 'Game Started'});
  }catch(error){
    res.status(500).send({message: 'Error while starting the game'});
  }
};
// winGame
export const winGame = async(req: CustomRequest, res: CustomResponse) => {
  try{
    const pastriesId = req.body.pastriesId as string[];
    const resultGame = req.body.resultGame as Result;
    const gameId = req.params.id;
    
    
    const checkGame = await Game.findById(gameId).exec();
    if(!checkGame){
      return res.status(400).send({message: 'No game started'});
    }

    

    await Game.findByIdAndUpdate(gameId,
      { 
       isWin: true , 
       pastries: pastriesId, 
       comboType: resultGame.type,
       dices: JSON.stringify(resultGame.dices)
     },
       {new: true}).exec();
    await pastryController.updateStock(pastriesId);
    res.status(200).send({message: 'Game won', result: resultGame});
  }catch(error){
    res.status(500).send({message: 'Error while winning the game'});
  }
};
// loseGame
export const loseGame = async(req: CustomRequest, res: CustomResponse) => {
  try{
    const gameId = req.params.id;
    const resultGame = req.body.resultGame as Result;
    const checkGame = await Game.findById(gameId).exec();
    if(!checkGame){
      return res.status(400).send({message: 'No game started'});
    }
    res.status(200).send({message: 'Game lost', remainingAttempt: checkGame.tentative, result: resultGame});

  }catch(error){
    res.status(500).send({message: 'Error while losing the game'});
  }
};
// playGame
export const playGame = async(req: CustomRequest): Promise<Result | null> => {
  
    const gameId = req.params.id;
    const checkGame = await Game.findById(gameId).exec();
    if(!checkGame){
      return null;
    }


    checkGame.tentative = checkGame.tentative - 1;
    await checkGame.save();
    return Promise.resolve(YamsGame.launch());

}
export const checkGame = async(req: CustomRequest, res: CustomResponse, next: any) => {
  const gameId = req.params.id;
  const checkGame = await Game.findById(gameId).exec();
  if(!checkGame){
    return res.status(400).send({message: 'No game started'});
  }
  if(checkGame.isWin || checkGame.tentative === 0){
    // await Game.findByIdAndDelete(gameId);
     return res.status(400).send({message: 'No more tentative', finished: true, game: checkGame});
   }
  next();
}

// getWinGame
export const getWinnersGame = async(req: CustomRequest, res: CustomResponse) => {
  try{
    const winners = await Game.find({ isWin: true }).populate({path:'user', model:'User'}).populate('pastries').exec();
    res.status(200).send(winners);
  }catch(error){
    res.status(500).send({message: 'Error while getting the win games'});
  }
};
export const clearAll = async (req: CustomRequest , res: CustomResponse) => {
  await Game.deleteMany().exec();
  res.status(200).send({message: 'All games deleted'});

}


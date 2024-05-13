import { BadInitializationError } from '../../modules/Errors';
import { COMBO_TYPE, MessageResponse } from '../common';

export type ResultGame = {
  type: COMBO_TYPE;
  dices: number[];
  isWin: boolean;
  nbGift: number;
};

export interface PlayGame extends MessageResponse {
  result: ResultGame;
  remainingAttempt?:number;
}

abstract class AbstractPlayGame implements PlayGame {
  readonly message: string;  
  readonly result: ResultGame;
  readonly remainingAttempt?: number | undefined;
  

  constructor(data: PlayGame) {
    this.message = data.message;
    this.result = data.result;
    this.remainingAttempt = data.remainingAttempt;
  }
}

class PlayGameRead extends AbstractPlayGame {
  declare readonly result: ResultGame;
  constructor(data: PlayGame) {
    super(data);
    if (!this.result) {
      throw new BadInitializationError();
    }
  }
}

export class PlayGameFactory {
  static createPlayGame(data: PlayGame): PlayGameRead {
    return new PlayGameRead(data);
  }
}

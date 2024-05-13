import { BadInitializationError } from '../../modules/Errors';


export interface Game  {
    _id: string; 
    createdAt: string;
    updatedAt: string;
}

abstract class AbstractGame implements Game {
  readonly _id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
 
  

  constructor(data: Game) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt= data.updatedAt;
  }
}

class GameRead extends AbstractGame {
  declare readonly _id: string;
  constructor(data: Game) {
    super(data);
    if (!this._id) {
      throw new BadInitializationError();
    }
  }
}

export class GameFactory {
  static createGame(data: Game): GameRead {
    return new GameRead(data);
  }
}

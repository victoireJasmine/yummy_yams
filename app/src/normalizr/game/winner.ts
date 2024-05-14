import { BadInitializationError } from '../../modules/Errors';
import { COMBO_TYPE } from '../common';
import { Pastry ,PastryFactory } from '../pastry/pastry';
import { User ,UserFactory } from '../user/user';



export interface Winner  {
    pastries: Pastry[];
    user: User;
    createdAt: string;
    updatedAt: string;
    comboType: COMBO_TYPE;
    dices: string;
    nameGame: () => string;
    dice: () => string;
}

abstract class AbstractWinner implements Winner {
  readonly pastries: Pastry[];
  readonly user: User;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly comboType: COMBO_TYPE;
  readonly dices: string;
  

  constructor(data: Winner) {
    this.pastries = data.pastries.map(pastry => PastryFactory.createPastry(pastry)); 
    this.user = UserFactory.createUser(data.user);
    this.createdAt = data.createdAt;
    this.updatedAt= data.updatedAt;
    this.dices = data.dices;
    this.comboType= data.comboType;
  }
  nameGame():string {
    switch (this.comboType) {
        case COMBO_TYPE.TWO:
            return 'DOUBLE';
        
        case COMBO_TYPE.FOUR:
            return 'CARRE';
        
        case COMBO_TYPE.FULL:
            return 'YAMS';

    
        default:
            return 'Pas gagnant'
    }
}

 dice():string{
    return JSON.parse(this.dices).join(' | ')
}
}

class WinnerRead extends AbstractWinner {
  declare readonly dices: string;
  constructor(data: Winner) {
    super(data);
    if (!this.dices) {
      throw new BadInitializationError();
    }
  }
}

export class WinnerFactory {
  static createWinner(data: Winner): WinnerRead {
    return new WinnerRead(data);
  }
}

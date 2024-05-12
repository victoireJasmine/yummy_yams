import mongoose, { Schema, Document } from 'mongoose';
import { IPastry } from './pastryModel';
import { IUser } from './userModel';
import { COMBO_TYPE } from '../Utils/modules/YamsGame';

export interface IGame extends Document { 
  pastries: IPastry[];
  user: IUser
  createdAt: Date;
  updatedAt: Date;
  tentative: number;
  isWin: boolean;
  comboType: COMBO_TYPE;
  dices?: string;

  
}



const gameSchema: Schema = new Schema({
    pastries: [{ type: Schema.Types.ObjectId, ref: 'Pastry'}],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tentative: { type: Number, default: 3 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isWin: { type: Boolean, default: false },
    comboType: { type: String, default: COMBO_TYPE.NOTHING , enum: Object.values(COMBO_TYPE)},
    dices: { type: String, required: false },
    

});
gameSchema.pre<IGame>('save', function (next) {
    this.updatedAt = new Date();
    next();
  });

export default mongoose.model<IGame>('Game', gameSchema);

import mongoose, { Schema, Document } from 'mongoose';
import { IPastry } from './pastryModel';
import { IUser } from './userModel';

export interface IWinner extends Document { 
  pastry: IPastry;
  user: IUser
  createdAt: Date;
}



const winnerSchema: Schema = new Schema({
    pastry: { type: Schema.Types.ObjectId, ref: 'Pastry', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }

});

export default mongoose.model<IWinner>('Winner', winnerSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IPastries extends Document {
  name: string;  
  image: string;
  stock: string;
  quantityWon: number;
}

const pastriesSchema: Schema = new Schema({
  name: { type: String, required: true },  
  image: { type: String, required: true },
  stock: { type: String, required: true },
  quantityWon: { type: Number, required: true }
});

export default mongoose.model<IPastries>('Pastries', pastriesSchema);

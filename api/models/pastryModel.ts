import mongoose, { Schema, Document } from 'mongoose';

export interface IPastry extends Document {
  name: string;  
  image: string;
  stock: string;
  quantityWon: number;
}


const pastrySchema: Schema = new Schema({
  name: { type: String, required: true },  
  image: { type: String, required: true },
  stock: { type: String, required: true },
  quantityWon: { type: Number, required: true }
});

export default mongoose.model<IPastry>('Pastry', pastrySchema);

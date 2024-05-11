import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IWinner } from './winnerModel';

export interface IUser extends Document {
  name: string;  
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  tentative: number;
  wins: IWinner[];

}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tentative: { type: Number, default: 3 },
  wins: [{ type: Schema.Types.ObjectId, ref: 'Winner' }]
});

// Avant de sauvegarder l'utilisateur, hachez le mot de passe
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'votre_secret_ici';

// Inscription
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// Connexion
export const signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
  
      // Génération du token JWT
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({
        message: "Connexion réussie",
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  };

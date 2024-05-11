import User, { IUser } from '../models/userModel';
import { JwtFactoryUtils } from '../Utils/jwt.utils';
import { CustomRequest, CustomResponse } from '../Type';

// Inscription
export const signUp = async (req: CustomRequest, res: CustomResponse) => {
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
export const signIn = async (req: CustomRequest, res: CustomResponse) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
  
      const token = JwtFactoryUtils.generateToken({ id: user._id});
  
      res.status(200).json({
        message: "Connexion réussie",
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  };

// Me
export const me = async (req: CustomRequest, res: CustomResponse) => {
  try {
    const id = req.user?.id;
    const user = await User.findById(id ,{password:0}).exec();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    };
  }
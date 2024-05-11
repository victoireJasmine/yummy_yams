import { Request, Response } from 'express';
import Pastries, { IPastry } from '../models/pastryModel';
import fs from 'fs';



// Inscription
export const resetGame = async (req: Request, res: Response) => {
  try {
    // on vide la collection Pastries
    await Pastries.deleteMany({});

    fs.readFile('./public/pastries.json', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erreur lors de la lecture du fichier:', err);
          return;
        }
      
        let pastries = JSON.parse(data);
        pastries = await Pastries.insertMany(pastries);
        let message = "Pâtisseries créées avec succès";
        if(!pastries){
            message = "Erreur lors de la création des pâtisseries"
        }
        
        res.status(201).json({message: message, pastries: pastries})
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};



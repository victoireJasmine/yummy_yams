import { Request, Response } from 'express';
import Pastries, { IPastry } from '../models/pastryModel';



// Inscription
export const createPastries = async (req: Request, res: Response) => {
    const pastriesData = req.body.pastries as IPastry[];
    const create = await Pastries.insertMany(pastriesData);
    let message = "Pâtisseries créées avec succès";
        if(!create){
            message = "Erreur lors de la création des pâtisseries"
            return res.status(500).json({message: message})
        }
        
        res.status(201).json({message: message, pastries: create})



};
;



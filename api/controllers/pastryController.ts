import { Request, Response } from 'express';
import Pastries, { IPastry } from '../models/pastryModel';
import { CustomRequest, CustomResponse } from '../type';



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

// ClearAll
export const clearAll = async () => {
    const clear = await Pastries.deleteMany().exec();

}
// Get All
export const getAllPastries = async (req: Request, res: Response) => {
    const pastries = await Pastries.find().exec();
    res.status(200).json(pastries);
}
// GetAllValid
export const getAllPastriesInStock = async ():Promise<IPastry[]> => {
    const pastries = await Pastries.find({ $expr: { $gt: ['$stock', '$quantityWon'] } }).exec();
    return pastries;
}

// update stock
export const updateStock = async (pastriesId: string[]) => {
    const pastries = await Pastries.find({_id: {$in: pastriesId}}).exec();
    pastries.forEach(async (pastry) => {
        pastry.quantityWon= pastry.quantityWon + 1;
        await pastry.save();
    });
}


export const checkAvailableStock = async(req: CustomRequest, res: CustomResponse, next: any) => {
    const pastries = await getAllPastriesInStock();
    if(pastries.length === 0 ){
        return res.status(400).send({message: 'Not enough pastries in stock', finished: true});
    }

    next();
  }

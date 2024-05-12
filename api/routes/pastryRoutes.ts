import express from 'express';
import * as pastryController from '../controllers/pastryController';
import { JwtFactoryUtils } from '../Utils/jwt.utils';
import fs from 'fs';

const router = express.Router();

// Route d'inscription
router.post('/many-create', pastryController.createPastries);

// Route de connexion
router.post('/fixtures-create', (req, res) => {
    fs.readFile('./public/pastries.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return;
        }
        await pastryController.clearAll();

        let pastries = JSON.parse(data);
        req.body.pastries = pastries;
        return await pastryController.createPastries(req, res);
        
    });
});
router.get('/',pastryController.getAllPastries);


export default router;

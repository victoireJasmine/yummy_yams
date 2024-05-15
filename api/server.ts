import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import pastriesRoutes from './routes/pastryRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.static(__dirname +'/public/images')); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/pastry', pastriesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
mongoose.connect(process.env.MONGO_URI as string)
    .then(db => {
        console.log('Connexion à MongoDB réussie !');
        console.log(db.connection.listCollections())
    })
    .catch(() => console.log('Connexion à MongoDB échouée !'));
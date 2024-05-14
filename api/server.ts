import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import pastriesRoutes from './routes/pastryRoutes';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname +'/public/images')); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/pastry', pastriesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
mongoose.connect('mongodb://localhost:27017/maBaseDeDonnees' )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
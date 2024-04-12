import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

// Route d'inscription
router.post('/signup', authController.signUp);

// Route de connexion
router.post('/signin', authController.signIn);

export default router;

import express from 'express';
import * as authController from '../controllers/authController';
import { JwtFactoryUtils } from '../Utils/jwt.utils';

const router = express.Router();

// Route d'inscription
router.post('/signup', authController.signUp);

// Route de connexion
router.post('/signin', authController.signIn);

// Route de connexion
router.get('/me', [JwtFactoryUtils.passeport , authController.me] );

export default router;

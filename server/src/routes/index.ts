import { Router } from 'express';
import { playerRoutes } from './player-routes.js';
import { userRouter } from './user-routes.js';
import favoriteRoutes from './favorite-routes.js';
import oddsRoutes from './oddsRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/players', playerRoutes);
router.use('/users', userRouter);
router.use('/favorites', favoriteRoutes);
router.use('/auth', authRoutes);
router.use('/odds', oddsRoutes);

export default router;
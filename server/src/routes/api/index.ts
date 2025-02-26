import { Router } from 'express';
import { playerRoutes } from './player-routes.js';
import { userRoutes } from './user-routes.js'
import favoriteRoutes from '../../routes/api/favorite-routes.js';

const router = Router();

router.use('/players', playerRoutes);
router.use('/user', userRoutes);
router.use('/favorites', favoriteRoutes);


export default router
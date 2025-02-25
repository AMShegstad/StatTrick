import { Router } from 'express';
import { playerRoutes } from './player-routes.js';
import { userRoutes } from './user-routes.js'

const router = Router();

router.use('/players', playerRoutes);
router.use('/user', userRoutes);

export default router
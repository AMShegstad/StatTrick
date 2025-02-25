import { Router } from 'express';
import nhlRoutes from './api/nhlRoutes.js';
import oddsRoutes from './api/oddsRoutes.js';
import authRoutes from './api/authRoutes.js';

const router = Router();

router.use('/api/nhl', nhlRoutes);
router.use('/api/odds', oddsRoutes);
router.use('/auth', authRoutes);

export default router;
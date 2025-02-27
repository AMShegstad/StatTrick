import { Router } from 'express';
import OddsService from '../utils/oddsService.js';

const router = Router();

router.get('/odds', async (_req, res) => {
  try {
    const odds = await OddsService.getOdds();
    res.json(odds);
  } catch (error) {
    console.error('Error fetching betting odds:', error);
    res.status(500).json({ error: 'Failed to fetch betting odds' });
  }
});

export default router;
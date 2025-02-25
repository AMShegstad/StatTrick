import { Router, Request, Response } from 'express';
import OddsService from '../../services/oddsService.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        console.log(req.method, req.url);
        const odds = await OddsService.getOdds();
        return res.json(odds);
    } catch (error) {
        console.error('Error getting odds:', error);
        res.status(500).json({ error: 'Failed to get odds' });
    }
});

export default router;
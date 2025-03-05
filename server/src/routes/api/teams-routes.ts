import { Team } from '../../models/index.js'; // Import Team model
import express, { Request, Response } from 'express'; // Import express and its types

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const teams = await Team.findAll();
        res.json(teams);
    } catch (error) {
        console.error('❌ Error retrieving teams:', error);
        res.status(500).send('Error retrieving teams');
    }
    });

    export { router as teamRoutes };
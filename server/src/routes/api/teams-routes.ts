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

    router.get('/standings', async (_req: Request, res: Response) => {
        try {
            const response = await fetch('https://api-web.nhle.com/v1/standings/now');
            if (!response.ok) {
                throw new Error('Failed to fetch standings');
            }
            const data = await response.json();
            res.json(data); // Send the standings data as the response
        } catch (error) {
            console.error('❌ Error retrieving standings:', error);
            res.status(500).send('Error retrieving standings');
        }
    });

    export { router as teamRoutes };
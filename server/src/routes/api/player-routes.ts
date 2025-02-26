import { Player } from '../../models/index.js'; // Import User and Player models
import { Op } from 'sequelize'; // Import Sequelize operators
import express, { Request, Response } from 'express';  // Import express and its types

const app = express();
const router = express.Router();



// API route to retrieve all players
router.get('/players', async (_req, res) => {
    try {
        const players = await Player.findAll();  // Retrieve all players from the database
        res.json(players);  // Return the players as JSON response
    } catch (error) {
        console.error('❌ Error retrieving players:', error);
        res.status(500).send('Error retrieving players');
    }
});


// Route to fetch top players for a specific team, this will be used to display top players for user's favorite team on the home page
app.get('/api/team-top-players/:teamAbbreviation', async (req: Request, res: Response) => {
    const { teamAbbreviation } = req.params;

    try {
        const [topGoalScorer, topAssistLeader, topPointLeader, topGoalie] = await Promise.all([
            Player.findOne({
                where: { teamAbbreviation },
                order: [['goals', 'DESC']],
            }),
            Player.findOne({
                where: { teamAbbreviation },
                order: [['assists', 'DESC']],
            }),
            Player.findOne({
                where: { teamAbbreviation },
                order: [['points', 'DESC']],
            }),
            Player.findOne({
                where: { teamAbbreviation, positionCode: 'G' },
                order: [['savePercentage', 'DESC']],
            }),
        ]);

        const topPlayers = [topGoalScorer, topAssistLeader, topPointLeader, topGoalie].filter(Boolean);

        res.json(topPlayers);
    } catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).send('Error fetching team’s top players');
    }
});

// Route to search for players by first name or last name
app.get('/api/search-players', async (req: Request, res: Response) => {
    const { query } = req.query;

    try {
        const players = await Player.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${query}%` } },
                    { lastName: { [Op.iLike]: `%${query}%` } },
                ],
            },
            limit: 10, // Limit search results
        });

        res.json(players);
    } catch (error) {
        console.error('Error searching for players:', error);
        res.status(500).send('Error searching for players');
    }
});

export { router as playerRoutes }
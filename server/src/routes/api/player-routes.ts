import { Player as PlayerModel } from '../../models/playerModel.js';
import { Op } from 'sequelize'; // Import Sequelize operators
import express, { Request, Response } from 'express';  // Import express and its types

const app = express();
const router = express.Router();



// API route to retrieve all players
app.get('/players', async (_req, res) => {
    try {
        const players = await PlayerModel.findAll();  // Retrieve all players from the database
        res.json(players);  // Return the players as JSON response
    } catch (error) {
        console.error('❌ Error retrieving players:', error);
        res.status(500).send('Error retrieving players');
        return;
    }
});

// Route to fetch player data by playerID from the database
app.get('/api/player/:id', async (req: Request, res: Response) => {
    const { playerID } = req.params;

    try {
        // Fetch player data using the playerID from the database
        const player = await PlayerModel.findOne({ where: { id: playerID } });

        if (!player) {
            res.status(404).json({ message: 'Player not found' });
        }

        // Send the player data as JSON
        res.json(player);
    } catch (error) {
        console.error('Error fetching player data:', error);
        res.status(500).send('Error fetching player data');
    }
});

// Route to fetch top players for a specific team, this will be used to display top players for user's favorite team on the home page
app.get('/api/team-top-players/:teamAbbreviation', async (req: Request, res: Response) => {
    const { teamAbbreviation } = req.params;

    try {
        const [topGoalScorer, topAssistLeader, topPointLeader, topGoalie] = await Promise.all([
            PlayerModel.findOne({
                where: { teamAbbreviation },
                order: [['goals', 'DESC']],
            }),
            PlayerModel.findOne({
                where: { teamAbbreviation },
                order: [['assists', 'DESC']],
            }),
            PlayerModel.findOne({
                where: { teamAbbreviation },
                order: [['points', 'DESC']],
            }),
            PlayerModel.findOne({
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
        const players = await PlayerModel.findAll({
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
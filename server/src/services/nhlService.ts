import express from 'express';
import { Request, Response } from 'express';
import { Player } from '../models/playerModel';  // Import the Player model
import { Op } from 'sequelize';

const router = express.Router();

// API route to retrieve all players
router.get('/players', async (req: Request, res: Response) => {
    try {
        console.log(req.method, req.url);
        const players = await Player.findAll();  // Retrieve all players from the database
        res.json(players);  // Return the players as JSON response
    } catch (error) {
        console.error('❌ Error retrieving players:', error);
        res.status(500).send('Error retrieving players');
    }
});

// Route to fetch player data by playerID from the database
router.get('/api/player/:id', async (req: Request, res: Response) => {
    const { playerID } = req.params;

    try {
        // Fetch player data using the playerID from the database
        const player = await Player.findOne({ where: { id: playerID } });

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
router.get('/api/team-top-players/:teamAbbreviation', async (req: Request, res: Response) => {
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
router.get('/api/search-players', async (req: Request, res: Response) => {
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

export default router;

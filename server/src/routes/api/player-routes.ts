import { Player } from '../../models/index.js'; // Import User and Player models
import { Op } from 'sequelize'; // Import Sequelize operators
import express, { Request, Response } from 'express';  // Import express and its types
import axios from 'axios';

// const app = express();
const router = express.Router();

// API route to retrieve all players
router.get('/', async (_req, res) => {  // Changed '/players' to '/' for consistency
    try {
        const players = await Player.findAll();  // Retrieve all players from the database
        res.json(players);  // Return the players as JSON response
    } catch (error) {
        console.error('❌ Error retrieving players:', error);
        res.status(500).send('Error retrieving players');
    }
});

// Endpoint to fetch player stats for a given team abbreviation
router.get('/player-stats/:teamAbbreviation', async (req, res) => {
    const { teamAbbreviation } = req.params;
  
    try {
        // Fetch stats for the team using the team abbreviation
        const response = await axios.get(`https://api-web.nhle.com/v1/club-stats/${teamAbbreviation}/now`);
        
        // Get skaters and goalies stats
        const { skaters, goalies } = response.data;
    
        // Send back the stats data for skaters and goalies
        res.json({ skaters, goalies });
    } catch (error) {
        console.error(`Error fetching player stats for team ${teamAbbreviation}:`, error);
        res.status(500).json({ message: 'Error fetching player stats' });
    }
});

// Route to fetch top players for a specific team, this will be used to display top players for user's favorite team on the home page
router.get('/team-top-players/:teamAbbreviation', async (req: Request, res: Response) => {
    const { team_abbreviation } = req.params;

    try {
        const [topGoalScorer, topAssistLeader, topPointLeader, topGoalie] = await Promise.all([
            Player.findOne({
                where: { team_abbreviation },
                order: [['goals', 'DESC']],
            }),
            Player.findOne({
                where: { team_abbreviation },
                order: [['assists', 'DESC']],
            }),
            Player.findOne({
                where: { team_abbreviation },
                order: [['points', 'DESC']],
            }),
            Player.findOne({
                where: { team_abbreviation, position_code: 'G' },
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
router.get('/search-players', async (req: Request, res: Response) => {
    const { query } = req.query;

    try {
        const players = await Player.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${query}%` } },
                    { last_name: { [Op.iLike]: `%${query}%` } },
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

// Endpoint to get player data by playerID
router.get('/players/:player_id', async (req, res) => {
    try {
        const player = await Player.findOne({ where: { player_id: req.params.player_id } });
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching player data' });
    }
});

export { router as playerRoutes };

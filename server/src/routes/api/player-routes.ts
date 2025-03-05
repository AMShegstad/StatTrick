import { Player } from '../../models/index.js'; // Import User and Player models
import { PlayerStats } from '../../models/index.js'; // Import PlayerStats model
// import { User } from '../../models/index.js'; // Import User model
import { Op } from 'sequelize'; // Import Sequelize operators
import express, { Request, Response } from 'express';  // Import express and its types

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

// GET /api/player-stats/:player_id - Get player stats by player ID
router.get('/player-stats/:player_id', async (req: Request, res: Response) => {
    const { player_id } = req.params;
  
    try {
      // Find player stats by player ID
      const player_stats = await PlayerStats.findOne({
        where: { player_id },
      });
  
      if (!player_stats) {
        res.status(404).json({ message: 'Player stats not found' });
      }
  
      // Return the player stats
      res.json(player_stats);
    } catch (error) {
      console.error('Error fetching player stats:', error);
      res.status(500).json({ message: 'Error fetching player stats' });
    }
  });

export { router as playerRoutes };

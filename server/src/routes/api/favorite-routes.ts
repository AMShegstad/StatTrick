import express from 'express';
import { User, Player } from '../../models/index.js';

const router = express.Router();

// POST /favorites/:user_id/:player_id - Add player to favorites
router.post('/:user_id/:player_id', async (req, res) => {
    const { user_id, player_id } = req.params;
  
    try {
      const user = await User.findByPk(user_id);
      const player = await Player.findByPk(player_id);
  
      if (!user || !player) {
        res.status(404).json({ message: 'User or player not found' });
        return;
      }
  
      // Add player to favorites
      await user.addFavoritePlayer(player);
      res.status(200).json({ message: `Player added to ${user.username}'s favorites.` });
    } catch (error) {
      console.error('Error adding player to favorites:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.delete('/:user_id/:player_id', async (req, res) => {
    try {
        const { user_id, player_id } = req.params;

        const user = await User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return; // Ensure function exits early
        }

        const player = await Player.findByPk(player_id);
        if (!player) {
            res.status(404).json({ message: "Player not found." });
            return; // Ensure function exits early
        }

        await user.removeFavoritePlayer(player);
        res.status(200).json({ message: `Player ${player.first_name} ${player.last_name} removed from favorites.` });
    } catch (error) {
        console.error("❌ Error removing player from favorites:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;

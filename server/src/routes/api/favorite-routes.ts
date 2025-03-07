import express from 'express';
import { User, Player, UserFavorites } from '../../models/index.js';

const router = express.Router();

// POST /favorites/:id/:player_id - Add player to favorites
router.post('/:id/:player_id', async (req, res) => {
  const { id, player_id } = req.params;

  try {
      const user = await User.findByPk(id);
      const player = await Player.findByPk(player_id);

      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
      } else if (!player) {
          res.status(404).json({ message: 'Player not found' });
          return;
      }

      // Insert into user_favorites table using UserFavorite model
      await UserFavorites.create({
          id: user.id,  // Ensure you're using the correct field name
          player_id: player.player_id  // Ensure correct field for player ID
      });

      res.status(201).json({ message: `Player added to ${user.username}'s favorites.` });
  } catch (error) {
      console.error('Error adding player to favorites:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /favorites/:id/:player_id - Remove player from favorites
router.delete('/:id/:player_id', async (req, res) => {
    try {
        const { id, player_id } = req.params;

        const user = await User.findByPk(id);
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
        console.log(`Player ${player.first_name} ${player.last_name} removed from ${user.username}'s favorites.`);  // Log success
        res.status(200).json({ message: `Player ${player.first_name} ${player.last_name} removed from favorites.` });
    } catch (error) {
        console.error("❌ Error removing player from favorites:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;

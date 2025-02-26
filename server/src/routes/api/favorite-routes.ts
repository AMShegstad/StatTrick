import express from 'express';
import { User, Player } from '../../models/index.js';

const router = express.Router();

router.post('/favorites/:userID/:playerID', async (req, res) => {
    try {
        const { userID, playerID } = req.params;

        const user = await User.findByPk(userID);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return; // Ensure function exits early
        }

        const player = await Player.findByPk(playerID);
        if (!player) {
            res.status(404).json({ message: "Player not found." });
            return; // Ensure function exits early
        }

        await user.addFavoritePlayer(player);
        res.status(200).json({ message: `Player ${player.firstName} ${player.lastName} added to favorites.` });
    } catch (error) {
        console.error("❌ Error adding player to favorites:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.delete('/favorites/:userID/:playerID', async (req, res) => {
    try {
        const { userID, playerID } = req.params;

        const user = await User.findByPk(userID);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return; // Ensure function exits early
        }

        const player = await Player.findByPk(playerID);
        if (!player) {
            res.status(404).json({ message: "Player not found." });
            return; // Ensure function exits early
        }

        await user.removeFavoritePlayer(player);
        res.status(200).json({ message: `Player ${player.firstName} ${player.lastName} removed from favorites.` });
    } catch (error) {
        console.error("❌ Error removing player from favorites:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;

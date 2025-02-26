import { Request, Response } from 'express';
import { User, Player } from '../models/index.js';

export const addFavorite = async (req: Request, res: Response) => {
    try {
        const { userID, playerID } = req.body;

        if (!userID || !playerID) {
            res.status(400).json({ error: 'userID and playerID are required.' });
            return;
            
        }

        // Find the user and player
        const user = await User.findByPk(userID);
        const player = await Player.findByPk(playerID);

        if (!user || !player) {
            res.status(404).json({ error: 'User or Player not found.' });
            return;
        }

        // Add the player to the user's favorites using Sequelize's built-in method
        if (user && player) {
            await user.addFavoritePlayer?.(player); // Optional chaining prevents calling if undefined
            console.log(`✅ Player ${player.firstName} ${player.lastName} added to favorites.`);
        }
        res.status(201).json({ message: 'Player added to favorites.' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    try {
        const { userID, playerID } = req.body;

        if (!userID || !playerID) {
            res.status(400).json({ error: 'userID and playerID are required.' });
        }

        // Find the user and player
        const user = await User.findByPk(userID);
        const player = await Player.findByPk(playerID);

        if (!user || !player) {
            res.status(404).json({ error: 'User or Player not found.' });
        }

        // Remove the player from the user's favorites
        if (user && player) {
            await user.removeFavoritePlayer?.(player); // Optional chaining prevents calling if undefined
            console.log(`✅ Player ${player.firstName} ${player.lastName} removed from favorites.`);
        }

        res.status(200).json({ message: 'Player removed from favorites.' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

import express from 'express';
import { User as UserModel } from '../../models/userModel.js';

const app = express();
const router = express.Router();


app.get('/user', async (_req, res) => {
    try {
        const users = await UserModel.findAll();  // Retrieve all users from the database
        res.json(users);  // Return the players as JSON response
    } catch (error) {
        console.error('❌ Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

export { router as  userRoutes }


import express from 'express';
import cors from 'cors';
import { playerRoutes } from './api/player-routes.js';
import { userRouter } from './api/user-routes.js';
import favoriteRoutes from './api/favorite-routes.js';
import oddsRoutes from './api/oddsRoutes.js';
import authRoutes from './authRoutes.js';
import { teamRoutes } from './api/teams-routes.js';
import { rosterStatRoutes } from './api/roster-stat-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Apply Middleware BEFORE Routes
app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:3000', // Allow frontend requests from localhost
=======
  origin: 'https://stattrick.onrender.com/', // Allow frontend requests
>>>>>>> 2cccddaf0cee0206cc5f1aa6b36e2df2c4356332
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static('../client/dist'));
app.use(express.json()); // ✅ Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded bodies

// Attach Routes AFTER Middleware
app.use('/api/players', playerRoutes);
app.use('/api/users', userRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/odds', oddsRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/roster-stats', rosterStatRoutes);

export { app, PORT};

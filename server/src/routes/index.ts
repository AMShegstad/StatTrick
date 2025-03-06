import express from 'express';
import cors from 'cors';
import { playerRoutes } from './api/player-routes.js';
import { userRouter } from './api/user-routes.js';
import favoriteRoutes from './api/favorite-routes.js';
import oddsRoutes from './api/oddsRoutes.js';
import authRoutes from './authRoutes.js';
import { teamRoutes } from './api/teams-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Apply Middleware BEFORE Routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // ✅ Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded bodies

// Attach Routes AFTER Middleware
app.use('/api/players', playerRoutes);
app.use('/api/users', userRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/odds', oddsRoutes);
app.use('/api/teams', teamRoutes);

export { app, PORT };

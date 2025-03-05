import express from 'express';
import { playerRoutes } from './api/player-routes.js';
import { userRouter } from './api/user-routes.js';
import favoriteRoutes from './api/favorite-routes.js';
import oddsRoutes from './api/oddsRoutes.js';
import authRoutes from './authRoutes.js';
import { teamRoutes } from './api/teams-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api/players', playerRoutes);
app.use('/api/users', userRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/odds', oddsRoutes);
app.use('/api/teams', teamRoutes);

export { app, PORT };
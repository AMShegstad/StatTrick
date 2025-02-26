import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { sequelize } from './config/connection.js';
import fetchAndStoreRosters from './utils/fetchAndStoreRosters.js';
import morgan from 'morgan';
import cors from 'cors';
import authMiddleware from './middleware/auth.js'; // Import JWT middleware
//import { User, Player, UserFavorites } from '../src/models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('../client/dist/index.html'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// Add a test route

app.get('/api/test', authMiddleware, (req: Request, res: Response) => {
  console.log('GET /api/test');
  console.log(req.method);
  res.json({ message: 'JWT is working correctly' });
});

fetchAndStoreRosters();

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
import { Router} from 'express';
//import cors from 'cors';

import apiRoutes from './api/index.js';
// export const routes = express.Router();
const router = Router();
const PORT = process.env.PORT || 3001;

// Apply Middleware BEFORE Routes
// router.use(cors({
//   origin: 'http://localhost:5173', // Allow frontend requests
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
// }));

router.use('/api', apiRoutes);

export default { router, apiRoutes ,PORT };



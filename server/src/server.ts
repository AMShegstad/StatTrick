const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './config/connection.js';
import fetchAndStoreRosters from './utils/fetchAndStoreRosters.js';
import updatePlayerStats from './utils/updatePlayerStats.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
async function initializeServer() {
  try {
    console.log(':arrows_counterclockwise: Fetching and storing rosters...');
    await fetchAndStoreRosters(); // Ensure rosters are updated first
    console.log(':arrows_counterclockwise: Updating player stats...');
    await updatePlayerStats(); // Run only after rosters are stored
    console.log(':white_check_mark: Database updates complete.');
    sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error(':x: Error initializing server:', error);
  }
}
// Start the process
initializeServer();
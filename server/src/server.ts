import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './config/connection.js';
import fetchAndStoreRosters from './utils/fetchAndStoreRosters.js';
import updatePlayerStats from './utils/updatePlayerStats.js';
// import { seedTeams } from './seeds/teams-seed.js';
//import fs from 'fs';
import routes from './routes/index.js'; // Adjust the path as necessary
//import { fileURLToPath } from 'url';
//import path from 'path';

// Define __dirname
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes.router);

/*
async function runSchema() {
  const schemaPath = path.join(__dirname, '../db/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const queries = schema.split(';').filter(query => query.trim() !== '');

  for (const query of queries) {
    await sequelize.query(query);
  }
}*/

// async function setupDatabase() {
//   try {
//     console.log('🔄 Seeding teams into database...');
//     await seedTeams;
    
//     console.log('✅ Seeding teams complete.');
//   } catch (error) {
//     console.error('❌ Error setting up the database:', error);
//   }
// }

async function startServer() {
  try {
    //await runSchema(); // Run the schema.sql file
    // await setupDatabase(); // First, ensure teams are seeded
    await sequelize.sync({ force: false }); // Ensure sync happens after DB tasks

    // Run the time-consuming tasks asynchronously after the server starts
    runBackgroundTasks();
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
}

// Function to run long-running tasks in the background
async function runBackgroundTasks() {
  try {
    console.log('🔄 Fetching and storing rosters...');
    const fetchRosters = fetchAndStoreRosters();

    console.log('🔄 Updating player stats...');
    const updateStats = updatePlayerStats();

    // Wait for both tasks to complete, but don't block server startup
    await Promise.all([fetchRosters, updateStats]);

    console.log('✅ All background tasks complete.');
  } catch (error) {
    console.error('❌ Error in background tasks:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Start the process
startServer();

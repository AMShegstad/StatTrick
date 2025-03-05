import dotenv from 'dotenv';
import express from 'express';
import { app, PORT } from './routes/index.js';
import { sequelize } from './config/connection.js';
import fetchAndStoreRosters from './utils/fetchAndStoreRosters.js';
import updatePlayerStats from './utils/updatePlayerStats.js';
import { seedTeams } from './seeds/teams-seed.js';

dotenv.config();

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This function will handle seeding and database updates asynchronously in the background
async function setupDatabase() {
  try {
    console.log('🔄 Seeding teams into database...');
    await seedTeams;
    
    console.log('✅ Seeding teams complete.');
  } catch (error) {
    console.error('❌ Error setting up the database:', error);
  }
}

// Start the server
async function startServer() {
  try {
    await setupDatabase(); // First, ensure teams are seeded
    await sequelize.sync({ force: false }); // Ensure sync happens after DB tasks

    // app.listen(PORT, () => {
    //   console.log(`Server is listening on port ${PORT}`);
    // });

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

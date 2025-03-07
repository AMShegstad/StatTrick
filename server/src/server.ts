import dotenv from 'dotenv';
import { app, PORT } from './routes/index.js';
import { sequelize } from './config/connection.js';

dotenv.config();

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database synced.');
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Start the process
startServer();


// import dotenv from 'dotenv';
// import express from 'express';
// import { sequelize } from './config/connection.js';

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Serves static files in the entire client's dist folder
// app.use(express.static('../client/dist'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// async function startServer() {
//   try {
//     //await runSchema(); // Run the schema.sql file
//     // await setupDatabase(); // First, ensure teams are seeded
//     await sequelize.sync({ force: false }); // Ensure sync happens after DB tasks

//     // Run the time-consuming tasks asynchronously after the server starts
//     runBackgroundTasks();
//   } catch (error) {
//     console.error('❌ Error starting server:', error);
//   }
// }

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// // Start the process
// startServer();

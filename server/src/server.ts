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

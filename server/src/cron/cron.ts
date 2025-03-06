import cron from 'node-cron';
import fetchAndStoreRosters from '../utils/fetchAndStoreRosters.js';
import updatePlayerStats from '../utils/updatePlayerStats.js';

// Schedule the task to run every 12 hours
cron.schedule('0 0 */12 * *', async () => {
  try {
    console.log('🔄 Running fetchAndStoreRosters task...');
    await fetchAndStoreRosters();

    console.log('🔄 Running updatePlayerStats task...');
    await updatePlayerStats();
  } catch (error) {
    console.error('❌ Error running cron tasks:', error);
  }
});

console.log('Cron job is running every 12 hours');
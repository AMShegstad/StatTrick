import express from 'express';
import fetchAndStoreRosters from '../../utils/fetchAndStoreRosters.js';
import updatePlayerStats from '../../utils/updatePlayerStats.js';

const router = express.Router();

// Route to trigger fetching and storing rosters
router.post('/fetch-rosters', async (_req, res) => {
  try {
    await fetchAndStoreRosters();
    res.json({ message: 'Rosters fetched and stored successfully' });
  } catch (error) {
    console.error('❌ Error fetching rosters:', error);
    res.status(500).json({ error: 'Failed to fetch rosters' });
  }
});

// Route to trigger updating player stats
router.post('/update-stats', async (_req, res) => {
  try {
    await updatePlayerStats();
    res.json({ message: 'Player stats updated successfully' });
  } catch (error) {
    console.error('❌ Error updating stats:', error);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

export { router as rosterStatRoutes };
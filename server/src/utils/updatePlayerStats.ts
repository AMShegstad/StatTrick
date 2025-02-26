import axios from 'axios';
import { Player, PlayerStats } from '../models/index.js'; // Import both models

async function updatePlayerStats() {
  try {
    // Fetch all player IDs from the database
    const players = await Player.findAll();

    for (const player of players) {
      try {
        console.log(`Fetching stats for player ID: ${player.playerID}`);

        // Fetch player stats directly using the new API endpoint
        const response = await axios.get(`https://api-web.nhle.com/v1/player/${player.playerID}/landing`);
        const stats = response.data.featuredStats.regularSeason.subSeason;

        if (!stats) {
          console.warn(`No stats found for player: ${player.firstName} ${player.lastName}`);
          continue;
        }

        const statData = {
          playerID: player.playerID,
          firstName: player.firstName,
          lastName: player.lastName,
          season: '20242025', // Hardcoded for now, can be dynamic
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
          points: stats.points ?? 0,
          plusMinus: player.positionCode !== 'G' ? stats.plusMinus ?? 0 : null,
          saves: player.positionCode === 'G' ? stats.saves ?? 0 : null,
          goalsAllowed: player.positionCode === 'G' ? stats.goalsAllowed ?? 0 : null,
          savePercentage: player.positionCode === 'G' ? stats.savePercentage ?? 0 : null,
          goalsAgainstAverage: player.positionCode === 'G' ? stats.goalsAgainstAverage ?? 0 : null,
        };

        // Insert or update stats in the player_stats table
        await PlayerStats.upsert(statData);

        console.log(`✅ Successfully updated stats for ${player.firstName} ${player.lastName}`);
      } catch (error) {
        console.error(`❌ Error fetching stats for player ID: ${player.playerID}`, error);
      }
    }

    console.log('✅ All player stats have been updated!');
  } catch (error) {
    console.error('❌ Error fetching player list from the database:', error);
  }
}

// Call the function to update player stats
updatePlayerStats();

export default updatePlayerStats;

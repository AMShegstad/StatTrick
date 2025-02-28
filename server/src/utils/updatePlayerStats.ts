import axios from 'axios';
import { Player, PlayerStats } from '../models/index.js'; // Import both models
async function updatePlayerStats() {
  try {
    // Fetch all player IDs from the database
    const players = await Player.findAll();
    for (const player of players) {
      try {
        console.log(`Fetching stats for player ID: ${player.player_id}`);
        // Fetch player stats directly using the new API endpoint
        const response = await axios.get(`https://api-web.nhle.com/v1/player/${player.player_id}/landing`);
        const stats = response.data.featuredStats.regularSeason.subSeason;
        if (!stats) {
          console.warn(`No stats found for player: ${player.first_name} ${player.last_name}`);
          continue;
        }
        const statData = {
          player_id: player.player_id,
          season: '20242025',
          goals: stats.goals ?? 0,
          assists: stats.assists ?? 0,
          points: stats.points ?? 0,
          plus_minus: stats.plusMinus || null,
          save_pctg: stats.savePctg || null,
          goals_against_avg: stats.goalsAgainstAvg || null,
        };
        // Insert or update stats in the player_stats table
        await PlayerStats.upsert(statData);
        console.log(`:white_check_mark: Successfully updated stats for ${player.first_name} ${player.last_name}`);
      } catch (error) {
        console.error(`:x: Error fetching stats for player ID: ${player.player_id}`, error);
      }
    }
    console.log(':white_check_mark: All player stats have been updated!');
  } catch (error) {
    console.error(':x: Error fetching player list from the database:', error);
  }
}
// Call the function to update player stats
updatePlayerStats();
export default updatePlayerStats;
import axios from 'axios';
import { Team } from '../models/index.js'; // Adjust path as needed
import { Player } from '../models/index.js'; // Adjust path as needed
async function fetchAndStoreRosters() {
  // Fetch the teams from the database
  const teams = await Team.findAll();
  // Loop through each team and fetch their current roster
  for (const team of teams) {
    try {
      console.log(`Fetching roster for team: ${team.tri_code}`);
      const response = await axios.get(`https://api-web.nhle.com/v1/roster/${team.tri_code}/current`);
      const roster = response.data;
      // Combine forwards, defensemen, and goalies into one array
      const players = [
        ...roster.forwards,
        ...roster.defensemen,
        ...roster.goalies,
      ];
      // Insert players into the database
      const playerData = players.map(player => ({
        player_id: player.id,
        first_name: player.firstName.default,
        last_name: player.lastName.default,
        team_abbreviation: team.tri_code,
        position_code: player.positionCode,
        headshot: player.headshot,
        sweater_number: player.sweaterNumber,
      }));
      await Player.bulkCreate(playerData, { updateOnDuplicate: ['first_name', 'last_name', 'position_code', 'headshot', 'sweater_number'] });
      console.log(`Successfully added/updated players for team: ${team.tri_code}`);
    } catch (error) {
      const errorMessage = (error as any).message;
      console.error(`:x: Error fetching roster for ${team.tri_code}:`, errorMessage);
    }
  }
  console.log(':white_check_mark: All rosters have been fetched and stored.');
}
fetchAndStoreRosters();
export default fetchAndStoreRosters;
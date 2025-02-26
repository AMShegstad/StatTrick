import axios from 'axios';
import { Team } from '../models/index.js'; // Adjust path as needed
import { Player } from '../models/index.js'; // Adjust path as needed

async function fetchAndStoreRosters() {
  // Fetch the teams from the database
  const teams = await Team.findAll();

  // Loop through each team and fetch their current roster
  for (const team of teams) {
    try {
      console.log(`Fetching roster for team: ${team.triCode}`);
      const response = await axios.get(`https://api-web.nhle.com/v1/roster/${team.triCode}/current`);
      const roster = response.data;

      // Combine forwards, defensemen, and goalies into one array
      const players = [
        ...roster.forwards,
        ...roster.defensemen,
        ...roster.goalies,
      ];

      // Insert players into the database
      const playerData = players.map(player => ({
        playerID: player.id,
        firstName: player.firstName.default,
        lastName: player.lastName.default,
        teamAbbreviation: team.triCode,
        positionCode: player.positionCode,
        headshot: player.headshot,
        sweaterNumber: player.sweaterNumber,
      }));

      await Player.bulkCreate(playerData, { updateOnDuplicate: ['firstName', 'lastName', 'positionCode', 'headshot', 'sweaterNumber'] });

      console.log(`Successfully added/updated players for team: ${team.triCode}`);
    } catch (error) {
      const errorMessage = (error as any).message;
      console.error(`❌ Error fetching roster for ${team.triCode}:`, errorMessage);
    }
  }

  console.log('✅ All rosters have been fetched and stored.');
}

//fetchAndStoreRosters();

export default fetchAndStoreRosters;

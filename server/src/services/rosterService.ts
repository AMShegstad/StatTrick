import axios from "axios";
import { teams } from "../classes/cities";
import { Player } from "../models/playerModel";
import cron from "node-cron";
import dotenv from "dotenv";
import { sequelize } from "../db/db";

dotenv.config();

// Authenticate the connection to the PostgreSQL database
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to the database has been established successfully."
    );
  })
  .catch((err: Error) => {
    console.error("❌ Unable to connect to the database:", err);
  });

export const fetchAndStoreRosters = async () => {
  console.log("⚡ fetchAndStoreRosters() has been triggered");

  try {
    console.log("Fetching NHL rosters...");
    for (const key in teams) {
      if (Object.prototype.hasOwnProperty.call(teams, key)) {
        const team = teams[key as keyof typeof teams];

        console.log(`Fetching roster for team: ${team.triCode}`);
        const response = await axios.get(
          `https://api-web.nhle.com/v1/club-stats/${team.triCode}/now`
        );
        console.log(`Received response for ${team.triCode}`);

        const players = response.data.roster;
        if (!players || players.length === 0) {
          console.log(`No players found for ${team.triCode}`);
          continue;
        }

        console.log(
          `Processing ${players.length} players for ${team.triCode}...`
        );

        const formattedPlayers = players.map(
          (player: {
            playerId: number;
            headshot?: string;
            firstName: { default: string };
            lastName: { default: string };
            position: { code: string };
            jerseyNumber?: number;
            stats?: {
              points?: number;
              goals?: number;
              assists?: number;
              plusMinus?: number;
              saves?: number;
              goalsAllowed?: number;
              savePercentage?: number;
              goalsAgainstAverage?: number;
            };
          }) => ({
            id: player.playerId,
            headshot: player.headshot || "",
            firstName: player.firstName.default,
            lastName: player.lastName.default,
            teamAbbreviation: team.triCode,
            positionCode: player.position.code,
            sweaterNumber: player.jerseyNumber || null,
            points: player.stats?.points || 0,
            goals: player.stats?.goals || 0,
            assists: player.stats?.assists || 0,
            plusMinus:
              player.position.code === "G"
                ? null
                : player.stats?.plusMinus || 0, // NULL for goalies
            saves:
              player.position.code === "G" ? player.stats?.saves || 0 : null, // NULL for skaters
            goalsAllowed:
              player.position.code === "G"
                ? player.stats?.goalsAllowed || 0
                : null,
            savePercentage:
              player.position.code === "G"
                ? player.stats?.savePercentage || 0
                : null,
            goalsAgainstAverage:
              player.position.code === "G"
                ? player.stats?.goalsAgainstAverage || 0
                : null,
          })
        );

        console.log(
          `Upserting ${formattedPlayers.length} players for ${team.triCode}...`
        );
        await Player.bulkCreate(formattedPlayers, {
          updateOnDuplicate: [
            "points",
            "goals",
            "assists",
            "plusMinus",
            "saves",
            "goalsAllowed",
            "savePercentage",
            "goalsAgainstAverage",
          ],
        });

        console.log(`✅ Successfully updated rosters for ${team.triCode}`);
      }
    }
    console.log("✅ All rosters have been fetched and stored.");
  } catch (error) {
    console.error("❌ Error fetching and storing rosters:", error);
  }
};

// Schedule the function to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("⏳ Running scheduled NHL roster update...");
  await fetchAndStoreRosters();
});

// Run immediately on startup
fetchAndStoreRosters();

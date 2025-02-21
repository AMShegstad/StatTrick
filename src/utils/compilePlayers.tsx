import axios from 'axios';
import { Sequelize } from 'sequelize';
import { teams } from '../classes/cities'; // Import your team data
import cron from 'node-cron';
import { Skater } from '../models/skaterModel'; // Import your Sequelize model
import { Goalie } from '../models/goalieModel'; // Import your Sequelize model
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection setup with Sequelize
const sequelize = new Sequelize(process.env.PG_DATABASE as string, process.env.PG_USER as string, process.env.PG_PASSWORD as string, {
    host: 'localhost',
    dialect: 'postgres',
});

const fetchAndStoreRosters = async () => {
    try {
        for (const key in teams) {
            if (Object.prototype.hasOwnProperty.call(teams, key)) {
                const team = teams[key as keyof typeof teams];
                const response = await axios.get(`https://api-web.nhle.com/v1/roster/${team.triCode}/current`);
                
                const players = response.data.roster;
                
                for (const player of players) {
                    const { id, firstName, lastName } = player.person;
                    const fullName = `${firstName.default} ${lastName.default}`;
                    
                    if (player.position.code === 'G') {
                        await Goalie.upsert({
                            id: id,
                            firstName: firstName,
                            lastName: lastName,
                            teamAbbreviation: team.triCode,
                            position: player.position.code,
                            image: player.person.image,
                            saves: player.stats.saves,
                            goalsAllowed: player.stats.goalsAllowed,
                            savePercentage: player.stats.savePercentage,
                            goalsAllowedAverage: player.stats.goalsAllowedAverage,
                        });
                    } else {
                        await Skater.upsert({
                            id: id,
                            firstName: fullName,
                            lastName: lastName,
                            teamAbbreviation: team.triCode,
                            position: player.position.code,
                            positionCode: player.position.code,
                            headshot: player.person.image,
                            sweaterNumber: player.jerseyNumber,
                            points: player.stats.points,
                            goals: player.stats.goals,
                            assists: player.stats.assists,
                            plusMinus: player.stats.plusMinus,
                        });
                    }
                }
            }
        }
        console.log('All rosters have been fetched and stored.');
    } catch (error) {
        console.error('Error fetching and storing rosters:', error);
    }
};

// Schedule the function to run daily at midnight (server time)
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled NHL roster update...');
    await fetchAndStoreRosters();
});

fetchAndStoreRosters();
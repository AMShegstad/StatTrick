import React, { useEffect } from 'react';
import { Player } from '../../../server/src/models/playerModel'; // Import the Player model
import { Team } from '../../../server/src/models/teamModel'; // Import Team model to query the database

// Function to fetch the team triCode from the database
const fetchTeamDataFromDB = async (team_abbreviation: string): Promise<string | null> => {
    try {
        // Query the database for the team with the given abbreviation
        const team = await Team.findOne({
            where: {
                tri_code: team_abbreviation
            }
        });

        // If the team is found, return the triCode
        if (team) {
            return team.tri_code;
        } else {
            console.error(`Team with abbreviation ${team_abbreviation} not found in the database.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching team data from database:', error);
        return null;
    }
};

const fetchPlayerStats = async (team_abbreviation: string, onStatsFetched: (data: Player) => void) => {
    const updateOrInsertPlayerData = async (playerData: Player) => {
        // Implement the logic to update or insert player data into the database
        console.log('Updating or inserting player data:', playerData);
    };

    try {
        // Fetch the team data from the database using the team abbreviation
        const tri_code = await fetchTeamDataFromDB(team_abbreviation);
        if (!tri_code) {
            console.error(`No team data found for abbreviation: ${team_abbreviation}`);
            return;
        }

        const response = await fetch(`https://api-web.nhle.com/v1/club-stats/T${tri_code}/now`);
        const data = await response.json();

        // Iterate through all players in the roster
        const playersData = data.roster;

        // Process each player
        for (const playerData of playersData) {
            // Create or update the Player instance based on the position and stats
            const updatedPlayerData = new Player();
            updatedPlayerData.player_id = playerData.playerId;
            updatedPlayerData.first_name = playerData.person?.firstName ?? '';
            updatedPlayerData.last_name = playerData.person?.lastName ?? '';
            updatedPlayerData.team_abbreviation = tri_code;
            updatedPlayerData.position_code = playerData.position?.code ?? '';
            updatedPlayerData.headshot = playerData.person?.headshot ?? '';
            updatedPlayerData.sweater_number = playerData.jerseyNumber ?? null;

            // Call the callback function to update player stats
            onStatsFetched(updatedPlayerData);

            // Upsert the updated stats into the database
            await updateOrInsertPlayerData(updatedPlayerData);
        }

    } catch (error) {
        console.error('Error fetching player stats:', error);
    }
};

const PlayerComponent: React.FC<{ team_abbreviation: string; onStatsFetched: (data: Player) => void }> = ({ team_abbreviation, onStatsFetched }) => {
    useEffect(() => {
        fetchPlayerStats(team_abbreviation, onStatsFetched);
    }, [team_abbreviation, onStatsFetched]);

    return null;
};

const team_abbreviations: string[] = []; // Define the type of team_abbreviations

const App: React.FC = () => {
    const handleStatsFetched = React.useCallback((data: Player) => {
        console.log('Fetched player stats:', data);
    }, []);

    return (
        <div>
            {team_abbreviations.map((team_abbreviation) => (
                <PlayerComponent key={team_abbreviation} team_abbreviation={team_abbreviation} onStatsFetched={handleStatsFetched} />
            ))}
        </div>
    );
};

export default App;

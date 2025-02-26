import React, { useEffect } from 'react';
import { Player } from '../../../server/src/models/playerModel'; // Import the Player model
import { teams } from '../../../server/src/classes/cities'; // Import teams object

const fetchPlayerStats = async (teamAbbreviation: string, onStatsFetched: (data: Player) => void) => {
    const updateOrInsertPlayerData = async (playerData: Player) => {
        // Implement the logic to update or insert player data into the database
        console.log('Updating or inserting player data:', playerData);
    };
    try {
        // Fetch the team data from the teams object using the teamAbbreviation
        const team = teams[`${teamAbbreviation}Team` as keyof typeof teams];
        if (!team) {
            console.error(`Team not found for abbreviation: ${teamAbbreviation}`);
            return;
        }

        const response = await fetch(`https://api-web.nhle.com/v1/club-stats/T${team.triCode}/now`);
        const data = await response.json();

        // Iterate through all players in the roster
        const playersData = data.roster;

        // Process each player
        for (const playerData of playersData) {
            // Create or update the Player instance based on the position and stats
            const updatedPlayerData = new Player();
            //updatedPlayerData.id = playerData.playerId;
            updatedPlayerData.firstName = playerData.person?.firstName ?? '';
            updatedPlayerData.lastName = playerData.person?.lastName ?? '';
            updatedPlayerData.teamAbbreviation = team.triCode;
            updatedPlayerData.positionCode = playerData.position?.code ?? '';
            updatedPlayerData.headshot = playerData.person?.headshot ?? '';
            updatedPlayerData.sweaterNumber = playerData.jerseyNumber ?? null;
           // updatedPlayerData.points = playerData.stats?.points || 0;
            //updatedPlayerData.goals = playerData.stats?.goals || 0;
            //updatedPlayerData.assists = playerData.stats?.assists || 0;
            //updatedPlayerData.plusMinus = playerData.position?.code === 'G' ? null : playerData.stats?.plusMinus || 0; // Null for goalies
            //updatedPlayerData.saves = playerData.position?.code === 'G' ? playerData.stats?.saves || 0 : null; // Null for skaters
            //updatedPlayerData.goalsAllowed = playerData.position?.code === 'G' ? playerData.stats?.goalsAllowed || 0 : null; // Null for skaters
            //updatedPlayerData.savePercentage = playerData.position?.code === 'G' ? playerData.stats?.savePercentage || 0 : null; // Null for skaters
            //updatedPlayerData.goalsAgainstAverage = playerData.position?.code === 'G' ? playerData.stats?.goalsAgainstAverage || 0 : null; // Null for skaters

            // Call the callback function to update player stats
            onStatsFetched(updatedPlayerData);

            // Upsert the updated stats into the database
            // Assuming you have a method to update or insert the player data
            await updateOrInsertPlayerData(updatedPlayerData);
        }

    } catch (error) {
        console.error('Error fetching player stats:', error);
    }
};

const PlayerComponent: React.FC<{ teamAbbreviation: string; onStatsFetched: (data: Player) => void }> = ({ teamAbbreviation, onStatsFetched }) => {
    useEffect(() => {
        fetchPlayerStats(teamAbbreviation, onStatsFetched);
    }, [teamAbbreviation, onStatsFetched]);

    return null;
};

const App: React.FC = () => {
    const handleStatsFetched = React.useCallback((data: Player) => {
        console.log('Fetched player stats:', data);
    }, []);

    // Assuming teams is an object with team abbreviations
    const teamAbbreviations = Object.keys(teams);

    return (
        <div>
            {teamAbbreviations.map((teamAbbreviation) => (
                <PlayerComponent key={teamAbbreviation} teamAbbreviation={teamAbbreviation} onStatsFetched={handleStatsFetched} />
            ))}
        </div>
    );
};

export default App;
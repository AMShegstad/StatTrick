import React, { useEffect } from 'react';
import { Player } from '../models/playerModel'; // Import the Player model
import { teams } from '../classes/cities'; // Import teams object

const fetchPlayerStats = async (teamAbbreviation: string, onStatsFetched: (data: Player) => void) => {
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
            const updatedPlayerData = new Player({
                id: playerData.playerId,
                firstName: playerData.person?.firstName ?? '',
                lastName: playerData.person?.lastName ?? '',
                teamAbbreviation: team.triCode,
                positionCode: playerData.position?.code ?? '',
                headshot: playerData.person?.headshot ?? '',
                sweaterNumber: playerData.jerseyNumber ?? null,
                points: playerData.stats?.points || 0,
                goals: playerData.stats?.goals || 0,
                assists: playerData.stats?.assists || 0,
                plusMinus: playerData.position?.code === 'G' ? null : playerData.stats?.plusMinus || 0, // Null for goalies
                saves: playerData.position?.code === 'G' ? playerData.stats?.saves || 0 : null, // Null for skaters
                goalsAllowed: playerData.position?.code === 'G' ? playerData.stats?.goalsAllowed || 0 : null, // Null for skaters
                savePercentage: playerData.position?.code === 'G' ? playerData.stats?.savePercentage || 0 : null, // Null for skaters
                goalsAgainstAverage: playerData.position?.code === 'G' ? playerData.stats?.goalsAgainstAverage || 0 : null, // Null for skaters
            });

            // Call the callback function to update player stats
            onStatsFetched(updatedPlayerData);

            // Upsert the updated stats into the database
            await Player.upsert({
                id: updatedPlayerData.id,
                firstName: updatedPlayerData.firstName,
                lastName: updatedPlayerData.lastName,
                teamAbbreviation: updatedPlayerData.teamAbbreviation,
                positionCode: updatedPlayerData.positionCode,
                headshot: updatedPlayerData.headshot,
                sweaterNumber: updatedPlayerData.sweaterNumber,
                points: updatedPlayerData.points,
                goals: updatedPlayerData.goals,
                assists: updatedPlayerData.assists,
                plusMinus: updatedPlayerData.plusMinus,
                saves: updatedPlayerData.saves,
                goalsAllowed: updatedPlayerData.goalsAllowed,
                savePercentage: updatedPlayerData.savePercentage,
                goalsAgainstAverage: updatedPlayerData.goalsAgainstAverage,
            });
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
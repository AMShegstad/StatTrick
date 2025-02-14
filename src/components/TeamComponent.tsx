import React, { useEffect } from 'react';
import { Team } from '../models/teamModel';
import { teams } from '../classes/cities';

const fetchTeamData = async (team: Team, onDataFetched: (data: Team) => void) => {
    try {
        const response = await fetch('https://api-web.nhle.com/v1/standings/now');
        const data = await response.json();
        const teamDataFromApi = data.standings.find(
            (record: { teamAbbrev: { default: string }; wins: number; losses: number; otLosses: number; points: number; gamesPlayed: number }) =>
                record.teamAbbrev?.default === team.triCode
        );

        if (teamDataFromApi) {
            const updatedTeamData = new Team({
                ...team,
                wins: teamDataFromApi.wins,
                losses: teamDataFromApi.losses,
                overtimeLosses: teamDataFromApi.otLosses,
                points: teamDataFromApi.points,
                gamesPlayed: teamDataFromApi.gamesPlayed,
            });

            onDataFetched(updatedTeamData);
        }
    } catch (error) {
        console.error('Error fetching additional data:', error);
    }
};

const TeamComponent: React.FC<{ team: Team; onDataFetched: (data: Team) => void }> = ({ team, onDataFetched }) => {
    useEffect(() => {
        fetchTeamData(team, onDataFetched);
    }, [team, onDataFetched]);

    return null;
};

const App: React.FC = () => {
    const nhlTeams = Object.values(teams);

    const handleDataFetched = React.useCallback((data: Team) => {
        console.log('Fetched data:', data);
    }, []);

    return (
        <div>
            {nhlTeams.map((team) => (
                <TeamComponent key={team.triCode} team={team} onDataFetched={handleDataFetched} />
            ))}
        </div>
    );
};

export default App;
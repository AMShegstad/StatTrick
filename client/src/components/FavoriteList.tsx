import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import AuthService from '../utils/auth'; // Import AuthService

interface Player {
  player_id: number;
  position_code: string;
  headshot: string;
  sweater_number: number;
  first_name: string;
  last_name: string;
  team_abbreviation: string;
}

interface PlayerStats {
  goals: number;
  assists: number;
  points: number;
  plus_minus: number;
  save_pctg: number;
  goals_against_avg: number;
}

const FavoritesList: React.FC = () => {
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<{ [key: number]: PlayerStats }>({}); // Store stats by player ID

  useEffect(() => {
    const user = AuthService.getProfile(); // Get the current user's profile
    if (!user || !user.id) {
      setError('You need to be logged in to view your favorite players.');
      setLoading(false);
      return;
    }

    // Fetch favorite players
    axios
      .get(`/api/favorites/${user.id}`)
      .then((response) => {
        setFavoritePlayers(response.data);
        setLoading(false);

        // Fetch stats for each favorite player
        response.data.forEach((player: Player) => {
          if (player.player_id) {
            axios
              .get(`/api/players/player-stats/${player.player_id}`)
              .then((statsResponse) => {
                setPlayerStats((prevStats) => ({
                  ...prevStats,
                  [player.player_id]: statsResponse.data,
                }));
              })
              .catch((error) => {
                console.error('Error fetching player stats:', error);
              });
          } else {
            console.error('Player ID is undefined for player:', player);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching favorite players:', error);
        setError('Failed to load favorite players.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Team</th>
          <th>Positon</th>
          <th>Photo</th>
          <th>Player</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Points</th>
          <th>+\-</th>
          <th>Save Percentage</th>
          <th>Goals Against Average</th>
        </tr>
      </thead>
      <tbody>
        {favoritePlayers.map((player, index) => (
          <tr key={`${player.player_id}-${index}`}>  {/* Concatenate player.id and index for a unique key */}
            <td>{player.team_abbreviation} #{player.sweater_number}</td>
            <td>{player.position_code}</td>
            <td><img alt='player photo' style={{ height: '20%', width: '20%' }} src={player.headshot} /></td>
            <td>{player.first_name} {player.last_name}</td>
            <td>{playerStats[player.player_id]?.goals || 'N/A'}</td>
            <td>{playerStats[player.player_id]?.assists || 'N/A'}</td>
            <td>{playerStats[player.player_id]?.points || 'N/A'}</td>
            <td>{playerStats[player.player_id]?.plus_minus || 'N/A'}</td>
            <td>{playerStats[player.player_id]?.save_pctg || 'N/A'}</td>
            <td>{playerStats[player.player_id]?.goals_against_avg || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FavoritesList;

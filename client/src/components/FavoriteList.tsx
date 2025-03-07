import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import AuthService from '../utils/auth'; // Import AuthService

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team_abbreviation: string;
}

const FavoritesList: React.FC = () => {
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getProfile(); // Get the current user's profile
    console.log(user);
    if (!user || !user.id) {
      setError('You need to be logged in to view your favorite players.');
      setLoading(false);
      return;
    }

    axios
      .get(`/api/favorites/${user.id}`)
      .then((response) => {
        setFavoritePlayers(response.data);
        setLoading(false);
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
          <th>Player</th>
        </tr>
      </thead>
      <tbody>
        {favoritePlayers.map((player) => (
          <tr key={player.id}>
            <td>{player.team_abbreviation}</td>
            <td>{player.first_name} {player.last_name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FavoritesList;

import React from 'react';
import { Container, Row }from 'react-bootstrap';
import { useState, useEffect } from 'react';
import  PlayerCard from '../components/PlayerCard';
import axios from 'axios';
  const FavoritesPage: React.FC = () => {
    const [players, setPlayers] = useState([]);
    const [userId] = useState(1); // Example user ID
  
    useEffect(() => {
      // Fetch all players from the database
      const fetchPlayers = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/players');
          setPlayers(response.data);  // Assuming players are returned in an array
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      };
  
      fetchPlayers();
    }, []);
  
    return (
      <Container>
        <Row>
          {players.map((player: any) => (
            <PlayerCard key={player.id} player={player} userId={userId} />
          ))}
        </Row>
      </Container>
    );
  };
  
  export default FavoritesPage;
  
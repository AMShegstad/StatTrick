import React, { useState } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import axios from 'axios';

interface PlayerCardProps {
  player: {
    id: number;
    first_name: string;
    last_name: string;
    position_code: string;
    team: string;
    headshot_url: string; // Assuming you have the headshot URL
    stats: {
      goals?: number;
      assists?: number;
      points?: number;
      savePercentage?: number;
      goalsAgainstAvg?: number;
    };
  };
  userId: number;  // The ID of the logged-in user
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, userId }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  // Function to handle adding player to favorites
  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/favorites/${userId}/${player.id}`
      );
      setIsFavorited(true);  // Update the state to indicate the player is favorited
      console.log(response.data.message);  // Log success message from backend
    } catch (error) {
      console.error('Error adding player to favorites:', error);
    }
  };

  // Rendering stats based on player position (goalie vs non-goalie)
  const renderStats = () => {
    if (player.position_code === 'G') {
      return (
        <div>
          <p>Save Percentage: {player.stats.savePercentage}</p>
          <p>Goals Against Average: {player.stats.goalsAgainstAvg}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Goals: {player.stats.goals}</p>
          <p>Assists: {player.stats.assists}</p>
          <p>Points: {player.stats.points}</p>
        </div>
      );
    }
  };

  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="mb-4">
        <Card.Img variant="top" src={player.headshot_url} alt={`${player.first_name} ${player.last_name}`} />
        <Card.Body>
          <Card.Title>{`${player.first_name} ${player.last_name}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{player.team}</Card.Subtitle>
          <Card.Text>Position: {player.position_code}</Card.Text>
          {renderStats()}
          <Button
            variant={isFavorited ? 'success' : 'primary'}
            onClick={handleAddToFavorites}
            disabled={isFavorited}
          >
            {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PlayerCard;

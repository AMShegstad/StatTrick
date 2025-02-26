import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

interface PlayerCardProps {
  playerID: number;
  teamAbbreviation: string;
  isFavorite: boolean;
  onToggleFavorite: (playerID: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playerID, teamAbbreviation, isFavorite, onToggleFavorite }) => {
  const [player, setPlayer] = useState<any>(null); // Store player data
  const [playerStats, setPlayerStats] = useState<any>(null); // Store player stats

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Fetch player data from your backend or API
        const playerResponse = await axios.get(`/api/players/${playerID}`);
        setPlayer(playerResponse.data);

        // Fetch player stats using teamAbbreviation to get stats for the team
        const statsResponse = await axios.get(`/api/player-stats/${teamAbbreviation}`);
        
        // Log the response to understand the structure
        console.log("Stats Response:", statsResponse.data);

        // Check if the player is in the skaters or goalies array
        let stats;
        if (statsResponse.data.skaters) {
          stats = statsResponse.data.skaters.find((stat: any) => stat.playerId === playerID);
        }
        if (!stats && statsResponse.data.goalies) {
          stats = statsResponse.data.goalies.find((stat: any) => stat.playerId === playerID);
        }

        // If no stats found for the player, return early or handle gracefully
        if (!stats) {
          console.error("Player stats not found in the response");
        }

        setPlayerStats(stats);
      } catch (error) {
        console.error('Error fetching player data or stats:', error);
      }
    };

    fetchPlayerData();
  }, [playerID, teamAbbreviation]);

  if (!player || !playerStats) return <div>Loading...</div>;

  const {
    firstName,
    lastName,
    headshot,
    positionCode,
    points,
    goals,
    assists,
    plusMinus,
    saves,
    goalsAllowed,
    savePercentage,
    goalsAgainstAverage,
  } = playerStats;

  const skaterStats = (
    <>
      <ListGroupItem>Goals: {goals}</ListGroupItem>
      <ListGroupItem>Assists: {assists}</ListGroupItem>
      <ListGroupItem>Plus/Minus: {plusMinus}</ListGroupItem>
    </>
  );

  const goalieStats = (
    <>
      <ListGroupItem>Saves: {saves}</ListGroupItem>
      <ListGroupItem>Goals Allowed: {goalsAllowed}</ListGroupItem>
      <ListGroupItem>Save Percentage: {savePercentage}</ListGroupItem>
      <ListGroupItem>Goals Against Average: {goalsAgainstAverage}</ListGroupItem>
    </>
  );

  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img variant="top" src={headshot || '/default-image.png'} />
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Team: {teamAbbreviation} | Position: {positionCode}
        </Card.Subtitle>
        <Card.Text>
          <strong>Points: </strong>{points}
        </Card.Text>

        <ListGroup className="list-group-flush">
          {positionCode === 'G' ? goalieStats : skaterStats}
        </ListGroup>

        <Button
          variant={isFavorite ? 'danger' : 'primary'}
          onClick={() => onToggleFavorite(playerID)}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;

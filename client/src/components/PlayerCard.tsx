import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

interface PlayerCardProps {
  player_id: number;
  team_abbreviation: string;
  isFavorite: boolean;
  onToggleFavorite: (playerID: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player_id, team_abbreviation, isFavorite, onToggleFavorite }) => {
  const [player, setPlayer] = useState<any>(null); // Store player data
  const [playerStats, setPlayerStats] = useState<any>(null); // Store player stats

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Fetch player data from your backend or API
        const playerResponse = await axios.get(`/api/players/${player_id}`);
        setPlayer(playerResponse.data);

        // Fetch player stats using teamAbbreviation to get stats for the team
        const statsResponse = await axios.get(`/api/player-stats/${team_abbreviation}`);
        
        // Log the response to understand the structure
        console.log("Stats Response:", statsResponse.data);

        // Check if the player is in the skaters or goalies array
        let stats;
        if (statsResponse.data.skaters) {
          stats = statsResponse.data.skaters.find((stat: any) => stat.playerId === player_id);
        }
        if (!stats && statsResponse.data.goalies) {
          stats = statsResponse.data.goalies.find((stat: any) => stat.playerId === player_id);
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
  }, [player_id, team_abbreviation]);

  if (!player || !playerStats) return <div>Loading...</div>;

  const {
    first_name,
    last_name,
    headshot,
    position_code,
    points,
    goals,
    assists,
    plus_minus,
    save_pctg,
    goals_against_avg,
  } = playerStats;

  const skaterStats = (
    <>
      <ListGroupItem>Goals: {goals}</ListGroupItem>
      <ListGroupItem>Assists: {assists}</ListGroupItem>
      <ListGroupItem>Plus/Minus: {plus_minus}</ListGroupItem>
    </>
  );

  const goalieStats = (
    <>
      <ListGroupItem>Save Percentage: {save_pctg}</ListGroupItem>
      <ListGroupItem>Goals Against Average: {goals_against_avg}</ListGroupItem>
    </>
  );

  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img variant="top" src={headshot || '/default-image.png'} />
      <Card.Body>
        <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Team: {team_abbreviation} | Position: {position_code}
        </Card.Subtitle>
        <Card.Text>
          <strong>Points: </strong>{points}
        </Card.Text>

        <ListGroup className="list-group-flush">
          {position_code === 'G' ? goalieStats : skaterStats}
        </ListGroup>

        <Button
          variant={isFavorite ? 'danger' : 'primary'}
          onClick={() => onToggleFavorite(player_id)}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;

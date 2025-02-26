import { Card, ListGroup, Button } from 'react-bootstrap';
import { FC } from 'react';

interface Player {
    firstName: string;
    lastName: string;
    headshot: string;
    teamAbbreviation: string;
    positionCode: string;
    points: number;
    goals: number;
    assists: number;
    plusMinus: number;
    saves?: number;
    goalsAllowed?: number;
    savePercentage?: number;
    goalsAgainstAverage?: number;
    id: number;
}

interface PlayerCardProps {
    player: Player;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

const PlayerCard: FC<PlayerCardProps> = ({ player, isFavorite, onToggleFavorite }) => {
    const {
        firstName,
        lastName,
        headshot,
        teamAbbreviation,
        positionCode,
        points,
        goals,
        assists,
        plusMinus,
        saves,
        goalsAllowed,
        savePercentage,
        goalsAgainstAverage,
    } = player;

    // Stats for Skaters
    const skaterStats = (
        <>
            <ListGroup.Item>Goals: {goals}</ListGroup.Item>
            <ListGroup.Item>Assists: {assists}</ListGroup.Item>
            <ListGroup.Item>Plus/Minus: {plusMinus}</ListGroup.Item>
        </>
    );

    // Stats for Goalies
    const goalieStats = (
        <>
            <ListGroup.Item>Goals: {goals}</ListGroup.Item>
            <ListGroup.Item>Assists: {assists}</ListGroup.Item>
            <ListGroup.Item>Saves: {saves}</ListGroup.Item>
            <ListGroup.Item>Goals Allowed: {goalsAllowed}</ListGroup.Item>
            <ListGroup.Item>Save Percentage: {savePercentage}</ListGroup.Item>
            <ListGroup.Item>Goals Against Average: {goalsAgainstAverage}</ListGroup.Item>
        </>
    );

    return (
        <Card border="light" style={{ width: '18rem'}}>
            <Card.Img variant="top" src={headshot} style={{ padding: '10px', borderRadius: '50%' }} />
            <Card.Body>
                <Card.Title className="fw-bold">{`${firstName} ${lastName}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {teamAbbreviation} | {positionCode}
                </Card.Subtitle>
                <Card.Text>
                    <strong>Points:</strong> {points}
                </Card.Text>

                <ListGroup className="list-group-flush">
                    {positionCode === 'G' ? goalieStats : skaterStats}
                </ListGroup>

                <Button 
                    variant={isFavorite ? 'danger' : 'primary'} 
                    className="mt-3"
                    onClick={() => onToggleFavorite(player.id)}>
                    {isFavorite ? 'Remove From Favorite Players' : 'Add to Favorite Players'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PlayerCard;

import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

interface BettingOddsProps {
  odds: { commence_time: string; matchup: string; home_odds: number; away_odds: number }[];
}

const BettingOdds: React.FC<BettingOddsProps> = ({ odds }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center" style={{textShadow: "black 1px 1px 1px", textDecoration: "underline"}}> Betting Odds </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>Time and Date</TableCell>
              <TableCell sx={{ color: "white" }}>Matchup (Home vs. Away)</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Home Odds</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Away Odds</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {odds.map((game, index) => (
              <TableRow key={index} hover>
                <TableCell>{game.commence_time}</TableCell>
                <TableCell>{game.matchup}</TableCell>
                <TableCell align="right">{game.home_odds}</TableCell>
                <TableCell align="right">{game.away_odds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const BettingOddsContainer: React.FC = () => {
  const [bettingOdds, setBettingOdds] = useState<{ commence_time: string; matchup: string; home_odds: number; away_odds: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await fetch('/api/odds');
        if (!response.ok) {
          throw new Error(`Error fetching odds: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        const formattedOdds = result.map((game: any) => ({
          commence_time: game.commence_time,
          matchup: `${game.home_team} vs. ${game.away_team}`,
          home_odds: game.home_odds,
          away_odds: game.away_odds,
        }));
        setBettingOdds(formattedOdds);
      } catch (error) {
        console.error('Error fetching betting odds:', error);
        setError('Failed to load betting odds. Please try again later.');
      }
    };
    fetchOdds();
  }, []);

  return (
    <Container>
      {error && <Typography color="error">{error}</Typography>}
      <BettingOdds odds={bettingOdds} />
    </Container>
  );
};

export default BettingOddsContainer;
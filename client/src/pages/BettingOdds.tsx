import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

interface BettingOddsProps {
  odds: { matchup: string; home_odds: number; away_odds: number }[];
}

const BettingOdds: React.FC<BettingOddsProps> = ({ odds }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom> Betting Odds </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>Matchup</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Home Odds</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Away Odds</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {odds.filter((_, index) => index % 10 === 0).map((game, index) => (
              <TableRow key={index} hover>
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
  const [bettingOdds, setBettingOdds] = useState<{ matchup: string; home_odds: number; away_odds: number }[]>([]);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await fetch('/api/odds');
        console.log('fetchOdds response sent...');
        const result = await response.json();
        console.log('fetchOdds response received:', result);
        setBettingOdds(result);
      } catch (error) {
        console.error('Error fetching betting odds:', error);
      }
    };
    fetchOdds();
  }, []);

  return <BettingOdds odds={bettingOdds} />;
};

export default BettingOddsContainer;

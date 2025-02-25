import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import OddsService from "../server/oddsService";

const BettingOdds: React.FC = () => {
  // State to store betting odds data
  const [bettingOdds, setBettingOdds] = useState<{ matchup: string; home_odds: number; away_odds: number }[]>([]);

  useEffect(() => {
    // Fetch betting odds data
    const fetchOdds = async () => {
      const odds = await OddsService.getOdds();
      const formattedOdds = odds.map((odd) => ({
        matchup: `${odd.home_team} vs ${odd.away_team}`,
        home_odds: odd.home_odds,
        away_odds: odd.away_odds,
      }));
      setBettingOdds(formattedOdds);
    };
    fetchOdds();
  }, []);

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
            {bettingOdds.map((game, index) => (
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

export default BettingOdds;

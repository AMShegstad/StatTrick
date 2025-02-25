import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Sample data (replace with API data)
const mockBettingOdds = [
  { matchup: "Bruins vs Maple Leafs", oddsHome: "+120", oddsAway: "-150" },
  { matchup: "Lightning vs Rangers", oddsHome: "-130", oddsAway: "+110" },
  { matchup: "Avalanche vs Oilers", oddsHome: "+140", oddsAway: "-160" },
];

const BettingOdds: React.FC = () => {
  const [bettingOdds, setBettingOdds] = useState(mockBettingOdds);

  useEffect(() => {
    // Replace with API call when backend is ready
    // fetch("API_ENDPOINT").then((res) => res.json()).then((data) => setBettingOdds(data));
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
                <TableCell align="right">{game.oddsHome}</TableCell>
                <TableCell align="right">{game.oddsAway}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BettingOdds;

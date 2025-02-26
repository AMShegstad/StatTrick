import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Sample data structure (replace with API data when integrated)
const mockStandings = [
  { team: "Boston Bruins", gamesPlayed: 56, wins: 38, losses: 14, points: 82 },
  { team: "Toronto Maple Leafs", gamesPlayed: 56, wins: 35, losses: 17, points: 76 },
  { team: "Tampa Bay Lightning", gamesPlayed: 56, wins: 34, losses: 18, points: 74 },
];

const Standings: React.FC = () => {
  const [standings] = useState(mockStandings);

  useEffect(() => {
    // Replace with API call when backend is ready
    // fetch("API_ENDPOINT").then((res) => res.json()).then((data) => setStandings(data));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom> NHL Standings </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>Team</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Games Played</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Wins</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Losses</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((team, index) => (
              <TableRow key={index} hover>
                <TableCell>{team.team}</TableCell>
                <TableCell align="right">{team.gamesPlayed}</TableCell>
                <TableCell align="right">{team.wins}</TableCell>
                <TableCell align="right">{team.losses}</TableCell>
                <TableCell align="right">{team.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Standings;

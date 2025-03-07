import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Define the shape of the data based on the API response
interface TeamStandings {
  teamName: {
    default: string;  // Team name
  };
  gamesPlayed: number;
  wins: number;
  losses: number;
  overtimeLosses: number;
  points: number;
  teamLogo: string;
  leagueSequence: number;  // Rank
}

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<TeamStandings[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('/api/teams/standings', {  // Adjust this URL as needed to match your backend endpoint
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if 'standings' is present in the response and process the data
        if (data && Array.isArray(data.standings)) {
          // Extract only the necessary fields from each team object
          const filteredData = data.standings.map((team: any) => ({
            leagueSequence: team.leagueSequence, // Rank
            teamName: team.teamName,
            gamesPlayed: team.gamesPlayed,  
            wins: team.wins,                  
            losses: team.losses,            
            overtimeLosses: team.otLosses,           
            points: team.points,            
            teamLogo: team.teamLogo,         
          }));
       
          
          // Sort standings by 'leagueSequence' in descending order
          const sortedStandings = filteredData.sort((a: TeamStandings, b: TeamStandings) => a.leagueSequence - b.leagueSequence);
          setStandings(sortedStandings);
        } else {
          setError("No standings data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching standings:", error);
        setError("Failed to load standings. Please try again later.");
      });
  }, []);  // Run once when the component mounts

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        NHL Standings
      </Typography>
      {error && <Typography color="error" textAlign="center">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>Rank</TableCell>
              <TableCell sx={{ color: "white" }}>Team</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Games Played</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Wins</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Losses</TableCell>
              <TableCell sx={{ color: "white" }} align="right">OT Losses</TableCell>
              <TableCell sx={{ color: "white" }} align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((team, index) => (
              <TableRow key={index} hover>
                <TableCell>{team.leagueSequence}</TableCell>  {/* Show leagueSequence as Rank */}
                <TableCell>
                  <img src={team.teamLogo} alt={team.teamName.default} style={{ width: "30px", marginRight: "10px" }} />
                  {team.teamName.default}
                </TableCell>
                <TableCell align="right">{team.gamesPlayed}</TableCell>
                <TableCell align="right">{team.wins}</TableCell>
                <TableCell align="right">{team.losses}</TableCell>
                <TableCell align="right">{team.overtimeLosses}</TableCell>
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

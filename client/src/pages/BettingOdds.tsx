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

// This was copied from App.tsx

// useEffect(() => {
//   const fetchOdds = async () => {
//     try {
//       const response = await fetch(
//         "https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us&markets",
//         {
//           headers: {
//             "x-rapidapi-key": "d818cb5b36mshc66975bd6b0c2c9p1a5e37jsn2e209b594a82",
//             "x-rapidapi-host": "odds.p.rapidapi.com",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data (Status: ${response.status})`);
//       }
//       const data = await response.json();
//       console.log("Betting Odds API Response:", data);
//       setOdds(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   fetchOdds();
// }, []);
// function convertToAmericanOdds(decimalOdds: number): string {
//   if (decimalOdds >= 2.0) {
//     return `+${Math.round((decimalOdds - 1) * 100)}`;
//   } else {
//     return `${Math.round(-100 / (decimalOdds - 1))}`;
//   }
// }

export default BettingOddsContainer;

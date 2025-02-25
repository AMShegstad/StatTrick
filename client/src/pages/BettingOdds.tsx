import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import React from 'react';

const BettingOdds: React.FC = () => {
  // State to store betting odds data
  const [bettingOdds, setBettingOdds] = useState<{ matchup: string; home_odds: number; away_odds: number }[]>([]);

  useEffect(() => {
    // Fetch betting odds data
    const fetchOdds = async () => {
      try {
        const response = await fetch('/api/odds');
        if (!response.ok) {
          throw new Error('Failed to fetch odds');
        }
        const odds = await response.json();
        const formattedOdds = odds.map((odd: any) => ({
          matchup: `${odd.home_team} vs ${odd.away_team}`,
          home_odds: odd.home_odds,
          away_odds: odd.away_odds,
        }));
        setBettingOdds(formattedOdds);
      } catch (error) {
        console.error('Error fetching odds:', error);
      }
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

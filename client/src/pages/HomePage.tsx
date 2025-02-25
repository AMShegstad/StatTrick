import { Container, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Stat Trick
        </Typography>
        <Typography variant="body1">
          Track NHL player stats, team standings, and betting odds all in one place.
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;

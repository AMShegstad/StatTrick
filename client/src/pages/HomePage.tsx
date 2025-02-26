import { Container, Typography, Paper, Box } from "@mui/material";
import NHLLogo from "../../assets/NHL.png"; // Import the image

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          <img src={NHLLogo} alt="NHL Logo" style={{ width: 50, height: 50, marginRight: 16 }} />
          <Typography variant="h3" gutterBottom sx={{ fontSize: "120%" }}>
            Welcome To Stat-Trick!
          </Typography>
        </Box>
        <Typography variant="body1">
          Track NHL player stats, team standings, and betting odds all in one place.
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
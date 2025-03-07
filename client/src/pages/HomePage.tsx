import { useEffect } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import NHLLogo from "../../assets/NHL.png"; // Import the image

const fetchRosters = async () => {
  try {
    const response = await fetch("api/roster-stats/fetch-rosters", { method: "POST" });
    if (!response.ok) throw new Error("Failed to fetch rosters");
    console.log("✅ Rosters fetched successfully");
  } catch (error) {
    console.error("❌ Error fetching rosters:", error);
  }
};

const updateStats = async () => {
  try {
    const response = await fetch("api/roster-stats/update-stats", { method: "POST" });
    if (!response.ok) throw new Error("Failed to update stats");
    console.log("✅ Player stats updated successfully");
  } catch (error) {
    console.error("❌ Error updating stats:", error);
  }
};

const HomePage: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      await fetchRosters(); // Fetch rosters first
      await updateStats(); // Then update stats
    };
    fetchData();
  }, []);

  return (
    <div style={{backgroundImage: "url('https://media.istockphoto.com/id/510723525/photo/hockey-arena.jpg?s=1024x1024&w=is&k=20&c=oNFX8wVhAn6tshBCiWoMTwQU7Y98_LnG_VYOC6Z4IOk=')", minHeight: '100vh', margin: 0, justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
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
    </div>
  );
};

export default HomePage;

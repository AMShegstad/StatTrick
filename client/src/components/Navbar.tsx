import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
          <Button color="inherit" component={Link} to="/standings">Standings</Button>
          <Button color="inherit" component={Link} to="/betting-odds">Betting Odds</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

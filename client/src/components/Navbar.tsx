import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { useState } from "react";
import LoginPage from "../pages/LoginPage";

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
              <Button color="inherit" component={Link} to="/standings">Standings</Button>
              <Button color="inherit" component={Link} to="/betting-odds">Betting Odds</Button>
            </div>
            <Button color="inherit" onClick={handleLoginClick}>Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {showLoginModal && (
        <LoginPage
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
          onLoginSuccess={() => console.log("Login successful")}
          onShowRegister={() => console.log("Show register")}
        />
      )}
    </>
  );
};

export default Navbar;

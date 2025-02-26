import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HomePage from "./pages/HomePage"; // Import the HomePage component
import RegisterPage from "./pages/RegisterPage"; // Import the RegisterPage component
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">StatTrick</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      {showLogin && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onShowRegister={handleShowRegister}
          showModal={showLogin}
          setShowModal={setShowLogin}
        />
      )}

      {showRegister && <RegisterPage onRegisterSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;


import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"; 

function App() {
  const [showStandings, setShowStandings] = useState(false);
  const [odds, setOdds] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [showLogin, setShowLogin] = useState(false); 
  const [showBettingOdds, setShowBettingOdds] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavClick = () => {
    setShowStandings(false);
    setShowContent(false);
    setShowLogin(false);
    setShowBettingOdds(false);
  };

  const nhlTeams = [
    "Anaheim Ducks", "Boston Bruins", "Buffalo Sabres", "Calgary Flames", "Carolina Hurricanes", "Chicago Blackhawks", "Colorado Avalanche",
    "Columbus Blue Jackets", "Dallas Stars", "Detroit Red Wings", "Edmonton Oilers",
    "Florida Panthers", "Los Angeles Kings", "Minnesota Wild", "Montreal Canadiens",
    "Nashville Predators", "New Jersey Devils", "New York Islanders", "New York Rangers",
    "Ottawa Senators", "Philadelphia Flyers", "Pittsburgh Penguins", "San Jose Sharks",
    "Seattle Kraken", "St. Louis Blues", "Tampa Bay Lightning", "Toronto Maple Leafs", "Utah Hockey Club",
    "Vancouver Canucks", "Vegas Golden Knights", "Washington Capitals", "Winnipeg Jets",
  ];
  
  
  

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await fetch(
          "https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us&markets",
          {
            headers: {
              "x-rapidapi-key": "d818cb5b36mshc66975bd6b0c2c9p1a5e37jsn2e209b594a82",
              "x-rapidapi-host": "odds.p.rapidapi.com",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data (Status: ${response.status})`);
        }
        const data = await response.json();
        console.log("Betting Odds API Response:", data);
        setOdds(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOdds();
  }, []);

  // Function to convert decimal odds to American odds format
  function convertToAmericanOdds(decimalOdds: number): string {
    if (decimalOdds >= 2.0) {
      return `+${Math.round((decimalOdds - 1) * 100)}`;
    } else {
      return `${Math.round(-100 / (decimalOdds - 1))}`;
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home" onClick={handleNavClick}>
            StatTrick
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link
              href="#standings"
              onClick={() => {
                setShowStandings(true);
                setShowContent(false);
                setShowLogin(false);
                setShowBettingOdds(false);
              }}
            >
              Standings
            </Nav.Link>
            <Nav.Link href="#favorite-players" onClick={handleNavClick}>
              Favorite Players
            </Nav.Link>
            <Nav.Link
              href="#betting-odds"
              onClick={() => {
                setShowStandings(false);
                setShowLogin(false);
                setShowContent(false);
                setShowBettingOdds(true);
              }}
            >
              Betting Odds
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#login" onClick={handleShow}>
              <Button variant="outline-light">Login</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Modal for Login / Signup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? "Sign Up" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    {/* render NHL Teams dropdown in sign up form */}
    {isSignUp && (
      <Form.Group controlId="formNhlTeam">
        <Form.Label>Select your favorite NHL team</Form.Label>
        <Form.Select>
          {nhlTeams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    )}

    <Button variant="primary" type="submit" className="w-100">
      {isSignUp ? "Sign Up" : "Login"}
    </Button>
  </Form>

  <Button
    variant="link"
    onClick={() => setIsSignUp((prev) => !prev)}
    className="mt-2 w-100"
  >
    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
  </Button>
</Modal.Body>


      </Modal>

      {showContent && (
        <Container id="content" className="mt-5">
          <h2>Welcome to StatTrick</h2>
          <p>
            Track NHL player stats, team standings, and betting odds all in one
            place.
          </p>
        </Container>
      )}

      {showStandings && (
        <Container
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card className="standingscard" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Standings</Card.Title>
              <Card.Text>Team rankings and points go here.</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}

      {showBettingOdds && (
        <Container id="content" className="mt-5">
          <h2>Welcome to StatTrick</h2>
          <p>
            Track NHL player stats, team standings, and betting odds all in one
            place.
          </p>
          <h3>Betting Odds</h3>
          {odds.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Teams</th>
                  <th>Matchup</th>
                  <th>Market</th>
                  <th>Odds</th>
                </tr>
              </thead>
              <tbody>
                {odds.map((odd: any, index: number) =>
                  odd?.bookmakers?.map((bookmaker: any, i: number) =>
                    bookmaker?.markets?.map((market: any, j: number) =>
                      market?.outcomes?.map((outcome: any, k: number) => (
                        <tr key={`${index}-${i}-${j}-${k}`}>
                          <td>{odd.sport?.name}</td>
                          <td>
                            {odd.home_team} vs {odd.away_team}
                          </td>
                          <td>{market.key}</td>
                          <td>
                            {outcome.name}: {convertToAmericanOdds(outcome.price)}
                          </td>
                        </tr>
                      ))
                    )
                  )
                )}
              </tbody>
            </Table>
          ) : (
            <p>Loading odds...</p>
          )}
        </Container>
      )}
    </>
  );
}

export default App;

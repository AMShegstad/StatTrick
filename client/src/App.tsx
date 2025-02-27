import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [odds, setOdds] = useState<any[]>([]);

  const handleNavClick = (page:string) => {
    setActivePage(page);
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

  function convertToAmericanOdds(decimalOdds: number): string {
    if (decimalOdds >= 2.0) {
      return `+${Math.round((decimalOdds - 1) * 100)}`;
    } else {
      return `${Math.round(-100 / (decimalOdds - 1))}`;
    }
  }

  return (
    <>
    <>
      <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home" onClick={() => handleNavClick("home")}>
            StatTrick
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={() => handleNavClick("home")}>
              Home
            </Nav.Link>
            <Nav.Link href="#standings" onClick={() => handleNavClick("standings")}>
              Standings
            </Nav.Link>
            <Nav.Link href="#favorite-players" onClick={() => handleNavClick("favorite-players")}>
              Favorite Players
            </Nav.Link>
            <Nav.Link href="#betting-odds" onClick={() => handleNavClick("betting-odds")}>
              Betting Odds
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={() => handleNavClick("login")}>Login</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        {activePage === "home" && (
          <>
            <h2>Welcome to StatTrick</h2>
            <p>Track NHL player stats, team standings, and betting odds all in one place.</p>
          </>
        )}

        {activePage === "standings" && (
          <Card className="standingscard" style={{ width: "18rem", margin: "auto" }}>
            <Card.Body>
              <Card.Title>Standings</Card.Title>
              <Card.Text>Team rankings and points go here.</Card.Text>
            </Card.Body>
          </Card>
        )}

        {activePage === "betting-odds" && (
          <>
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
                            <td>{odd.home_team} vs {odd.away_team}</td>
                            <td>{market.key}</td>
                            <td>{outcome.name}: {convertToAmericanOdds(outcome.price)}</td>
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
          </>
        )}

{activePage === "login" && (
  <div style={{ 
    position: "fixed", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    width: "100vw", 
    height: "100vh",
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  }}>
    <Card style={{ width: "400px", padding: "20px" }} className="shadow">
      <Tabs defaultActiveKey="login" className="mb-3 text-center">
        <Tab eventKey="login" title="Login">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
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
            <Button variant="success" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Card>
  </div>
)}
      </Container>
    </>
  


    </>
  );
}

export default App;
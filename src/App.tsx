import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function App() {
  const [showStandings, setShowStandings] = useState(false);
  const [odds, setOdds] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [showBettingOdds, setShowBettingOdds] = useState(false);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavClick = () => {
    setShowStandings(false);
    setShowContent(false);
    setShowLogin(false);
    setShowBettingOdds(false);
  };

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
    if (decimalOdds >= 2.00) {
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
        </Container>
      </Navbar>

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

      {showLogin && (
        <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to StatTrick</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        
            </>
      )}
    </>
  );
}

export default App;

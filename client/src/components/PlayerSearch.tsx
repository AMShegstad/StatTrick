import { useEffect, useState } from "react";
import {
  FormControl,
  Dropdown,
  InputGroup,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
} from "react-bootstrap";
import AuthService from "../utils/auth.ts";
import axios from "axios";

interface Player {
  player_id: number;
  first_name: string;
  last_name: string;
  team_abbreviation: string;
}

const PlayerSearch = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchResults, setSearchResults] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        const sortedPlayers = data.sort((a: Player, b: Player) =>
          a.last_name.localeCompare(b.last_name)
        );
        setPlayers(sortedPlayers);
      });
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      players.filter((player) =>
        `${player.first_name} ${player.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, players]);

  const groupedPlayers: Record<string, Player[]> = players.reduce<
    Record<string, Player[]>
  >((acc, player) => {
    if (!acc[player.team_abbreviation]) {
      acc[player.team_abbreviation] = [];
    }
    acc[player.team_abbreviation].push(player);
    return acc;
  }, {});

  const handleSearchSubmit = () => {
    setSearchResults(filteredPlayers);
  };

  const handleAddToFavorites = (player_id: number) => {
    const user = AuthService.getProfile(); // Get the current user's profile
    if (!user || !user.id) {  // Ensure you're using user.id here
      alert("You need to be logged in to add favorites.");
      return;
    }

    // Now use the correct `user.id` in the POST request
    axios
      .post(`/api/favorites/${user.id}/${player_id}`) // Send the user id and player id
      .then(() => {
        alert("Player added to favorites!");
      })
      .catch((error) => {
        console.error("Error adding player to favorites:", error);
        alert("Failed to add player to favorites.");
      });
  };

  return (
    <Container className="text-center">
      <h1 className="mb-4" style={{textShadow: "black 1px 1px 1px", marginTop: "10px", textDecoration: "underline", color: "white"}}>Search For Your Favorite Players!</h1>
      <p style={{fontWeight: "bold", color: "white"}}>Type a name in the search bar to see a list of all players with a name containing your query, or use the drop-down menu on the right to see a list of all players grouped by team and click their name to add them to your favorites.</p>
      <Row className="justify-content-center">
        <Col md={5} lg={4} className="d-flex justify-content-end">
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Search For A Player Here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearchSubmit}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={5} lg={4} className="d-flex justify-content-start">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Or Show All Players
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(groupedPlayers).map((team) => (
                <div key={team}>
                  <Dropdown.Header>{team}</Dropdown.Header>
                  {groupedPlayers[team]
                    .sort((a, b) => a.last_name.localeCompare(b.last_name))
                    .map((player) => (
                      <Dropdown.Item
                        key={`dropdown-${player.player_id}`}
                        onClick={() => handleAddToFavorites(player.player_id)}  // Correctly pass player_id
                      >
                        {player.first_name} {player.last_name}
                      </Dropdown.Item>
                    ))}
                </div>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {searchResults.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col md={10} lg={8}>
            <ListGroup>
              {searchResults.map((player) => (
                <ListGroup.Item
                  key={`search-${player.player_id}`}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {player.first_name} {player.last_name} (
                    {player.team_abbreviation})
                  </span>
                  <Button
                    variant="success"
                    onClick={() => handleAddToFavorites(player.player_id)}
                  >
                    Add to Favorites
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PlayerSearch;

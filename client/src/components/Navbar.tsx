import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthService from "../utils/auth";  // Import the AuthService

const Navbar: React.FC = () => {
  const currentPage = useLocation().pathname;

  const user = AuthService.getProfile();  // Get the logged-in user's profile

  const handleLogout = () => {
    AuthService.logout(); // Logout the user by calling AuthService
  };

  return (
    <Nav className="justify-content-center" variant="tabs" defaultActiveKey='/'>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Home
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/favorites"
          className={currentPage === '/favorites' ? 'nav-link active' : 'nav-link'}>
          Favorites
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/standings"
          className={currentPage === '/standings' ? 'nav-link active' : 'nav-link'}>
          Standings
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/betting-odds"
          className={currentPage === '/betting-odds' ? 'nav-link active' : 'nav-link'}>
          Betting Odds
        </Nav.Link>
      </Nav.Item>

      {/* Conditionally render Login or Current User */}
      {!user ? (
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/login"
            className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>
            Login
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <Nav.Link className="nav-link">
            Currently logged in: {user.username}
          </Nav.Link>
        </Nav.Item>
      )}

      {/* Show Logout button if the user is logged in */}
      {user && (
        <Nav.Item>
          <Nav.Link onClick={handleLogout} className="nav-link">
            Logout
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Navbar;

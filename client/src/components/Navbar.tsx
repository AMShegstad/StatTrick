import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";


const Navbar: React.FC = () => {

  const currentPage = useLocation().pathname;

  return (
      <Nav className="justify-content-center" variant="tabs" defaultActiveKey='/'>
        <Nav.Item>
              <Nav.Link
               as={Link}
               to="/"
               className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
              <Nav.Link
               as={Link}
               to="/favorites"
               className={currentPage === '/favorites' ? 'nav-link active' : 'nav-link'}>Favorites</Nav.Link>
        </Nav.Item>
        <Nav.Item>
              <Nav.Link
               as={Link}
               to="/standings"
               className={currentPage === '/standings' ? 'nav-link active' : 'nav-link'}>Standings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
              <Nav.Link
               as={Link}
               to="/betting-odds"
               className={currentPage === '/betting-odds' ? 'nav-link active' : 'nav-link'}>Betting Odds</Nav.Link>
        </Nav.Item>
        <Nav.Item>
              <Nav.Link
               as={Link}
               to="/login"
               className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>Login</Nav.Link>
        </Nav.Item>
      </Nav>
  );
}

export default Navbar;

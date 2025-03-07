import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import './index.css';


function App() {

  const favoriteTeam ='TampaBay';

  useEffect(() => {
    // Apply the team's class to the body element
    document.body.className = favoriteTeam;
  }, [favoriteTeam]);

  return (
    <div id="app-container">
      <header>
      <Navbar />
      </header>
      <main>
      <Outlet />
      </main>
    </div>
  );
}

export default App;

      
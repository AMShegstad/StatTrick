import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {


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

      
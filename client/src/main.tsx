import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import ErrorPage from '../src/pages/Error.jsx';
import FavoritesPage from '../src/pages/FavoritePlayers.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import Standings from '../src/pages/Standings.jsx';
import LoginPage from '../src/pages/LoginPage.jsx';
import RegisterPage from '../src/pages/RegisterPage.jsx';
import BettingOdds from '../src/pages/BettingOdds.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: '/favorites',
      element: <FavoritesPage />,
    },
    {
      path: '/standings',
      element: <Standings />,
    },
    {
      path: '/login',
      element: <LoginPage 
        showModal={false} 
        setShowModal={() => {}} 
        onLoginSuccess={() => {}} 
        onShowRegister={() => {}} 
      />,
      element: <LoginPage showModal={false} setShowModal={() => {}} onLoginSuccess={() => {}} />,
    },
    {
      path: '/register',
      element: <RegisterPage onRegisterSuccess={() => {}} />,
    },
    {
      path: '/betting-odds',
      element: <BettingOdds />,
    },
  ],
}]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
} else {
  console.error('Root element not found');
}

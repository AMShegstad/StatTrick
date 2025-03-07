import React from 'react';
import PlayerSearch from '../components/PlayerSearch';
import FavoritesList from '../components/FavoriteList';

  const FavoritesPage: React.FC = () => {
    return (
      <div>
        <PlayerSearch />
        <FavoritesList />
      </div>
    );
    
  };
  
  export default FavoritesPage;
  
import React from 'react';
import PlayerSearch from '../components/PlayerSearch';
import FavoritesList from '../components/FavoriteList';

  const FavoritesPage: React.FC = () => {
    return (
      <div style={{minHeight: '100vh', margin: 0, justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: "url(https://media.istockphoto.com/id/1766472641/photo/ice-hockey-sticks-and-puck-on-ice.jpg?s=1024x1024&w=is&k=20&c=rZTZ-Q_f9ctRDR25kfenyPSFPt2D1BCmnj4k4da2_CI=)", }}>
        <PlayerSearch />
        <FavoritesList />
      </div>
    );
    
  };
  
  export default FavoritesPage;
  
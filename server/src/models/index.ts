import { sequelize } from '../config/connection.js';
import { UserFactory } from './userModel.js';
import { PlayerFactory } from './playerModel.js';
import { TeamFactory } from './teamModel.js';
//import { UserFavorites } from './userFavoritesModel.js';

const User = UserFactory(sequelize);
const Player = PlayerFactory(sequelize);
const Team = TeamFactory(sequelize);

// Define Many-to-Many relationship for favorites
User.belongsToMany(Player, {
    through: 'user_favorites',
    foreignKey: 'userID',
    otherKey: 'playerID',
    as: 'favoritePlayers', // ALIAS IS REQUIRED
});

Player.belongsToMany(User, {
    through: 'user_favorites',
    foreignKey: 'playerID',
    otherKey: 'userID',
    as: 'favoritedByUsers',
});

// One-to-Many: A team has many players
Team.hasMany(Player, { 
    foreignKey: 'teamAbbreviation', // Corrected foreignKey
});
Player.belongsTo(Team, { 
    foreignKey: 'teamAbbreviation', 
});

// Define associations

//User.belongsToMany(Player, { through: UserFavorites, foreignKey: 'userID' });
//Player.belongsToMany(User, { through: UserFavorites, foreignKey: 'playerID' });


sequelize.sync()
    .then(() => console.log('✅ Models have been successfully synced.'))
    .catch((err) => console.error('❌ Error syncing models:', err));

export { sequelize, User, Player, Team };

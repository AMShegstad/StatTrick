import { sequelize } from '../config/connection.js';
import { UserFactory } from './userModel.js';
import { PlayerFactory } from './playerModel.js';
import { TeamFactory } from './teamModel.js';
import { PlayerStatsFactory } from './playerStatsModel.js';
import { UserFavoritesFactory } from './userFavoritesModel.js';

const User = UserFactory(sequelize);
const Player = PlayerFactory(sequelize);
const Team = TeamFactory(sequelize);
const PlayerStats = PlayerStatsFactory(sequelize);
const UserFavorites = UserFavoritesFactory(sequelize);

// Define Many-to-Many relationship for favorites
User.belongsToMany(Player, {
    through: UserFavorites,
    foreignKey: 'id',  // This refers to the `id` field in `UserFavorites`
    otherKey: 'player_id',  // This refers to the `player_id` field in `UserFavorites`
    as: 'favorite_players',  // Alias for the relationship
  });
  
  Player.belongsToMany(User, {
    through: UserFavorites,
    foreignKey: 'player_id',  // This refers to the `player_id` field in `UserFavorites`
    otherKey: 'id',  // This refers to the `id` field in `UserFavorites`
    as: 'favoritedByUsers',  // Alias for the relationship
  });

// One-to-Many: A team has many players
Team.hasMany(Player, {
  foreignKey: 'team_abbreviation',
});
Player.belongsTo(Team, {
  foreignKey: 'team_abbreviation',
});

// One-to-One: A player has one set of stats
Player.hasOne(PlayerStats, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE',
});
PlayerStats.belongsTo(Player, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE',
});

sequelize.sync()
  .then(() => console.log('✅ Models have been successfully synced.'))
  .catch((err) => console.error('❌ Error syncing models:', err));

export { sequelize, User, Player, Team, PlayerStats, UserFavorites };

import { sequelize } from '../config/connection.js';
import { UserFactory } from './userModel.js';
import { PlayerFactory } from './playerModel.js';
import { TeamFactory } from './teamModel.js';
import { PlayerStatsFactory } from './playerStatsModel.js';

const User = UserFactory(sequelize);
const Player = PlayerFactory(sequelize);
const Team = TeamFactory(sequelize);
const PlayerStats = PlayerStatsFactory(sequelize);

// Define Many-to-Many relationship for favorites
User.belongsToMany(Player, {
    through: 'user_favorites',
    foreignKey: 'user_id',
    otherKey: 'player_id',
    as: 'favorite_players', // ALIAS IS REQUIRED
});

Player.belongsToMany(User, {
    through: 'user_favorites',
    foreignKey: 'player_id',
    otherKey: 'user_id',
    as: 'favoritedByUsers',
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

export { sequelize, User, Player, Team, PlayerStats };

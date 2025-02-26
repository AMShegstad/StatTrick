import { DataTypes, Model, Sequelize } from 'sequelize';
import { Player } from './playerModel.js';

export interface UserData {
    id: number;
    username: string;
    password: string;
    email: string;
    favoriteTeam: string;
};

export class User extends Model<UserData> implements UserData {
    declare id: number;
    declare username: string;
    declare password: string;
    declare email: string;
    declare favoriteTeam: string;

     // Explicitly declare Sequelize-generated methods
     declare addFavoritePlayer: (player: Player) => Promise<void>;
     declare removeFavoritePlayer: (player: Player) => Promise<void>;
     declare getFavoritePlayers: () => Promise<Player[]>;
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: [3, 16],
                        msg: 'Username must be between 3 and 16 characters long',
                    },
                    notNull: {
                        msg: 'Please enter a username',
                    },
                    unique: {
                        msg: 'Username already exists',
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 16],
                        msg: 'Password must be between 8 and 16 characters long',
                    },
                    notNull: {
                        msg: 'Please enter a password',
                    },
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Please enter a valid email address',
                    },
                    notNull: {
                        msg: 'Please enter an email address',
                    },
                }
            },
            favoriteTeam: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'favoriteTeam',
            },
        },
        {
            sequelize,
            tableName: 'userData',
            modelName: 'User',
        }
    );

    return User;
}

import sequelize, { DataTypes } from 'sequelize';

export interface UserData {
    username: string;
    password: string;
    email: string;
    favoriteTeam: string;
};

export interface UserLogin {
    username: string | null;
    password: string | null;
}

export class User extends sequelize.Model<UserData> implements UserData {
    declare username: string;
    declare password: string;
    declare email: string;
    declare favoriteTeam: string;
}

export function UserFactory(sequelize: sequelize.Sequelize): typeof User {
    User.init({
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
                    msg: 'Username already exists',}
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
        },
    }, {
        sequelize,
        tableName: 'userData',
        modelName: 'User',
    });

    return User;
}

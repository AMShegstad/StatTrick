import { DataTypes, Model, Sequelize } from 'sequelize';

export interface PlayerInfo {
    playerID: number;
    firstName: string;
    lastName: string;
    teamAbbreviation: string;
    positionCode: string;
    headshot: string;
    sweaterNumber: number;
}

export class Player extends Model<PlayerInfo> implements PlayerInfo {
    public playerID!: number;
    public firstName!: string;
    public lastName!: string;
    public teamAbbreviation!: string;
    public positionCode!: string;
    public headshot!: string;
    public sweaterNumber!: number;
}

export function PlayerFactory(sequelize: Sequelize): typeof Player {
    Player.init(
        {
            playerID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: 'playerid', // Ensure this matches the actual column name in the database
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'firstname', // Ensure this matches the actual column name in the database
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'lastname', // Ensure this matches the actual column name in the database
            },
            teamAbbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'teamabbreviation', // Ensure this matches the actual column name in the database
            },
            positionCode: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'positioncode', // Ensure this matches the actual column name in the database
            },
            headshot: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'headshot', // Ensure this matches the actual column name in the database
            },
            sweaterNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'sweaternumber', // Ensure this matches the actual column name in the database
            },
        },
        {
            sequelize,
            modelName: 'Player',  // Define modelName here for the Player model
            tableName: 'players',
            timestamps: false,
        }
    );

    return Player;
}

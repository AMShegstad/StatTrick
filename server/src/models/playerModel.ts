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
                field: 'playerID'
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'firstName'
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'lastName'
            },
            headshot: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            teamAbbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'teamAbbreviation',
                references: {
                    model: 'teams',  // Reference to 'Team' model
                    key: 'triCode',
                },
            },
            positionCode: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'positionCode'
            },
            sweaterNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'sweaterNumber'
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

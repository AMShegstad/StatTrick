import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../../db/db';

// TypeScript interface to define the player structure (matches API & database)
export interface PlayerInfo {
    id: number;
    headshot: string;
    firstName: string;
    lastName: string;
    teamAbbreviation: string;
    positionCode: string;
    sweaterNumber: number;
    points: number;
    goals: number;
    assists: number;
    plusMinus: number | null;
    saves: number | null;
    goalsAllowed: number | null;
    savePercentage: number | null;
    goalsAgainstAverage: number | null;
}

// Sequelize Model definition
export class Player extends Model<PlayerInfo> implements PlayerInfo {
    public id!: number;
    public headshot!: string;
    public firstName!: string;
    public lastName!: string;
    public teamAbbreviation!: string;
    public positionCode!: string;
    public sweaterNumber!: number;
    public points!: number;
    public goals!: number;
    public assists!: number;
    public plusMinus!: number | null;
    public saves!: number | null;
    public goalsAllowed!: number | null;
    public savePercentage!: number | null;
    public goalsAgainstAverage!: number | null;
}

// Initialize Sequelize model
Player.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        headshot: { type: DataTypes.STRING, allowNull: true },
        teamAbbreviation: { type: DataTypes.STRING, allowNull: false },
        positionCode: { type: DataTypes.STRING, allowNull: false },
        sweaterNumber: { type: DataTypes.INTEGER, allowNull: true },
        points: { type: DataTypes.INTEGER, defaultValue: 0 },
        goals: { type: DataTypes.INTEGER, defaultValue: 0 },
        assists: { type: DataTypes.INTEGER, defaultValue: 0 },
        plusMinus: { type: DataTypes.INTEGER, allowNull: true },
        saves: { type: DataTypes.INTEGER, allowNull: true },
        goalsAllowed: { type: DataTypes.INTEGER, allowNull: true },
        savePercentage: { type: DataTypes.DECIMAL(5, 4), allowNull: true },
        goalsAgainstAverage: { type: DataTypes.DECIMAL(5, 4), allowNull: true },
    },
    {
        sequelize,
        modelName: 'Player',
        tableName: 'players',
        timestamps: false,
    }
);

export default Player;

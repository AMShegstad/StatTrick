import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../db/db';

// Define the PlayerInfo interface using the statstics that are tracked between both skaters and goalies allowing null values for stats that are not applicable to all players

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

// Define the Player class using the PlayerInfo interface

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

// Define the PlayerFactory function that initializes the Player model

export function PlayerFactory(sequelize: Sequelize): typeof Player {
    Player.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        headshot: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teamAbbreviation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        positionCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sweaterNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        goals: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        assists: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        plusMinus: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true, // Allows null values for non-skater players
        },
        saves: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allows null values for non-goalie players
        },
        goalsAllowed: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allows null values for non-goalie players
        },
        savePercentage: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: true, // Allows null values for non-goalie players
        },
        goalsAgainstAverage: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: true, // Allows null values for non-goalie players
        },
    }, {
        sequelize,
        modelName: 'Player',
        timestamps: false,
        underscored: false,
    });

    return Player;
}
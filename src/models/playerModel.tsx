import { DataTypes, Model, Sequelize } from 'sequelize';

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
    plusMinus: number;
    saves: number;
    goalsAllowed: number;
    savePercentage: number;
    goalsAgainstAverage: number;
}

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
    public plusMinus!: number;
    public saves!: number;
    public goalsAllowed!: number;
    public savePercentage!: number;
    public goalsAgainstAverage!: number;
}

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
        },
        saves: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        goalsAllowed: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        savePercentage: {
            type: DataTypes.DECIMAL(5, 4),
            defaultValue: 0,
        },
        goalsAgainstAverage: {
            type: DataTypes.DECIMAL(5, 4),
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Player',
        timestamps: false,
        underscored: false,
    });

    return Player;
}
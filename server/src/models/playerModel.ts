import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.js';

// Metadata only (No real-time stats stored)
export class Player extends Model {
    public id!: number; // NHL API Player ID
    public firstName!: string;
    public lastName!: string;
    public teamAbbreviation!: string;
    public positionCode!: string;
    public headshot!: string;
    public sweaterNumber!: number;
}

// Initialize Sequelize model
Player.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        headshot: { type: DataTypes.STRING, allowNull: true },
        teamAbbreviation: { type: DataTypes.STRING, allowNull: true },
        positionCode: { type: DataTypes.STRING, allowNull: false },
        sweaterNumber: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Player',
        tableName: 'players',
        timestamps: false,
    }
);

export default Player;

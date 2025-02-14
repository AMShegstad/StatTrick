import { DataTypes, Model, Sequelize } from 'sequelize';

interface PlayerInfo {
    id: number;
    position: string;
    playerName: string;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
};


export class Player extends Model<PlayerInfo> implements PlayerInfo {
        public id!: number
        public position!: string;
        public playerName!: string;
        public goals!: number;
        public assists!: number;
        public points!: number;
        public plusMinus!: number;
    }

    export function PlayerFactory(sequelize: Sequelize): typeof Player {
        Player.init({
            
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            playerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            goals: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            assists: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            plusMinus: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Player',
        });
        return Player;
    }

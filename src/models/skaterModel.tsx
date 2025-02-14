import { DataTypes, Model, Sequelize } from 'sequelize';

export interface SkaterInfo {
    id: number;
    image: string;
    position: string;
    playerName: string;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
};


export class Skater extends Model<SkaterInfo> implements SkaterInfo {
        public id!: number
        public image!: string;
        public position!: string;
        public playerName!: string;
        public goals!: number;
        public assists!: number;
        public points!: number;
        public plusMinus!: number;
    }

    export function PlayerFactory(sequelize: Sequelize): typeof Skater {
        Skater.init({
            
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
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
            modelName: 'Skater',
        });
        return Skater;
    }

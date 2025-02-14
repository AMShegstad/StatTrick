import { DataTypes, Model, Sequelize } from 'sequelize';

export interface GoalieInfo {
    id: number;
    image: string;
    position: string;
    playerName: string;
    saves: number;
    goalsAllowed: number;
    savePercentage: number;
    goalsAllowedAverage: number;
};


export class Goalie extends Model<GoalieInfo> implements GoalieInfo {
        public id!: number
        public image!: string;
        public position!: string;
        public playerName!: string;
        public saves!: number;
        public goalsAllowed!: number;
        public savePercentage!: number;
        public goalsAllowedAverage!: number;
    }

    export function GoalieFactory(sequelize: Sequelize): typeof Goalie {
        Goalie.init({
            
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
            saves: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            goalsAllowed: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            savePercentage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            goalsAllowedAverage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Goalie',
        });
        return Goalie;
    }

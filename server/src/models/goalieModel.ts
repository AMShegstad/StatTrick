import { DataTypes, Model, Sequelize } from 'sequelize';

export interface GoalieInfo {
    id: number;
    headshot: string;
    positionCode: string;
    firstName: string;
    lastName: string;
    teamAbbreviation: string;
    sweaterNumber: number;
    saves: number;
    goalsAllowed: number;
    savePercentage: number;
    goalsAllowedAverage: number;
};


export class Goalie extends Model<GoalieInfo> implements GoalieInfo {
        public id!: number
        public headshot!: string;
        public positionCode!: string;
        public firstName!: string;
        public lastName!: string;
        public teamAbbreviation!: string
        public sweaterNumber!: number;
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
            headshot: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            positionCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teamAbbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sweaterNumber: {
                type: DataTypes.INTEGER,
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

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface SkaterInfo {
    id: number;
    headshot: string;
    positionCode: string;
    firstName: string;
    lastName: string;
    teamAbbreviation: string;
    sweaterNumber: number;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
};


export class Skater extends Model<SkaterInfo> implements SkaterInfo {
        public id!: number
        public headshot!: string;
        public positionCode!: string;
        public firstName!: string;
        public lastName!: string;
        public teamAbbreviation!: string;
        public sweaterNumber!: number;
        public goals!: number;
        public assists!: number;
        public points!: number;
        public plusMinus!: number;
    }

    export function SkaterFactory(sequelize: Sequelize): typeof Skater {
        Skater.init({
            
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

import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamInfo {
    id?: number;
    city: string;
    logo: string;
    teamName: string;
    wins?: number;
    losses?: number;
    overtimeLosses?: number;
    points?: number;
    gamesPlayed?: number;
};


export class Team extends Model<TeamInfo> implements TeamInfo {
        public id!: number
        public city!: string;
        public logo!: string;
        public teamName!: string;
        public wins!: number;
        public losses!: number;
        public overtimeLosses!: number;
        public points!: number;
        public gamesPlayed!: number;
    }

    export function TeamFactory(sequelize: Sequelize): typeof Team {
        Team.init({
            
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            logo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            wins: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            losses: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            overtimeLosses: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gamesPlayed: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Team',
        });
        return Team;
    }

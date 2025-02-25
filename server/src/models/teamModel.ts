import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TeamInfo {
    id?: number; 
    city: string;
    logo: string;
    triCode: string;
    teamName: string;
    className: string;
    wins?: number;
    losses?: number;
    overtimeLosses?: number;
    points?: number;
    gamesPlayed?: number;
    conferenceName?: string;
    divisionName?: string;
    divisionSequence?: number;
};


export class Team extends Model<TeamInfo> implements TeamInfo {
        public id!: number
        public city!: string;
        public logo!: string;
        public triCode!: string;
        public teamName!: string;
        public className!: string;
        public wins!: number;
        public losses!: number;
        public overtimeLosses!: number;
        public points!: number;
        public gamesPlayed!: number;
        public conferenceName!: string;
        public divisionName!: string;
        public divisionSequence!: number
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
            triCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            className: {
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
            conferenceName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            divisionName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            divisionSequence: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            tableName: 'teams',
            modelName: 'Team',
        });
        return Team;
    }

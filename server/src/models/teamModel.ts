import { Model, DataTypes, Sequelize } from 'sequelize';
//import { sequelize } from '../config/connection.js';

export interface TeamInfo {
    triCode: string;
    city: string;
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
    teamLogo?: string;
}

/*

export class Team {
    triCode: string;
    wins?: number;
    losses?: number;
    overtimeLosses?: number;
    points?: number;
    gamesPlayed?: number;
    conferenceName?: string;
    divisionName?: string;
    divisionSequence?: number;
    // other properties
}
*/

export class Team extends Model<TeamInfo> implements TeamInfo {
    public triCode!: string;
    public city!: string;
    public teamName!: string;
    public teamLogo!: string;
    public className!: string;
}

export function TeamFactory(sequelize: Sequelize): typeof Team {
    Team.init(
        {
            triCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                field: 'tricode',
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'teamname', // Ensure this matches the actual column name in the database
            },
            teamLogo: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'teamlogo', // Ensure this matches the actual column name in the database
            },
            className: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'classname', // Ensure this matches the actual column name in the database
            },
        },
        {
            sequelize,
            modelName: 'Team',  // Define modelName here for the Team model
            tableName: 'teams',
            timestamps: true,
            createdAt: 'createdat',
            updatedAt: 'updatedat',
        }
    );

    return Team;
}

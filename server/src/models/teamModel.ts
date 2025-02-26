import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TeamInfo {
    triCode: string;
    city: string;
    teamName: string;
    teamLogo: string;
    className: string;
}

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
                field: 'triCode',
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'teamName',
            },
            teamLogo: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'teamLogo',
            },
            className: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'className',
            },
        },
        {
            sequelize,
            modelName: 'Team',  // Define modelName here for the Team model
            tableName: 'teams',
            timestamps: false,
        }
    );

    return Team;
}

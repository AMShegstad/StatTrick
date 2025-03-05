import { DataTypes, Model, Sequelize } from 'sequelize';
export interface TeamInfo {
    team_id: number;
    tri_code: string;
    city: string;
    team_name: string;
    team_logo: string;
    class_name: string;
}
export class Team extends Model<TeamInfo> implements TeamInfo {
    public team_id!: number;
    public tri_code!: string;
    public city!: string;
    public team_name!: string;
    public team_logo!: string;
    public class_name!: string;
}
export function TeamFactory(sequelize: Sequelize): typeof Team {
    Team.init(
        {
            team_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            tri_code: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            team_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            team_logo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            class_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Team",
            tableName: "teams",
            timestamps: false,
        }
    );
    return Team;
}
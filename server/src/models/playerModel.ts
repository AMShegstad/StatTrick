import { DataTypes, Model, Sequelize } from 'sequelize';
export interface PlayerInfo {
    player_id: number;
    first_name: string;
    last_name: string;
    team_abbreviation: string;
    position_code: string;
    headshot: string;
    sweater_number: number;
}
export class Player extends Model<PlayerInfo> implements PlayerInfo {
    public player_id!: number;
    public first_name!: string;
    public last_name!: string;
    public team_abbreviation!: string;
    public position_code!: string;
    public headshot!: string;
    public sweater_number!: number;
}
export function PlayerFactory(sequelize: Sequelize): typeof Player {
    Player.init(
        {
            player_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            headshot: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            team_abbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'teams',  // Reference to 'Team' model
                    key: 'tri_code',
                },
            },
            position_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sweater_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Player",  // Define modelName here for the Player model
            tableName: "players",
            timestamps: false,
        }
    );
    return Player;
}
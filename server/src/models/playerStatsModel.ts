import { DataTypes, Model, Sequelize } from 'sequelize';
import { Player } from './playerModel.js';
export interface PlayerStatsInfo {
    player_id: number;
    points?: number;
    goals?: number;
    assists?: number;
    plus_minus?: number;
    save_pctg?: number;
    goals_against_avg?: number;
}
export class PlayerStats extends Model<PlayerStatsInfo> implements PlayerStatsInfo {
    public player_id!: number;
    public points?: number;
    public goals?: number;
    public assists?: number;
    public plus_minus?: number;
    public save_pctg?: number;
    public goals_against_avg?: number;
}
export function PlayerStatsFactory(sequelize: Sequelize): typeof PlayerStats {
    PlayerStats.init(
        {
            player_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: Player,
                    key: 'player_id',
                },
                onDelete: 'CASCADE',
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            goals: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            assists: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            plus_minus: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            save_pctg: {
                type: DataTypes.DECIMAL(5, 4),
                allowNull: true,
            },
            goals_against_avg: {
                type: DataTypes.DECIMAL(5, 4),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'PlayerStats',
            tableName: 'player_stats',
            timestamps: false,
        }
    );

return PlayerStats;
}
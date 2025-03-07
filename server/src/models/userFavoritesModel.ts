import { DataTypes, Model, Sequelize } from "sequelize";

export class UserFavorites extends Model {
  public id!: number;
  public player_id!: number;
}

export function UserFavoritesFactory(sequelize: Sequelize): typeof UserFavorites {
  UserFavorites.init(
    {
      id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_data',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      player_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'players',
          key: 'player_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'user_favorites',
      timestamps: true,
    }
  );

  return UserFavorites;
}
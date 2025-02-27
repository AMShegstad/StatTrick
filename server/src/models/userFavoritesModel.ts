import { DataTypes, Model, Sequelize } from "sequelize";

export class UserFavorites extends Model {
  public userID!: number;
  public playerID!: number;
}

export function UserFavoritesFactory(sequelize: Sequelize): typeof UserFavorites {
  UserFavorites.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'userData',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      playerID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'players',
          key: 'playerid',
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
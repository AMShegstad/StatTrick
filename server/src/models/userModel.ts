import { DataTypes, Model, Sequelize } from "sequelize";
import { Player } from "./playerModel.js";
import bcrypt from "bcrypt";

export interface UserData {
  id?: number;
  username: string;
  password: string;
  email: string;
  favoriteTeam: string;
}

export class User extends Model<UserData> implements UserData {
  public id?: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public favoriteTeam!: string;

  // Explicitly declare Sequelize-generated methods
  declare addFavoritePlayer: (player: Player) => Promise<void>;
  declare removeFavoritePlayer: (player: Player) => Promise<void>;
  declare getFavoritePlayers: () => Promise<Player[]>;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 16],
            msg: "Username must be between 3 and 16 characters long",
          },
          notNull: {
            msg: "Please enter a username",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100],
            msg: "Password must be between 8 and 16 characters long",
          },
          notNull: {
            msg: "Please enter a password",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please enter a valid email address",
          },
          notNull: {
            msg: "Please enter an email address",
          },
        },
      },
      favoriteTeam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "userData",
      modelName: "User",
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    }
  );

  return User;
}
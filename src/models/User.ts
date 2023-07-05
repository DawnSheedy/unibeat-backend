import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare salt: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

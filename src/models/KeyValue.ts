import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class KeyValue extends Model {
  declare key: string;
  declare value: string;
}

KeyValue.init(
  {
    key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db }
);

export { KeyValue };

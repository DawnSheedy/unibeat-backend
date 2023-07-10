import { DataTypes, Model } from "sequelize";
import { db } from "../../services/db";

class Song extends Model {
  declare id: string;
  declare title: string;
  declare artist: string;
  declare tempo: number;
  declare length: number;
}

Song.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tempo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    length: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize: db }
);

export { Song };

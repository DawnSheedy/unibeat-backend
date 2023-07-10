import { DataTypes, Model } from "sequelize";
import { db } from "../../services/db";

export enum SongDifficulty {
  Basic,
  Advanced,
  Extreme,
}

class Chart extends Model {
  declare id: string;
  declare difficulty: SongDifficulty;
  declare songData: string;
}

Chart.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    songData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  { sequelize: db }
);

export { Chart };

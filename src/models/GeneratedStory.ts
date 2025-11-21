// models/GeneratedStory.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class GeneratedStory extends Model {
  declare id: number;
  declare userId: number;
  declare playerName: string;
  declare age: number;
  declare stories: object;
  declare createdAt: Date;
}

GeneratedStory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    playerName: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    stories: { type: DataTypes.JSONB, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "GeneratedStory",
  }
);

// models/index.ts
import { User } from "./User";
import { Character } from "./Character";
import { GameResult } from "./GameResult";
import { GeneratedStory } from "./GeneratedStory"; // ← ИСПРАВЛЕНО! Убрали generateLifeStories

// Связи
GameResult.belongsTo(User, { foreignKey: "userId" });
User.hasMany(GameResult, { foreignKey: "userId" });

GameResult.belongsTo(Character, { foreignKey: "characterId" });
Character.hasMany(GameResult, { foreignKey: "characterId" });

GeneratedStory.belongsTo(User, { foreignKey: "userId" }); // ← ИСПРАВЛЕНО!
User.hasMany(GeneratedStory, { foreignKey: "userId" }); // ← ИСПРАВЛЕНО!

export { User, Character, GameResult, GeneratedStory };

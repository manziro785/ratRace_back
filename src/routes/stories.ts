// routes/stories.ts
import { Router, Request, Response } from "express";
import { GeneratedStory } from "../models/GeneratedStory";
import { authMiddleware } from "../middleware/auth";
import { generateLifeStories } from "../services/aiService";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { age, playerName } = req.body;
      const userId = (req as any).user.id;

      if (!age || !playerName) {
        return res.status(400).json({
          message: "Возраст и имя игрока обязательны",
        });
      }

      if (age < 10 || age > 80) {
        return res.status(400).json({
          message: "Возраст должен быть от 10 до 80 лет",
        });
      }

      console.log(`🎮 Генерация историй для ${playerName}, ${age} лет...`);

      const stories = await generateLifeStories(age, playerName);

      const existing = await GeneratedStory.findOne({
        where: { userId },
      });

      let savedStory;
      if (existing) {
        await existing.update({
          playerName,
          age,
          stories,
          createdAt: new Date(),
        });
        savedStory = existing;
      } else {
        savedStory = await GeneratedStory.create({
          userId,
          playerName,
          age,
          stories,
        });
      }

      console.log(`✅ Истории сгенерированы и сохранены`);

      res.json({
        message: "Истории успешно сгенерированы",
        data: {
          id: savedStory.id,
          playerName: savedStory.playerName,
          age: savedStory.age,
          stories: savedStory.stories,
        },
      });
    } catch (error) {
      console.error("❌ Ошибка генерации:", error);
      res.status(500).json({
        message: "Не удалось сгенерировать истории",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

router.get(
  "/my-stories",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;

      const story = await GeneratedStory.findOne({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      if (!story) {
        return res.status(404).json({
          message: "У вас пока нет сгенерированных историй",
        });
      }

      res.json({
        id: story.id,
        playerName: story.playerName,
        age: story.age,
        stories: story.stories,
        createdAt: story.createdAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка получения историй" });
    }
  }
);

export default router;

// list-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB9gebGni25JfIsGvw5Y1pA1L4GlMUpvd4");

async function listModels() {
  try {
    console.log("🔍 Получаю список доступных моделей...\n");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyB9gebGni25JfIsGvw5Y1pA1L4GlMUpvd4"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.models && data.models.length > 0) {
      console.log("✅ Доступные модели:");
      data.models.forEach((model) => {
        console.log(`- ${model.name}`);
        console.log(
          `  Методы: ${model.supportedGenerationMethods?.join(", ")}`
        );
      });
    } else {
      console.log("❌ Модели не найдены");
    }
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
  }
}

listModels();

// test-gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB9gebGni25JfIsGvw5Y1pA1L4GlMUpvd4");

async function testModels() {
  const models = [
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
  ];

  for (const modelName of models) {
    try {
      console.log(`\n🧪 Тестирую: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Привет");
      console.log(`✅ ${modelName} работает!`);
    } catch (error) {
      console.log(`❌ ${modelName} не работает:`, error.message);
    }
  }
}

testModels();

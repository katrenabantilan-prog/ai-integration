// Mock AI Service for v1.1.0 (No API key required yet)
async function generateAIResponse(userMessage) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `This is a simulated AI response. You said: "${userMessage}". In a future version, this will connect to OpenAI/Anthropic.`;
}

module.exports = { generateAIResponse };
const express = require('express');
const { generateAIResponse } = require('../services/ai');
const pool = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { message, conversationId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // 1. Get AI response
    const aiReply = await generateAIResponse(message);

    // 2. Return the reply to the frontend
    // (In v1.2.0, we will save this to the database)
    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

module.exports = router;
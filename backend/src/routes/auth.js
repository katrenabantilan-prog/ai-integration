const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const sign = (u) => jwt.sign({ id: u.id, email: u.email, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  
  try {
    const hash = await bcrypt.hash(password, 10);
    const r = await pool.query(
      'INSERT INTO ai.users (email, password_hash) VALUES ($1,$2) RETURNING id,email,role',
      [email, hash]
    );
    res.json({ token: sign(r.rows[0]), user: r.rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const r = await pool.query('SELECT * FROM ai.users WHERE email=$1', [email]);
    const u = r.rows[0];
    if (!u || !(await bcrypt.compare(password, u.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: sign(u), user: { id: u.id, email: u.email, role: u.role } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
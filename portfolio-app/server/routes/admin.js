const router  = require('express').Router();
const db      = require('../db');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const auth    = require('../middleware/auth');

// POST register first admin (only works if no admins exist)
router.post('/register', async (req, res) => {
  try {
    const [existing] = await db.query('SELECT id FROM admins LIMIT 1');
    if (existing.length > 0)
      return res.status(403).json({ error: 'Admin already registered' });

    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password required' });

    const hashed = await bcrypt.hash(password, 12);
    await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashed]);
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (!rows.length)
      return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: rows[0].id, username: rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, username: rows[0].username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET verify token (used by frontend to check if logged in)
router.get('/verify', auth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;

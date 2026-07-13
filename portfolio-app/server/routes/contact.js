const router = require('express').Router();
const db     = require('../db');
const auth   = require('../middleware/auth');

// POST submit contact message (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'All fields are required' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: 'Invalid email address' });

    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message received! I will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY sent_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const router = require('express').Router();
const db     = require('../db');
const auth   = require('../middleware/auth');

// GET all skills grouped by category (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, level DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add skill (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, level } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const [result] = await db.query(
      'INSERT INTO skills (name, category, level) VALUES (?, ?, ?)',
      [name, category, level || 3]
    );
    res.status(201).json({ id: result.insertId, message: 'Skill added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update skill (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, category, level } = req.body;
    await db.query(
      'UPDATE skills SET name=?, category=?, level=? WHERE id=?',
      [name, category, level, req.params.id]
    );
    res.json({ message: 'Skill updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE skill (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

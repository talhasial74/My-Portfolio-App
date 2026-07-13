const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/skills - all skills, grouped naturally by category on the client
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM skills ORDER BY category ASC, display_order ASC, name ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST /api/skills - add a skill
router.post('/', async (req, res) => {
  const { name, category, proficiency, display_order } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'name and category are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO skills (name, category, proficiency, display_order) VALUES (?, ?, ?, ?)',
      [name, category, proficiency || 80, display_order || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// DELETE /api/skills/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM skills WHERE id = ?', [
      req.params.id
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/projects - list all projects, newest/most relevant first
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM projects ORDER BY display_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - a single project
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [
      req.params.id
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - create a project (use this from a small admin
// script or Postman to populate your portfolio; there's no UI for it)
router.post('/', async (req, res) => {
  const {
    title,
    description,
    image_url,
    tech_stack,
    github_url,
    live_url,
    status,
    display_order
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO projects
        (title, description, image_url, tech_stack, github_url, live_url, status, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        image_url || null,
        tech_stack || null,
        github_url || null,
        live_url || null,
        status || 'shipped',
        display_order || 0
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - update a project
router.put('/:id', async (req, res) => {
  const {
    title,
    description,
    image_url,
    tech_stack,
    github_url,
    live_url,
    status,
    display_order
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE projects SET
        title = ?, description = ?, image_url = ?, tech_stack = ?,
        github_url = ?, live_url = ?, status = ?, display_order = ?
       WHERE id = ?`,
      [title, description, image_url, tech_stack, github_url, live_url, status, display_order, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated' });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [
      req.params.id
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;

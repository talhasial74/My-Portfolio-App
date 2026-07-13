const router  = require('express').Router();
const db      = require('../db');
const auth    = require('../middleware/auth');
const multer  = require('multer');
const path    = require('path');

// Multer storage config for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET featured projects only (public)
router.get('/featured', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single project by id (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create project (admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await db.query(
      `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, tech_stack, github_url, live_url, image_url, featured ? 1 : 0]
    );
    res.status(201).json({ id: result.insertId, message: 'Project created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update project (admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    await db.query(
      `UPDATE projects SET title=?, description=?, tech_stack=?, github_url=?,
       live_url=?, image_url=?, featured=? WHERE id=?`,
      [title, description, tech_stack, github_url, live_url, image_url, featured ? 1 : 0, req.params.id]
    );
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

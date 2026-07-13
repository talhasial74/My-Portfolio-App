-- Optional sample data so the site isn't empty on first run:
--   mysql -u root -p < seed.sql

USE portfolio_db;

INSERT INTO projects (title, description, image_url, tech_stack, github_url, live_url, status, display_order) VALUES
('Portfolio App', 'A full-stack portfolio site with a React frontend, an Express API, and a MySQL database behind it.', NULL, 'React, Node.js, Express, MySQL', 'https://github.com/yourname/portfolio-app', NULL, 'shipped', 1),
('Task Tracker', 'A Kanban-style task manager with drag-and-drop boards and real-time updates.', NULL, 'React, Socket.io, PostgreSQL', 'https://github.com/yourname/task-tracker', 'https://task-tracker.example.com', 'shipped', 2),
('Recipe Finder', 'Search and save recipes by ingredients on hand, with shareable shopping lists.', NULL, 'Next.js, Node.js, MongoDB', 'https://github.com/yourname/recipe-finder', NULL, 'in_progress', 3);

INSERT INTO skills (name, category, proficiency, display_order) VALUES
('JavaScript', 'Languages', 90, 1),
('TypeScript', 'Languages', 80, 2),
('Python', 'Languages', 70, 3),
('React', 'Frontend', 90, 1),
('Vite', 'Frontend', 75, 2),
('CSS / Tailwind', 'Frontend', 85, 3),
('Node.js', 'Backend', 88, 1),
('Express', 'Backend', 85, 2),
('REST API design', 'Backend', 82, 3),
('MySQL', 'Database', 80, 1),
('MongoDB', 'Database', 70, 2),
('Git', 'Tools', 90, 1),
('Docker', 'Tools', 65, 2);

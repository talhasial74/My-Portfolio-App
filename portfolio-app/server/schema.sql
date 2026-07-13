-- Run this file in MySQL Workbench or the MySQL VS Code extension
-- to set up the portfolio database

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack  VARCHAR(255),
  github_url  VARCHAR(255),
  live_url    VARCHAR(255),
  image_url   VARCHAR(255),
  featured    TINYINT(1) DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  level    TINYINT DEFAULT 3 COMMENT '1=Beginner 2=Intermediate 3=Advanced 4=Expert'
);

CREATE TABLE IF NOT EXISTS contacts (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  message  TEXT NOT NULL,
  sent_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  username     VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data
INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured) VALUES
('E-Commerce Store',   'A full-stack shopping app with cart and checkout', 'React, Node.js, MySQL',      'https://github.com/you/ecommerce',   'https://ecommerce.example.com',   1),
('Weather Dashboard',  'Real-time weather app using OpenWeatherMap API',  'React, Axios, CSS',          'https://github.com/you/weather',     'https://weather.example.com',     1),
('Task Manager API',   'RESTful API for task management with JWT auth',   'Node.js, Express, MySQL',    'https://github.com/you/taskapi',     NULL,                              0),
('Portfolio Website',  'This portfolio built with React and Node.js',     'React, Node.js, MySQL',      'https://github.com/you/portfolio',   'https://yourportfolio.com',       1);

INSERT INTO skills (name, category, level) VALUES
('JavaScript',  'Frontend',  4),
('React',       'Frontend',  4),
('HTML & CSS',  'Frontend',  4),
('Node.js',     'Backend',   3),
('Express',     'Backend',   3),
('MySQL',       'Database',  3),
('Git & GitHub','Tools',     4),
('REST APIs',   'Backend',   3),
('Tailwind CSS','Frontend',  3),
('VS Code',     'Tools',     4);

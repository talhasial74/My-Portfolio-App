-- Run this once to create the database and tables:
--   mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(150) NOT NULL,
  description   TEXT NOT NULL,
  image_url     VARCHAR(500),
  tech_stack    VARCHAR(255),          -- comma separated, e.g. "React, Node.js, MySQL"
  github_url    VARCHAR(500),
  live_url      VARCHAR(500),
  status        ENUM('shipped', 'in_progress', 'archived') DEFAULT 'shipped',
  display_order INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  category      VARCHAR(100) NOT NULL, -- e.g. "Frontend", "Backend", "Tools"
  proficiency   INT DEFAULT 80,        -- 0-100, used for the skill bar
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

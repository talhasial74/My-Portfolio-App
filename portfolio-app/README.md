# Portfolio App

A full-stack developer portfolio built with **React**, **Node.js/Express**, and **MySQL**.

## Features

- Public portfolio pages: Home, Projects, Skills, Contact
- Admin dashboard to manage projects, skills, and contact messages
- JWT-based admin authentication
- Image upload for projects (Multer)
- MySQL database with seed data

## Project structure

```
portfolio-app/
├── server/                  ← Node.js + Express backend
│   ├── middleware/
│   │   └── auth.js          ← JWT auth middleware
│   ├── routes/
│   │   ├── projects.js      ← CRUD for projects
│   │   ├── skills.js        ← CRUD for skills
│   │   ├── contact.js       ← Contact form
│   │   └── admin.js         ← Login/register
│   ├── db.js                ← MySQL connection pool
│   ├── index.js             ← Express entry point
│   ├── schema.sql           ← DB setup + seed data
│   ├── .env.example         ← Environment variable template
│   └── package.json
│
├── client/                  ← React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   └── ProjectCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── api.js           ← Axios instance with auth interceptors
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── package.json             ← Root scripts (run both servers)
└── README.md
```

## Quick start

### 1. Prerequisites

- Node.js v18+
- MySQL 8.x
- Git

### 2. Clone and install dependencies

```bash
git clone https://github.com/yourname/portfolio-app.git
cd portfolio-app
npm run install:all
```

### 3. Set up MySQL database

Open MySQL Workbench or the VS Code MySQL extension and run:

```bash
mysql -u root -p < server/schema.sql
```

Or paste the contents of `server/schema.sql` into your MySQL client.

### 4. Configure environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and fill in your MySQL credentials and a JWT secret.

### 5. Run in development

```bash
npm run dev
```

This starts both the Express server (port 5000) and React dev server (port 5173) simultaneously.

Or run them separately:

```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev
```

### 6. Register the admin account

The first time, register an admin via the API (only works when no admins exist):

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Then visit `http://localhost:5173/admin/login` to log in.

## API endpoints

| Method | Route                    | Auth?  | Description               |
|--------|--------------------------|--------|---------------------------|
| GET    | /api/projects            | No     | List all projects         |
| GET    | /api/projects/featured   | No     | Featured projects only    |
| GET    | /api/projects/:id        | No     | Single project            |
| POST   | /api/projects            | Admin  | Create project            |
| PUT    | /api/projects/:id        | Admin  | Update project            |
| DELETE | /api/projects/:id        | Admin  | Delete project            |
| GET    | /api/skills              | No     | List all skills           |
| POST   | /api/skills              | Admin  | Add skill                 |
| DELETE | /api/skills/:id          | Admin  | Delete skill              |
| POST   | /api/contact             | No     | Submit contact message    |
| GET    | /api/contact             | Admin  | View all messages         |
| POST   | /api/admin/register      | No*    | Register first admin      |
| POST   | /api/admin/login         | No     | Login, get JWT token      |

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourname/portfolio-app.git
git branch -M main
git push -u origin main
```

## Deployment

- **Backend**: Railway, Render, or Fly.io
- **Frontend**: Vercel or Netlify
- **Database**: PlanetScale, Railway MySQL, or AWS RDS

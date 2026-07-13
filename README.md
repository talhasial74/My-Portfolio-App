# Portfolio App

A simple full-stack portfolio site:

- **Frontend** — React (Vite)
- **Backend** — Node.js + Express (REST API)
- **Database** — MySQL

The site shows an About section, a Skills list, and a Projects grid — all
pulled live from the database through the API — plus a Contact form that
writes incoming messages into the database.

```
portfolio-app/
├── backend/     Express API + MySQL access
└── frontend/    React UI (Vite)
```

## 1. Set up the database

Make sure MySQL is installed and running, then create the schema:

```bash
cd backend
mysql -u root -p < schema.sql

# optional: add sample projects/skills so the site isn't empty
mysql -u root -p < seed.sql
```

This creates a `portfolio_db` database with three tables: `projects`,
`skills`, and `messages` (where contact-form submissions are stored).

## 2. Run the backend

```bash
cd backend
cp .env.example .env   # then edit .env with your MySQL credentials
npm install
npm run dev             # nodemon, restarts on change
# or: npm start
```

The API starts on `http://localhost:5000` by default. Check it's alive:

```bash
curl http://localhost:5000/api/health
```

### API reference

| Method | Route              | Description                          |
|--------|--------------------|---------------------------------------|
| GET    | `/api/projects`    | List all projects                     |
| GET    | `/api/projects/:id`| Get one project                       |
| POST   | `/api/projects`    | Create a project                      |
| PUT    | `/api/projects/:id`| Update a project                      |
| DELETE | `/api/projects/:id`| Delete a project                      |
| GET    | `/api/skills`      | List all skills                       |
| POST   | `/api/skills`      | Add a skill                           |
| DELETE | `/api/skills/:id`  | Remove a skill                        |
| POST   | `/api/contact`     | Submit the contact form               |
| GET    | `/api/contact`     | List received messages (admin use)    |

There's no admin UI — use `curl`, Postman, or a MySQL client to manage
`projects` and `skills` rows. The `seed.sql` file is the fastest way to get
started.

## 3. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. In development, Vite proxies any request to
`/api/*` through to `http://localhost:5000`, so the frontend and backend
talk to each other with no extra configuration.

## 4. Personalize it

Edit `frontend/src/profileData.js` to change the name, role, bio, and
contact links shown on the site. Edit rows in the `projects` and `skills`
tables (directly in MySQL, or via the API) to change the portfolio content.

## 5. Building for production

```bash
cd frontend
npm run build      # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host, and deploy `backend/` to any
Node host with access to your MySQL instance. Set `VITE_API_URL` in the
frontend's `.env` to your deployed API URL, and `CORS_ORIGIN` in the
backend's `.env` to your deployed frontend URL.

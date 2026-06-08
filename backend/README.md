# SRJ Backend

Production-ready backend for the SRJ Global Technologies-style corporate website.

## Features

- Admin Authentication (login, logout, refresh token, forgot/reset password, change password)
- Contact inquiry management
- Career/job management
- Job application submission with resume upload
- Services, blogs, testimonials, projects, team management
- Dashboard analytics and global search
- Cloudinary file uploads for images and resumes
- JWT auth, Helmet, rate limiting, XSS protection, Mongo sanitization
- Swagger API docs

## Setup

1. Copy `.env.example` to `.env` and populate values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the default admin:
   ```bash
   npm run seed:admin
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API documentation

Open `http://localhost:5000/api/docs` after starting the server.

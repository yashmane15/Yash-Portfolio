# Yash Mane — Developer Portfolio

A modern, interactive developer portfolio showcasing my projects, technical skills, development journey, achievements, and work as a Computer Science Engineering student.

The portfolio combines a cinematic frontend experience with a custom **PostgreSQL-backed Admin CMS**, allowing portfolio content to be managed and published without modifying the public interface.

> **Live Portfolio:** Coming Soon

---

## About

This portfolio was built to present my work through an interactive and technically focused experience rather than a traditional static portfolio.

It highlights my work across full-stack development, software engineering, AI-based applications, databases, and modern web technologies while maintaining a responsive and immersive visual experience.

---

## Key Features

- Cinematic and interactive portfolio experience
- Responsive design across desktop and mobile
- Animated UI and smooth interactions
- Dynamic project showcase
- Technical skills and technology stack
- Developer journey and education
- Achievements and certifications
- GitHub and repository showcase
- Custom PostgreSQL-backed Admin CMS
- Draft → Preview → Publish content workflow
- Dynamic SEO metadata
- Secure Admin authentication
- Database-backed portfolio content
- Static fallback content if the database is unavailable

---

## Admin CMS

The portfolio includes a private content-management system available through the protected Admin interface.

The CMS allows portfolio information to be updated without directly editing the frontend source code.

Content that can be managed includes:

- Identity and profile information
- Statistics
- Projects
- Technology stack
- Skills
- Achievements
- Journey
- Repositories
- Principles
- Portfolio content and supporting information

The publishing workflow follows:

**Draft → Preview → Publish**

Changes saved as drafts remain private until they are explicitly published.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Responsive Web Design

### Backend

- Next.js Server Components
- Next.js API Routes
- Server-side validation

### Database

- PostgreSQL
- Neon
- Prisma ORM

### Authentication

- bcrypt password hashing
- Signed HttpOnly sessions
- Protected Admin routes
- Login throttling
- Server-side authentication

### Development & Deployment

- Git
- GitHub
- npm
- Vercel

---

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   └── page.tsx
│
├── components/
│   ├── admin/
│   ├── sections/
│   └── three/
│
├── context/
├── data/
└── lib/

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

---

## Run Locally

### Requirements

- Node.js 20+
- npm
- PostgreSQL or Neon

### Clone the Repository

```bash
git clone https://github.com/yashmane15/Yash-Portfolio.git
cd Yash-Portfolio
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root using `.env.example` as reference.

```env
DATABASE_URL="postgresql://..."
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD_HASH="generated-bcrypt-hash"
SESSION_SECRET="your-secure-session-secret"
```

An optional production site URL can also be configured:

```env
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

Never commit real credentials or secrets to the repository.

---

## Generate Admin Password Hash

Generate a bcrypt hash for the Admin password:

```bash
npm run admin:hash -- "your-password"
```

Store the generated hash in:

```env
ADMIN_PASSWORD_HASH="generated-bcrypt-hash"
```

The plaintext Admin password should never be stored in the repository.

---

## Database Setup

Generate the Prisma client:

```bash
npm run db:generate
```

Apply the database migrations:

```bash
npx prisma migrate deploy
```

Seed the database when setting it up for the first time:

```bash
npm run db:seed
```

---

## Start Development

```bash
npm run dev
```

The development server will normally be available at:

```text
http://localhost:3000
```

### Admin

```text
/admin/login
/admin
/admin/preview
```

---

## Content Workflow

Portfolio updates follow a controlled publishing workflow:

```text
Edit Content
     ↓
Save Draft
     ↓
Preview Draft
     ↓
Publish
     ↓
Public Portfolio
```

Draft changes do not affect the public portfolio until **Publish** is selected.

If the database is unavailable, the public portfolio can fall back to the bundled portfolio content while database-dependent Admin operations remain protected.

---

## Production Build

Create an optimized production build with:

```bash
npm run build
```

---

## Deployment

The portfolio is designed for deployment using:

- **Vercel** for the Next.js application
- **Neon PostgreSQL** for the production database

Required production environment variables:

```env
DATABASE_URL
ADMIN_USERNAME
ADMIN_PASSWORD_HASH
SESSION_SECRET
```

Optional:

```env
NEXT_PUBLIC_SITE_URL
```

Database migrations should be applied to the production database before using the Admin CMS.

---

## Security

Sensitive configuration remains server-side.

The repository does not contain:

- Plaintext Admin passwords
- Production database credentials
- Session secrets
- Local environment files

Admin authentication uses password hashing and signed sessions, while protected routes prevent unauthenticated access to CMS operations.

---

## Connect With Me

### GitHub
https://github.com/yashmane15

### LinkedIn
https://www.linkedin.com/in/yash-mane-21a81140a/

### LeetCode
https://leetcode.com/u/zJ6Eg6KP4R/

---

## Author

### Yash Mane

Computer Science Engineering student focused on **Full-Stack Development, Software Engineering, AI, and building practical technology-driven products**.

**Learning beyond the classroom.**

# Yash Mane Portfolio — Phase 2

The cinematic public portfolio plus a private PostgreSQL-backed content control center at `/admin`.

## Local setup

1. Install Node.js 20+ and PostgreSQL (or create a hosted PostgreSQL database such as Neon).
2. Install packages:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and configure:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD_HASH="generated-bcrypt-hash"
SESSION_SECRET="at-least-32-random-characters"
```

Generate the password hash without saving the plaintext password:

```bash
npm run admin:hash -- "your-password"
```

4. Initialize and seed the database with the exact Phase 1 content:

```bash
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
```

5. Start development:

```bash
npm run dev
```

- Public portfolio: http://localhost:3000
- Admin control center: http://localhost:3000/admin

## Content workflow

Edit content in the admin, select **Save Draft**, inspect it through **Preview Draft**, then select **Publish**. Draft content is private and does not affect the public portfolio until published.

If the database is unavailable, the public site safely uses the checked-in Phase 1 content. Admin writes require a working database.

## Vercel deployment

Configure `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, and optionally `NEXT_PUBLIC_SITE_URL` in Vercel. Run the Prisma migration against the production database and seed it once. No runtime filesystem writes are used.

Never commit `.env.local`, plaintext passwords, or database credentials.

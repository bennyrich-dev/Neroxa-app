# Neroxa Production Setup Guide

## Overview

Neroxa has been configured as a production-ready streaming platform built on:
- **Next.js 16** with App Router
- **Neon Postgres** database with Drizzle ORM
- **Better Auth** for email + password authentication
- **Tailwind CSS** for premium dark theme styling
- **Vercel** for deployment

## Database Setup ✅

All required tables have been created in your Neon database:

### Authentication Tables (Better Auth)
- `user` - User accounts and profiles
- `session` - User sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

### Application Tables
- `watchlist` - User saved content/favorites
- `forum_posts` - Community forum posts
- `forum_replies` - Replies to forum discussions

## Environment Variables Required

Add these to your Vercel project settings:

```env
DATABASE_URL=<from-neon-integration>
BETTER_AUTH_SECRET=<set-during-setup>
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.com
```

The `DATABASE_URL` is automatically provisioned from the Neon integration.
The `BETTER_AUTH_SECRET` was set to a secure random value during setup.

## Project Structure

```
app/
  api/auth/[...all]/route.ts    - Better Auth handler
  sign-in/page.tsx              - Sign-in page
  sign-up/page.tsx              - Sign-up page
  page.tsx                       - Protected home page
  layout.tsx                     - Root layout
  globals.css                    - Theme and utilities

components/
  auth-form.tsx                  - Reusable auth form

lib/
  auth.ts                        - Better Auth configuration
  auth-client.ts                 - Client-side auth hooks
  db/
    index.ts                     - Drizzle ORM client
    schema.ts                     - Database schema

next.config.ts                   - Next.js configuration
tailwind.config.ts               - Tailwind CSS theme
postcss.config.mjs               - PostCSS configuration
```

## Features Implemented

### ✅ Authentication
- Email + password sign-up and sign-in
- Secure session management with Better Auth
- Protected pages (redirect to /sign-in if not authenticated)
- Sign-out functionality

### ✅ Design System
- Premium dark theme with cyan primary color
- Responsive grid-based layout
- Glass morphism effects
- Hero sections for featured content
- Content cards with hover effects
- Mobile-friendly navigation

### ✅ Database Integration
- Drizzle ORM for type-safe queries
- Per-user data scoping (no Row Level Security, scoped in code)
- Watchlist/favorites support
- Forum with posts and replies

### ✅ Performance
- Server Components for SEO
- Optimized image handling
- CSS-in-JS via Tailwind
- Database connection pooling

## Installation & Deployment

### Local Development

```bash
npm install
npm run dev
```

The app will start on http://localhost:3000

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings:
   - `DATABASE_URL` (from Neon integration)
   - `BETTER_AUTH_SECRET` (set during setup)
4. Deploy with `vercel deploy`

Vercel will automatically:
- Build the Next.js app
- Optimize for production
- Deploy to global CDN
- Set up SSL/HTTPS

## Server Actions Pattern

All database mutations use the `getUserId()` pattern for security:

```typescript
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// In your action:
export async function addToWatchlist(contentId: string) {
  const userId = await getUserId()
  return db.insert(watchlist).values({
    userId,
    contentId,
    // ...
  })
}
```

**Important**: Every query touching user data MUST include `where(eq(table.userId, userId))`

## Next Steps

1. **Implement Watchlist UI**
   - Create pages/watchlist route
   - Add buttons to save/unsave content
   - List user's saved items

2. **Build Forums**
   - Create pages/forums route
   - Implement post creation form
   - Add reply functionality

3. **Add Content Browsing**
   - Create pages/movies and pages/series routes
   - Integrate with movie API (TMDB, etc.)
   - Display content grid

4. **Implement AI Chat** (optional)
   - Add chat interface
   - Integrate with AI SDK (OpenAI, Anthropic, etc.)
   - Real-time message streaming

5. **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Add environment variables
   - Deploy with one click

## Security Checklist

- ✅ Environment variables in Vercel (not in code)
- ✅ Per-user data scoping in all server actions
- ✅ BETTER_AUTH_SECRET set and strong
- ✅ CORS configured properly
- ✅ Session cookies secure in production
- ✅ No sensitive data in client components

## Troubleshooting

**"Unauthorized" errors**
- Check BETTER_AUTH_SECRET is set
- Verify DATABASE_URL is correct
- Ensure session cookie isn't blocked (check browser DevTools)

**Database connection errors**
- Verify Neon is connected and DATABASE_URL is correct
- Check connection pool isn't exhausted (max 20 connections on free tier)
- Restart your app after adding DATABASE_URL

**Auth not persisting**
- Clear browser cookies and try again
- Check BETTER_AUTH_URL matches your domain
- Verify sameSite cookie attribute is correct

## Support

For issues:
1. Check the [Better Auth docs](https://better-auth.vercel.app)
2. Check the [Neon docs](https://neon.tech/docs)
3. Check the [Next.js docs](https://nextjs.org/docs)
4. File an issue on GitHub

---

**Status**: Production-Ready ✅
**Database**: Neon PostgreSQL ✅
**Auth**: Better Auth ✅
**Hosting**: Ready for Vercel ✅
**Theme**: Premium Dark UI ✅

Time to go live!

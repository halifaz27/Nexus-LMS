# Nexus LMS

A responsive Learning Management System portfolio project built with React, Vite, Tailwind CSS v4, Lucide React, and Supabase Auth.

## Features

- Responsive learner dashboard, course library, course overview, lesson room, schedule, certificates, discussions, and settings
- Search courses, enroll, track lesson completion, and save demo learning progress in browser storage
- Light/dark theme
- Email/password registration and sign-in through Supabase Auth
- Google OAuth sign-in through Supabase Auth
- Persistent auth sessions and sign out
- Password reset email flow

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project for real authentication

## 1. Install dependencies

From the project root (the folder containing `package.json`):

```bash
npm install
```

## 2. Configure Supabase

1. Create a project at https://supabase.com/dashboard.
2. Open **Project Settings → API** (or the project's API Keys section) and copy the project URL and publishable/anon key.
3. Copy `.env.example` to a new file named `.env` in the same folder as `package.json`.
4. Fill the values in `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Use the publishable/anon key in a frontend app. **Never put a service-role key or private secret in a `VITE_` variable or commit `.env` to GitHub.**

## 3. Enable email/password authentication

In Supabase Dashboard, open **Authentication → Providers → Email** and enable email/password sign-in. If email confirmation is enabled, new users must confirm their email before signing in. Configure SMTP if you need reliable production email delivery.

## 4. Enable Google OAuth

1. In Google Cloud Console, create/select a project and configure the OAuth consent screen.
2. Create an OAuth client ID with application type **Web application**.
3. In Supabase, open **Authentication → Providers → Google**, enable Google, and paste the Google Client ID and Client Secret from Google Cloud.
4. Copy the **Callback URL** shown by Supabase and add it to **Authorized redirect URIs** in the Google OAuth client. Do not guess this URL; use the exact URL Supabase shows.
5. In Supabase **Authentication → URL Configuration**, set the local Site URL to `http://localhost:5173` and add `http://localhost:5173` to Redirect URLs. Add your deployed site's exact origin when deploying.

The app uses the current origin as the OAuth return URL. Google sign-in will not work until both Google Cloud and Supabase provider settings are completed.

## 5. Run locally

After saving `.env`, stop and restart the Vite server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production bundle is created in `dist/`.

## Notes and limitations

- The authentication flow is real Supabase Auth, but it needs your own Supabase project and Google OAuth credentials configured as above.
- Course catalog, lesson metadata, session times, and certificate data remain sample portfolio content.
- Learning progress and profile preferences are still stored in browser `localStorage`; they are not yet synced to a user-specific database. Do not treat the sample course content as a production LMS backend.
- Course thumbnails load from Unsplash and require an internet connection. The lesson player is a visual placeholder, not a real video-hosting system.

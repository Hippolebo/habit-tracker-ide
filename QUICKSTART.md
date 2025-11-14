# Quick Start Guide

## 1. Install Dependencies (30 seconds)

```bash
npm install
```

## 2. Set Up Supabase (60 seconds)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy Project URL and Anon Key from Settings > API
3. Go to SQL Editor → Paste `supabase-schema.sql` → Run
4. (Optional) Authentication > Providers → Enable Google

## 3. Configure Environment (10 seconds)

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Run (10 seconds)

```bash
npm run dev
```

Open http://localhost:3000

## 5. Deploy to Vercel (20 seconds)

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main

# Then on Vercel:
# 1. Import GitHub repo
# 2. Add environment variables
# 3. Deploy
```

Update Supabase redirect URLs:
- Add production URL to Authentication > URL Configuration

## Done! 🎉

You now have a production-ready habit tracker running.

## What You Can Do

- Sign up with email or Google
- Add habits with emojis
- Click habits to see yearly heatmap
- Click any day to check in
- See real-time stats update
- All data private and synced

## Troubleshooting

**Can't log in?**
- Check Supabase URL and key in `.env.local`
- Make sure SQL schema was run

**Google OAuth not working?**
- Enable Google provider in Supabase
- Add correct redirect URLs

**Build errors?**
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npm run dev`

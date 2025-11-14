# Habit Tracker

A minimal, production-ready yearly habit tracker with dark mode, real-time sync, and beautiful heatmap visualization.

## Features

- Pure black dark mode design (#000000)
- Instant account creation with email/password or Google OAuth
- Multiple habit tracking with emoji support
- 52-week yearly heatmap (March-February)
- Real-time statistics: current streak, longest streak, total check-ins, consistency percentage
- One-click check-in/uncheck for any day
- Mobile-first responsive design
- Private data with Row Level Security

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + PostgreSQL)
- shadcn/ui components
- Zustand for state management
- emoji-mart for emoji picker

## Setup in 2 Minutes

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key
4. Run the SQL schema:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase-schema.sql`
   - Paste and run it

### 3. Enable Google OAuth (Optional)

1. Go to Authentication > Providers in Supabase
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add redirect URL: `http://localhost:3000/dashboard`

### 4. Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

Update Supabase redirect URLs to include your production domain.

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard with habit list
│   ├── globals.css            # Global styles (dark mode)
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Auth page (login/signup)
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── AddHabitDialog.tsx     # Modal for adding/editing habits
│   └── HabitView.tsx          # Yearly heatmap view
├── lib/
│   ├── date-utils.ts          # Date calculations & streaks
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Utility functions
├── store/
│   └── useStore.ts            # Zustand store
└── supabase-schema.sql        # Database schema
```

## Database Schema

### habits
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key to auth.users)
- `name`: Text
- `emoji`: Text
- `created_at`: Timestamp

### checkins
- `id`: UUID (primary key)
- `habit_id`: UUID (foreign key to habits)
- `date`: Date (unique per habit)
- `created_at`: Timestamp

## How It Works

1. User signs up/logs in (email or Google)
2. Add habits with name and emoji
3. Click any habit to see yearly view
4. Click any day to toggle check-in
5. Statistics update in real-time
6. All data synced to Supabase instantly

## Stats Calculation

- **Current Streak**: Consecutive days from today backward
- **Longest Streak**: Maximum consecutive days ever
- **Total Check-ins**: Total number of checked days
- **Consistency**: Percentage of days checked since habit creation

## Mobile Navigation

- Bottom navigation bar for easy thumb access
- Swipe-friendly heatmap on mobile
- Responsive grid layout

## Security

- Row Level Security (RLS) enabled
- Users can only access their own data
- Authentication required for all routes
- Secure OAuth with Supabase

## License

MIT

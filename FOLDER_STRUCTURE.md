# Complete Folder Structure

```
cursor_project/
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── next.config.js                  # Next.js configuration
├── postcss.config.js               # PostCSS configuration
├── components.json                 # shadcn/ui configuration
├── supabase-schema.sql             # Database schema and RLS policies
├── README.md                       # Setup and usage documentation
│
├── app/                            # Next.js App Router
│   ├── globals.css                 # Global styles (dark mode variables)
│   ├── layout.tsx                  # Root layout component
│   ├── page.tsx                    # Auth page (login/signup)
│   └── dashboard/
│       └── page.tsx                # Dashboard with habit list
│
├── components/                     # React components
│   ├── AddHabitDialog.tsx          # Modal for creating habits
│   ├── HabitView.tsx               # Yearly heatmap view
│   └── ui/                         # shadcn/ui components
│       ├── badge.tsx               # Badge component
│       ├── button.tsx              # Button component
│       ├── card.tsx                # Card component
│       ├── dialog.tsx              # Dialog/Modal component
│       ├── input.tsx               # Input component
│       └── tabs.tsx                # Tabs component
│
├── lib/                            # Utility libraries
│   ├── supabase.ts                 # Supabase client + types
│   ├── date-utils.ts               # Date calculations & streak logic
│   └── utils.ts                    # General utilities (cn function)
│
└── store/                          # State management
    └── useStore.ts                 # Zustand store (habits, check-ins)
```

## Key Files Explained

### Configuration Files
- **package.json**: All dependencies including Next.js, Supabase, Zustand, emoji-mart
- **tailwind.config.ts**: Dark mode configuration with custom colors
- **components.json**: shadcn/ui setup for component generation

### App Directory
- **app/page.tsx**: Landing page with email/password and Google OAuth
- **app/dashboard/page.tsx**: Main dashboard showing all habits with streaks
- **app/globals.css**: CSS variables for pure black theme

### Components
- **AddHabitDialog.tsx**: Emoji picker + text input for creating habits
- **HabitView.tsx**: Full-screen yearly view with 52-week heatmap
- **ui/**: Pre-built shadcn/ui components styled for dark mode

### Libraries
- **lib/supabase.ts**: Supabase client initialization
- **lib/date-utils.ts**: Functions for week calculations, streak tracking, consistency
- **lib/utils.ts**: Tailwind class merging utility

### State
- **store/useStore.ts**: Zustand store managing habits, check-ins, selected habit

### Database
- **supabase-schema.sql**: Complete SQL schema with RLS policies

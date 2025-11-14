-- Enable Row Level Security
alter database postgres set timezone to 'UTC';

-- Create habits table
create table public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  emoji text not null default '🎯',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create checkins table
create table public.checkins (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references public.habits(id) on delete cascade not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(habit_id, date)
);

-- Enable Row Level Security
alter table public.habits enable row level security;
alter table public.checkins enable row level security;

-- Create policies for habits table
create policy "Users can view their own habits"
  on public.habits for select
  using (auth.uid() = user_id);

create policy "Users can insert their own habits"
  on public.habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own habits"
  on public.habits for update
  using (auth.uid() = user_id);

create policy "Users can delete their own habits"
  on public.habits for delete
  using (auth.uid() = user_id);

-- Create policies for checkins table
create policy "Users can view their own checkins"
  on public.checkins for select
  using (
    exists (
      select 1 from public.habits
      where habits.id = checkins.habit_id
      and habits.user_id = auth.uid()
    )
  );

create policy "Users can insert their own checkins"
  on public.checkins for insert
  with check (
    exists (
      select 1 from public.habits
      where habits.id = checkins.habit_id
      and habits.user_id = auth.uid()
    )
  );

create policy "Users can delete their own checkins"
  on public.checkins for delete
  using (
    exists (
      select 1 from public.habits
      where habits.id = checkins.habit_id
      and habits.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index habits_user_id_idx on public.habits(user_id);
create index checkins_habit_id_idx on public.checkins(habit_id);
create index checkins_date_idx on public.checkins(date);

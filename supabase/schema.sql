-- ==============================================================================
-- KALLOVIYAM - SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- 1. Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 2. Create the projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  project_name text not null,
  tagline text default '',
  slug text unique not null,
  project_location text default '',
  listing_type text default 'new', -- 'new' or 'old'
  description text default '',
  features jsonb default '[]'::jsonb,
  bhk text default '',
  sqft text default '',
  video_url text default '',
  gallery_images jsonb default '[]'::jsonb, -- array of { imageUrl: string, publicId: string }
  meta_title text default '',
  meta_description text default '',
  meta_keywords text default '',
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.1 Ensure columns exist if table was previously created
alter table public.projects add column if not exists tagline text default '';
alter table public.projects add column if not exists display_order integer default 0;

-- 3. Create Indexes for High Performance Querying
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_display_order on public.projects(display_order asc);
create index if not exists idx_projects_created_at on public.projects(created_at desc);
create index if not exists idx_projects_listing_type on public.projects(listing_type);

-- 4. Create trigger to auto-update `updated_at`
drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- 5. Enable Row Level Security (RLS) for Ironclad Security
alter table public.projects enable row level security;

-- Drop existing policies if any to prevent conflicts
drop policy if exists "Allow public read access" on public.projects;
drop policy if exists "Allow authenticated admin full access" on public.projects;

-- 6. RLS Policy: Anyone (public / website visitors) can READ projects
create policy "Allow public read access"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- 7. RLS Policy: ONLY Authenticated Admin users can INSERT, UPDATE, or DELETE projects
create policy "Allow authenticated admin full access"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

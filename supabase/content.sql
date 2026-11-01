-- Groviatech site content: team, projects, testimonials, and an image bucket.
-- Run once in Supabase → SQL Editor, after schema.sql. Then run content-seed.sql to load what is on the site today.

-- ---------- Team ----------
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  role text not null check (char_length(role) between 1 and 160),
  note text check (char_length(note) <= 200),
  photo_url text check (char_length(photo_url) <= 500),
  link_label text check (char_length(link_label) <= 60),
  link_href text check (char_length(link_href) <= 300),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger team_members_touch before update on public.team_members
  for each row execute function public.touch_updated_at();
alter table public.team_members enable row level security;
create policy "Anyone can read published team members"
  on public.team_members for select to anon, authenticated using (published);
create policy "Admins manage team members"
  on public.team_members for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- Projects ----------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique check (char_length(domain) between 3 and 120),
  category text check (char_length(category) <= 60),
  description text check (char_length(description) <= 500),
  tags text[] not null default '{}',
  image_url text check (char_length(image_url) <= 500),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();
alter table public.projects enable row level security;
create policy "Anyone can read published projects"
  on public.projects for select to anon, authenticated using (published);
create policy "Admins manage projects"
  on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- Testimonials ----------
-- A testimonial cannot be published unless the client has agreed to be quoted. The database enforces this, not just the form.
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null check (char_length(quote) between 1 and 600),
  name text not null check (char_length(name) between 1 and 120),
  role text check (char_length(role) <= 160),
  permission_confirmed boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint testimonial_needs_permission check (not published or permission_confirmed)
);
create trigger testimonials_touch before update on public.testimonials
  for each row execute function public.touch_updated_at();
alter table public.testimonials enable row level security;
create policy "Anyone can read published testimonials"
  on public.testimonials for select to anon, authenticated using (published);
create policy "Admins manage testimonials"
  on public.testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- Images (team photos and project screenshots) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "Anyone can view site images"
  on storage.objects for select to anon, authenticated using (bucket_id = 'site-images');
create policy "Admins add site images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_admin());
create policy "Admins replace site images"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());
create policy "Admins delete site images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.is_admin());

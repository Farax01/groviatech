-- Groviatech admin: database schema
-- Run once in Supabase → SQL Editor.

-- ---------- Admin allowlist ----------
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'sales', 'editor')),
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create policy "Admins can read their own row"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());
-- No insert/update/delete policies: admins are added only from the SQL editor.

-- True only for allow-listed users who have passed MFA (aal2) in this session.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid())
     and coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Pricing tiers ----------
create type public.pricing_track as enum ('web_dev', 'sme_security', 'ai_startup');

create table public.pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  track public.pricing_track not null,
  name text not null check (char_length(name) between 1 and 80),
  price_prefix text check (char_length(price_prefix) <= 20),   -- e.g. "from"
  price_label text not null check (char_length(price_label) between 1 and 40), -- "$3,500" or "Custom"
  price_suffix text check (char_length(price_suffix) <= 30),   -- e.g. "/mo", "one-time"
  audience text check (char_length(audience) <= 200),
  features text[] not null default '{}',
  highlighted boolean not null default false,
  highlight_label text check (char_length(highlight_label) <= 40),
  cta_label text not null default 'Book a free audit' check (char_length(cta_label) <= 60),
  cta_href text not null default '/contact' check (char_length(cta_href) <= 300),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger pricing_tiers_touch before update on public.pricing_tiers
  for each row execute function public.touch_updated_at();
alter table public.pricing_tiers enable row level security;

create policy "Anyone can read published tiers"
  on public.pricing_tiers for select to anon, authenticated
  using (published);
create policy "Admins manage tiers"
  on public.pricing_tiers for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- Leads ----------
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'won', 'lost');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text check (char_length(company) <= 160),
  interest text check (char_length(interest) <= 120),
  message text check (char_length(message) <= 4000),
  source text not null default 'website' check (char_length(source) <= 60),
  status public.lead_status not null default 'new',
  notes text check (char_length(notes) <= 4000)
);
create trigger leads_touch before update on public.leads
  for each row execute function public.touch_updated_at();
create index leads_status_created_idx on public.leads (status, created_at desc);
alter table public.leads enable row level security;

-- Visitors can submit a lead but never read, change or set its status.
create policy "Anyone can submit a lead"
  on public.leads for insert to anon, authenticated
  with check (status = 'new' and notes is null);
create policy "Admins manage leads"
  on public.leads for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

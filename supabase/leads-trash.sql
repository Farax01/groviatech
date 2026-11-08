-- Run once in Supabase SQL Editor to enable the admin lead trash bin.
alter table public.leads
  add column if not exists deleted_at timestamptz;

create index if not exists leads_deleted_created_idx
  on public.leads (deleted_at, created_at desc);

-- Adds Google PageSpeed Insights scores to projects. Run once in Supabase → SQL Editor. Safe to run again.
-- The scores show on the project cards on the home page and the Work page. Leave them empty to show nothing.
alter table public.projects
  add column if not exists ps_performance int check (ps_performance between 0 and 100),
  add column if not exists ps_accessibility int check (ps_accessibility between 0 and 100),
  add column if not exists ps_best_practices int check (ps_best_practices between 0 and 100),
  add column if not exists ps_seo int check (ps_seo between 0 and 100),
  add column if not exists ps_device text check (ps_device in ('mobile', 'desktop')),
  add column if not exists ps_measured_on date;

alter table public.projects drop constraint if exists projects_ps_context;
alter table public.projects add constraint projects_ps_context check (
  (ps_performance is null and ps_accessibility is null and ps_best_practices is null and ps_seo is null)
  or (ps_device is not null and ps_measured_on is not null)
);

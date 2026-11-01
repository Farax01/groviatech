-- Groviatech: database protection against a flood of fake enquiries.
-- Run once in Supabase → SQL Editor (after schema.sql). Safe to run again.
--
-- The contact form lets anyone insert a row into public.leads. This makes the database itself say no when:
--   * more than 15 enquiries arrive in one minute, or more than 100 in one hour (a flood), or
--   * the same email address sends more than 2 in 10 minutes (an accident or a bot).
-- /api/leads turns the refusal into a polite message. Real enquiries are a handful a day, so these limits are far above normal use.

create or replace function public.leads_rate_limit()
returns trigger
language plpgsql
security definer          -- so it can count rows that visitors are not allowed to read
set search_path = public
as $$
begin
  if (select count(*) from public.leads where created_at > now() - interval '1 minute') >= 15
     or (select count(*) from public.leads where created_at > now() - interval '1 hour') >= 100
     or (select count(*) from public.leads where lower(email) = lower(new.email) and created_at > now() - interval '10 minutes') >= 2
  then
    raise exception 'too_many_leads';
  end if;
  return new;
end;
$$;
revoke all on function public.leads_rate_limit() from public, anon, authenticated;

drop trigger if exists leads_rate_limit_trg on public.leads;
create trigger leads_rate_limit_trg before insert on public.leads
  for each row execute function public.leads_rate_limit();

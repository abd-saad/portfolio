create extension if not exists pg_net with schema extensions;

create table if not exists public.cache_invalidation_events (
  id uuid primary key default gen_random_uuid(),
  cache_tag text not null check (cache_tag in ('homepage','skills','experiences','projects','certifications','social-links','solutions','blog')),
  created_at timestamptz not null default now()
);

alter table public.cache_invalidation_events enable row level security;
revoke all on table public.cache_invalidation_events from anon, authenticated;
grant select, delete on table public.cache_invalidation_events to service_role;

create or replace function public.enqueue_cache_invalidation()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, net
as $$
declare
  target_tag text;
  event_id uuid;
begin
  target_tag := case tg_table_name
    when 'home_sections' then 'homepage'
    when 'skill_categories' then 'skills'
    when 'skills' then 'skills'
    when 'experiences' then 'experiences'
    when 'projects' then 'projects'
    when 'certifications' then 'certifications'
    when 'social_links' then 'social-links'
    when 'solutions' then 'solutions'
    when 'solution_sections' then 'solutions'
    when 'solution_technologies' then 'solutions'
    when 'technologies' then 'solutions'
    when 'blog_posts' then 'blog'
    when 'blog_categories' then 'blog'
    when 'blog_post_categories' then 'blog'
    else null
  end;

  if target_tag is null then
    return null;
  end if;

  delete from public.cache_invalidation_events
  where created_at < now() - interval '1 day';

  insert into public.cache_invalidation_events (cache_tag)
  values (target_tag)
  returning id into event_id;

  perform net.http_post(
    url := 'https://abd-saad.vercel.app/api/revalidate',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := jsonb_build_object('event_id', event_id),
    timeout_milliseconds := 5000
  );

  return null;
end;
$$;

revoke all on function public.enqueue_cache_invalidation() from public, anon, authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'home_sections','skill_categories','skills','experiences','projects','certifications','social_links',
    'solutions','solution_sections','solution_technologies','technologies',
    'blog_posts','blog_categories','blog_post_categories'
  ]
  loop
    execute format('drop trigger if exists cache_invalidation_after_change on public.%I', table_name);
    execute format(
      'create trigger cache_invalidation_after_change after insert or update or delete on public.%I for each statement execute function public.enqueue_cache_invalidation()',
      table_name
    );
  end loop;
end
$$;

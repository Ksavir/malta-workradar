begin;

create extension if not exists pgcrypto;
create schema if not exists private;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('user', 'moderator', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'company_status') then
    create type public.company_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'review_status') then
    create type public.review_status as enum ('pending', 'approved', 'rejected', 'flagged');
  end if;

  if not exists (select 1 from pg_type where typname = 'employment_type') then
    create type public.employment_type as enum (
      'full_time',
      'part_time',
      'freelance',
      'internship',
      'temporary',
      'informal',
      'other'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'report_reason') then
    create type public.report_reason as enum (
      'false_information',
      'personal_data',
      'offensive_language',
      'defamation_risk',
      'spam',
      'other'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'report_status') then
    create type public.report_status as enum ('open', 'reviewed', 'dismissed', 'action_taken');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'user',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint profiles_display_name_length check (
    display_name is null
    or char_length(display_name) between 2 and 80
  )
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sector text not null,
  location text not null,
  website text,
  description text,
  logo_url text,
  status public.company_status not null default 'pending',
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint companies_name_length check (char_length(name) between 2 and 160),
  constraint companies_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint companies_sector_length check (char_length(sector) between 2 and 120),
  constraint companies_location_length check (char_length(location) between 2 and 120)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  job_title text not null,
  employment_type public.employment_type not null,
  worked_from date,
  worked_to date,
  is_current_employee boolean not null default false,
  overall_rating int not null check (overall_rating between 1 and 5),
  salary_rating int not null check (salary_rating between 1 and 5),
  payment_punctuality_rating int not null check (payment_punctuality_rating between 1 and 5),
  work_environment_rating int not null check (work_environment_rating between 1 and 5),
  schedule_respect_rating int not null check (schedule_respect_rating between 1 and 5),
  management_rating int not null check (management_rating between 1 and 5),
  contract_transparency_rating int not null check (contract_transparency_rating between 1 and 5),
  growth_opportunity_rating int not null check (growth_opportunity_rating between 1 and 5),
  pros text,
  cons text,
  advice text,
  status public.review_status not null default 'pending',
  moderation_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reviews_job_title_length check (char_length(job_title) between 2 and 140),
  constraint reviews_work_dates_order check (
    worked_from is null
    or worked_to is null
    or worked_from <= worked_to
  ),
  constraint reviews_current_employee_has_no_end_date check (
    is_current_employee = false
    or worked_to is null
  )
);

create table if not exists public.review_reports (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  reported_by uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  reason public.report_reason not null,
  details text,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint review_reports_one_per_user unique (review_id, reported_by),
  constraint review_reports_details_length check (
    details is null
    or char_length(details) <= 2000
  )
);

create index if not exists companies_status_idx on public.companies (status);
create index if not exists companies_slug_idx on public.companies (slug);
create index if not exists companies_created_by_idx on public.companies (created_by);
create index if not exists reviews_status_idx on public.reviews (status);
create index if not exists reviews_company_id_idx on public.reviews (company_id);
create index if not exists reviews_user_id_idx on public.reviews (user_id);
create index if not exists review_reports_review_id_idx on public.review_reports (review_id);
create index if not exists review_reports_reported_by_idx on public.review_reports (reported_by);
create index if not exists review_reports_status_idx on public.review_reports (status);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.current_user_has_role(allowed_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = any(allowed_roles)
      and deleted_at is null
  );
$$;

create or replace function private.is_admin_or_moderator()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select private.current_user_has_role(array['admin'::public.user_role, 'moderator'::public.user_role]);
$$;

create or replace function private.prevent_profile_self_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if (select auth.uid()) = old.id and not private.current_user_has_role(array['admin'::public.user_role]) then
    if new.id is distinct from old.id then
      raise exception 'Users cannot change their profile id.';
    end if;

    if new.role is distinct from old.role then
      raise exception 'Users cannot change their own role.';
    end if;

    if new.created_at is distinct from old.created_at then
      raise exception 'Users cannot change their profile creation timestamp.';
    end if;

    if new.deleted_at is distinct from old.deleted_at then
      raise exception 'Users cannot delete their own profile.';
    end if;
  end if;

  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(coalesce(new.raw_user_meta_data ->> 'display_name', ''), '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.handle_updated_at();

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.handle_updated_at();

drop trigger if exists review_reports_set_updated_at on public.review_reports;
create trigger review_reports_set_updated_at
before update on public.review_reports
for each row execute function public.handle_updated_at();

drop trigger if exists profiles_prevent_self_privilege_escalation on public.profiles;
create trigger profiles_prevent_self_privilege_escalation
before update on public.profiles
for each row execute function private.prevent_profile_self_privilege_escalation();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.reviews enable row level security;
alter table public.review_reports enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles
for select
to authenticated
using ((select private.current_user_has_role(array['admin'::public.user_role])));

drop policy if exists "Users can update their own allowed profile fields" on public.profiles;
create policy "Users can update their own allowed profile fields"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "Anyone can read approved companies" on public.companies;
create policy "Anyone can read approved companies"
on public.companies
for select
to anon, authenticated
using (status = 'approved');

drop policy if exists "Users can read their own companies" on public.companies;
create policy "Users can read their own companies"
on public.companies
for select
to authenticated
using (created_by = (select auth.uid()));

drop policy if exists "Moderators can read all companies" on public.companies;
create policy "Moderators can read all companies"
on public.companies
for select
to authenticated
using ((select private.is_admin_or_moderator()));

drop policy if exists "Users can create pending companies" on public.companies;
create policy "Users can create pending companies"
on public.companies
for insert
to authenticated
with check (
  created_by = (select auth.uid())
  and status = 'pending'
);

drop policy if exists "Moderators can update all companies" on public.companies;
create policy "Moderators can update all companies"
on public.companies
for update
to authenticated
using ((select private.is_admin_or_moderator()))
with check ((select private.is_admin_or_moderator()));

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
on public.reviews
for select
to anon, authenticated
using (status = 'approved');

drop policy if exists "Users can read their own reviews" on public.reviews;
create policy "Users can read their own reviews"
on public.reviews
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Moderators can read all reviews" on public.reviews;
create policy "Moderators can read all reviews"
on public.reviews
for select
to authenticated
using ((select private.is_admin_or_moderator()));

drop policy if exists "Users can create pending reviews" on public.reviews;
create policy "Users can create pending reviews"
on public.reviews
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'pending'
);

drop policy if exists "Moderators can update all reviews" on public.reviews;
create policy "Moderators can update all reviews"
on public.reviews
for update
to authenticated
using ((select private.is_admin_or_moderator()))
with check ((select private.is_admin_or_moderator()));

drop policy if exists "Users can create open review reports" on public.review_reports;
create policy "Users can create open review reports"
on public.review_reports
for insert
to authenticated
with check (
  reported_by = (select auth.uid())
  and status = 'open'
);

drop policy if exists "Users can read their own review reports" on public.review_reports;
create policy "Users can read their own review reports"
on public.review_reports
for select
to authenticated
using (reported_by = (select auth.uid()));

drop policy if exists "Moderators can read all review reports" on public.review_reports;
create policy "Moderators can read all review reports"
on public.review_reports
for select
to authenticated
using ((select private.is_admin_or_moderator()));

drop policy if exists "Moderators can update all review reports" on public.review_reports;
create policy "Moderators can update all review reports"
on public.review_reports
for update
to authenticated
using ((select private.is_admin_or_moderator()))
with check ((select private.is_admin_or_moderator()));

grant usage on schema public to anon, authenticated;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

grant usage on type public.user_role to authenticated;
grant usage on type public.company_status to anon, authenticated;
grant usage on type public.review_status to anon, authenticated;
grant usage on type public.employment_type to anon, authenticated;
grant usage on type public.report_reason to authenticated;
grant usage on type public.report_status to authenticated;

revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function private.current_user_has_role(public.user_role[]) to authenticated;
grant execute on function private.is_admin_or_moderator() to authenticated;

grant select (id, role, display_name, created_at, updated_at, deleted_at)
on public.profiles to authenticated;
grant update (display_name)
on public.profiles to authenticated;

grant select (id, name, slug, sector, location, website, description, logo_url, status, created_at, updated_at)
on public.companies to anon;
grant select, insert, update on public.companies to authenticated;

grant select (
  id,
  company_id,
  job_title,
  employment_type,
  worked_from,
  worked_to,
  is_current_employee,
  overall_rating,
  salary_rating,
  payment_punctuality_rating,
  work_environment_rating,
  schedule_respect_rating,
  management_rating,
  contract_transparency_rating,
  growth_opportunity_rating,
  pros,
  cons,
  advice,
  status,
  created_at,
  updated_at
) on public.reviews to anon;
grant select, insert, update on public.reviews to authenticated;

grant select, insert, update on public.review_reports to authenticated;

commit;

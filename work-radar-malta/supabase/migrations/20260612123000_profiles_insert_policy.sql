begin;

drop policy if exists "Users can create their own profile fallback" on public.profiles;
create policy "Users can create their own profile fallback"
on public.profiles
for insert
to authenticated
with check (
  id = (select auth.uid())
  and role = 'user'
  and deleted_at is null
);

grant insert (id, role)
on public.profiles to authenticated;

commit;

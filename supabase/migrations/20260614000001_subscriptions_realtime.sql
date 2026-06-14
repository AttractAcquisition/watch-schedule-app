-- Watch Schedule — enable Supabase Realtime for the subscriptions table.
-- REPLICA IDENTITY FULL is required so that row-level filters work on UPDATE
-- events (Realtime needs the full old row to evaluate the filter).

alter table public.subscriptions replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'subscriptions'
  ) then
    alter publication supabase_realtime add table public.subscriptions;
  end if;
end $$;

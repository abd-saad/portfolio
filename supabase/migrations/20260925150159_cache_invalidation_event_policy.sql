create policy "service role manages cache invalidation events"
on public.cache_invalidation_events
for all
to service_role
using (true)
with check (true);

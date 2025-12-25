create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_id uuid not null references public.characters(id),
  title text,
  created_at timestamptz not null default now()
);

alter table public.chats enable row level security;

create policy "Users can read own chats"
on public.chats
for select
using (auth.uid() = user_id);

create policy "Users can create chats"
on public.chats
for insert
with check (auth.uid() = user_id);

create policy "Users can update own chats"
on public.chats
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own chats"
on public.chats
for delete
using (auth.uid() = user_id);

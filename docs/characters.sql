create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  system_prompt text not null,
  created_at timestamptz not null default now()
);

alter table public.characters enable row level security;

create policy "Characters are readable by everyone"
on public.characters
for select
using (true);

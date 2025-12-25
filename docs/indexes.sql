create index if not exists idx_messages_chat_created_at
on public.messages (chat_id, created_at);

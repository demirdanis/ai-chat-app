# AI Chat App

A production-ready AI chat application built with modern web technologies.  
The app supports multiple AI personas, real-time streaming responses, persistent chat history, and a mobile-first user experience.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first) + shadcn/ui (Radix UI)
- **Animations:** Framer Motion
- **Auth & Database:** Supabase (Auth, RLS, PostgreSQL)
- **AI Integration:** Streaming-ready architecture (Groq)
- **Theme Management:** next-themes (Dark / Light / System)
- **State Management:** React hooks + optimistic UI patterns

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/demirdanis/ai-chat-app.git
cd ai-chat-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

> Google OAuth must be enabled in Supabase Auth settings.

---

### 4. Generate Supabase types (optional but recommended)

If you have the Supabase CLI installed:

```bash
npm run supabase:types
```

This generates:

```
src/types/supabase.ts
```

---

### 5. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Application Flow

1. User visits `/`
2. Server checks authentication
   - Not logged in → `/login`
   - Logged in → `/chat`
3. User selects an AI character
4. A new chat session is created
5. Messages are streamed in real-time and persisted to the database

You can review the flow schema in `docs/flow.mermaid`.

---

## Architectural Decisions

### Server Components vs Client Components

The application uses a **hybrid architecture**.

#### Server Components

Used for:

- Authentication gating
- Initial data fetching (chat sessions, messages)
- Secure access to Supabase using server-side cookies

Benefits:

- Faster initial render
- No loading flicker
- Secure session handling
- Less client-side complexity

Examples:

- `src/app/chat/layout.tsx`
- `src/app/chat/[chatId]/page.tsx`
- `src/components/chat-list/ChatList.tsx`

---

#### Client Components

Used for:

- User interactions
- Streaming AI responses
- Animations and transitions
- Mobile drawer (hamburger menu)
- Optimistic UI updates

Benefits:

- Smooth UX
- Real-time updates
- Fine-grained control over UI state

Examples:

- `src/components/chat-client/ChatClient.tsx`
- `src/components/menu/profile-menu/ProfileMenu.tsx`

---

### Streaming Architecture

AI responses are streamed using a custom API route.

- Messages are streamed chunk-by-chunk
- UI updates in real-time (typewriter effect)
- Assistant messages are persisted **after streaming completes**

This ensures:

- Responsive UI
- Minimal perceived latency
- Reliable message persistence

---

### Database Design

- **users** → Supabase Auth
- **characters** → predefined AI personas
- **chats** → conversation sessions
- **messages** → chat history (user + assistant)

You can review the database schema in `docs/db.mermaid` and you can review \*.sql files on docs folder.

Key decisions:

- Row Level Security (RLS) enabled
- Messages fetched with limits for scalability
- Chat titles auto-generated from the first user message

---

### Theme System

- Implemented using `next-themes`
- Supports Light / Dark / System
- Theme toggle available in user profile menu
- Fully compatible with Tailwind CSS v4 CSS variables

---

### Mobile-First Design

- Responsive layout from 320px and up
- Desktop: persistent sidebar
- Mobile: hamburger menu with drawer
- Touch-friendly controls

---

## Why This Architecture?

This setup balances:

- **Performance** (server-rendered initial state)
- **Scalability** (client-driven interactions)
- **Security** (server-side auth + RLS)
- **Developer Experience** (clean separation of concerns)

It reflects real-world production patterns rather than a purely client-side demo.

---

## Future Improvements

- Rate limiting per user
- Chat search
- Conversation export
- Token usage tracking
- Multi-model support
- Chat history memory for AI
- Persistent conversation context

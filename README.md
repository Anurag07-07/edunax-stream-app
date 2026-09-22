# EDUNAX

EDUNAX is a live learning and streaming platform for students. Creators can stream lessons, manage their channel, chat with viewers in real time, and share focused learning sessions.

## Demo

Watch the project demo:

<p align="center">
  <a href="https://www.youtube.com/watch?v=T_GQ3B3Kskg">
    <img src="https://img.youtube.com/vi/T_GQ3B3Kskg/maxresdefault.jpg" alt="EDUNAX demo video" width="820">
  </a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=T_GQ3B3Kskg">Open the demo on YouTube</a>
</p>

For README viewers that support HTML video embeds:

<p align="center">
  <iframe width="820" height="460" src="https://www.youtube.com/embed/T_GQ3B3Kskg" title="EDUNAX demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</p>

## Features

- Live video streaming with LiveKit and OBS/WHIP ingress
- Real-time stream chat with persisted message history
- Creator dashboard for stream settings and connection keys
- Editable stream title and description
- UploadThing thumbnail upload, replacement, and removal
- Clerk authentication
- Follow, block, search, and recommended creators
- Responsive cinematic streaming interface
- Prisma with PostgreSQL persistence

## Tech Stack

- Next.js 15 with App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Prisma and PostgreSQL
- Clerk authentication
- LiveKit video and chat
- UploadThing file uploads
- Zustand for client-side UI state

## Requirements

- Node.js 20 or newer
- PostgreSQL database
- Clerk application
- LiveKit project
- UploadThing application

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root. Use your own credentials and never commit this file:

```env
DATABASE_URL="postgresql://..."

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
CLERK_WEBHOOK_SIGNING_SECRET="..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

LIVEKIT_URL="https://your-project.livekit.cloud"
LIVEKIT_WS_URL="wss://your-project.livekit.cloud"
LIVEKIT_API_KEY="..."
LIVEKIT_API_SECRET="..."

UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
UPLOADTHING_TOKEN="..."
```

Generate the Prisma client and apply the database schema:

```bash
npx prisma generate
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Streaming Setup

1. Sign in to EDUNAX.
2. Open your Creator Studio.
3. Open **Keys** and generate an RTMP or WHIP connection.
4. Add the generated server URL and stream key to OBS.
5. Start streaming in OBS.
6. Open your public creator page to watch the stream and use chat.

LiveKit webhook events should be sent to:

```text
https://your-domain.com/api/webhooks/livekit
```

The webhook updates the creator's live status when an ingress starts or ends.

## UploadThing Setup

The project includes an UploadThing route at:

```text
/api/uploadthing
```

The `thumbnailUploader` endpoint accepts one image up to 4 MB and automatically saves the uploaded URL to the creator's stream record.

## Production Build

```bash
npm run build
npm run start
```

For Vercel, add every variable from `.env` to the project environment settings and redeploy after changing server-side variables.

## Project Structure

```text
actions/       Server actions for auth, streams, follows, chat, and tokens
app/           Next.js routes, layouts, dashboards, and webhooks
components/    Shared UI and stream-player components
lib/           Database and service helpers
prisma/        PostgreSQL schema
public/        Static assets
styles/        Global design system and Tailwind styles
```

## License

This project is intended for learning and development use.

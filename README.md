# Newsletter AI App

A full-stack Next.js app for building AI-generated newsletters from RSS feeds.

## Overview

This project enables authenticated users to:

- add and manage RSS feeds
- fetch and store RSS article metadata
- select feeds and generate a structured newsletter
- stream AI-generated newsletter results from a Cohere model
- save generated newsletters for later review

## Key Features

- Protected dashboard built with `@clerk/nextjs`
- RSS feed validation, parsing, and article ingestion via `rss-parser`
- MongoDB persistence via Prisma and a MongoDB datasource
- AI newsletter generation using `@ai-sdk/cohere` and `ai`
- Streamed JSON object response with newsletter titles, subject lines, and body
- Client-side feed selection and generation flow

## Architecture

- `app/` - Next.js App Router pages and layout
- `app/dashboard/` - authenticated dashboard and generation flow
- `app/api/newsletter/generate-stream/route.ts` - AI newsletter streaming endpoint
- `actions/` - server-side business logic for RSS feeds, users, and newsletter generation
- `lib/prisma.ts` - Prisma client setup
- `prisma/schema.prisma` - MongoDB data model
- `hooks/` - client-side form, feed, and generation logic

## Important Data Models

- `User`
- `UserSettings`
- `RssFeed`
- `RssArticle`
- `Newsletter`

## Getting Started

### Install

```bash
npm install
```

> `npm install` will also run `prisma generate` via the project `postinstall` hook.

### Environment

Create a `.env` file with at least the following variables:

```env
DATABASE_URL=<your-mongodb-connection-string>
COHERE_API_KEY=<your-cohere-api-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/sign-in
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Prisma is configured to use MongoDB. The schema lives in `prisma/schema.prisma`.

Common Prisma commands:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:studio
```

## Usage

1. Sign in via Clerk at `/sign-in`
2. Add one or more RSS feed URLs
3. Select feeds and click `Generate Newsletter`
4. View the streamed newsletter result and save it to history

## Notes

- The dashboard is protected by Clerk middleware defined in `proxy.ts`.
- Newsletter generation is powered by a Cohere model and uses a prompt builder in `actions/buildNewletterPrompt.ts`.
- Feed ingestion validates URLs and stores articles in MongoDB.

## Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Run built app
- `npm run lint` - Run Biome checks
- `npm run format` - Format with Biome
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push Prisma schema to database
- `npm run prisma:studio` - Open Prisma Studio

## Tech Stack

- Next.js 16 App Router
- React 19
- Prisma + MongoDB
- Clerk authentication
- Cohere AI via `@ai-sdk/cohere`
- RSS parsing with `rss-parser`
- TypeScript
- Tailwind CSS + shadcn/ui
- Sonner toast notifications

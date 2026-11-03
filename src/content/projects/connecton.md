---
title: Connecton
order: 1
summary: A 3D isometric city where every person you want to keep in touch with lives in a house. Check in to wake it up.
year: "2026"
role: Design, full-stack build, deploy
stack: [React 19, three.js, Supabase, Tailwind, PWA, Gemini]
live: https://connecton-eta.vercel.app/
---

## The problem

Staying in touch with people is easy to intend and easy to forget. Contact lists and reminder apps feel like chores, so nobody opens them.

## The idea

Every connection lives in a house in a small 3D city. A house goes dark and falls asleep when you have not been in touch for as long as you chose for that person. Logging a note wakes it, earns XP, and grows the city. An AI helper drafts your next message from your recent notes, so the hardest part (starting) is done for you.

## What I built

- **A 3D isometric city** with react-three-fiber: a 7x7 grid of lots, streets, traffic, parks, hills and a harbor, all generated from the account id so no extra data is stored.
- **A server-side rules engine.** XP is decided by a Postgres function (`log_interaction()`), not the browser. Row-level security gives every row an owner, and the 20-connection cap is enforced by the database.
- **AI message drafts** through Gemini, with the tone chosen from how you know the person and a rolling daily limit enforced on the server.
- **Push reminders** from a scheduled Supabase edge function that runs every 15 minutes, delivered to an installable PWA.
- **A separate landing page** in Astro: about 13 KB compressed, no analytics unless configured, and every button opens the app on sign-up.

## Engineering notes

- 18 ordered SQL migrations, each next to its test, run with Node's built-in test runner.
- The model files are compressed and checked by scripts (`models:compress`, `models:check`) so the 3D scene stays light on phones.
- Anything that affects fairness or cost (XP, draft limits, the connection cap) lives in the database, not the client.

## Status

Live and in active development. The source is in a private repository and is available to share on request.

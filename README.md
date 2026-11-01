# Cael

A personal life agent you host yourself. Cael is one chat that can read and change
your own data: tasks, notes, journal, calendar, meals, training, reading, goals.
It's a Next.js app with an [eve](https://eve.dev/docs) agent behind it and a
Postgres database you own.

It was built by one person for one person, so it's opinionated. Fork it and make it
yours.

## What's in it

- **Chat agent** (`agent/`): an eve agent with ~50 tools over your data. It runs in
  the web app and can also answer on Telegram, SMS (Twilio) or Slack.
- **Task board**: three lanes (working now, waiting, up next), timers, progress notes.
- **Notes and memory**: capture a thought in chat, find it later by meaning.
- **Journal, vision and goals**: daily entries, long-term goals by horizon, a daily
  scorecard.
- **Calendar**: reads and writes Google Calendar.
- **Meals and training**: a meal bank and weekly plan, a training plan with
  workouts logged from chat.
- **MCP server** (`/api/mcp`): use the same tools from Claude Code or any MCP client.
- **Apps**: an iOS shell (Capacitor, `mobile/`) and a desktop shell (Tauri,
  `desktop/`) that both wrap the web app.

## Quick start (local)

You need Node 22+ and a Postgres database (a free [Neon](https://neon.tech) project
is the easiest).

```bash
git clone <this repo> cael && cd cael
npm install
cp .env.example .env.local
```

Fill in the **Required** block of `.env.local`: `DATABASE_URL`, `OWNER_EMAIL`,
`NEXT_PUBLIC_APP_URL`, `BASIC_AUTH_PASSWORD`, and `AI_GATEWAY_API_KEY` (or link a Vercel project and run
`vercel env pull`). Then:

```bash
npm run dev
```

Open http://localhost:3000/login-password and sign in with your password. Tables are
created on first boot, so there's no migration step.

Everything else in `.env.example` is optional. Each block turns on one feature, and
the app runs without it.

## Deploy

Cael is built for [Vercel](https://vercel.com):

1. Import your fork as a new Vercel project.
2. Add `DATABASE_URL`, `OWNER_EMAIL`, `NEXT_PUBLIC_APP_URL` (your production URL)
   and `BASIC_AUTH_PASSWORD` as environment variables. Model calls authenticate to AI Gateway on their own (OIDC).
3. Optional: add Clerk keys for real sign-in, connect a Blob store for uploads, and
   set `CRON_SECRET` for the scheduled jobs in `vercel.json`.
4. Deploy.

## Services it can use

| Service | For | Needed? |
| --- | --- | --- |
| Postgres (Neon) | All data | Yes |
| Vercel AI Gateway | The agent's model calls | Yes |
| Clerk | Sign-in | No, password login works |
| Google Cloud OAuth | Calendar, steps and sleep from a watch | No |
| Vercel Blob | Image and file uploads | No |
| ElevenLabs or DeepInfra | Agent voice | No, falls back to the device voice |
| Telegram, Twilio, Slack | Chat outside the web app | No |
| X, LinkedIn, Luma | Posting and events | No |

## Make it yours

- **Who it's for**: `OWNER_EMAIL` decides who gets the app. Telegram, SMS and
  Slack answer only the owner ids you set; with none set they answer nobody. It is single-user by
  design: there's one owner, and the data isn't split per account.
- **The agent's personality and rules**: `agent/instructions.md`.
- **Tools**: one file per tool in `agent/tools/`. Add a file and eve picks it up.
- **Database**: the schema lives in `lib/db.ts` (`applySchema`). Edits apply
  themselves on the next boot. A fresh database starts with a few example meals
  (`lib/example-meals.ts`); swap in your own on `/meals`.
- **Phone and desktop apps**: point `mobile/capacitor.config.ts` and
  `desktop/src-tauri/src/main.rs` at your deployed URL, and change the app ids
  (`com.example.cael`) before building.

## Project layout

```
agent/        eve agent: instructions, tools, skills, channels
app/(app)/    the private app's pages
app/api/      REST routes, the MCP server, cron jobs
lib/          database, integrations, shared logic
components/   UI (shadcn/ui and AI Elements)
mobile/       iOS shell (Capacitor)
desktop/      desktop shell (Tauri)
evals/        eve evals for tool routing
```

## Checks

```bash
npm run typecheck
```

There's no unit test runner. Agent behaviour is covered by the evals in `evals/`.

## License

MIT. See [LICENSE](LICENSE).

# RETIRED REPO - DO NOT DEPLOY

This repository, `watch-schedule-app`, is retired.

The live WatchSchedule product is in `watch-schedule-new`, which serves `app.watchschedule.com`.

Both repositories have pointed at the same Supabase project:

`diepraznybnjlwryibod`

Deploying edge functions or database migrations from this retired repository can overwrite the live backend used by real users.

Do not run these commands from this repository:

```bash
supabase functions deploy
supabase db push
```

The local Supabase CLI link state has been removed from this checkout so stray deploy commands fail loudly unless someone deliberately re-links the repo.

All live product work, frontend deploys, edge-function deploys, and schema changes belong in `watch-schedule-new`.

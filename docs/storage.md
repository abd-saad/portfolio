# Private Storage setup

The portfolio signs Supabase Storage links on the server for five minutes. Visitors do not need to log in. Only published assets are exposed: `assets/resume.pdf`, `assets/profile.jpg`, and Storage badge locations read from certification records.

Set `SUPABASE_SECRET_KEY` in your local `.env` and hosting provider's server environment before building or deploying. Obtain it from your Supabase project's API keys settings. It must belong to the same project as `NEXT_PUBLIC_SUPABASE_URL`. Never prefix this secret with `NEXT_PUBLIC_`, commit it, or place it in browser code. Existing anonymous database reads continue using `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Buckets are expected to be private already. No bucket settings or object locations are changed by this application update.

- `/api/resume` returns `{ "url": "..." }` with a signed attachment URL.
- `/api/profile-image` redirects to a freshly signed profile image URL.
- `/api/certifications/[id]/badge` looks up the record, then signs its same-project Storage object URL. Public, authenticated, and signed object URL forms are supported; old query tokens are discarded. Store durable public-format object locations in the database, even though the bucket is private, rather than generating tokens for database records.

All three routes are dynamic and return `Cache-Control: no-store`. Images use stable local route URLs with Next.js image optimization disabled for Supabase assets, so cached HTML and lazy-loaded badges never embed expired signatures. Credly images retain their existing image optimization. Missing or invalid badge sources use the shield placeholder; missing Storage objects return 404. Other failures return a generic error and are reported without provider payloads or signed tokens.

Signed links expire, but downloaded files remain usable. Anyone can request a fresh link for these portfolio assets. These routes do not provide authentication or permit arbitrary bucket/path queries.

## Verification

Run `node --test tests/*.test.mjs`, `pnpm lint`, `pnpm exec tsc --noEmit --incremental false`, and `pnpm build`. The tests mock Storage calls and require no secret or live bucket.

After configuring the key, verify profile and badge images in a browser, including after leaving the page open for more than five minutes before scrolling to a badge. Download the résumé and check that repeated requests receive working signed links. Inspect headers without copying signed tokens into logs. Check the browser bundle contains no secret credentials.

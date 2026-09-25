# Private Storage setup

The portfolio signs Supabase Storage links on the server for five minutes. Visitors do not need to log in. Only published assets are exposed: `assets/resume.pdf`, `assets/profile.jpg`, and Storage badge locations read from certification records.

Set `SUPABASE_SECRET_KEY` in your local `.env` and hosting provider's server environment before building or deploying. Obtain it from your Supabase project's API keys settings. It must belong to the same project as `NEXT_PUBLIC_SUPABASE_URL`. Never prefix this secret with `NEXT_PUBLIC_`, commit it, or place it in browser code. Existing anonymous database reads continue using `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Buckets are expected to be private already. No bucket settings or object locations are changed by this application update.

- `/api/resume?mode=preview` redirects to a fresh signed URL without forcing download. The Resume dropdown opens this in a new tab using the browser PDF viewer; browser settings may still download the file. Store the resume with the `application/pdf` content type.
- `/api/resume` (or `?mode=download`) returns `{ "url": "..." }` with a signed attachment URL.
- `/api/profile-image` returns profile image bytes fetched server-side through a fresh signed URL.
- `/api/certifications/[id]/badge` looks up the record, then signs its same-project Storage object URL and returns image bytes. Public, authenticated, and signed object URL forms are supported; old query tokens are discarded. Store durable public-format object locations in the database, even though the bucket is private, rather than generating tokens for database records.

All routes are dynamic. Resume responses and errors return `Cache-Control: no-store`. Successful profile and badge routes return image bytes with a one-hour public cache lifetime; they forward only the image content type and never expose signed URLs or upstream cookies. Next.js optimizes stable image routes to WebP with a one-hour minimum cache lifetime. Cached HTML never embeds expiring signatures. The 320px portrait is preloaded; 64px badges remain lazy-loaded. Credly images retain optimization. Missing or invalid badge sources use the shield placeholder; missing Storage objects return 404. Other failures return a generic error and are reported without provider payloads or signed tokens.

Signed links expire, but downloaded files remain usable. Anyone can request a fresh link for these portfolio assets. These routes do not provide authentication or permit arbitrary bucket/path queries.

## Verification

Run `node --test tests/*.test.mjs`, `pnpm lint`, `pnpm exec tsc --noEmit --incremental false`, and `pnpm build`. The tests mock Storage calls and require no secret or live bucket.

After configuring the key, verify profile and badge images in a browser, including after leaving the page open for more than five minutes before scrolling to a badge. Download the résumé and check that repeated requests receive working signed links. Inspect headers without copying signed tokens into logs. Check the browser bundle contains no secret credentials.

The Resume dropdown supports arrow keys, Home/End, Escape, and dismissal when focus or a click moves outside. Verify preview and download on desktop and mobile, including loading feedback and download failure retry. Invalid resume modes return 400.

## Server-only database access

All Supabase database queries run on the server using anonymous credentials and existing RLS policies. Database services and server clients are guarded with `server-only`. Social links render in the Hero and Contact sections on the server; successful results are cached for one hour under the `social-links` tag. Query failures are sanitized and reported, and the links are omitted without caching the failure as an empty result. Interactive controls continue to call local API routes.

Optimized image copies may remain available beyond the five-minute source signature expiry. Image replacement or removal may take at least one hour to appear; stale revalidation can extend this, so this is not a deletion deadline. Raster JPEG, PNG, WebP, AVIF, and GIF sources are accepted by the image proxy; other content types return an uncached error.

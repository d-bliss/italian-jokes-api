# Release checklist

Use this checklist when the v2 branch is ready to become the live site. It deliberately keeps deployment separate from writing and reviewing changes.

## Before creating a preview

1. Review the data diff. Confirm new joke IDs are stable, the text is intentional, and no unrelated files changed.
2. Run `npm run check` from a fresh terminal.
3. Run the site with `npx vercel dev` and check:
   - loading a random joke;
   - filtering each available style;
   - `GET /api/jokes/:id` for a known ID;
   - keyboard focus and the Listen control, where browser speech is supported.

## Preview deployment

Push the reviewed branch and let Vercel create its preview deployment. On the preview URL, verify:

- `GET /api/jokes` returns one JSON joke;
- `GET /api/jokes?subtype=Wordplay` returns a Wordplay joke;
- `GET /api/jokes/102` returns the expected stable record;
- `GET /api/subtypes` returns the current category counts;
- an `OPTIONS` request and an external browser request receive the expected CORS headers;
- the page fetches from its own relative `/api` path rather than production.

## Production release

Merge only after the GitHub Action and Vercel preview are both green. Then verify the same requests against `https://italian-jokes.vercel.app/` and do one browser smoke check.

## Public listing

After production is confirmed, review the PublicAPIs.dev entry. It should accurately state that the API uses HTTPS, needs no authentication, and permits browser requests with CORS. Update its endpoint or description only if it is stale.

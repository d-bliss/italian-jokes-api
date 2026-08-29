# Italian Jokes API

A small, public JSON API that returns random Italian jokes. Try the live site at [italian-jokes-dbliss-projects.vercel.app](https://italian-jokes-dbliss-projects.vercel.app/).

## API

### Get a random joke

```text
GET https://italian-jokes-dbliss-projects.vercel.app/api/jokes
```

### Filter by subtype

```text
GET https://italian-jokes-dbliss-projects.vercel.app/api/jokes?subtype=One-liner
```

Subtype names are case-insensitive and tolerate surrounding whitespace. Available subtypes are `One-liner`, `Observational`, `Stereotype`, `Wordplay`, and `Long`.

### Get a joke by ID

```text
GET https://italian-jokes-dbliss-projects.vercel.app/api/jokes/42
```

### List subtypes

```text
GET https://italian-jokes-dbliss-projects.vercel.app/api/subtypes
```

This returns the canonical subtype names and their current joke counts.

The joke endpoints return one JSON object:

```json
{
  "id": 1,
  "joke": "Why did the Mafia cross the road? Forget about it.",
  "type": "Italian",
  "subtype": "One-liner"
}
```

The API accepts browser requests from any origin and does not require authentication. It supports `GET` and CORS `OPTIONS` requests; other methods receive `405 Method Not Allowed`.

An unknown subtype returns `400 Bad Request` with the allowed values. An invalid ID returns `400 Bad Request`, while an ID that does not exist returns `404 Not Found`.

## Local development

Clone the repository and run the baseline tests:

```sh
git clone https://github.com/d-bliss/italian-jokes-api.git
cd italian-jokes-api
npm test
```

The project has no package dependencies. To preview both the static site and Vercel API functions locally, use the Vercel CLI:

```sh
npx vercel dev
```

Use Node 20 or later for the local Vercel workflow; CI uses the same baseline. The CLI may ask you to sign in or link the project on first use. It serves the local site and API functions together; there is intentionally no `npm start` server script.

## Release checks

The repository runs `npm run check` in GitHub Actions for every pull request and push. Before deploying, use the [release checklist](RELEASING.md) to verify a Vercel preview, the browser experience, and the public API listing.

## Joke data

The tracked [`data/jokes.json`](data/jokes.json) file is the current collection. Each record uses this shape:

```json
{
  "id": 1,
  "joke": "Joke text goes here.",
  "type": "Italian",
  "subtype": "One-liner"
}
```

IDs are stable once published: gaps are allowed, and existing records are not renumbered. New jokes should use a unique ID greater than the current maximum and must not duplicate an existing joke after differences in capitalization, punctuation, or spacing are ignored.

Check the data and run the tests before opening a pull request:

```sh
npm run check
```

## Contributing

Suggestions and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding data; it covers categories, stable IDs, and the duplicate checks. Every pull request and push runs `npm run check` automatically in GitHub Actions.

## License

[MIT](LICENSE) © Daniel Bliss

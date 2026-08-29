# Contributing jokes

Thanks for helping the collection grow. This is a small, curated API: submissions are reviewed before publication, and no jokes are scraped or published automatically.

## Ways to submit

- Use the [joke submission form](https://forms.gle/XnYn6EbHB9m23xfTA) if you would rather suggest a joke without editing code.
- Open a pull request if you are comfortable editing `data/jokes.json` directly.

## Before you submit

Please make sure the joke is short enough to work well in the API and is relevant to the project’s Italian-joke premise. Avoid duplicates, slurs, personal information, and copied material you do not have permission to share.

The collection uses these categories only:

- `One-liner`
- `Observational`
- `Stereotype`
- `Wordplay`
- `Long`

## Adding a record

1. Run `npm run next:id` to print the next available ID. Do not renumber existing jokes; gaps are intentional.
2. Add one record using this exact shape:

   ```json
   {
     "id": 103,
     "joke": "Your joke goes here.",
     "type": "Italian",
     "subtype": "Wordplay"
   }
   ```

3. Replace `103` with the current `npm run next:id` output. Keep the joke text trimmed. The data check rejects duplicate text even when capitalization, punctuation, curly quotes, or repeated spacing differ.
4. Run `npm run check` before opening the pull request.

## Review standard

Maintainers check that a submission is understandable, fits a category, is not a duplicate, and preserves the public JSON schema. Acceptance is discretionary; a rejected joke does not imply anything about the contributor.

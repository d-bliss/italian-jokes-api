const assert = require("node:assert/strict");
const test = require("node:test");

const jokes = require("../data/jokes.json");
const {
    EmptyJokeCollectionError,
    UnknownSubtypeError,
    filterBySubtype,
    findJokeById,
    getJokesForSubtype,
    normalizeSubtype,
    pickRandomJoke,
} = require("../lib/jokes");

test("normalizes subtype names without changing their canonical spelling", () => {
    assert.equal(normalizeSubtype(" wordplay "), "Wordplay");
    assert.equal(normalizeSubtype("ONE-LINER"), "One-liner");
    assert.equal(normalizeSubtype("not a subtype"), null);
    assert.equal(normalizeSubtype(undefined), null);
});

test("filters only records with the requested canonical subtype", () => {
    const wordplayJokes = filterBySubtype(jokes, "Wordplay");

    assert.ok(wordplayJokes.length > 0);
    assert.ok(wordplayJokes.every((joke) => joke.subtype === "Wordplay"));
});

test("gets subtype records from case-insensitive user input", () => {
    const wordplayJokes = getJokesForSubtype(jokes, " wordplay ");

    assert.ok(wordplayJokes.length > 0);
    assert.ok(wordplayJokes.every((joke) => joke.subtype === "Wordplay"));
});

test("rejects unknown subtypes with a typed domain error", () => {
    assert.throws(
        () => getJokesForSubtype(jokes, "Haiku"),
        UnknownSubtypeError,
    );
});

test("finds jokes by stable numeric ID", () => {
    assert.equal(findJokeById(jokes, 1).id, 1);
    assert.equal(findJokeById(jokes, 999), undefined);
    assert.equal(findJokeById(jokes, "1"), undefined);
});

test("selects deterministic random records at both valid bounds", () => {
    const records = [{ id: 1 }, { id: 2 }, { id: 3 }];

    assert.equal(pickRandomJoke(records, () => 0).id, 1);
    assert.equal(pickRandomJoke(records, () => 0.999999).id, 3);
});

test("does not select from an empty collection or accept invalid random output", () => {
    assert.throws(() => pickRandomJoke([]), EmptyJokeCollectionError);
    assert.throws(() => pickRandomJoke([{ id: 1 }], () => 1), RangeError);
});

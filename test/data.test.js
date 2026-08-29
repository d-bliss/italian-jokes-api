const assert = require("node:assert/strict");
const test = require("node:test");

const jokes = require("../data/jokes.json");
const {
    ALLOWED_SUBTYPES,
    EXPECTED_FIELDS,
    normalizeJokeText,
    validateJokes,
} = require("../scripts/validate-jokes");

test("the joke collection matches the v2 schema", () => {
    assert.deepEqual(validateJokes(jokes), []);

    for (const joke of jokes) {
        assert.deepEqual(Object.keys(joke).sort(), EXPECTED_FIELDS);
        assert.ok(Number.isInteger(joke.id) && joke.id > 0);
        assert.equal(joke.type, "Italian");
        assert.ok(ALLOWED_SUBTYPES.has(joke.subtype));
        assert.ok(joke.joke.trim().length > 0);
    }
});

test("normalization treats punctuation and capitalization variants as duplicates", () => {
    assert.equal(
        normalizeJokeText("  Caffè!  "),
        normalizeJokeText("caffe"),
    );
});

test("validation rejects duplicate normalized joke text", () => {
    const records = [
        { id: 1, joke: "Ciao, Roma!", type: "Italian", subtype: "Wordplay" },
        { id: 2, joke: "ciao roma", type: "Italian", subtype: "Wordplay" },
    ];

    assert.match(validateJokes(records).join("\n"), /duplicates joke id 1/);
});

test("validation rejects joke text with leading or trailing whitespace", () => {
    const records = [
        { id: 1, joke: " A properly shaped joke. ", type: "Italian", subtype: "One-liner" },
    ];

    assert.match(validateJokes(records).join("\n"), /leading or trailing whitespace/);
});

test("validation reports malformed records without crashing", () => {
    assert.deepEqual(validateJokes([null]), ["Record at index 0 must be an object."]);
});

const assert = require("node:assert/strict");
const test = require("node:test");

const jokes = require("../data/jokes.json");
const getJoke = require("../api/jokes");
const getJokeById = require("../api/jokes/[id]");
const getSubtypes = require("../api/subtypes");

function invoke(handler, { method = "GET", query = {} } = {}) {
    const result = { headers: {} };
    const response = {
        status(statusCode) {
            result.statusCode = statusCode;
            return response;
        },
        setHeader(name, value) {
            result.headers[name.toLowerCase()] = value;
        },
        json(body) {
            result.body = body;
            return response;
        },
        end() {
            result.ended = true;
            return response;
        },
    };

    handler({ method, query }, response);
    return result;
}

test("GET /api/jokes returns one record from the current collection", () => {
    const result = invoke(getJoke);

    assert.equal(result.statusCode, 200);
    assert.ok(jokes.some((joke) => joke.id === result.body.id));
    assert.deepEqual(Object.keys(result.body).sort(), ["id", "joke", "subtype", "type"]);
    assert.equal(result.headers["access-control-allow-origin"], "*");
    assert.equal(result.headers["cache-control"], "no-store");
    assert.equal(result.headers["content-type"], "application/json; charset=utf-8");
});

test("GET /api/jokes filters by subtype regardless of case or surrounding whitespace", () => {
    const result = invoke(getJoke, { query: { subtype: " wordplay " } });

    assert.equal(result.statusCode, 200);
    assert.equal(result.body.subtype, "Wordplay");
});

test("GET /api/jokes identifies unknown subtypes and lists valid values", () => {
    const result = invoke(getJoke, { query: { subtype: "Not a subtype" } });

    assert.equal(result.statusCode, 400);
    assert.deepEqual(result.body, {
        error: "Unknown subtype.",
        allowedSubtypes: ["One-liner", "Observational", "Stereotype", "Wordplay", "Long"],
    });
});

test("API handlers respond to CORS preflight requests", () => {
    const result = invoke(getJoke, { method: "OPTIONS" });

    assert.equal(result.statusCode, 204);
    assert.equal(result.ended, true);
    assert.equal(result.headers.allow, "GET, OPTIONS");
    assert.equal(result.headers["access-control-allow-methods"], "GET, OPTIONS");
});

test("API handlers reject unsupported methods", () => {
    const result = invoke(getJoke, { method: "POST" });

    assert.equal(result.statusCode, 405);
    assert.deepEqual(result.body, { error: "Method not allowed." });
    assert.equal(result.headers.allow, "GET, OPTIONS");
});

test("GET /api/subtypes returns canonical names with current counts", () => {
    const result = invoke(getSubtypes);

    assert.equal(result.statusCode, 200);
    assert.deepEqual(result.body, {
        subtypes: [
            { name: "One-liner", count: 28 },
            { name: "Observational", count: 15 },
            { name: "Stereotype", count: 15 },
            { name: "Wordplay", count: 27 },
            { name: "Long", count: 19 },
        ],
    });
});

test("GET /api/jokes/:id returns a stable joke by ID", () => {
    const result = invoke(getJokeById, { query: { id: "1" } });

    assert.equal(result.statusCode, 200);
    assert.equal(result.body.id, 1);
});

test("GET /api/jokes/:id distinguishes invalid and missing IDs", () => {
    const invalidResult = invoke(getJokeById, { query: { id: "zero" } });
    const missingResult = invoke(getJokeById, { query: { id: "999" } });

    assert.equal(invalidResult.statusCode, 400);
    assert.deepEqual(invalidResult.body, { error: "Joke ID must be a positive integer." });
    assert.equal(missingResult.statusCode, 404);
    assert.deepEqual(missingResult.body, { error: "Joke not found." });
});

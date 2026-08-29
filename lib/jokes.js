const SUBTYPES = [
    "One-liner",
    "Observational",
    "Stereotype",
    "Wordplay",
    "Long",
];

const ALLOWED_SUBTYPES = new Set(SUBTYPES);

class EmptyJokeCollectionError extends Error {
    constructor() {
        super("Cannot select a joke from an empty collection.");
        this.name = "EmptyJokeCollectionError";
    }
}

class UnknownSubtypeError extends Error {
    constructor(subtype) {
        super(`Unknown joke subtype: ${subtype}`);
        this.name = "UnknownSubtypeError";
        this.subtype = subtype;
    }
}

function normalizeSubtype(subtype) {
    if (typeof subtype !== "string") {
        return null;
    }

    const normalized = subtype.trim().toLowerCase();

    return SUBTYPES.find((candidate) => candidate.toLowerCase() === normalized) || null;
}

function filterBySubtype(jokes, subtype) {
    return jokes.filter((joke) => joke.subtype === subtype);
}

function getJokesForSubtype(jokes, subtype) {
    const canonicalSubtype = normalizeSubtype(subtype);

    if (!canonicalSubtype) {
        throw new UnknownSubtypeError(subtype);
    }

    return filterBySubtype(jokes, canonicalSubtype);
}

function findJokeById(jokes, id) {
    if (!Number.isInteger(id) || id <= 0) {
        return undefined;
    }

    return jokes.find((joke) => joke.id === id);
}

function pickRandomJoke(jokes, random = Math.random) {
    if (!Array.isArray(jokes) || jokes.length === 0) {
        throw new EmptyJokeCollectionError();
    }

    const index = Math.floor(random() * jokes.length);

    if (index < 0 || index >= jokes.length) {
        throw new RangeError("The random-number function must return a value from 0 up to 1.");
    }

    return jokes[index];
}

module.exports = {
    ALLOWED_SUBTYPES,
    EmptyJokeCollectionError,
    SUBTYPES,
    UnknownSubtypeError,
    filterBySubtype,
    findJokeById,
    getJokesForSubtype,
    normalizeSubtype,
    pickRandomJoke,
};

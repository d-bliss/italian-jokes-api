const jokes = require("../data/jokes.json");
const { ALLOWED_SUBTYPES } = require("../lib/jokes");

const EXPECTED_FIELDS = ["id", "joke", "subtype", "type"];

function normalizeJokeText(text) {
    return text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[’‘]/g, "'")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function validateJokes(records) {
    const errors = [];
    const ids = new Set();
    const normalizedTexts = new Map();

    if (!Array.isArray(records)) {
        return ["The joke collection must be an array."];
    }

    records.forEach((record, index) => {
        const label = `Record at index ${index}`;

        if (!record || typeof record !== "object" || Array.isArray(record)) {
            errors.push(`${label} must be an object.`);
            return;
        }

        const fields = Object.keys(record).sort();

        if (JSON.stringify(fields) !== JSON.stringify(EXPECTED_FIELDS)) {
            errors.push(`${label} must contain only: ${EXPECTED_FIELDS.join(", ")}.`);
        }

        if (!Number.isInteger(record.id) || record.id <= 0) {
            errors.push(`${label} has an invalid id.`);
        } else if (ids.has(record.id)) {
            errors.push(`${label} repeats id ${record.id}.`);
        } else {
            ids.add(record.id);
        }

        if (typeof record.joke !== "string" || record.joke.trim() === "") {
            errors.push(`${label} has an empty joke.`);
        } else {
            if (record.joke !== record.joke.trim()) {
                errors.push(`${label} has leading or trailing whitespace in its joke text.`);
            }

            const normalizedText = normalizeJokeText(record.joke);

            if (normalizedTexts.has(normalizedText)) {
                errors.push(
                    `${label} duplicates joke id ${normalizedTexts.get(normalizedText)} after normalization.`,
                );
            } else {
                normalizedTexts.set(normalizedText, record.id);
            }
        }

        if (record.type !== "Italian") {
            errors.push(`${label} must use type \"Italian\".`);
        }

        if (!ALLOWED_SUBTYPES.has(record.subtype)) {
            errors.push(`${label} has an invalid subtype.`);
        }
    });

    return errors;
}

function run() {
    const errors = validateJokes(jokes);

    if (errors.length === 0) {
        console.log(`Validated ${jokes.length} jokes.`);
        return;
    }

    console.error("Joke data validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
}

if (require.main === module) {
    run();
}

module.exports = {
    ALLOWED_SUBTYPES,
    EXPECTED_FIELDS,
    normalizeJokeText,
    validateJokes,
};

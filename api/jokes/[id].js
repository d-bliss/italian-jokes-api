const jokes = require("../../data/jokes.json");
const { handlePreflight, methodNotAllowed, setApiHeaders } = require("../../lib/http");
const { findJokeById } = require("../../lib/jokes");

function parseId(value) {
    if (typeof value !== "string" || !/^\d+$/.test(value)) {
        return null;
    }

    const id = Number(value);

    return Number.isSafeInteger(id) && id > 0 ? id : null;
}

module.exports = (req, res) => {
    setApiHeaders(res);

    if (handlePreflight(req, res)) {
        return;
    }

    if ((req.method || "GET") !== "GET") {
        return methodNotAllowed(res);
    }

    const id = parseId(req.query && req.query.id);

    if (!id) {
        return res.status(400).json({ error: "Joke ID must be a positive integer." });
    }

    const joke = findJokeById(jokes, id);

    if (!joke) {
        return res.status(404).json({ error: "Joke not found." });
    }

    return res.status(200).json(joke);
};

module.exports.parseId = parseId;

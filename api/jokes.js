const jokes = require("../data/jokes.json");
const { handlePreflight, methodNotAllowed, setApiHeaders } = require("../lib/http");
const {
    UnknownSubtypeError,
    getJokesForSubtype,
    pickRandomJoke,
    SUBTYPES,
} = require("../lib/jokes");

module.exports = (req, res) => {
    setApiHeaders(res);

    if (handlePreflight(req, res)) {
        return;
    }

    if ((req.method || "GET") !== "GET") {
        return methodNotAllowed(res);
    }

    const { subtype } = req.query || {};

    if (subtype) {
        try {
            return res.status(200).json(pickRandomJoke(getJokesForSubtype(jokes, subtype)));
        } catch (error) {
            if (error instanceof UnknownSubtypeError) {
                return res.status(400).json({
                    error: "Unknown subtype.",
                    allowedSubtypes: SUBTYPES,
                });
            }

            throw error;
        }
    }

    return res.status(200).json(pickRandomJoke(jokes));
};

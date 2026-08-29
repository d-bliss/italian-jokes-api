const jokes = require("../data/jokes.json");
const { handlePreflight, methodNotAllowed, setApiHeaders } = require("../lib/http");
const { filterBySubtype, SUBTYPES } = require("../lib/jokes");

module.exports = (req, res) => {
    setApiHeaders(res);

    if (handlePreflight(req, res)) {
        return;
    }

    if ((req.method || "GET") !== "GET") {
        return methodNotAllowed(res);
    }

    return res.status(200).json({
        subtypes: SUBTYPES.map((name) => ({
            name,
            count: filterBySubtype(jokes, name).length,
        })),
    });
};

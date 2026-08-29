const ALLOWED_METHODS = "GET, OPTIONS";

function setApiHeaders(response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Allow", ALLOWED_METHODS);
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
}

function handlePreflight(request, response) {
    if (request.method !== "OPTIONS") {
        return false;
    }

    response.status(204).end();
    return true;
}

function methodNotAllowed(response) {
    return response.status(405).json({ error: "Method not allowed." });
}

module.exports = {
    ALLOWED_METHODS,
    handlePreflight,
    methodNotAllowed,
    setApiHeaders,
};

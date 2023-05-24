const jokes = require("../jokes.json");

module.exports = (req, res) => {
    const { subtype } = req.query;

    if (subtype) {
        const filteredJokes = jokes.filter((joke) => joke.subtype === subtype);
        if (filteredJokes.length === 0) {
            return res
                .status(404)
                .json({ error: "No jokes found for the specified subtype." });
        }
        const randomIndex = Math.floor(Math.random() * filteredJokes.length);
        const randomJoke = filteredJokes[randomIndex];
        return res.status(200).json(randomJoke);
    }

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];
    res.status(200).json(randomJoke);
};

const jokes = require("../data/jokes.json");

const nextId = Math.max(0, ...jokes.map((joke) => joke.id)) + 1;

console.log(nextId);

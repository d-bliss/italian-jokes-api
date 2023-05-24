# Italian Jokes API

Welcome to the Italian Jokes API! This API allows you to retrieve jokes about Italians. You can try out the deployed application [here](https://italian-jokes.vercel.app/) to interact with the API and fetch jokes based on different subtypes.

## Table of Contents
- [Overview](#overview)
- [API Usage](#api-usage)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Overview
Welcome to the Italian Jokes API, a simple API that allows you to retrieve jokes about Italians. This API provides various endpoints to fetch jokes based on different subtypes, such as one-liners, observational, stereotypes, wordplay, and long jokes.

## API Usage
To retrieve a joke, you can make a GET request to the following endpoint:


GET /api/jokes

You can also specify a subtype to fetch jokes of a specific type by appending the `subtype` query parameter to the endpoint. The available subtypes include:
- All
- One-liner
- Observational
- Stereotype
- Wordplay
- Long

Example request to fetch jokes of the "One-liner" subtype:

GET /api/jokes?subtype=One-liner


The API responds with a JSON object containing the joke details, including the ID, joke text, type, and subtype.

## Getting Started

To run the Italian Jokes API locally, follow these steps:

1. Clone the repository:

git clone https://github.com/your-username/italian-jokes-api.git


2. Install the required dependencies:

npm install


3. Start the server:

npm start


4. The API will be available at `http://localhost:3000/api/jokes`.

## Contributing

Contributions are welcome! If you have any improvements or suggestions for the Italian Jokes API, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

Built by [Daniel Bliss](https://github.com/d-bliss/italian-jokes-api.


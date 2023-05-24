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

# Getting Started

To run the Italian Jokes API locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/your-username/italian-jokes-api.git
    ```

2. Install the required dependencies:

    ```
    npm install
    ```

3. Start the server:

    ```
    npm start
    ```

The API will be available at http://localhost:3000/api/jokes.


# Creating the jokes.json File

To access the collection of Italian jokes, you need to create the jokes.json file. Follow these additional instructions:

1. Navigate to the root folder of the project.
2. Create a new file named jokes.json.
3. Open the jokes.json file in a text editor.
4. Copy and paste the following jokes in the specified format:

    ```json
    [
        {
            "id": 1,
            "joke": "Why did the Mafia cross the road? Forget about it.",
            "type": "Italian",
            "subtype": "One-liner"
        },
        {
            "id": 2,
            "joke": "How does every Italian joke start? By looking over your shoulder.",
            "type": "Italian",
            "subtype": "Observational"
        },
        // Add more jokes following the same format...
    ]
    ```

5. Save the jokes.json file.


# Jokes Format

Each joke in the jokes.json file should be in the following format:

```json
{
    "id": [ID_NUMBER],
    "joke": "[JOKE_TEXT]",
    "type": "[JOKE_TYPE]",
    "subtype": "[JOKE_SUBTYPE]"
}

- [ID_NUMBER] represents the unique identifier for the joke (e.g., 1, 2, 3, ...).
- [JOKE_TEXT] is the actual joke text.
- [JOKE_TYPE] represents the type of joke (e.g., Italian, English, Puns, etc.).
- [JOKE_SUBTYPE] indicates the subtype of the joke (e.g., All, One-liner, Observational, Stereotype, Wordplay, Long).

Feel free to add more jokes following the same format. Make sure to separate each joke with a comma (,) except for the last one.

That's it! You have successfully set up and created the jokes.json file. You can now run the Italian Jokes API locally and access the jokes through the provided endpoint.

## Contributing

Contributions are welcome! If you have any improvements or suggestions for the Italian Jokes API, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

Built by [Daniel Bliss](https://github.com/d-bliss/italian-jokes-api).

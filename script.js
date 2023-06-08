document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    const subtypeSelect = document.getElementById("subtypeSelect");
    const jokeContainer = document.getElementById("jokeContainer");

    fetchButton.addEventListener("click", async () => {
        const subtype = subtypeSelect.value;
        let url = "https://italian-jokes.vercel.app/api/jokes";
        if (subtype) {
            url += `?subtype=${subtype}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch joke.");
            }
            const data = await response.json();
            displayJoke(data);
        } catch (error) {
            console.error(error);
            displayError("Error occurred while fetching the joke.");
        }
    });

    function displayJoke(joke) {
        jokeContainer.innerHTML = `
            <h2>${joke.subtype}</h2>
            <p>${joke.joke}</p>
        `;
    }

    function displayError(message) {
        jokeContainer.innerHTML = `
            <p class="error">${message}</p>
        `;
    }

    // Update the current year in the footer
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    const subtypeSelect = document.getElementById("subtypeSelect");
    const jokeContainer = document.getElementById("jokeContainer");
    const ttsToggle = document.getElementById("ttsToggle"); // get the toggle switch

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
            <h2>${joke.subtype} Joke</h2>
            <p>${joke.joke}</p>
        `;
        speakJoke(joke); // call the speakJoke function here
    }

    function speakJoke(joke) {
        if (!ttsToggle.checked) {
            return;
        }
        const utterance = new SpeechSynthesisUtterance(joke.joke);
        utterance.rate = 0.9; // Adjust the speech rate

        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(
            (voice) => voice.name === "Google UK English Female"
        );

        if (selectedVoice) {
            utterance.voice = selectedVoice; // Use the selected voice
        }
        // If no matching voice is found, the default voice will be used

        window.speechSynthesis.speak(utterance);
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

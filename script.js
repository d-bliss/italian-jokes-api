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
        speakJoke(joke.joke); // call the speakJoke function here
    }

    function speakJoke(jokeText) {
        if (!ttsToggle.checked || !("speechSynthesis" in window)) {
            return;
        }

        var synthesis = window.speechSynthesis;
        var voice;

        let voicesLoaded = new Promise((resolve) => {
            let id;

            id = setInterval(() => {
                if (synthesis.getVoices().length !== 0) {
                    resolve();
                    clearInterval(id);
                }
            }, 10);
        });

        voicesLoaded.then(() => {
            // Get the first `en` language voice in the list
            voice = synthesis.getVoices().filter(function (voice) {
                return voice.lang === "en";
            })[0];

            // Create an utterance object
            var utterance = new SpeechSynthesisUtterance(jokeText);

            // Set utterance properties
            utterance.voice = voice;
            utterance.pitch = 1;
            utterance.rate = 1;
            utterance.volume = 1;

            // Speak the utterance
            synthesis.speak(utterance);
        });
    }


    // Update the current year in the footer
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

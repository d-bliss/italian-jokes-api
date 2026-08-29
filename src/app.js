const fetchButton = document.querySelector("#fetchButton");
const jokeCard = document.querySelector("#jokeCard");
const jokeSubtype = document.querySelector("#jokeSubtype");
const jokeText = document.querySelector("#jokeText");
const statusMessage = document.querySelector("#statusMessage");
const subtypeSelect = document.querySelector("#subtypeSelect");
const listenButton = document.querySelector("#listenButton");
const speechControls = document.querySelector("#speechControls");

const speechIsSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let currentJoke = null;

function setStatus(message, state = "info") {
    statusMessage.textContent = message;
    statusMessage.dataset.state = state;
}

function setLoading(isLoading) {
    fetchButton.disabled = isLoading;
    fetchButton.textContent = isLoading ? "Getting a joke…" : "Get a joke";
}

function populateSubtypes(subtypes) {
    for (const subtype of subtypes) {
        const option = document.createElement("option");
        option.value = subtype.name;
        option.textContent = `${subtype.name} (${subtype.count})`;
        subtypeSelect.append(option);
    }
}

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
    }

    return response.json();
}

function resetListeningState() {
    listenButton.textContent = "Listen";
    listenButton.setAttribute("aria-pressed", "false");
}

function stopSpeaking({ announce = true } = {}) {
    window.speechSynthesis.cancel();
    resetListeningState();

    if (announce) {
        setStatus("Stopped listening.");
    }
}

function speakCurrentJoke() {
    if (!currentJoke || !speechIsSupported) {
        return;
    }

    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(currentJoke.joke);
    utterance.rate = 1;
    utterance.onend = () => {
        resetListeningState();
        setStatus("Here you go.");
    };
    utterance.onerror = (event) => {
        resetListeningState();

        if (event.error !== "canceled" && event.error !== "interrupted") {
            setStatus("Your browser couldn’t play the audio. Please try again.", "error");
        }
    };

    stopSpeaking({ announce: false });
    synthesis.speak(utterance);
    listenButton.textContent = "Stop listening";
    listenButton.setAttribute("aria-pressed", "true");
    setStatus("Reading with your browser’s default voice.");
}

function displayJoke(joke) {
    currentJoke = joke;
    jokeSubtype.textContent = joke.subtype;
    jokeText.textContent = joke.joke;
    jokeCard.hidden = false;
    speechControls.hidden = !speechIsSupported;
    listenButton.disabled = !speechIsSupported;
    setStatus("Here you go.");
}

async function getJoke() {
    if (speechIsSupported) {
        stopSpeaking({ announce: false });
    }

    setLoading(true);
    setStatus("Finding a good one…");

    const searchParams = new URLSearchParams();

    if (subtypeSelect.value) {
        searchParams.set("subtype", subtypeSelect.value);
    }

    const query = searchParams.toString();
    const url = query ? `/api/jokes?${query}` : "/api/jokes";

    try {
        displayJoke(await fetchJson(url));
    } catch (error) {
        console.error(error);
        jokeCard.hidden = true;
        setStatus("Couldn’t fetch a joke right now. Please try again.", "error");
    } finally {
        setLoading(false);
    }
}

async function loadSubtypes() {
    try {
        const data = await fetchJson("/api/subtypes");

        if (!Array.isArray(data.subtypes)) {
            throw new Error("The subtype response was not valid.");
        }

        populateSubtypes(data.subtypes);
        subtypeSelect.disabled = false;
        fetchButton.disabled = false;
        setStatus("Choose a style, or leave it on all jokes.");
    } catch (error) {
        console.error(error);
        setStatus("Categories could not load, but you can still get a random joke.", "error");
        fetchButton.disabled = false;
    }
}

fetchButton.addEventListener("click", getJoke);
listenButton.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        stopSpeaking();
        return;
    }

    speakCurrentJoke();
});
document.querySelector("#currentYear").textContent = new Date().getFullYear();

loadSubtypes();

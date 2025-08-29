const output = document.getElementById('output');
const startBtn = document.getElementById('start-btn');

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

// Initialize speech synthesis
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
}

// List of simple web commands
const commands = {
    "open youtube": () => window.open("https://www.youtube.com", "_blank"),
    "open google": () => window.open("https://www.google.com", "_blank"),
    "open github": () => window.open("https://www.github.com", "_blank"),
    "what time is it": () => speak("The current time is " + new Date().toLocaleTimeString()),
    "hello": () => speak("Hello! How can I help you today?"),
    "goodbye": () => speak("Goodbye! Have a nice day!")
};

// Start listening
startBtn.addEventListener('click', () => {
    recognition.start();
    output.textContent = "🎧 Listening...";
});

// Handle recognition results
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = "👉 Heard: " + transcript;

    if(transcript.includes("nova")) {
        const command = transcript.replace("nova", "").trim();
        let executed = false;
        for (let key in commands) {
            if (command.includes(key)) {
                commands[key]();
                speak("Executing command: " + key);
                executed = true;
                break;
            }
        }
        if (!executed) speak("Sorry, I didn't understand that command.");
    } else {
        output.textContent = "Say 'Nova' before the command.";
    }
};

// Handle errors
recognition.onerror = (event) => {
    output.textContent = "Error: " + event.error;
};

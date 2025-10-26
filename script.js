let recognition;
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const output = document.getElementById("output");

let isListening = false;
let finalTranscript = "";

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true; // keeps listening
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }
    output.value = finalTranscript + interimTranscript;
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // restart automatically if still listening
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
} else {
  alert("Your browser does not support Speech Recognition. Please use Chrome.");
}

startBtn.addEventListener("click", () => {
  if (!isListening) {
    recognition.start();
    isListening = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", () => {
  if (isListening) {
    isListening = false;
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

// The msg Contains every thing the person going to say ,the rate, the pitch, and the langauge
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector("[name=voice]");
const options = document.querySelectorAll("[type=range], [name=text]");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector("[name=text]").value;

function populateVoices() {
  voices = this.getVoices();
  console.log(voices);

  const voiceOptions = voices
    .map(
      (voice) =>
        `<option valur=${voice.name}>${voice.name}(${voice.lang})</option>`
    )
    .join("");
  voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
  console.log(this.value);
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));

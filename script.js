const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'e4373fe935d0499c9ffc1c73ddb49661', // This should be a secret in a production env.
        src: joke,
        hl: 'en-ie',
        v: 'harry',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Fetch joke from API
async function getJoke() {
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
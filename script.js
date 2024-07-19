const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar");

const allMusic = [
    {
        name: "Maza",
        artist: "B praak",
        img: "./image1.jpg",
        src: "./music/song1"
    },
    {
        name: "Lag Jaa Galay",
        artist: "Lata MangeshKar",
        img: "./image1.jpg",
        src: "./music/song2"
    },
    {
        name: "Tu Phir B Jan Hai Meri",
        artist: "Arjit Singh",
        img: "./image1.jpg",
        src: "./music/song3"
    },
    {
        name: "O Sanam O Sanam",
        artist: "Abida Perveen",
        img: "./image1.jpg",
        src: "./music/song4"
    }
];

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    console.log("Music loaded:", mainAudio.src);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb - 1].img;
    mainAudio.src = allMusic[indexNumb - 1].src + ".mp3";
    console.log("Loading music:", mainAudio.src);
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.innerHTML = `<i class="fi fi-rr-pause"></i>`;
    mainAudio.play();
    console.log("Playing music:", mainAudio.src);
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.innerHTML = `<i class="fi fi-rr-play"></i>`;
    mainAudio.pause();
    console.log("Paused music:", mainAudio.src);
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});
nextBtn.addEventListener("click", () => {
    nextMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    if (!isNaN(duration)) {
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    }

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

mainAudio.addEventListener("ended", () => {
    nextMusic();
});

// Event listener to catch any errors with the audio element
mainAudio.addEventListener("error", (e) => {
    console.error("Audio error:", e);
});

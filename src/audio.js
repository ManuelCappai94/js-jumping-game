let audioContext;
let musicTimer;
let masterGain;

/*const melody = [
    392, 392, 440, 494,
    523, 494, 440, 392,
    330, 330, 392, 440,
    494, 440, 392, 330
];*/

const backgroundMusic = {
    mainMenuTheme: new Audio("./src/soundtrack/mainMenuTheme.wav"),
    mainGameTheme: new Audio("./src/soundtrack/mainGameThemeLoop.wav"),
    victoryTheme: new Audio("./src/soundtrack/victoryTheme.wav"),
    defeatTheme: new Audio("./src/soundtrack/defeatTheme.wav"),
};


function getAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.13;
        masterGain.connect(audioContext.destination);
    }

    return audioContext;
}

function playTone(frequency, duration, type = "square", volume = 0.35) {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
}

let currentMusic = null;

function playMusic(track) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    currentMusic = track;
    currentMusic.mainGameTheme.loop = true;
    currentMusic.mainGameTheme.volume = 0.6;

    currentMusic.play().catch(console.error);
}

export function stopMusic() {
    if (!currentMusic) return;

    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = null;

}

export function mainMusic() {
    stopMusic();

    currentMusic = backgroundMusic.mainGameTheme;
    currentMusic.play();
}

export function menuMusic() {
    stopMusic();

    currentMusic = backgroundMusic.mainMenuTheme;
    currentMusic.play();
}

export function victoryMusic() {
    stopMusic();

    currentMusic = backgroundMusic.victoryTheme;
    currentMusic.play();
}

export function defeatMusic() {
    stopMusic();

    currentMusic = backgroundMusic.defeatTheme;
    currentMusic.play();
}
/*
export async function startMusic() {
    const ctx = getAudioContext();

    if (ctx.state === "suspended") {
        await ctx.resume();
    }

    if (musicTimer) return;

    let beat = 0;
    musicTimer = setInterval(() => {
        const note = melody[beat % melody.length];
        playTone(note, 0.12, "square", 0.18);

        if (beat % 4 === 0) {
            playTone(note / 2, 0.18, "triangle", 0.12);
        }

        beat += 1;
    }, 180);
}*/

export function playJumpSound() {
    playTone(660, 0.08, "square", 0.38);
    setTimeout(() => playTone(880, 0.08, "square", 0.28), 55);
}

export function playLandSound() {
    playTone(130, 0.07, "triangle", 0.22);
}

export function playMenuSound() {
    playTone(523, 0.08, "sine", 0.28);
}

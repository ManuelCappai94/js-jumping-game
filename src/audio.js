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
    JumpSFX: new Audio("./src/soundtrack/jump.wav"),
    playerDamage: new Audio("./src/soundtrack/playerDamage.wav"),
    LandSFX: new Audio("./src/soundtrack/land.wav")

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

export function playMusic(track) {
    stopMusic();

    currentMusic = track;
    currentMusic.loop = true;
    currentMusic.volume = 0.6;

    currentMusic.play().catch(console.error);
}

let currentSFX = null;

export function playSFX(track) {
    currentSFX == track;

    currentSFX.play().catch(console.catch);
}

export function stopMusic() {
    if (!currentMusic) return;

    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = null;
}

export function mainMusic() {
    currentMusic = backgroundMusic.mainGameTheme;
    currentMusic.loop = true;
    currentMusic.volume = 0.6;
    currentMusic.play().catch(console.error);
}

export function menuMusic() {
    currentMusic = backgroundMusic.mainMenuTheme;
    currentMusic.loop = true;
    currentMusic.volume = 0.6;
    currentMusic.play().catch(console.error);
}

export function victoryMusic() {
    stopMusic();
    currentMusic = backgroundMusic.victoryTheme;
    currentMusic.loop = false;
    currentMusic.volume = 0.6;
    currentMusic.play().catch(console.error);
}

export function defeatMusic() {
    stopMusic();
    currentMusic = backgroundMusic.defeatTheme;
    currentMusic.loop = false;
    currentMusic.volume = 0.6;
    currentMusic.play().catch(console.error);
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

/*export function playJumpSound() {
    currentSFX = backgroundMusic.JumpSFX;
    // setTimeout(() => playTone(880, 0.08, "square", 0.28), 55);
}*/

export function playDamageHitSound(){
    currentSFX = backgroundMusic.playerDamage;
    currentSFX.volume = 0.6;
    currentSFX.play().catch(console.error);
}

export function playJumpSound() {
    currentSFX = backgroundMusic.JumpSFX;
    currentSFX.volume = 0.6;
    currentSFX.play().catch(console.error);
}

export function playLandSound() {
    currentSFX = backgroundMusic.LandSFX;
    currentSFX.volume = 0.6;
    currentSFX.play().catch(console.error);
}

export function playMenuSound() {
     playTone(523, 0.08, "sine", 0.28);
}


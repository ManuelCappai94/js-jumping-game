import { menuMusic, mainMusic, victoryMusic, playMenuSound, defeatMusic, playMusic, stopMusic, setMusicPaused } from "./audio.js";
import { updatePlayer, player, keys } from "./player.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { boundaryCollision, collision  } from "./collision.js";

const gameCanvas = document.querySelector(".game");
const mainMenu = gameCanvas.querySelector(".main-menu");
const pauseMenu = gameCanvas.querySelector(".pause-menu");
const mainLayer = gameCanvas.querySelector(".game-layer--main");
const playerElement = mainLayer.querySelector(".player");
const ground = mainLayer.querySelector(".ground")

const gameLayerRect = mainLayer.getBoundingClientRect()
const gameLayerTop = gameLayerRect.top
const gameLayerWidth = gameLayerRect.width

const groundRect = ground.getBoundingClientRect()
const groundTop = groundRect.top

const groundY = groundTop - gameLayerTop

// const playerRect = playerElement.getBoundingClientRect()
// console.log(playerRect)

function initMenuActions() {

    mainMenu.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === "start") {
            stopMusic();
            playMenuSound();
            mainMusic();
            setMusicPaused(false);
            isGameStarted = true;
            isPaused = false;
            lastTime = 0;
            mainMenu.classList.add("hide-main-menu");
            pauseMenu.classList.add("hide-pause-menu");
            gameCanvas.classList.remove("is-paused");
            startGameLoop();
        }

        if (action === "exit") {
            playMenuSound();
            console.log("exit-game");
        }
    });

    pauseMenu.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === "resume") {
            resumeGame();
        }

        if (action === "main-menu") {
            returnToMainMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!isGameStarted || e.repeat) return;

        if (e.code === "Escape" || e.code === "KeyP") {
            e.preventDefault();
            togglePause();
        }
    });
}

playerElement.addEventListener("animationend", (e) => {
    if (e.animationName === "player-flash") {
        playerElement.classList.remove("damage");
    }
});

function renderPlayer() {

    playerElement.style.transform = `translate(${player.x}px, ${-player.y}px)`;

    const isMoving = keys.left || keys.right;

    playerElement.classList.toggle("running", isMoving);
    playerElement.classList.toggle("idle", !isMoving);

    if (player.hasTakenDamage) {
        
        playerElement.classList.add("damage");
        player.hasTakenDamage = false;

    }
}

let score = 0;

function addScore(points) {
    score += points;
    console.log(score);
}

let lastTime = 0;
let isGameStarted = false;
let isPaused = false;
let animationFrameId = null;

function startGameLoop() {
    if (animationFrameId !== null) return;

    animationFrameId = requestAnimationFrame(game);
}

function stopGameLoop() {
    if (animationFrameId === null) return;

    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
}

function togglePause() {
    if (isPaused) {
        resumeGame();
        return;
    }

    pauseGame();
}

function pauseGame() {
    isPaused = true;
    stopGameLoop();
    keys.left = false;
    keys.right = false;
    keys.jump = false;
    renderPlayer();
    pauseMenu.classList.remove("hide-pause-menu");
    gameCanvas.classList.add("is-paused");
    setMusicPaused(true);
    playMenuSound();
}

function resumeGame() {
    isPaused = false;
    lastTime = 0;
    pauseMenu.classList.add("hide-pause-menu");
    gameCanvas.classList.remove("is-paused");
    setMusicPaused(false);
    playMenuSound();
    startGameLoop();
}

function returnToMainMenu() {
    isGameStarted = false;
    isPaused = false;
    lastTime = 0;
    stopGameLoop();
    keys.left = false;
    keys.right = false;
    keys.jump = false;
    renderPlayer();
    pauseMenu.classList.add("hide-pause-menu");
    mainMenu.classList.remove("hide-main-menu");
    gameCanvas.classList.remove("is-paused");
    playMenuSound();
    stopMusic();
    menuMusic();
}

function game(timeStamp) {
    animationFrameId = null;

    if (!isGameStarted || isPaused) return;

    if (lastTime === 0) {
        lastTime = timeStamp;
    }

    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    // const gameAreaWidth = mainLayer.clientWidth;

    updatePlayer(deltaTime);
    renderPlayer();
    spawnObstacles(deltaTime, gameLayerWidth, groundY)
    updateObstacles(deltaTime, player, groundY)
    boundaryCollision(player, gameLayerRect, deltaTime )

    if (player.isDead) {
        defeatMusic();
        console.log("DEATH BITCTH");
        return
    }
 console.log(player.hasTakenDamage)
    startGameLoop();
}

initMenuActions();


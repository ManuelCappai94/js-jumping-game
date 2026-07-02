import {
    menuMusic,
    mainMusic,
    playMenuSound,
    defeatMusic,
    stopMusic,
    setMusicPaused,
    playDeathScream
} from "./audio.js";

import { 
    updatePlayer,
    player,
    initPlayerAnimation,
    renderPlayer,
    resetPlayer,
    clearPlayerInput
} from "./player.js";

import { spawnObstacles, updateObstacles, resetObstacles } from "./obstacles.js";
import { boundaryCollision } from "./collision.js";
import { resetScore } from "./score.js";
import { initVolumeControls } from "./volumeControls.js";

const gameCanvas = document.querySelector(".game");
const mainMenu = gameCanvas.querySelector(".main-menu");
const pauseMenu = gameCanvas.querySelector(".pause-menu");
const gameOverMenu = gameCanvas.querySelector(".game-over-menu");
const mainLayer = gameCanvas.querySelector(".game-layer--main");
const playerElement = mainLayer.querySelector(".player");
const ground = mainLayer.querySelector(".ground")

const gameLayerRect = mainLayer.getBoundingClientRect()
const gameLayerTop = gameLayerRect.top
const gameLayerWidth = gameLayerRect.width

const groundRect = ground.getBoundingClientRect()
const groundTop = groundRect.top

const groundY = groundTop - gameLayerTop



function initMenuActions() {
    mainMenu.addEventListener("click", (e) => {
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
            isGameOver = false;
            lastTime = 0;
            resetGameState();
            mainMenu.classList.add("hide-main-menu");
            pauseMenu.classList.add("hide-pause-menu");
            gameOverMenu.classList.add("hide-game-over-menu");
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

    gameOverMenu.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === "retry") {
            restartGame();
        }

        if (action === "main-menu") {
            returnToMainMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!isGameStarted || isGameOver || e.repeat) return;

        if (e.code === "Escape" || e.code === "KeyP") {
            e.preventDefault();
            togglePause();
        }
    });
}



let lastTime = 0;
let isGameStarted = false;
let isPaused = false;
let isGameOver = false;
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
    if (isGameOver) return;

    isPaused = true;
    stopGameLoop();
    clearPlayerInput()
    renderPlayer(playerElement);
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
    isGameOver = false;
    lastTime = 0;
    stopGameLoop();
    clearPlayerInput()
    renderPlayer(playerElement);
    pauseMenu.classList.add("hide-pause-menu");
    gameOverMenu.classList.add("hide-game-over-menu");
    mainMenu.classList.remove("hide-main-menu");
    gameCanvas.classList.remove("is-paused");
    playMenuSound();
    stopMusic();
    menuMusic();
}

function resetGameState() {
    resetPlayer()
    resetObstacles();
    renderPlayer(playerElement);
    resetScore()
}

function restartGame() {
    stopMusic();
    playMenuSound();
    mainMusic();
    setMusicPaused(false);
    isGameStarted = true;
    isPaused = false;
    isGameOver = false;
    lastTime = 0;
    resetGameState();
    gameOverMenu.classList.add("hide-game-over-menu");
    pauseMenu.classList.add("hide-pause-menu");
    mainMenu.classList.add("hide-main-menu");
    gameCanvas.classList.remove("is-paused");
    startGameLoop();
}

function showGameOverMenu() {
    isGameStarted = false;
    isPaused = false;
    isGameOver = true;
    lastTime = 0;
    stopGameLoop();
    clearPlayerInput();
    renderPlayer(playerElement);
    pauseMenu.classList.add("hide-pause-menu");
    gameOverMenu.classList.remove("hide-game-over-menu");
    gameCanvas.classList.remove("is-paused");
    defeatMusic();
}

function game(timeStamp) {
    animationFrameId = null;

    if (!isGameStarted || isPaused) return;

    if (lastTime === 0) {
        lastTime = timeStamp;
    }

    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    updatePlayer(deltaTime);
    renderPlayer(playerElement);
    spawnObstacles(deltaTime, gameLayerWidth, groundY)
    updateObstacles(deltaTime, player, groundY)
    boundaryCollision(player, gameLayerRect, deltaTime )

    if (player.isDead) {
        showGameOverMenu();
        playDeathScream();
        return
    }
    startGameLoop();
}

function initGame() {
    initVolumeControls();
    initMenuActions();
    initPlayerAnimation(playerElement);
}

initGame();


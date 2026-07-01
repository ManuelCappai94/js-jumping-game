import { menuMusic, mainMusic, victoryMusic, playMenuSound, defeatMusic, playMusic, stopMusic } from "./audio.js";
import { updatePlayer, player, keys } from "./player.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { boundaryCollision } from "./collision.js";

const gameCanvas = document.querySelector(".game");
const mainMenu = gameCanvas.querySelector(".main-menu");
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
            mainMenu.classList.add("hide-main-menu");
            requestAnimationFrame(game);
        }

        if (action === "exit") {
            playMenuSound();
            console.log("exit-game");
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

function displayScore() {

    let score = 0;

}

let lastTime = 0;

function game(timeStamp) {
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
    requestAnimationFrame(game);
}

initMenuActions();


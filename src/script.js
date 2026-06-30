import { startMusic, playMenuSound } from "./audio.js";
import { updatePlayer, player, keys } from "./player.js";

const gameCanvas = document.querySelector(".game");
const mainMenu = gameCanvas.querySelector(".main-menu");
const mainLayer = gameCanvas.querySelector(".game-layer--main");
const playerElement = mainLayer.querySelector(".player");

function initMenuActions() {
    mainMenu.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-action]");

        if (!btn) return;

        const action = btn.dataset.action;

        if (action === "start") {
            playMenuSound();
            await startMusic();
            mainMenu.classList.add("hide-main-menu");
            requestAnimationFrame(game);
        }

        if (action === "exit") {
            playMenuSound();
            console.log("exit-game");
        }
    });
}

function renderPlayer() {
    playerElement.style.transform = `translate(${player.x}px, ${-player.y}px)`;

    const isMoving = keys.left || keys.right;

    playerElement.classList.toggle("running", isMoving);
    playerElement.classList.toggle("idle", !isMoving);
}

let lastTime = 0;

function game(timeStamp) {
    if (lastTime === 0) {
        lastTime = timeStamp;
    }

    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    updatePlayer(deltaTime);
    renderPlayer();

    requestAnimationFrame(game);
}

initMenuActions();

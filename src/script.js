const gameCanvas = document.querySelector(".game")
const mainMenu = gameCanvas.querySelector(".main-menu")
const mainLayer = gameCanvas.querySelector(".game-layer--main")
const playerElement = mainLayer.querySelector(".player")

import { updatePlayer, player, keys} from "./player.js"



function initMenuActions(){
    mainMenu.addEventListener("click", (e)=>{
        const btn = e.target.closest("[data-action]")

        if (!btn) return;

        const action = btn.dataset.action;

        if(action === "start"){
            mainMenu.classList.add("hide-main-menu")
            
            requestAnimationFrame(game)
        }

        if(action === "exit"){
            console.log("exit-game")
        }

    } )
}

function renderPLayer(){
    playerElement.style.transform = `translate(${player.x}px)`

    const isMoving = keys.left || keys.right

   playerElement.classList.toggle("running", isMoving);
   playerElement.classList.toggle("idle", !isMoving)
}



let lastTime= 0;

function game(timeStamp){
    if (lastTime === 0) {
            lastTime = timeStamp;
    }

    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp; 
    const deltaSeconds = deltaTime / 1000;

    updatePlayer(deltaSeconds)
    renderPLayer()
    // console.log(deltaTime)
    requestAnimationFrame(game)
}

initMenuActions()
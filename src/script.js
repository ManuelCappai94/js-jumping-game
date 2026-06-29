const gameCanvas = document.querySelector(".game")
const mainMenu = gameCanvas.querySelector(".main-menu")
const mainLayer = gameCanvas.querySelector(".game-layer--main")
const player = mainLayer.querySelector(".player")

console.log(player)

function initMenuActions(){
    mainMenu.addEventListener("click", (e)=>{
        const btn = e.target.closest("[data-action]")

        if (!btn) return;

        const action = btn.dataset.action;

        if(action === "start"){
            mainMenu.classList.add("hide-main-menu")
            console.log("start-game")
        }

        if(action === "exit"){
            console.log("exit-game")
        }

    } )
}


initMenuActions()
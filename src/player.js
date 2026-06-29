export const player = {
    x: 80,
    y: 0,
    width: 38,
    height: 70,
    speed: 240,
};

export const keys = {
    left: false,
    right: false,
    jump: false,
};

function keyHelper(keyBoolean, event){
    if(event.code === "KeyA"){
        keys.left = keyBoolean
    }
    if(event.code === "KeyD"){
        keys.right = keyBoolean
    }
}

document.addEventListener("keydown", (e)=>{
    keyHelper(true, e)
})
document.addEventListener("keyup", (e)=>{
    keyHelper(false, e)
})

export function updatePlayer(deltaTime){
    if(keys.left){
        player.x -= player.speed * deltaTime
    }
    if(keys.right){
        player.x += player.speed * deltaTime
    }
}


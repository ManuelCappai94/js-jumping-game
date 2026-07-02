import { playJumpSound, playLandSound } from "./audio.js";

export const player = {
    x: 80,
    y: 0,
    width: 70,
    height: 90,
    speed: 240,
    velocityY: 0,
    isJumping: false,
    health : 100,
    hasTakenDamage : false,
    isDead: false
};

export const keys = {
    left: false,
    right: false,
    jump: false
};

const GRAVITY = 900;
const JUMP_FORCE = 450;

function keyHelper(keyBoolean, event) {
    if (event.code === "KeyA") {
        keys.left = keyBoolean;
    }

    if (event.code === "KeyD") {
        keys.right = keyBoolean;
    }

    if (event.code === "Space") {
        event.preventDefault();
        keys.jump = keyBoolean;
    }
}

document.addEventListener("keydown", (e) => {
    keyHelper(true, e);
});

document.addEventListener("keyup", (e) => {
    keyHelper(false, e);
});

export function updatePlayer(deltaTime, gameAreaWidth) {
    if (keys.left) {
        player.x -= player.speed * deltaTime;
    }

    if (keys.right) {
        player.x += player.speed * deltaTime;
    }

    if (keys.jump && !player.isJumping) {
        player.velocityY = JUMP_FORCE;
        player.isJumping = true;
        keys.jump = false;
        playJumpSound();
    }

    if (player.isJumping) {
        player.y += player.velocityY * deltaTime;
        player.velocityY -= GRAVITY * deltaTime;

        if (player.y <= 0) {
            player.y = 0;
            player.velocityY = 0;
            player.isJumping = false;
            playLandSound();
        }
    }
}

export function initPlayerAnimation(playerElement){
    playerElement.addEventListener("animationend", (e) => {
        if (e.animationName === "player-flash") {
            playerElement.classList.remove("damage");
        }
    });
}

export function renderPlayer(playerElement) {

    playerElement.style.transform = `translate(${player.x}px, ${-player.y}px)`;

    const isMoving = keys.left || keys.right;

    playerElement.classList.toggle("running", isMoving);
    playerElement.classList.toggle("idle", !isMoving);

    if (player.hasTakenDamage) {
        
        playerElement.classList.add("damage");
        player.hasTakenDamage = false;

    }
}

export function clearPlayerInput() {
    keys.left = false;
    keys.right = false;
    keys.jump = false;
}

export function resetPlayer() {
    player.x = 80;
    player.y = 0;
    player.velocityY = 0;
    player.isJumping = false;
    player.health = 100;
    player.hasTakenDamage = false;
    player.isDead = false;

    clearPlayerInput();
}
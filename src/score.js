export let score = 0;

const scoreDisplay = document.querySelector("#score-display");

export function addScore() {
    score += 10;

    scoreDisplay.textContent = `Score ${score}`;
    
    return score;
}

export function resetScore() {
    score = 0;

    scoreDisplay.textContent = `Score ${score}`;
}


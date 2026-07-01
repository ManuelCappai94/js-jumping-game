export let score = 0;

export function addScore(points) {
    score += points;
    console.log(score);
    return;
}

export function resetScore() {
    score = 0;
}


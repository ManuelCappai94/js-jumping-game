export let score = 0;

export function addScore(score) {
    score += 10;
    console.log(score);
    return;
}

export function resetScore() {
    score = 0;
}


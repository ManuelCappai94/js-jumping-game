import { addScore, score } from "./score.js";

const obstacleContainer = document.querySelector(".obstacles")

import { collision } from "./collision.js";

let obstacles = [];
let startTimer = 0;

let obstacleTypeIndex = 0;

const BASE_SPEED = 150;
const SPAWN_TIME = 1;

const OBSTACLE_TYPES = [
  {
    id: "cactus-small",
    className: "obstacle--cactus-small",
    width: 45,
    height: 70,
    damage: 10,
  },
  {
    id: "cactus-medium",
    className: "obstacle--cactus-medium",
    width: 65,
    height: 90,
    damage: 20,
  },
  {
    id: "cactus-large",
    className: "obstacle--cactus-large",
    width: 70,
    height: 100,
    damage: 30,
  },
  {
    id: "rock",
    className: "obstacle--rock",
    width: 90,
    height: 70,
    damage: 40,
  },
];

/*function getDifficultByScore(score) {
  switch (true) {
    case score >= 300:
      return {
        level: 4,
        baseSpeed: 300,
        label: "Level 4",
      };
    case score >= 200:
      return {
        level: 3,
        baseSpeed: 220,
        label: "Level 3"
      }
    case score >= 100:
      return {
        level: 2,
        baseSpeed: 180,
        label: "Level 2",
      }
    default:
      return {
        level: 1,
        baseSpeed: 150,
        label: "Level 1"
      }
  }
}*/

const difficulty = getDifficultyByScore(score);
console.log(difficulty);

function getDifficultyByScore(score) {
  if (score >= 300) {
    return {
      level: 4,
      baseSpeed: 300,
      label: "Level 4",
    };
  } else if (score >= 200) {
    return {
      level: 3,
      baseSpeed: 220,
      label: "Level 3",
    };
  } else if (score >= 100) {
    return {
      level: 2,
      baseSpeed: 180,
      label: "Level 2",
    };
  } else {
    return {
      level: 1,
      baseSpeed: 150,
      label: "Level 1",
    };
  }
  console.log(difficulty);
}

function getRandomSpeed() {
  const difficulty = getDifficultyByScore(score);
  const offsetSpeed = Math.floor(Math.random() * 80);

  return difficulty.baseSpeed + offsetSpeed;
}

function getNextObstacleType() {
  const obstacleType = OBSTACLE_TYPES[obstacleTypeIndex];

  obstacleTypeIndex = Math.floor(Math.random() * OBSTACLE_TYPES.length)

  if (obstacleTypeIndex >= OBSTACLE_TYPES.length) {
    obstacleTypeIndex = 0;
  }

  return obstacleType;
}

function createObstacleElement(obstacle) {
  const div = document.createElement("div")

  div.classList.add("obstacle", obstacle.className);

  div.style.left = `${obstacle.x}px`;
  div.style.top = `${obstacle.y}px`;

  return div
}
function randomObstacle(gameAreaWidth, groundY) {

  const obstacleType = getNextObstacleType();

  const obstacle = {
    id: crypto.randomUUID(),
    type: obstacleType.id,
    className: obstacleType.className,
    x: gameAreaWidth,
    y: groundY - obstacleType.height,
    width: obstacleType.width,
    height: obstacleType.height,
    speed: getRandomSpeed(),
    damage: obstacleType.damage,
    hasHit: false,
    scored: false,
    element: null,
  };

  obstacle.element = createObstacleElement(obstacle);

  return obstacle
}

export function spawnObstacles(deltatime, gameAreaWidth, groundY) {
  startTimer += deltatime
  const random = Math.floor(Math.random() * 2)
  const randomSpawn = SPAWN_TIME + random

  if (startTimer >= randomSpawn) {
    const newObstacle = randomObstacle(gameAreaWidth, groundY)

    obstacles.push(newObstacle)

    obstacleContainer.appendChild(newObstacle.element)
    startTimer = 0
  }

  // console.log(obstacles)
}

// export function updateObstacles(deltaTime){
//     obstacles.forEach(obstacle => {
//         obstacle.x -= obstacle.speed * deltaTime
//         obstacle.element.style.left = `${obstacle.x}px`
//         // console.log(obstacle.x + obstacle.width)
//         const currentObstacle = obstacle.x + obstacle.width
//         if(currentObstacle < 0){

//              obstacle.element.remove();
//              obstacles.splice(0, 1)
//         }
//     })
//     console.log(obstacles)
// }

export function updateObstacles(deltaTime, player, groundY) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];

    obstacle.x -= obstacle.speed * deltaTime;
    obstacle.element.style.left = `${obstacle.x}px`;

    const obstacleRightEdge = obstacle.x + obstacle.width;

    if (!obstacle.scored && obstacleRightEdge < player.x) {
      addScore(10);
      obstacle.scored = true;
    }

    collision(player, obstacle, groundY, deltaTime)

    if (obstacleRightEdge < 0) {
      obstacle.element.remove();
      obstacles.splice(i, 1);
    }
  }

  //   console.log(obstacles);
}

export function resetObstacles() {
  obstacles.forEach((obstacle) => obstacle.element.remove());
  obstacles = [];
  startTimer = 0;
}



const obstacleContainer = document.querySelector(".obstacles")

let obstacles = [];
let startTimer = 0



function createObstacleElement(width, height, x, y){
    const div = document.createElement("div")
    div.classList.add("cactus")

    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    return div
}
function randomObstacle (gameAreaWidth, groundY){
    const offsetWidth = Math.floor(Math.random()*20)
    const offsetHeight = Math.floor(Math.random()*15)
    const offsetSpeed = Math.floor(Math.random()*100)

    const height = 100 + offsetHeight

    const obstacle = {
        id : crypto.randomUUID(),
        width: 100 + offsetWidth,
        x: gameAreaWidth ,
        y:  groundY - height,
        height: height,
        speed : 150 + offsetSpeed,
        element: null,
        type : ""
    }

    const newObstacle = createObstacleElement(
        obstacle.width, 
        obstacle.height,
        obstacle.x,
        obstacle.y,
    )

        obstacle.element = newObstacle

    return obstacle
}

export function spawnObstacles(deltatime, gameAreaWidth, groundY){
   
  
     startTimer += deltatime
     if(startTimer >= 2){
         const newObstacle = randomObstacle(gameAreaWidth, groundY)
        
        obstacles.push(newObstacle)

        obstacleContainer.appendChild(newObstacle.element)
        startTimer = 0
        // console.log(newObstacle.element)
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

export function updateObstacles(deltaTime) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];

    obstacle.x -= obstacle.speed * deltaTime;
    obstacle.element.style.left = `${obstacle.x}px`;

    const obstacleRightEdge = obstacle.x + obstacle.width;

    if (obstacleRightEdge < 0) {
      obstacle.element.remove();
      obstacles.splice(i, 1);
    }
  }

  console.log(obstacles);
}

const obstacleElement = document.querySelector(".obstacles")

let obstacles = [];
  let startTimer = 0

const obstacle = {
    id : null,
    x: null,
    y: null,
    width: 100,
    height: 200,
    speed : 150,
    element: null,
    type : ""
}

function randomObstacle (gameAreaWidth, groundY){
    const offsetWidth = Math.floor(Math.random()*20)
    const offsetHeight = Math.floor(Math.random()*15)
    const offsetSpeed = Math.floor(Math.random()*50)

    obstacle.id = crypto.randomUUID()
    obstacle.x = gameAreaWidth
    obstacle.y = groundY - obstacle.height
    obstacle.width = obstacle.width + offsetWidth
    obstacle.height = obstacle.height + offsetHeight
    obstacle.speed = obstacle.speed + offsetSpeed

    return obstacle
}

export function spawnObstacles(deltatime){
   
  
     startTimer += deltatime
     if(startTimer >= 3){
         const newObstacle = randomObstacle(800, 42)
        console.log(newObstacle)
        startTimer = 0
     }
    
    console.log(startTimer)
}
const canvas = document.getElementById("game")

const BACKGROUND_COLOR = "#000000"
const ENTITY_COLORS = ["#FFFFFF", "#5b0161", "#37a47f", "#e17ab1", "#fa1cf7"]

const getContext = (element) => {
    if (element.getContext) {
        return element.getContext("2d")
    }

    alert(`That broser doesnt support canvas, there is no getContext method on object`)
}

const ctx = getContext(canvas)

const player = {
    position: [50, 50],//x, y
    gridSize: 10,
    currentDirection: "d",
    score: 0,
    color: "rgb(255, 0, 0)"//When the game start, the snake will be moving to the right
}


const fruit = {
    isSpawned: false,
    color: "#FFFFFF",
    position: [],
    gridSize: 10,
}

const drawFilledHead = (
    ctx,
    entity,
    color
) => {
    ctx.beginPath()
    ctx.fillStyle = entity.color || color || "rgb(200, 0, 0)"

    ctx.fillRect(
        entity.position[0],
        entity.position[1],
        entity.gridSize,
        entity.gridSize
    )
}

const drawHead = (
    ctx,
    entity,
    color
) => {
    // console.log(entity)
    ctx.beginPath()
    ctx.strokeStyle = entity.color || color || "rgb(200, 0, 0)"

    ctx.strokeRect(
        entity.position[0],
        entity.position[1],
        entity.gridSize,
        entity.gridSize
    )
}

const applyMove = (entity, direction, vector, value) => {
    entity.currentDirection = direction
    entity.position[vector] = value

    return direction
}

const getNextLeftPosition = (entity) => entity.position[0] - entity.gridSize
const getNextRightPosition = (entity) => entity.position[0] + entity.gridSize
const getNextUpPosition = (entity) => entity.position[1] - entity.gridSize
const getNextDownPosition = (entity) => entity.position[1] + entity.gridSize


const moveEntityLeft = (entity) => {
    const nextPosition = getNextLeftPosition(entity)
    
    return nextPosition < 0 ?
        applyMove(entity, "a", 0, canvas.width) :
        applyMove(entity, "a", 0, nextPosition)
}

const moveEntityRight = (entity) => {
    const nextPosition = getNextRightPosition(entity)

    return nextPosition > canvas.width ?
        applyMove(entity, "d", 0, 0) :
        applyMove(entity, "d", 0, getNextRightPosition(entity))
}
const moveEntityUp = (entity) => {
    const nextUpPosition = getNextUpPosition(entity)


    return nextUpPosition < 0 ?
        applyMove(entity, "w", 1, canvas.height) :
        applyMove(entity, "w", 1, getNextUpPosition(entity))
}
const moveEntityDown = (entity) => {
    const nextDownPosition = getNextDownPosition(entity)

    return nextDownPosition >= canvas.height ?
        applyMove(entity, "s", 1, 0) :
        applyMove(entity, "s", 1, getNextDownPosition(entity))
}

const moveEntity = (entity, direction, fruit) => {
    const _direction =
        direction ?
        direction :
        entity.currentDirection

    if (!_direction) {
        throw `Im not a genius, i cannot guess which direction do you want to move idiot!`
    }

    switch (_direction) {
        case "w":
            moveEntityUp(entity)
            break
        case "s":
            moveEntityDown(entity)
            break
        case "a":
            moveEntityLeft(entity)
            break
        case "d":
            moveEntityRight(entity)
            break
    }
}

const checkCanvasLimit = (entityPosition, canvas) => {
    return entityPosition[0] >= canvas.width ||
        entityPosition[0] <= 0 ||
        entityPosition[1] >= canvas.height ||
        entityPosition[1] <= 0
}

const checkCollisionVector = (vector, entity, fruit) => {
    return entity.position[vector] >= (fruit.position[vector]) &&
           entity.position[vector] <= (fruit.position[vector] + fruit.gridSize)
}

const checkCollision = (entity, fruit) => {
    return checkCollisionVector(0, entity, fruit) &&
        checkCollisionVector(1, entity, fruit)
}

const addCollision = (player, fruit, callback) => {
    if (checkCollision(player, fruit)) {
        return callback(player, fruit)
    }
}

const fruitCollision = (player, fruit) => {
    player.color = fruit.color
    fruit.isSpawned = false

    player.score += 2
    player.gridSize += fruit.gridSize

    setTimeout(() => {
        player.gridSize = 10
    }, 200)
}

document.addEventListener("keypress", (event) => {
    if (event.key.toLowerCase() === "p"){
        player.score += 1
    }

    moveEntity(player, event.key.toLowerCase(), fruit)

    addCollision(player, fruit, fruitCollision)
    refresh(ctx, player, fruit)
})

const drawBackground = (ctx, color) => {
    ctx.beginPath()
    ctx.fillStyle = color || "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const generateFruitCoordinate = (canvas) => {
    return [Math.random()*canvas.width, Math.random()*canvas.height]
}

const getRandomColor = (colors) => {
    return colors[Math.floor(Math.random()*colors.length)]
}

const generateVectorRandomPosition = (param) => {
    return Math.floor(Math.random()*param)
}

const getRandomPosition = (canvas) => {
    return [
        generateVectorRandomPosition(canvas.width - 10),
        generateVectorRandomPosition(canvas.height - 10)
    ]
}

const makeFruit = (fruit) => {
    if (!fruit.isSpawned) {
        fruit.isSpawned = true
        fruit.color = getRandomColor(ENTITY_COLORS)
        fruit.position = getRandomPosition(canvas)
    }
}

const isFruitSpawned = (fruit) => {
    return fruit.isSpawned &&
           fruit.position.length > 0
}

const drawFruit = (ctx, fruit) => {
    if (isFruitSpawned(fruit)) {
        return drawFilledHead(ctx, fruit)
    }
    
    console.log(fruit)
    makeFruit(fruit)
    drawFilledHead(ctx, fruit)
}

const refresh = (ctx, player, fruit) => {
    drawBackground(ctx, BACKGROUND_COLOR)
    drawHead(ctx, player)
    drawFruit(ctx, fruit)
}

const start = () => {
    refresh(ctx, player, fruit)
}

start()

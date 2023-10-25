const canvas = document.getElementById("game")

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
    color: "rgb(200, 0, 0)"//When the game start, the snake will be moving to the right
}

const drawHead = (
    ctx,
    entity,
    color
) => {
    ctx.beginPath()
    ctx.strokeStyle = entity.color || color || "rgb(200, 0, 0)"

    ctx.strokeRect(
        entity.position[0],
        entity.position[1],
        entity.gridSize,
        entity.gridSize
    )
}

drawHead(ctx, player)

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
    
    if (nextPosition < 0) {
        return
    }
    
    return applyMove(entity, "a", 0, nextPosition)
}
const moveEntityRight = (entity) => {
    const nextPosition = getNextRightPosition(entity)

    if (nextPosition > canvas.width) {
        return
    }

    applyMove(entity, "d", 0, getNextRightPosition(entity))
}
const moveEntityUp = (entity) => {
    const nextUpPosition = getNextUpPosition(entity)

    if (nextUpPosition < 0) {
        return
    }

    applyMove(entity, "w", 1, getNextUpPosition(entity))
}
const moveEntityDown = (entity) => {
    const nextDownPosition = getNextDownPosition(entity)

    if (nextDownPosition >= canvas.height) {
        return
    }

    applyMove(entity, "s", 1, getNextDownPosition(entity))
}

const moveEntity = (entity, direction) => {
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


document.addEventListener("keypress", (event) => {
    moveEntity(player, event.key.toLowerCase())
    console.log(player)
    drawHead(ctx, player)
})

// setInterval(() => moveEntity(player, player.currentDirec))
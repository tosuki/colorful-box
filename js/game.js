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
    currentDirection: "d"//When the game start, the snake will be moving to the right
}

const drawHead = (
    ctx,
    entity,
    color = "rgb(200, 0, 0)"
) => {
    ctx.beginPath()
    ctx.strokeStyle = color

    ctx.strokeRect(
        entity.position[0],
        entity.position[1],
        entity.gridSize,
        entity.gridSize
    )
}

drawHead(ctx, player)

const moveEntityLeft = (entity) => {
    entity.position[0] -= entity.gridSize
}
const moveEntityRight = (entity) => {
    entity.position[0] += entity.gridSize
}
const moveEntityUp = (entity) => {
    entity.position[1] -= entity.gridSize
}
const moveEntityDown = (entity) => {
    entity.position[1] += entity.gridSize
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
    drawHead(ctx, player)
})

// setInterval(() => moveEntity(player, player.currentDirec))
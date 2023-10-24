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
    gridSize: 10
}

const drawHead = (
    ctx,
    entity,
    color = "rgb(200, 0, 0)"
) => {
    ctx.beginPath()
    ctx.strokeStyle = color

    console.log(`entity[drawHead]: ${entity}`)
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

document.addEventListener("keypress", (event) => {
    const key = event.key.toLowerCase()

    console.log(player)

    switch (key) {
        case "w":
            moveEntityUp(player)
            break
        case "s":
            moveEntityDown(player)
            break
        case "a":
            moveEntityLeft(player)
            break
        case "d":
            moveEntityRight(player)
            break
    }

    drawHead(ctx, player)
})
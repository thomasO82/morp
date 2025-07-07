const winsentence = document.querySelector('#winsentence')
const gameContainer = document.querySelector('#gameContainer')
const replaybtn = document.querySelector('#replaybtn')
let morp = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]
let connectfour = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]
let grid = connectfour
let gameMode = "p4"
let currentPlayer = "X"
let gameover = false
let turn = 1
let cpuMode = false

replaybtn.addEventListener('click', () => {
    replay()
})
document.querySelector('#mv2').addEventListener('click', () => {
    grid = morp
    cpuMode = false
    replay()
})
document.querySelector('#mv1').addEventListener('click', () => {
    grid = morp
    cpuMode = true
    replay()
})

document.querySelector('#pv1').addEventListener('click', () => {
    grid = connectfour
    gameMode = "p4"
    cpuMode = true
    replay()
})
document.querySelector('#pv2').addEventListener('click', () => {
    grid = connectfour
    gameMode = "p4"
    cpuMode = false
    replay()
})

function displayGrid() {
    gameContainer.innerHTML = ""
    grid.forEach((row, i) => {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div')
            cellElement.classList.add('cell')
            rowElement.appendChild(cellElement)
            cellElement.addEventListener('click', () => {
                play(cellElement, i, j)
            })
        })
        gameContainer.appendChild(rowElement)
    })
}

function play(cell, i, j) {
    currentPlayer = turn % 2 != 0 ? "X" : "O"
    if (cell.textContent == "" && !gameover) {

        if (gameMode != "p4") {
            grid[i][j] = currentPlayer
            cell.textContent = currentPlayer
            checkwinMorp()
        } else {
            const index = gravity(j)
            document.querySelectorAll('.cell')[index * 7 + j].textContent = currentPlayer
            console.log(grid);
            checkwinConnect()
        }

        if (cpuMode) {
            currentPlayer = "O"

            cpuplay()
        }
        turn++
    }
}

function cpuplay() {
    if (!gameover) {
        let randX = randomize(0, grid.length - 1)
        let randY = randomize(0, grid[randX].length - 1)
        while (grid[randX][randY] != "") {
            randX = randomize(0, grid.length - 1)
            randY = randomize(0, grid[randX].length - 1)
        }

        if (gameMode != "p4") {
            grid[randX][randY] = "O"
            document.querySelectorAll('.cell')[randX * 3 + randY].textContent = "O"
            checkwinMorp()
        } else {
            const index = gravity(randY)
            console.log(index);
            document.querySelectorAll('.cell')[index * 7 + randY].textContent = "O"
            checkwinConnect()
        }
        turn++
    }
}

function checkwinMorp() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][0] != "" && grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] ||
            grid[0][i] != "" && grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i]
        ) {
            gameover = true
            winsentence.textContent = currentPlayer + " Win"
        }
    }
    if (grid[0][0] != "" && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] ||
        grid[0][2] != "" && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]

    ) {
        gameover = true
        winsentence.textContent = currentPlayer + " Win"
    }
    if (turn >= 9) {
        gameover = true
        winsentence.textContent = "egalité"


    }
}


function gravity(index) {
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i + 1]) {
            grid[i][index] = currentPlayer
            return i
        }
        if (grid[i + 1][index] != "") {
            grid[i][index] = currentPlayer
            return i
        }

    }
    console.log(grid);

}

function checkwinConnect() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j - 3] && grid[i][j - 3] != "" && grid[i][j] == grid[i][j - 1] && grid[i][j - 1] == grid[i][j - 2] && grid[i][j - 2] == grid[i][j - 3] ||
                grid[i - 3] && grid[i][j] != "" && grid[i][j] == grid[i - 1][j] && grid[i - 1][j] == grid[i - 2][j] && grid[i - 2][j] == grid[i - 3][j]
            ) {
                console.log(currentPlayer + "win");
                gameover = true
            }

            if (grid[i - 3] && grid[i - 3][j - 3] && grid[i - 3][j - 3] != "" && grid[i][j] == grid[i - 1][j - 1] && grid[i - 1][j - 1] == grid[i - 2][j - 2] && grid[i - 2][j - 2] == grid[i - 3][j - 3] ||
                grid[i + 3] && grid[i + 3][j - 3] && grid[i + 3][j - 3] != "" && grid[i][j] == grid[i + 1][j - 1] && grid[i + 1][j - 1] == grid[i + 2][j - 2] && grid[i + 2][j - 2] == grid[i + 3][j - 3]

            ) {
                console.log(currentPlayer + "win");
                gameover = true

            }
        }

    }
}

function replay() {
    grid = gameMode != "p4" ? [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ] :
        [
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
        ]

    turn = 1
    gameover = false
    displayGrid()

}

function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}



displayGrid()



const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let fps = 30;

// @param x : row index, starting at 1
// @param y : column index, starting at 1
function getElementOfCssGrid(x, y) {
    let gridComputedStyle = window.getComputedStyle(document.querySelector('.grid-container'));
    let col = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    let n = col * (x - 1) + y;
    return document.querySelector('.grid-item:nth-child(' + n + ')');
}

let createGame = () => {
    game = new Board();

    // checks the clients local storage for a saved highscore and retrieves it
    if (typeof (Storage) !== "undefined") {
        highscore = localStorage.getItem("high-score");
        if(highscore === null){
            highscore = 0;
            localStorage.setItem("high-score", 0);
        }
        document.querySelector(".high-score").innerHTML = highscore;
        game.setHighscore(parseInt(highscore));
    }

};

let gameLoop = () => {
    game.moveCells();
    updateCells();
    updateScore();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

function calculateColor(value) {
    let color;
    if (value == 2) {
        color = 'rgb(238,228,218)';
    }
    else if (value == Math.pow(2, 2)) {
        color = 'rgb(237,224,200)';
    }
    else if (value == Math.pow(2, 3)) {
        color = 'rgb(242,177,121)';
    }
    else if (value == Math.pow(2, 4)) {
        color = 'rgb(245,149,99)';
    }
    else if (value == Math.pow(2, 5)) {
        color = 'rgb(245,115,93)';
    }
    else if (value == Math.pow(2, 6)) {
        color = 'rgb(246,94,59)';
    }
    else {
        color = 'rgb(204,192,179)';
    }
    return color;
}

let updateCells = () => {
    for (let i = 0; i < game.board.length; i++) {
        for (let j = 0; j < game.board.length; j++) {
            let cell = getElementOfCssGrid(i + 1, j + 1);
            let val = game.getCell(i, j);

            cell.innerHTML = val;
            cell.style.backgroundColor = calculateColor(val);

            if (val == 0) {
                cell.innerHTML = "";
            }
            else if (val > 4) {
                cell.style.color = "white";
            }
            else {
                cell.style.color = "rgb(61,49,34)";
            }
        }
    }
};

let updateScore = () => {
    let score = document.querySelector(".score");
    score.innerHTML = game.score;

    if (game.score > game.highscore) {
        game.setHighscore(game.score);
        let highscore = document.querySelector(".high-score");
        highscore.innerHTML = game.highscore;
    }
}

createGame();
gameLoop();


window.addEventListener("beforeunload", function (e) {
    localStorage.setItem("high-score", game.highscore);
});

document.addEventListener("keydown", eventHandler);

let btn = document.querySelector(".resetBtn");
btn.addEventListener("click", eventHandler);

function eventHandler(event) {
    if (event.repeat) {
        return;
    }
    else if (event.key == "ArrowDown") {
        game.pushDirection = DIRECTION_BOTTOM;
    }
    else if (event.key == "ArrowUp") {
        game.pushDirection = DIRECTION_UP;
    }
    else if (event.key == "ArrowLeft") {
        game.pushDirection = DIRECTION_LEFT;
    }
    else if (event.key == "ArrowRight") {
        game.pushDirection = DIRECTION_RIGHT;
    }
    else if (event.type === "click") {
        game.reset();
    }
}
class Board {
    constructor() {
        this.reset();
    }

    reset() {
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.spawnCell();
        this.spawnCell();
        this.drawDefaultCells();
        this.pushDirection = 0;
        this.score = 0;
    }

    spawnCell() {
        let free_indices = this.getFreeCells();
        if(free_indices.length === 0){
            return
        }
        let idx = Math.floor(Math.random() * free_indices.length);
        let board_idx = free_indices[idx];
        this.board[board_idx[0]][board_idx[1]] = 2;
    }

    getCell(x, y) {
        return this.board[x][y];
    }

    getFreeCells() {
        let indexes = [];
        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board[i].length; j++){
                if(this.board[i][j] == 0){
                    indexes.push([i,j]);
                }
            }
        }
        return indexes;
    }

    moveCells() {
        let boardChanged = false;
        if (this.pushDirection == DIRECTION_BOTTOM) {
            boardChanged = this.pushDown();
        }
        else if (this.pushDirection == DIRECTION_UP) {
            boardChanged = this.pushUp();
        }
        else if (this.pushDirection == DIRECTION_LEFT) {
            boardChanged = this.pushLeft();
        }
        else if (this.pushDirection == DIRECTION_RIGHT) {
            boardChanged = this.pushRight();
        }

        if (boardChanged) {
            this.spawnCell();    
        }
        this.pushDirection = 0;
    }

    pushLeft() {
        let moved = false;
        /// loop row by row
        for (let i = 0; i < this.board.length; i++) {
            // merging
            let mostLeftCell, neighborCell;
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] !== 0) {
                    if (mostLeftCell == undefined) {
                        mostLeftCell = j;
                    }
                    else {
                        neighborCell = j;
                    }
                }

                if (mostLeftCell == undefined || neighborCell == undefined)
                    continue;

                if (this.board[i][mostLeftCell] === this.board[i][neighborCell]) {
                    this.board[i][mostLeftCell] *= 2;
                    this.board[i][neighborCell] = 0;
                    this.score += this.board[i][mostLeftCell];
                    mostLeftCell = undefined;
                    neighborCell = undefined;
                    moved = true;
                }
                else{
                    mostLeftCell = neighborCell;
                    neighborCell = undefined;
                }
            }

            // shifting
            let steps = 0;
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 0) {
                    steps += 1;
                }
                else if (steps > 0) {
                    this.board[i][j - steps] = this.board[i][j];
                    this.board[i][j] = 0;
                    moved = true;
                }
            }
        }
        return moved;
    }

    pushRight() {
        let moved = false;
        // loop row by row
        for (let i = 0; i < this.board.length; i++) {
            // merging
            let mostRightCell, neighborCell;
            for (let j = this.board[i].length - 1; j >= 0; j--) {
                if (this.board[i][j] !== 0) {
                    if (mostRightCell == undefined) {
                        mostRightCell = j;
                    }
                    else {
                        neighborCell = j;
                    }
                }

                if (mostRightCell == undefined || neighborCell == undefined)
                    continue;

                if (this.board[i][mostRightCell] === this.board[i][neighborCell]) {
                    this.board[i][mostRightCell] *= 2;
                    this.board[i][neighborCell] = 0;
                    this.score += this.board[i][mostRightCell];
                    mostRightCell = undefined;
                    neighborCell = undefined;
                    moved = true;
                }
                else{
                    mostRightCell = neighborCell;
                    neighborCell = undefined;
                }
            }

            // shifting
            let steps = 0;
            for (let j = this.board[i].length - 1; j >= 0; j--) {
                if (this.board[i][j] == 0) {
                    steps += 1;
                }
                else if (steps > 0) {
                    this.board[i][j + steps] = this.board[i][j];
                    this.board[i][j] = 0;
                    moved = true;
                }
            }
        }
        return moved;
    }

    pushUp() {
        let moved = false;
        // loops column by column
        for (let j = 0; j < this.board[0].length; j++) {
            // merging
            let mostTopCell, neighborCell;
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][j] !== 0) {
                    if (mostTopCell == undefined) {
                        mostTopCell = i;
                    }
                    else {
                        neighborCell = i;
                    }
                }

                if (mostTopCell == undefined || neighborCell == undefined)
                    continue;

                if (this.board[mostTopCell][j] === this.board[neighborCell][j]) {
                    this.board[mostTopCell][j] *= 2;
                    this.board[neighborCell][j] = 0;
                    this.score += this.board[mostTopCell][j];
                    mostTopCell = undefined;
                    neighborCell = undefined;
                    moved = true;
                }
                else{
                    mostTopCell = neighborCell;
                    neighborCell = undefined;
                }
            }

            // shifting
            let steps = 0;
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][j] === 0) {
                    steps += 1;
                }
                else if (steps > 0) {
                    this.board[i - steps][j] = this.board[i][j];
                    this.board[i][j] = 0;
                    moved = true;
                }
            }
        }
        return moved;
    }

    pushDown() {
        let moved = false;
        // loops column by column
        for (let j = 0; j < this.board[0].length; j++) {
            // merging
            let mostBottomCell, neighborCell;
            for (let i = this.board.length - 1; i >= 0; i--) {
                if (this.board[i][j] !== 0) {
                    if (mostBottomCell == undefined) {
                        mostBottomCell = i;
                    }
                    else {
                        neighborCell = i;
                    }
                }

                if (mostBottomCell == undefined || neighborCell == undefined)
                    continue;

                if (this.board[mostBottomCell][j] === this.board[neighborCell][j]) {
                    this.board[mostBottomCell][j] *= 2;
                    this.board[neighborCell][j] = 0;
                    this.score += this.board[mostBottomCell][j];
                    mostBottomCell = undefined;
                    neighborCell = undefined;
                    moved = true;
                }
                else{
                    mostBottomCell = neighborCell;
                    neighborCell = undefined;
                }
            }

            // shifting
            let steps = 0;
            for (let i = this.board.length - 1; i >= 0; i--) {
                if (this.board[i][j] === 0) {
                    steps += 1;
                }
                else if (steps > 0) {
                    this.board[i + steps][j] = this.board[i][j];
                    this.board[i][j] = 0;
                    moved = true;
                }
            }
        }
        return moved;
    }
}
const cell_size = 109;

class Cell {
    constructor(val, htmlCell) {
        this.value = val;
        this.blocked = false;
        this.color = 'rgb(238,228,218)';
        this.x = 0;
        this.y = 0;
    }

    canMove(direction) {

    }

    move(direction){

    }

    checkCollision(){
        
    }

    setColor(color) {
        this.color = color;
    }
}
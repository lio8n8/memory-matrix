/**
 * Memory Matrix
 * 
 * Try to repeat random generated pattern.
 * Game Board consists of N tiles (rows * columns )
 * For every success of repeating pattern GameBoard increases by one row or column
 * (till to max possible number of rows r columns). For every failure number of rows 
 * or colums decrease by one (till to min possible values of rows and colums).
 */
class Game {
    constructor(GameBoard) {
        this.gameBoard = new GameBoard(4, 4, RNG);
        this.isStarted = false;
    }

    start() {
        this.gameBoard.initLevel();
    }

    draw() {

    }

    finish() {

    }
}

class User {

}

/**
 * Renders tiles.
 */
class GameBoard {
    static MIN_ROWS = 4;
    static MIN_COLS = 4;
    static MAX_ROWS = 15;
    static MAX_COLS = 15;

    constructor(rows = 4, columns = 4, RNG) {
        this.rows = rows;
        this.colums = columns;
        this.randomTiles = 4;
        this.tiles = [];
        this.gameBoardEl = document.getElementById('game-board');
        this.rng = new RNG();

        for (let i = 0; i < this.rows; i++) {
            this.gameBoardEl.appendChild(this.createRow(i * this.rows));
        }
    }

    initLevel() {
        const numbers = this.rng.generate(this.randomTiles);
        const timeout = 5000;

        setTimeout(() => {
            this.addClasses('tile-active', numbers);
        }, timeout);

        setTimeout(() => {
            this.removeClasses('tile-active', numbers);
        }, timeout * 2);

        this.addListener();
    }

    createRow(index) {
        let row = document.createElement('div');
        let tile = null;
        row.className = 'tile-row';

        for (let i = 0; i < this.colums; i++) {
            tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = index + i;
            this.tiles.push(tile);
            row.appendChild(tile);
        }

        return row;
    }

    createColumn() {

    }

    removeRow() {

    }

    removeColumn() {

    }

    addClasses(className, tiles) {
        for (let i = 0; i < this.randomTiles; i++) {
            this.tiles[tiles[i]].classList.add(className);
        }
    }

    removeClasses(className, tiles) {
        for (let i = 0; i < this.randomTiles; i++) {
            this.tiles[tiles[i]].classList.remove(className);
        }
    }

    addListener() {
        const numbers = this.rng.getNumbers();

        this.gameBoardEl.addEventListener('click', function (e) {
            const className = numbers.includes(+e.target.id) ? 'tile-active' : 'tile-incorrect';
            e.target.classList.add(className);
        }, false);
    }
}

class LevelManager {

}

/**
 * Random number generator.
 */
class RNG {
    constructor() {
        this.numbers = [];
    }

    /**
     * Creates array of unique random integers.
     * @param {Number} size Length of array.
     * @param {Number} max Maximum value of number.
     * 
     * @returns {Array[Number]} Array of unique random numbers.
     */
    generate(size, max = 16) {
        this.numbers = [];
        let number;

        for (let i = 0; i < size; i++) {
            do {
                number = Math.round(Math.random() * (max - 1));
            } while (this.numbers.includes(number))

            this.numbers.push(number);
        }

        return this.numbers;
    }

    getNumbers() {
        return this.numbers;
    }
}

const game = new Game(GameBoard);
game.start();

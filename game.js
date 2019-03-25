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
        this.levelManager = new LevelManager();
        this.gameBoard = new GameBoard(4, 4, RNG, this.levelManager);
        // this.isStarted = false;
    }

    start() {
        // this.gameBoard.initLevel();
    }

    draw() {

    }

    finish() {

    }
}

class User {
    constructor() {
        throw new Error('Not yet implemented!');
    }
}

/**
 * Renders tiles.
 */
class GameBoard {
    static MIN_ROWS = 4;
    static MIN_COLS = 4;
    static MAX_ROWS = 14;
    static MAX_COLS = 14;

    constructor(rows = 4, columns = 4, RNG, levelManager) {
        this.rows = rows;
        this.colums = columns;
        this.randomTiles = 4;
        this.tiles = [];
        this.isGameStarted = false;
        this.levelManager = levelManager;
        this.gameBoardEl = document.getElementById('game-board');
        this.startBtn = document.getElementById('start-btn');
        this.finishBtn = document.getElementById('finish-btn');
        this.rng = new RNG();
        this.clicks = 0;
        this.correctClicks = 0;
        this.gameInfo = {
            currentLevel: document.getElementById('level'),
            currentPoints: document.getElementById('current-points'),
            totalPoints: document.getElementById('total-points')
        }

        for (let i = 0; i < this.rows; i++) {
            this.gameBoardEl.appendChild(this.createRow(i * this.rows));
        }

        this.initBtns();
        this.addListener();
    }

    initLevel() {
        this.resetTiles();
        this.clicks = 0;

        const numbers = this.rng.generate(this.randomTiles);
        const timeout = 5000;

        setTimeout(() => {
            this.addClasses('tile-active', numbers);
        }, timeout);

        setTimeout(() => {
            this.removeClasses('tile-active', numbers);
            this.isGameStarted = true;
        }, timeout * 2);

    }

    createRow(index) {
        let row = document.createElement('div');
        let tile = null;
        row.className = 'tile-row';

        for (let i = 0; i < this.colums; i++) {
            tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = index + i + 1;
            this.tiles.push(tile);
            row.appendChild(tile);
        }

        return row;
    }

    createColumn() {
        throw new Error('Not yet implemented!');
    }

    removeRow() {
        throw new Error('Not yet implemented!');
    }

    removeColumn() {
        throw new Error('Not yet implemented!');
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

    resetTiles() {
        this.tiles.forEach(tile => {
            tile.className = 'tile';
        });
    }

    addListener() {
        this.gameBoardEl.addEventListener('click', e => {
            const targetId = +e.target.id;

            if (this.isGameStarted && targetId) {
                const isCorrect = this.rng.getNumbers().includes(targetId - 1);
                const className = isCorrect ? 'tile-active' : 'tile-incorrect';
                e.target.classList.add(className);

                if (!this.tiles[targetId - 1].isClicked) {
                    this.tiles[targetId - 1].isClicked = true;
                    this.clicks++;

                    if (isCorrect) {
                        this.levelManager.increasePoints();
                        this.correctClicks++;
                        this.gameInfo.currentPoints.textContent = this.levelManager.currentPoints;
                    }

                    if (this.clicks >= this.randomTiles) {
                        // this.levelManager.check();
                    }
                }
            }
        }, false);
    }

    initBtns() {
        this.startBtn.addEventListener('click', e => {
            this.isGameStarted = false;
            this.initLevel();
        });

        this.finishBtn.addEventListener('click', e => {
            this.isGameStarted = false;
        });
    }

    reset() {
        this.clicks = 0;
        this.correctClicks = 0;
    }
}

/**
 * Manages game levels.
 */
class LevelManager {
    static MIN_LEVEL = 0;
    static MAX_LEVEL = 20;

    constructor() {
        this.currentLevel = 0;
        this.currentPoints = 0;
        this.totalPoints = 0;
    }

    increasePoints() {
        this.currentPoints += 10;
    }

    levelUp() {
        this.currentLevel = this.currentLevel >= LevelManager.MAX_LEVEL
            ? this.currentLevel : ++this.currentLevel;
    }

    levelDown() {
        this.currentLevel = this.currentLevel <= LevelManager.MIN_LEVEL
            ? this.currentLevel : --this.currentLevel;
    }

    reset() {
        this.currentLevel = 0;
        this.currentPoints = 0;
        this.totalPoints = 0;
    }
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

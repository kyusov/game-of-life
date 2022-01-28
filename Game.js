class Game {
    constructor(canvas, width, height, cellSize, visualizationGenField, infoAlert) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.generation = this.#fill2DArrayWithZeros(Math.floor(this.width / this.cellSize), Math.floor(this.height / this.cellSize));
        this.genCount = 0;
        this.raf = undefined;
        this.isRunning = false;
        this.visualizationGenField = visualizationGenField;
        this.infoAlert = infoAlert;
    }

    setCellIsAlive(col, row) {
        this.generation[col][row] = 1;
        this.#repaintCell(col, row, true);
    }

    recalculateGeneration() {
        const nextGen = this.generation.map(() => new Int8Array(this.generation[0].length).fill(0));

        for (let i = 0; i < this.generation.length; i++) {
            for (let j = 0; j < this.generation[0].length; j++) {
                let neighbours = 0;

                neighbours += this.#checkNeighbours(i, j);

                //в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
                if (this.generation[i][j] === 0 && neighbours === 3) {
                    nextGen[i][j] = 1;
                    this.#repaintCell(i, j, true);
                }

                //если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
                if (this.generation[i][j] === 1 && (neighbours === 2 || neighbours === 3)) {
                    nextGen[i][j] = 1;
                    this.#repaintCell(i, j, true);
                } else if (this.generation[i][j] === 1 && (neighbours < 2 || neighbours > 3)) {
                    //в противном случае, если соседей меньше двух или больше трёх, клетка умирает
                    nextGen[i][j] = 0;
                    this.#repaintCell(i, j, false);
                }
            }
        }

        if (this.#checkGame(this.generation, nextGen) || !this.isRunning) {
            window.cancelAnimationFrame(this.raf);
        } else {
            this.generation = nextGen;
            this.genCount++;
            this.visualizationGenField.innerHTML = this.genCount;

            window.requestAnimationFrame(() => {
                this.recalculateGeneration()
            })
        }

    }

    start() {
        this.isRunning = true;
        this.raf = window.requestAnimationFrame(() => {
            this.recalculateGeneration();
        })
    }

    pause() {
        this.isRunning = false;
    }

    reset() {
        this.generation = this.#fill2DArrayWithZeros(this.generation.length, this.generation[0].length);
        this.genCount = 0;
        this.visualizationGenField.innerHTML = 0;
        this.canvas.clearRect(0, 0, this.width, this.height);
    }

    #repaintCell(col, row, isAlive) {
        if (isAlive) {
            this.canvas.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        } else {
            this.canvas.clearRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        }
    }

    #leftOutOfBounds(index) {
        if (index === 0) return this.generation.length;
        else return index;
    }

    #rightOutOfBounds(index) {
        if (index === this.generation.length - 1) return -1;
        else return index;
    }

    #checkNeighbours(i, j) {
        let neighbours = 0;

        if (this.generation[this.#leftOutOfBounds(i) - 1][j] === 1) neighbours++;
        if (this.generation[i][this.#rightOutOfBounds(j) + 1] === 1) neighbours++;
        if (this.generation[this.#rightOutOfBounds(i) + 1][j] === 1) neighbours++;
        if (this.generation[i][this.#leftOutOfBounds(j) - 1] === 1) neighbours++;

        if (this.generation[this.#leftOutOfBounds(i) - 1][this.#rightOutOfBounds(j) + 1] === 1) neighbours++;
        if (this.generation[this.#rightOutOfBounds(i) + 1][this.#rightOutOfBounds(j) + 1] === 1) neighbours++;
        if (this.generation[this.#rightOutOfBounds(i) + 1][this.#leftOutOfBounds(j) - 1] === 1) neighbours++;
        if (this.generation[this.#leftOutOfBounds(i) - 1][this.#leftOutOfBounds(j) - 1] === 1) neighbours++;

        return neighbours;
    }

    // rework
    #checkGame(prevGen, currentGen) {
        let gameOver = true;

        //на поле не останется ни одной «живой» клетки
        for (let i = 0; i < currentGen.length; i++)
            for (let j = 0; j < currentGen[0].length; j++)
                if (currentGen[i][j] === 1) {
                    gameOver = false;
                    break;
                }

        if (gameOver) {
            this.infoAlert.innerHTML = 'Игра окончена! Нет живых клеток :(';
            this.infoAlert.classList.remove('hide');
            return gameOver;
        }

        gameOver = true;

        //при очередном шаге ни одна из клеток не меняет своего состояния
        for (let i = 0; i < currentGen.length; i++) {
            if (gameOver === false) break;
            for (let j = 0; j < currentGen[0].length; j++) {
                if (prevGen[i][j] !== currentGen[i][j]) {
                    gameOver = false;
                    break;
                } else {
                    gameOver = true;
                }
            }
        }

        if (gameOver) {
            this.infoAlert.innerHTML = 'Игра окончена! Повторение пред. позиции :(';
            this.infoAlert.classList.remove('hide');
            return gameOver;
        }

        return gameOver;
    }

    #fill2DArrayWithZeros(cols, rows) {
        return new Array(cols).fill(null).map(() => new Int8Array(rows).fill(0));
    }

}

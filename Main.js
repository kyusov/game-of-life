(function () {
    const CELL_SIZE = 10;

    const gridCanvas = document.getElementById('grid').getContext('2d');
    const gameCanvas = document.getElementById('game').getContext('2d');

    const grid = new Grid(gridCanvas, gridCanvas.canvas.width, gridCanvas.canvas.height, CELL_SIZE);
    grid.draw();

    const selectors = ['.start-btn', '.pause-btn', '.reset-btn', '.generation', '.alert'];
    const [startBtn, pauseBtn, resetBtn, generation, alert] = getElementsFromSelectors(selectors);

    const game = new Game(gameCanvas, gameCanvas.canvas.width, gameCanvas.canvas.height, CELL_SIZE, generation, alert);

    gameCanvas.canvas.addEventListener('click', (event) => {
        const x = event.offsetX;
        const y = event.offsetY;

        const offsetX = Math.floor(x / CELL_SIZE);
        const offsetY = Math.floor(y / CELL_SIZE);

        game.setCellIsAlive(offsetX, offsetY);
    });

    startBtn.addEventListener('click', function () {
        game.start();

        alert.classList.add('hide');

        startBtn.disabled = true;
        resetBtn.disabled = true;
        pauseBtn.disabled = false;
    });

    pauseBtn.addEventListener('click', function () {
        game.pause();

        pauseBtn.disabled = true;
        startBtn.disabled = false;
        resetBtn.disabled = false;
    });

    resetBtn.addEventListener('click', function () {
        game.reset();

        startBtn.disabled = false;
        pauseBtn.disabled = true;
    });

    function getElementsFromSelectors(selectors) {
        return selectors.map(selector => document.querySelector(selector))
    }
})()

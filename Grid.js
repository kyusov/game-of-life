class Grid {
    constructor(canvas, width, height, cellSize) {
        this.grid = canvas;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.size = {
            x: Math.floor(this.width / this.cellSize),
            y: Math.floor(this.height / this.cellSize)
        };
    }

    draw() {
        this.grid.translate(.5, .5);
        this.grid.beginPath();

        for (let i = 0; i <= this.size.x; i++) {
            this.grid.lineWidth = 1;
            this.grid.moveTo(0, i * this.cellSize);
            this.grid.lineTo(this.width, i * this.cellSize);
            this.grid.strokeStyle = '#989898';
        }

        for (let i = 0; i <= this.size.y; i++) {
            this.grid.lineWidth = 1;
            this.grid.moveTo(i * this.cellSize, 0);
            this.grid.lineTo(i * this.cellSize, this.height);
            this.grid.strokeStyle = "#989898";
        }

        this.grid.stroke();
    }
}

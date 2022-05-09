import GameOfLife from "./GameOfLife.js";
import PixelCanvas from "./PixelCanvas.js";
export default class GameOfLifeCanvas {
    constructor(size, rules, colorConfig) {
        this.size = size;
        this.gameOfLife = new GameOfLife(size, rules);
        this.canvas = new PixelCanvas(size);
        this.colorConfig = Object.assign({}, colorConfig);
        this.updateCanvas();
    }
    get width() {
        return this.size.width;
    }
    get height() {
        return this.size.height;
    }
    placeCell(x, y) {
        this.gameOfLife.placeLife(x, y);
    }
    getImageData() {
        return this.canvas.getImageData();
    }
    tick(updateCanvas = true) {
        this.gameOfLife.tick();
        if (updateCanvas)
            this.updateCanvas();
    }
    updateCanvas() {
        const WIDTH = this.width;
        const HEIGHT = this.height;
        this.canvas.clearCanvas(this.colorConfig.backgroundColor);
        this.canvas.beginFill();
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const color = this.getCellColor(x, y);
                if (typeof color === "undefined")
                    continue;
                this.canvas.fillStyle = color;
                this.canvas.fillPixel(x, y);
            }
        }
        this.canvas.endFill();
    }
    getCellColor(x, y) {
        const cell = this.gameOfLife.getCell(x, y);
        if (typeof cell === "undefined") {
            return undefined;
        }
        else if (cell >= 1) {
            return this.colorConfig.lifeColor;
        }
        else if (cell <= -1 &&
            Math.abs(cell) < this.colorConfig.deadColorStages) {
            return this.getDeadCellColor(Math.abs(cell));
        }
        else {
            return undefined;
        }
    }
    getDeadCellColor(stage) {
        var _a, _b;
        const color = [0, 0, 0, 255];
        const maxStage = this.colorConfig.deadColorStages;
        const deadColorFrom = this.colorConfig.deadColorFrom;
        const deadColorTo = this.colorConfig.deadColorTo;
        for (let i = 0; i < 4; i++) {
            const colFrom = (_a = deadColorFrom[i]) !== null && _a !== void 0 ? _a : 255;
            const colTo = (_b = deadColorTo[i]) !== null && _b !== void 0 ? _b : 255;
            const col = colFrom + (colTo - colFrom) * Math.min(1, (stage - 1) / maxStage);
            color[i] = Math.floor(col);
        }
        return color;
    }
}

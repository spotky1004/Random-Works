import GameOfLife, { Rules as GameOfLifeRules } from "./GameOfLife.js";
import PixelCanvas, { FillStyle as PixelCanvasFillStyle } from "./PixelCanvas.js";

interface Size {
  width: number;
  height: number;
}
export interface ColorConfig {
  backgroundColor: string | undefined;
  lifeColor: PixelCanvasFillStyle;
  deadColorStages: number;
  deadColorFrom: PixelCanvasFillStyle;
  deadColorTo: PixelCanvasFillStyle;
}

export default class GameOfLifeCanvas {
  private size: Size;
  private gameOfLife: GameOfLife;
  private canvas: PixelCanvas;
  private colorConfig: ColorConfig;

  constructor(size: Size, rules: GameOfLifeRules, colorConfig: ColorConfig) {
    this.size = size;
    this.gameOfLife = new GameOfLife(size, rules);
    this.canvas = new PixelCanvas(size);
    this.colorConfig = {...colorConfig};

    this.updateCanvas();
  }
  
  get width() {
    return this.size.width;
  }
  get height() {
    return this.size.height;
  }

  placeCell(x: number, y: number) {
    this.gameOfLife.placeLife(x, y);
  }

  getImageData() {
    return this.canvas.getImageData();
  }

  tick(updateCanvas: boolean = true) {
    this.gameOfLife.tick();
    if (updateCanvas) this.updateCanvas();
  }

  updateCanvas() {
    const WIDTH = this.width;
    const HEIGHT = this.height;
    
    this.canvas.clearCanvas(this.colorConfig.backgroundColor);
    this.canvas.beginFill();
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const color = this.getCellColor(x, y);
        if (typeof color === "undefined") continue;
        this.canvas.fillStyle = color;
        this.canvas.fillPixel(x, y);
      }
    }
    this.canvas.endFill();
  }

  private getCellColor(x: number, y: number): PixelCanvasFillStyle | undefined {
    const cell = this.gameOfLife.getCell(x, y);
    if (typeof cell === "undefined") {
      return undefined;
    } else if (cell >= 1) {
      return this.colorConfig.lifeColor;
    } else if (
      cell <= -1 &&
      Math.abs(cell) < this.colorConfig.deadColorStages
    ) {
      return this.getDeadCellColor(Math.abs(cell));
    } else {
      return undefined;
    }
  }

  private getDeadCellColor(stage: number): PixelCanvasFillStyle {
    const color: PixelCanvasFillStyle = [0, 0, 0, 255];
    const maxStage = this.colorConfig.deadColorStages;
    const deadColorFrom = this.colorConfig.deadColorFrom;
    const deadColorTo = this.colorConfig.deadColorTo;
    for (let i = 0; i < 4; i++) {
      const colFrom = deadColorFrom[i] ?? 255;
      const colTo = deadColorTo[i] ?? 255;
      const col = colFrom + (colTo - colFrom)*Math.min(1, (stage-1)/maxStage);
      color[i] = Math.floor(col);
    }
    return color;
  }
}

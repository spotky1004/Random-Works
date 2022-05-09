import GameOfLifeCanvas, { ColorConfig } from "./GameOfLifeCanvas.js";
import type { Rules as GameOfLifeRules } from "./GameOfLife";

function isNumberArray(arr: any[]): arr is number[] {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") return false;
  }
  return true;
}

export default class Game {
  private canvas: HTMLCanvasElement;
  private gameOfLifeCanvas: GameOfLifeCanvas | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gameOfLifeCanvas = null;
  }

  applyGame(rawCells: string, rawRule: string, rawStyle: string) {
    try {
      let cells: number[][] = rawCells.replace(/ /g, "").slice(1, -1).split(")(").map(c => c.split(",").map(p => +p));
      let rules: GameOfLifeRules = {
        birth: [],
        survive: []
      };
      let ruleItems = rawRule.split("/");
      for (let i = 0; i < ruleItems.length; i++) {
        const type = ruleItems[i][0];
        const rule = ruleItems[i].slice(1).split("").map(v => +v);
        if (type.startsWith("B")) {
          rules.birth = rule;
        } else if (type.startsWith("S")) {
          rules.survive = rule;
        }
      }
      let colorConfig: ColorConfig = {
        backgroundColor: "#000",
        lifeColor: [20, 227, 109],
        deadColorStages: 4,
        deadColorFrom: [20, 227, 109],
        deadColorTo: [32, 36, 34],
      };
      const parsedStyle = JSON.parse(rawStyle);
      let key: keyof ColorConfig;
      for (key in colorConfig) {
        const style = parsedStyle[key];
        switch (key) {
          case "backgroundColor":
            if (typeof style === "string") {
              colorConfig[key] = style;
            }
            break;
          case "lifeColor": case "deadColorFrom": case "deadColorTo":
            if (Array.isArray(style) && style.length >= 3 && isNumberArray(style)) {
              colorConfig[key] = style.slice(0, 4) as any;
            }
            break;
          case "deadColorStages":
            if (typeof style === "number") {
              colorConfig[key] = style;
            }
            break;
        }
      }

      const gameOfLifeCanvas = new GameOfLifeCanvas({
        width: 250,
        height: 250,
      }, rules, colorConfig);
      for (let i = 0; i < cells.length; i++) {
        gameOfLifeCanvas.placeCell(cells[i][0], cells[i][1]);
      }
      this.gameOfLifeCanvas = gameOfLifeCanvas;
    } catch (e) {console.log(e)}
  }

  tick() {
    if (!this.gameOfLifeCanvas) return;
    this.gameOfLifeCanvas.tick();
    this.updateCanvas();
  }

  private updateCanvas() {
    if (!this.gameOfLifeCanvas) return;
    const WIDTH = this.gameOfLifeCanvas.width;
    const HEIGHT = this.gameOfLifeCanvas.height;

    if (
      this.canvas.width !== WIDTH ||
      this.canvas.height !== HEIGHT
    ) {
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
    }
    const imageData = this.gameOfLifeCanvas.getImageData();
    this.canvas.getContext("2d")?.putImageData(imageData, 0, 0);
  }
}

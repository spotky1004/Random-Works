interface Size {
  width: number;
  height: number;
}
export interface Rules {
  birth: number[];
  survive: number[];
}

export default class GameOfLife {
  private size: [width: number, height: number];
  private rules: Rules;
  private cells: number[][];

  constructor(size: Size, rules: Rules) {
    this.size = [size.width, size.height];
    this.rules = rules;
    this.cells = Array(size.height).fill(null).map(_ => Array(size.width).fill(0));
  }

  get width() {
    return this.size[0];
  }
  get height() {
    return this.size[1];
  }

  placeLife(x: number, y: number) {
    if (
      0 > x || x >= this.width ||
      0 > y || y >= this.height
    ) return;
    this.cells[y][x] = 1;
  }

  tick() {
    const newCells = [...this.cells].map(row => [...row]);
    const birthRule = this.rules.birth;
    const surviveRule = this.rules.survive;
    for (let y = 0; y < newCells.length; y++) {
      const row = newCells[y];
      for (let x = 0; x < row.length; x++) {
        const oldValueSign = Math.sign(this.cells[y][x]);
        const neighborhoodCount = this.getNeighborhoodCount(x, y);
        if (oldValueSign !== 1 && birthRule.includes(neighborhoodCount)) {
          newCells[y][x] = 1;
        } else if (oldValueSign === 1 && !surviveRule.includes(neighborhoodCount)) {
          newCells[y][x] = -1;
        } else {
          newCells[y][x] += oldValueSign;
        }
      }
    }
    this.cells = newCells;
  }

  getCell(x: number, y: number): number | undefined {
    return this.cells[y][x];
  }

  private getNeighborhoodCount(x: number, y: number) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      const row = this.cells[y + dy];
      if (typeof row === "undefined") continue;
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const value = row[x + dx];
        if (typeof value === "undefined") continue;
        if (Math.sign(value) === 1) count++;
      }
    }
    return count;
  }
}

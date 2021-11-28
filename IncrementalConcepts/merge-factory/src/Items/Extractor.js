import Item from "../Item.js";

class Extractor extends Item {
  /** @param {(typeof Extractor)["defaultExtras"]} extras */
  constructor(extras) {
    super({
      name: "Extractor",
      description: "Extrat items from some tiles."
    });
    this.extras = {
      lastExtracted: 0,
      rotate: 0,
      ...extras
    };
  }

  static defaultExtras = {
    lastExtracted: new Date().getTime(),
    rotate: 0,
  }

  /**
   * @param {{x: number, y: number}} position - Position of this item
   * @param {import("../index.js").Game} game - Game savedata
   * @param {import("../index.js").SessionData} sessionData 
   * @param {number} dt
   */
  doTick(position, game, sessionData, dt) {
    const rotate = this.extras.rotate;

    const direction = {
      x: ((rotate+1)%2)*((rotate%4/2)*2-1), // 0 -> -1, 2 -> 1
      y: (rotate%2)*(((rotate+1)%4/2)*-2+1) // 1 -> -1, 3 -> 1
    }
    const extractPoint = {
      x: position.x + direction.x,
      y: position.y + direction.y
    };
    const extractIdx = extractPoint.x + extractPoint.y*5;
    const extractTile = sessionData.cellItems[extractIdx];
    
    if (
      typeof extractTile === "undefined" ||
      extractTile === null ||
      !extractTile.extras.canExtract
    ) return;

    /**
     * @typedef ExtractExtraOptions
     * @property {boolean} canExtract
     * @property {number} extractTime
     * @property {string} extractItem
     */
    /** @type {ExtractExtraOptions} */
    const {canExtract, extractTime, extractItem} = extractTile.extras;
    if (new Date().getTime() - extractTime*1000 >= this.extras.lastExtracted) {
      this.extras.lastExtracted = new Date().getTime();

      sessionData.floatingItems.push({
        ele: document.createElement("div"),
        name: extractItem,
        instance: null,
        position: {
          x: position.x - direction.x - 0.5,
          y: position.y - direction.y + (Math.random()*0.6 - 0.3)
        },
        onOverlay: false,
        deleted: false
      });
    }
  }

  get elementStyles() {
    return {
      transform: `rotate(${this.extras.rotate * 90}deg)`
    }
  }
}

export default Extractor;

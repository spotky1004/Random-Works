/**
 * @typedef MergeitemOptions
 * @property {string} name
 * @property {string} description
 * @property {string[]} [canMergeWith]
 * @property {Object.<string, any>} [extras]
 */
class Item {
  /** @param {MergeitemOptions} options */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.extras = {...options.extras};
  }

  static defaultExtras = {};

  /**
   * @param {{x: number, y: number}} position - Position of this item
   * @param {import("./index.js").Game} game - Game savedata
   * @param {import("./index.js").SessionData} sessionData 
   * @param {number} dt
   */
  doTick(position, game, sessionData, dt) {

  }

  get itemImagePath() {
    return "./resources/" + this.name + ".png";
  }

  get elementStyles() {
    return {};
  }
}

export default Item;

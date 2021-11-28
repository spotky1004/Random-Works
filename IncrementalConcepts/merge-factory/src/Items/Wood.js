import Item from "../Item.js";

class Wood extends Item {
  /** @param {(typeof Wood)["defaultExtras"]} extras */
  constructor(extras) {
    super({
      name: "Wood",
      description: "Wood from 🌲"
    });
    this.extras = {
      ...extras
    };
  }

  static defaultExtras = {};
}

export default Wood;

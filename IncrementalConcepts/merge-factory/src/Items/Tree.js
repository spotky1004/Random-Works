import Item from "../Item.js";

class Tree extends Item {
  /** @param {(typeof Tree)["defaultExtras"]} extras */
  constructor(extras) {
    super({
      name: "Tree",
      description: "🌲"
    });
    this.extras = {
      age: 0,
      lifespan: 100,
      canExtract: true,
      extractTime: 5,
      extractItem: "Wood",
      ...extras
    };
  }

  static defaultExtras = {
    age: 0,
    lifespan: 100,
    canExtract: true,
    extractTime: 5,
    extractItem: "Wood"
  };
}

export default Tree;

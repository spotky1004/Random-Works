import CombinationalLogic from "../CombinationalLogic.js";
import fullSub16bit from "./fullSub16bit.js";

class Comparison16bit extends CombinationalLogic {
  constructor() {
    super(
      [
        [fullSub16bit, "i0", "i1"],
        ["AND", "o0_0", 1]
      ],
      ["o1"]
    );
  }
}

const comparison16bit = new Comparison16bit(2);

export default comparison16bit;

console.log(comparison16bit.evaluate([1, 0], [0, 1]));

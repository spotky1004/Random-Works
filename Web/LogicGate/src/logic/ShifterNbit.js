import CombinationalLogic from "../CombinationalLogic.js";

class ShifterNbit extends CombinationalLogic {
  /**
   * @param {number} n 
   */
  constructor(n) {
    super(
      [0, ...Array.from({ length: n-1 }, (_, i) => ["Buffer", `i${i+1}`])],
      Array.from({ length: n }, (_, i) => `o${i}`)
    );
  }
}

export default ShifterNbit;

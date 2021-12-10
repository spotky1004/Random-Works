import CombinationalLogic from "../CombinationalLogic.js";

class BufferNbit extends CombinationalLogic {
  /**
   * @param {number} n 
   */
  constructor(n) {
    super(
      Array.from({ length: n }, (_, i) => ["Buffer", `i${i}`]),
      Array.from({ length: n }, (_, i) => `o${i}`)
    )
  }
}

export default BufferNbit;

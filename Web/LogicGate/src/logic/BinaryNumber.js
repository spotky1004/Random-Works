import CombinationalLogic from "../CombinationalLogic.js";

/**
 * @typedef BinaryNumberOptions
 * @property {number} bit
 * @property {number} [varName]
 * @property {number} [numberFixed]
 */
class BinaryNumber extends CombinationalLogic {
  /**
   * @param {BinaryNumberOptions} options
   */
  constructor(options) {
    let logic = [];
    if (options.numberFixed) {
      let binNumber = options.numberFixed
        .toString(2)
        .padStart(options.bit, "0")
        .split("").reverse().join("");

      for (let i = 0; i < options.bit; i++) {
        logic.push(["Buffer", Number(binNumber[i])]);
      }
    } else {
      for (let i = 0; i < options.bit; i++) {
        logic.push(["Buffer", `i${i}`]);
      }
    }

    super(
      logic,
      Array.from({ length: options.bit }, (_, i) => `o${i}`)
    );
  }

  get displayName() {
    return "var: " + this.varName;
  }
}

export default BinaryNumber;

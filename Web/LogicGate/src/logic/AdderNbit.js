import CombinationalLogic from "../CombinationalLogic.js";
import fullAdder from "./fullAdder.js";

class AdderNbit extends CombinationalLogic {
  /**
   * @param {number} n 
   */
  constructor(n) {
    if (n < 1) return;

    super(
      Array.from({ length: n }, (_, i) => {
        if (i === 0) return [fullAdder, "i0_0", "i1_0", 0];
        return [fullAdder, `i0_${i}`, `i1_${i}`, `o${i-1}_1`];
      }),
      Array.from({ length: n }, (_, i) => `o${i}_0`)
    );
  }
}

export default AdderNbit;

// let adder4bit = new AdderNbit(4);
// console.log(
//   adder4bit,
//   "\n",
//   adder4bit.evaluate([1, 0, 1, 0], [1, 0, 1, 0])
// )

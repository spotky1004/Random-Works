import CombinationalLogic from "../CombinationalLogic.js";
import adder16bit from "./adder16bit.js";

class Sub16bit extends CombinationalLogic {
  constructor() {
    const n = 16;

    let p = 0;
    let logic = [];
    for (let i = 0; i < n; i++) {
      logic.push(["NOT", `i1_${i}`]);
    }
    logic.push([adder16bit, [1], Array.from({ length: n }, (_, i) => `o${p+i}`)]);
    p += n;
    logic.push([adder16bit, "i0", `o${p}`]);
    p++;

    super(
      logic,
      Array.from({ length: n }, (_, i) => `o${p}_${i}`)
    );
  }
}

const sub16bit = new Sub16bit();

export default sub16bit;

// console.log(sub16bit.evaluate([1, 1, 1, 1], [0, 0, 1, 1]));

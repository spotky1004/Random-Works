import CombinationalLogic from "../CombinationalLogic.js";
import adder16bit from "./adder16bit.js";
import adder17bit from "./adder17bit.js";

class FullSub16bit extends CombinationalLogic {
  constructor() {
    const n = 16;

    let p = 0;
    let logic = [];
    for (let i = 0; i < n; i++) {
      logic.push(["NOT", `i1_${i}`]);
    }
    logic.push([adder16bit, [1], Array.from({ length: n }, (_, i) => `o${p+i}`)]);
    p += n;
    logic.push([adder17bit, "i0", `o${p}`]);
    p++;

    super(
      logic,
      Array.from({ length: n+1 }, (_, i) => `o${p}_${i}`)
    );
  }
}

const fillSub16bit = new FullSub16bit();

export default fillSub16bit;

// console.log(fillSub16bit.evaluate([1, 1, 1, 0], [0, 0, 1, 1]));

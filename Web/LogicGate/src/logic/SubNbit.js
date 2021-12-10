import CombinationalLogic from "../CombinationalLogic.js";
import AdderNbit from "./AdderNbit.js";

class SubNbit extends CombinationalLogic {
  /**
   * @param {number} n 
   */
  constructor(n) {
    const adderNbit = new AdderNbit(n);

    let p = 0;
    let logic = [];
    for (let i = 0; i < n; i++) {
      logic.push(["NOT", `i1_${i}`]);
    }
    logic.push([adderNbit, [1], Array.from({ length: n }, (_, i) => `o${p+i}`)]);
    p += n;
    logic.push([adderNbit, "i0", `o${p}`]);
    p++;

    super(
      logic,
      Array.from({ length: n }, (_, i) => `o${p}_${i}`)
    );
  }
}

export default SubNbit;

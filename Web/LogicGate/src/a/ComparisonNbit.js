import CombinationalLogic from "../CombinationalLogic.js";
import sub17bit from "./sub17bit.js";

class ComparisonNbit extends CombinationalLogic {
  constructor(n) {
    let logic = [];
    let p = 0;

    for (let i = n-1; i >= 0; i--) {
      logic.push(["XOR", `i0_${i}`, `i1_${i}`]);
    }
    for (let i = 0; i < n; i++) {
      logic.push(["XNOR", `i0_${i}`, `i1_${i}`]);
      logic.push(["AND", `o${i}`, `i0_${n-1-i}`]);
    }
    p += n; // move to start of ^
    for (let i = 0; i < n; i++) {
      logic.push(["OR", `o${p+i*2}`, `o${p+i*2+1}`]);
    }
    p += n*2; // move to start of ^
    logic.push(["Buffer", `o${p}`]);
    for (let i = 0; i < n; i++) {
      logic.push(["AND", `o${p+n+i}`, `o${p+i}`]);
    }
    p += n*2; // move to start of ^
    console.log(p, logic.map((e, i) => [i, e]));

    super(
      logic,
      Array.from({length: logic.length}, (_, i) => `o${i}`)
      // [`o${p}`]
    );
  }
}

const cb = new ComparisonNbit(2);
console.log(cb.evaluate([0, 1], [1, 0]));

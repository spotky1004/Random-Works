import CombinationalLogic from "../CombinationalLogic.js";
import adder16bit from "./adder16bit.js";

class Multiply16bit extends CombinationalLogic {
  constructor() {
    let logic = [];
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if (j-i >= 0) {
          logic.push(["AND", `i0_${i}`, `i1_${j-i}`]);
        } else {
          logic.push(["Buffer", 0]);
        }
      }
    }
    for (let i = 0; i < 8; i++) {
      logic.push([
        adder16bit,
        Array.from({ length: 16 }, (_, j) => `o${(i*2)*16+j}`),
        Array.from({ length: 16 }, (_, j) => `o${(i*2+1)*16+j}`)
      ]);
    }
    for (let i = 0; i < 4; i++) {
      logic.push([
        adder16bit,
        Array.from({ length: 16 }, (_, j) => `o${16**2+i*2}_${j}`),
        Array.from({ length: 16 }, (_, j) => `o${16**2+i*2+1}_${j}`)
      ]);
    }
    for (let i = 0; i < 2; i++) {
      logic.push([
        adder16bit,
        Array.from({ length: 16 }, (_, j) => `o${8+16**2+i*2}_${j}`),
        Array.from({ length: 16 }, (_, j) => `o${8+16**2+i*2+1}_${j}`)
      ]);
    }
    logic.push([
      adder16bit,
      Array.from({ length: 16 }, (_, j) => `o${4+8+16**2}_${j}`),
      Array.from({ length: 16 }, (_, j) => `o${4+8+16**2+1}_${j}`)
    ]);


    super(
      logic,
      Array.from({ length: 16 }, (_, j) => `o${2+4+8+16**2}_${j}`)
    );
  }
}

const multiply16bit = new Multiply16bit();

export default multiply16bit;

// console.log(multiply16bit.evaluate([1, 0, 1, 1], [1, 0, 1, 0]));

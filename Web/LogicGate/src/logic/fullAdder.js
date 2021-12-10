import CombinationalLogic from "../CombinationalLogic.js";

class FullAdder extends CombinationalLogic {
  constructor() {
    super(
      [
        ["XOR", "i0", "i1"],
        ["XOR", "o0", "i2"],
        ["AND", "i0", "i1"],
        ["AND", "i0", "i2"],
        ["AND", "i1", "i2"],
        ["OR", "o2", "o3"],
        ["OR", "o5", "o4"]
      ],
      ["o1", "o6"]
    )
  }
}
const fullAdder = new FullAdder();

export default fullAdder;

// console.log(
//   fullAdder.evaluate(0, 0, 0),
//   fullAdder.evaluate(0, 0, 1),
//   fullAdder.evaluate(0, 1, 0),
//   fullAdder.evaluate(0, 1, 1),
//   fullAdder.evaluate(1, 0, 0),
//   fullAdder.evaluate(1, 0, 1),
//   fullAdder.evaluate(1, 1, 0),
//   fullAdder.evaluate(1, 1, 1)
// );

import LogicGate from "./LogicGate.js";

/**
 * @typedef {string | number} InputId
 * @typedef {[import("./LogicGate.js").LogicGateTypes | CombinationalLogic, InputId, InputId]} LogicInput
 */
class CombinationalLogic {
  /**
   * @param {LogicInput[]} logicGates 
   * @param {InputId[]} outputIds
   */
  constructor(logicGates, outputIds) {
    /** @type {[LogicGate, ...InputId[]][]} */
    this.logicGates = logicGates.map((v) => {
      const isLogicGate = typeof v[0] === "string";
      if (isLogicGate) {
        return [new LogicGate(v[0]), v[1], v[2]];
      } else {
        return v;
      }
    });
    this.outputIds = outputIds;
  }

  /**
   * @param {InputId} id 
   * @returns {number[]}
   */
  static inputIdToInput(id, inputs, outputs) {
    if (Array.isArray(id)) {
      return id.map(v => CombinationalLogic.inputIdToInput(v, inputs, outputs));
    } else {
      if (typeof id === "undefined") return undefined;

      let idStr = id.toString();
      let idIdx = idStr.slice(1);
      switch (idStr[0]) {
        case "i":
          if (idStr.includes("_")) {
            let [mainIdx, subIdx] = idIdx.split("_");
            return inputs[mainIdx][subIdx];
          } else {
            return inputs[idIdx];
          }
        case "o":
          if (idStr.includes("_")) {
            let [mainIdx, subIdx] = idIdx.split("_");
            return outputs[mainIdx][subIdx];
          } else {
            return outputs[idIdx];
          }
        default: return id;
      }
    }
  }

  /**
   * @param  {...(number | number[])} inputs
   */
  evaluate(...inputs) {
    /** @type {number | number[]} */
    let outputs = Array(this.logicGates.length).fill(0);

    for (let i = 0; i < this.logicGates.length; i++) {
      const [logicGate, ...inputIds] = this.logicGates[i];
      const inputsToPass = inputIds.map(id => CombinationalLogic.inputIdToInput(id, inputs, outputs));
      const result = logicGate.evaluate(...inputsToPass);
      
      outputs[i] = result;
    }

    const output = this.outputIds.map((id) => {
      let o = CombinationalLogic.inputIdToInput(id, inputs, outputs);
      // if (typeof o !== "number") throw new Error("Output must be numbers.\n\nCan split output with o'idx'_'subIdx'");
      return o;
    });
    return output;
  }
}

export default CombinationalLogic;

// let logic1 = new CombinationalLogic(
//   [
//     ["AND", "i0", "i1"],
//     ["AND", "i2", "i3"],
//     ["AND", "o0", "o1"]
//   ],
//   ["o2"]
// );
// let logic2 = new CombinationalLogic(
//   [
//     ["AND", "i0", "i1"],
//     ["OR", "i2", "i3"],
//     ["AND", "o0", "o1"]
//   ],
//   ["o2"]
// );
// let logic3 = new CombinationalLogic(
//   [
//     [logic1, "i0", "i1", "i2", "i3"],
//     [logic2, "i0", "i1", "i2", "i3"],
//     ["OR", "o0_0", "o1_0"]
//   ],
//   ["o0_0", "o1_0", "o2"]
// );
// console.log(logic3.evaluate(1, 1, 0, 1));

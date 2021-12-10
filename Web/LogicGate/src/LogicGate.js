const LogicGateTypeEnum = {
  AND: 0,
  OR: 1,
  NOT: 2,
  NAND: 3,
  NOR: 4,
  XOR: 5,
  XNOR: 6,
  Buffer: 7,
};
const LogicGateTypeArr = Object.keys(LogicGateTypeEnum);

/**
 * @typedef {keyof typeof LogicGateTypeEnum} LogicGateTypes 
 */

class LogicGate {
  /**
   * @param {LogicGateTypes} type 
   */
  constructor(type) {
    if (!LogicGateTypeArr.includes(type)) throw new Error("Invalid logic gate");

    this.type = type;
  }

  /**
   * @param {number} a 
   * @param {number} [b]
   * @return {number} 
   */
  evaluate(a, b) {
    switch (this.type) {
      case "AND": return a & b;
      case "OR": return a | b;
      case "NOT": return +!a;
      case "NAND": return +!(a & b);
      case "NOR": return +!(a | b);
      case "XOR": return a ^ b;
      case "XNOR": return +!(a ^ b);
      case "Buffer": return a & a;
    }
  }
}

export default LogicGate;

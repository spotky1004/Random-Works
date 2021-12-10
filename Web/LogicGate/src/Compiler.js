import CombinationalLogic from "./CombinationalLogic.js";
import * as Logics from "./logic/index.js"; 

window.compile = compile;

/**
 * @param {string} script 
 */
function compile(script) {
  let lines = script.split("\n");
  lines = lines.map(line => {
    line = line.replace(/\s/g, "");
    // line = line.replace(/([0-9]+)/g, (m) => parseInt(m).toString(2));
    line = line.split(/([+\-*=])/g);

    return line;
  });

  let parsedLines = lines.map(line => {
    let data = {
      type: null,
      data: {}
    }
    if (line[1] === "=") {
      data.type = "define";
      data.defineTo = line[0];
      data.expression = line.slice(2);
    } else {
      data.type = "expression";
      data.expression = line;
    }
    
    return data;
  });

  const bit = 16;
  let point = 0;
  let variablePoints = {};
  let logic = [];
  let outputs = [];
  for (let i = 0; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    const type = line.type;

    let expLogic = expressionToLogic(line.expression, point, variablePoints, bit);
    logic.push(...expLogic);
    point += expLogic.length;

    if (type === "define") {
      const varName = line.defineTo;
      variablePoints[varName] = point;
      logic.push([
        new Logics.NumberNbit({ bit: 16, varName: varName }),
        ...Array.from({ length: bit }, (_, i) => `o${point-1}_${i}`)
      ]);
      outputs.push(`o${point}`);
      point++;
    }
  }
  return new CombinationalLogic(
    logic,
    outputs
  );
}

const nubmerCheckRegexp = /^[0-9]+$/;
const operatorCheckRegexp = /^[+\-*]$/;
function expressionToLogic(expression, point, variablePoints, bit) {
  let logic = [];
  let startPoint = point;
  
  let lastNumberAt = null;
  for (let i = 0; i < expression.length; i++) {
    const part = expression[i];
    
    if (nubmerCheckRegexp.test(part)) {
      logic.push([new Logics.NumberNbit({
        bit,
        numberFixed: Number(part)
      })]);
      point++;
    } else if (!operatorCheckRegexp.test(part)) {
      const variablePoint = variablePoints[part];
      logic.push([Logics.buffer16bit, ...Array.from({ length: bit }, (_, i) => `o${variablePoint}_${i}`)]);
      point++;
    }
    lastNumberAt = point;
  }
  
  let lastResultAt = null;
  for (let i = 0; i < expression.length; i++) {
    const part = expression[i];

    if (operatorCheckRegexp.test(part)) {
      let operatorLogic;
      switch (part){
        case "+":
          operatorLogic = Logics.adder16bit;
          break;
        case "-":
          operatorLogic = Logics.sub16bit;
          break;
        case "*":
          operatorLogic = Logics.muliply16bit;
          break;
      }
      let [p1, p2] = lastResultAt ? [lastResultAt, lastNumberAt+1] : [startPoint, startPoint+1]; 
      logic.push([operatorLogic, `o${p1}`, `o${p2}`]);
      lastNumberAt = p2;
      lastResultAt = point;
      point++;
    }
  }

  logic.push([
    Logics.buffer16bit,
    ...Array.from({ length: bit }, (_, i) => `o${lastResultAt ?? lastNumberAt}_${i}`)
  ]);
  point++;

  return logic;
}

export default compile;

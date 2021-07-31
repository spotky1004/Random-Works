const SpotkyScript = {};
const SS = SpotkyScript;

SpotkyScript._Function = class {
  constructor({ name, param, expressions }) {
    
  }
}
SpotkyScript._Expression = class {
  #ExpressionRegExp = /(\d+(\.\d+)?|[+\-*/]|[A-Za-z]+| +)/g;
  constructor(str, line) {
    if (
      str.replace(this.#ExpressionRegExp, "").length > 0 ||
      str.match(/(\+|-|\*|\/){2,}/)
    ) throw `Syntax Errror at line ${line}`;

    this.terms = str.replace(/ /g, "").match(this.#ExpressionRegExp);
  }

  calculate(variables={}) {
    let _terms = this.terms.slice(0);
    _terms = _terms.map((e, i) => {
      if (isNaN(+e) && i%2 === 0) {
        if (variables[e]) return variables[e];
        else throw `Variable ${e} is undefined`;
      } else {
        return e;
      }
    });

    let cur = +_terms.shift();
    _terms = _terms.map((e, i, a) => a.slice(i*2, (i+1)*2)).filter(e => e.length >= 2);
    for (let i = 0, l = _terms.length; i < l; i++) {
      let [operator, num] = _terms.shift();
      num = +num;
      switch (operator) {
        case "+": cur += num; break;
        case "*": cur *= num; break;
        case "-": cur -= num; break;
        case "/": cur /= num; break;
      }
    }
    return cur;
  }
}

SpotkyScript.parse = function (str) {
  let lines = str.split("\n");

  let parsedLines = [];
  let exceptedType = "any";
  for (let i = 0, l = lines.length; i < l; i++) {
    const result = SpotkyScript.parseChunk(lines.shift(), exceptedType, i+1);
    parsedLines.push(result);
  }
  return parsedLines;
}
SpotkyScript.parseChunk = function (str, exceptedType, line) {
  let type = null, data = null;
  switch (exceptedType) {
    case "any":
      if (str.replace(/[0-9.a-zA-Z +\-/*]+/, "").length === 0) {
        type = "expression";
        data = new SpotkyScript._Expression(str);
      } else if (str.match(/^[A-Za-z]+ *= *.+$/)) {
        type = "defineVariable";
        data = {
          name: str.match(/^[A-Za-z]+/)[0],
          expression: new SpotkyScript._Expression(str.replace(/^[A-Za-z]+ *= */, ""))
        }
      } else {
        throw `Unknown parse error at line ${line}`;
      }
      break;
  }
  return { type, data };
}
SpotkyScript.eval = function(str) {
  const parsed = SpotkyScript.parse(str);

  let mem = {
    var: {}
  };
  let output = undefined;
  for (let i = 0; i < parsed.length; i++) {
    const reading = parsed[i];
    switch (reading.type) {
      case "expression":
        output = reading.data.calculate(mem.var);
        break;
      case "defineVariable":
        output = reading.data.expression.calculate(mem.var);
        mem.var[reading.data.name] = output;
        break;
    }
  }

  return output;
}

let input = `234+23565
asdf = 3+     4
fdsa = asdf * 3`;
console.log(SpotkyScript.eval(input));
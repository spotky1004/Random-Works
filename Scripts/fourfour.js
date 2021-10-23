import fs from 'fs';

let combs = {};

const operators = ["+", "-", "*", "/", "**"];

/**
 * @typedef {object} findCombState
 * @property {string} expression
 * @property {"number"|"operator"} next
 * @property {number} numberUsed
 * @property {number} bracketOpened
 * @property {boolean} isDone
 * @property {number} depth 
 */
/** @param {findCombState} state */
function findComb(state) {
  state = {
    ...state,
    depth: state.depth + 1
  };

  if (state.isDone) {
    if (state.bracketOpened > 0) state.expression += ")".repeat(state.bracketOpened); // bracket fix
    let result = eval(state.expression); // evaluate
    if (!Number.isInteger(result) || result <= 0 || result > 10000) return; // ignore unexpected values
    if (typeof combs[result] === "undefined") combs[result] = [];
    combs[result].push(state.expression);
    return;
  }

  switch (state.next) {
    case "number":
      for (let i = 1; i <= 4-state.numberUsed; i++) {
        for (let j = i; j >= 0; j--) {
          let numberToAdd = "4".repeat(i);
          if (i !== j) {
            numberToAdd = numberToAdd.slice(0, j) + "." + numberToAdd.slice(j);
          }
          let _numberUsed = state.numberUsed + i;
          let _isDone = _numberUsed === 4;
  
          let _state = {
            ...state,
            numberUsed: _numberUsed,
            next: _isDone ? null : "operator",
            isDone: _isDone,
          };
  
          findComb({
            ..._state,
            expression: state.expression + numberToAdd
          });
  
          if (_numberUsed !== 4) {
            if (state.bracketOpened > 0) {
              findComb({
                ..._state,
                expression: state.expression + numberToAdd + ")",
                bracketOpened: state.bracketOpened - 1
              });
            }
            findComb({
              ..._state,
              expression: state.expression + "(" + numberToAdd,
              bracketOpened: state.bracketOpened + 1
            });
          }
        }
      }
      break;
    case "operator":
      for (let i = 0; i < operators.length; i++) {
        findComb({
          ...state,
          expression: state.expression + operators[i],
          next: "number"
        });
      }
      break;
  }
}

findComb({
  expression: "",
  next: "number",
  numberUsed: 0,
  bracketOpened: false,
  isDone: false,
  depth: 0
});
for (const n in combs) {
  combs[n] = [...new Set(combs[n])].join(", ");
}
fs.writeFile("./Scripts/fourfour.json", JSON.stringify(combs, null, 2), (err) => {if (err) console.log(err)});

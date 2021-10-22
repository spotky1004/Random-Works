let combs = {};

const numbers = ["4", "44", "444", "4444"];
const operators = ["+", "-", "*", "/"];

/**
 * @typedef {object} findCombState
 * @property {string} expression
 * @property {"number"|"operator"} next
 * @property {number} numberUsed
 * @property {boolean} bracketOpened
 * @property {boolean} isDone
 * @property {number} depth 
 */
/** @param {findCombState} state */
function findComb(state) {
  state.depth++;

  if (state.isDone) {
    if (state.bracketOpened === true) state.expression += ")"; // bracket fix
    let result = eval(state.expression); // evaluate
    if (!Number.isInteger(result) || result <= 0 || result > 10000) return; // ignore unexpected values
    if (typeof combs[result] === "undefined") combs[result] = [];
    combs[result].push(state.expression);
    return;
  }

  switch (state.next) {
    case "number":
      for (let i = 1; i <= 4-state.numberUsed; i++) {
        const NUMBER_TO_ADD = "4".repeat(i);
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
          expression: state.expression + NUMBER_TO_ADD
        });

        if (_numberUsed !== 4) {
          if (state.bracketOpened) {
            findComb({
              ..._state,
              expression: state.expression + NUMBER_TO_ADD + ")",
              bracketOpened: false
            });
          } else {
            findComb({
              ..._state,
              expression: state.expression + "(" + NUMBER_TO_ADD,
              bracketOpened: true
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
  combs[n] = [...new Set(combs[n])]
}
console.log(combs);
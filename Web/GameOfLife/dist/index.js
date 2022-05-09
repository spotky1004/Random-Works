import Game from "./Game.js";
const game = new Game(document.getElementById("canvas"));
game.applyGame("(49, 49) (49, 50) (49, 51) (50, 49) (50, 50) (50, 51) (51, 49) (51, 50) (51, 51)", "B1357/S02468", '{"backgroundColor": "#000", "lifeColor": [20, 227, 109], "deadColorStages": 4, "deadColorFrom": [20, 227, 109], "deadColorTo": [32, 36, 34]}');
setInterval(() => game.tick(), 50);
const elements = {
    inputs: {
        cells: document.querySelector("input[name='cells']"),
        rules: document.querySelector("input[name='rules']"),
        styles: document.querySelector("input[name='styles']"),
    },
    buttons: {
        apply: document.getElementById("apply-button")
    }
};
elements.buttons.apply.addEventListener("click", () => {
    game.applyGame(elements.inputs.cells.value, elements.inputs.rules.value, elements.inputs.styles.value);
});

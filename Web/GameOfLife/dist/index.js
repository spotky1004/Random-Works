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
        apply: document.getElementById("apply-button"),
        randomize: document.getElementById("randomize-button")
    }
};
function applyGame() {
    game.applyGame(elements.inputs.cells.value, elements.inputs.rules.value, elements.inputs.styles.value);
}
elements.buttons.apply.addEventListener("click", applyGame);
elements.buttons.randomize.addEventListener("click", () => {
    const x = Math.floor(Math.random() * 200) + 25;
    const y = Math.floor(Math.random() * 200) + 25;
    const cells = Array(Math.floor(Math.random() * 3 + 2)).fill(null).map(() => Array(Math.floor(Math.random() * 3 + 2)).fill(null).map(() => Math.floor(Math.random() * 2)));
    let cellText = "";
    for (let dy = 0; dy < cells.length; dy++) {
        const row = cells[dy];
        for (let dx = 0; dx < row.length; dx++) {
            if (row[dx] === 1)
                cellText += `(${x + dx}, ${y + dy}) `;
        }
    }
    elements.inputs.cells.value = cellText.trim();
    elements.inputs.rules.value = `B${Array(8).fill("").map((_, i) => Math.random() < 0.3 ? i + 1 : "").join("")}/S${Array(9).fill("").map((_, i) => Math.random() < 0.3 ? i : "").join("")}`;
    const bgColor = "#" + Math.floor(Math.random() * 16 ** 6).toString(16).padStart(6, "0");
    const lifeColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    const deadColorTo = lifeColor.map(v => Math.floor(v + Math.random() * 30) % 255);
    elements.inputs.styles.value = `{"backgroundColor": "${bgColor}", "lifeColor": [${lifeColor.join(", ")}], "deadColorStages": ${Math.floor(Math.random() * 6 + 1)}, "deadColorFrom": [${lifeColor.join(", ")}], "deadColorTo": [${deadColorTo.join(", ")}]}`;
    applyGame();
});

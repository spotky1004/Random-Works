"use strict";
const numberEls = [
    document.getElementById("number-1"),
    document.getElementById("number-2"),
];
const incrementEl = document.getElementById("increment-button");
const defaultGame = {
    name: "LearnTS",
    number1: 0,
    number2: 0,
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
};
const game = { ...defaultGame };
function manageSave(action) {
    if (action.type === "save") {
        localStorage.setItem(action.key, JSON.stringify(action.game));
    }
    else if (action.type === "load") {
        const data = JSON.parse(localStorage.getItem(action.key) ?? "{}");
        if (!isGame(data))
            return;
        Object.assign(action.target, data);
    }
}
function isGame(data) {
    return data.name === "LearnTS";
}
function tick() {
    const time = new Date().getTime();
    const dt = (time - game.lastTime) / 1000;
    game.lastTime = time;
    game.number1 += game.number2 * dt;
    render();
    requestAnimationFrame(tick);
}
function render() {
    numberEls[0].innerText = game.number1.toFixed(2);
    numberEls[1].innerText = game.number2.toFixed(2);
}
incrementEl.addEventListener("click", function () {
    game.number2++;
});
manageSave({
    type: "load",
    key: "LearnTS",
    target: game,
});
setInterval(() => {
    console.log("Game Saved!");
    manageSave({
        type: "save",
        key: "LearnTS",
        game,
    });
}, 5000);
tick();
//# sourceMappingURL=index.js.map
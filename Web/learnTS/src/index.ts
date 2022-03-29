const numberEls = [
  document.getElementById("number-1"),
  document.getElementById("number-2"),
] as HTMLDivElement[];
const incrementEl = document.getElementById("increment-button") as HTMLButtonElement;

interface Game {
  name: "LearnTS";
  number1: number;
  number2: number;
  startTime: number;
  lastTime: number;
}
const defaultGame: Game = {
  name: "LearnTS",
  number1: 0,
  number2: 0,
  startTime: new Date().getTime(),
  lastTime: new Date().getTime(),
};

const game: Game = {...defaultGame};

interface ManageSaveSaveOptions {
  type: "save";
  game: Game;
  key: string;
}
interface ManageSaveLoadOptions {
  type: "load";
  target: Game;
  key: string;
}
type ManageSaveActionOptions = ManageSaveSaveOptions | ManageSaveLoadOptions;

function manageSave(action: ManageSaveActionOptions): void {
  if (action.type === "save") {
    localStorage.setItem(action.key, JSON.stringify(action.game));
  } else if (action.type === "load") {
    const data: object = JSON.parse(localStorage.getItem(action.key) ?? "{}");
    if (!isGame(data)) return;
    Object.assign(action.target, data);
  }
}
function isGame(data: any): data is Game {
  return data.name === "LearnTS";
}

function tick() {
  const time = new Date().getTime();
  const dt = (time - game.lastTime)/1000;
  game.lastTime = time;

  game.number1 += game.number2 * dt;

  render();
  requestAnimationFrame(tick);
}
function render() {
  numberEls[0].innerText = game.number1.toFixed(2);
  numberEls[1].innerText = game.number2.toFixed(2);
}

incrementEl.addEventListener("click", function() {
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
  })
}, 5000);
tick();

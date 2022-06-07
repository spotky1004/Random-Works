import App from "./class/App.js";

const app = new App({
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  searchBox: document.getElementById("search-box") as HTMLInputElement,
  fileSelect: document.getElementById("file-select") as HTMLInputElement
});
app.render();

let prevWindowSize: Position = {
  x: innerWidth,
  y: innerHeight
};
function tick() {
  app.eventsManager.tick();
  if (
    prevWindowSize.x !== innerWidth ||
    prevWindowSize.y !== innerHeight
  ) {
    prevWindowSize = {
      x: innerWidth,
      y: innerHeight
    };
    app.render();
  }
  requestAnimationFrame(tick);
}
tick();

console.log(app);

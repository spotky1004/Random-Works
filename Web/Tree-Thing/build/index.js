import App from "./class/App.js";
const app = new App({
    canvas: document.getElementById("canvas"),
    searchBox: document.getElementById("search-box"),
    fileSelect: document.getElementById("file-select")
});
app.render();
let prevWindowSize = {
    x: innerWidth,
    y: innerHeight
};
function tick() {
    app.eventsManager.tick();
    if (prevWindowSize.x !== innerWidth ||
        prevWindowSize.y !== innerHeight) {
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

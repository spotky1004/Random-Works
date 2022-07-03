import App from "./App.js";
import Particle from "./Particle.js";
import Vec2 from "./Vec2.js";
const app = new App({
    canvasEl: document.getElementById("canvas"),
    fieldSize: 100
});
// Add sands
for (let y = 0; y < 45; y += 5) {
    for (let x = ((y / 2) % 5) * 5 - 10; x < 100; x += 5) {
        app.addParticle(new Particle({
            x,
            y,
            color: "#e3a468",
            friction: 10,
            mass: 20,
            size: 5,
            threshold: 0,
            velocity: new Vec2(0, 0),
            elasticity: 1
        }));
    }
}
for (let y = 55; y < 100; y += 5) {
    for (let x = ((y / 2) % 5) * 5 - 10; x < 100; x += 5) {
        app.addParticle(new Particle({
            x,
            y,
            color: "#e3a468",
            friction: 10,
            mass: 20,
            size: 5,
            threshold: 0,
            velocity: new Vec2(0, 0),
            elasticity: 1
        }));
    }
}
let lastTick = Date.now();
let waterSpawnTime = 30;
function tick() {
    const now = Date.now();
    const dt = Math.min(20, now - lastTick);
    lastTick = now;
    // Spawn water
    waterSpawnTime -= dt;
    if (waterSpawnTime < 0) {
        waterSpawnTime += 10;
        app.addParticle(new Particle({
            color: "#8aebdf",
            friction: 100,
            mass: 0.01,
            size: 2,
            threshold: 0.5,
            velocity: new Vec2(50, Math.random() * 5 - 2.5),
            x: 0,
            y: Math.random() * 9 + 44,
            elasticity: 1,
            moved: true,
        }));
    }
    app.tick(dt);
    requestAnimationFrame(tick);
}
tick();
